/**
 * WebGL fluid simulation engine.
 *
 * Adapted from Pavel Dobryakov's "WebGL Fluid Simulation" (MIT licensed).
 * https://github.com/PavelDoGreat/WebGL-Fluid-Simulation
 *
 * Every value inside `config` plus the load burst / auto-cursor / ink band
 * constants below are FIXED by the design spec. Do not tune them casually —
 * the look is defined by these numbers.
 *
 * The engine renders on a transparent canvas (`alpha: true`) using
 * premultiplied-alpha blending, so the CSS surface behind the canvas shows
 * through wherever there is no ink. That is what lets one canvas serve both
 * the dark and light themes.
 */

type GL = WebGL2RenderingContext;

interface Pointer {
  id: number;
  texcoordX: number;
  texcoordY: number;
  prevTexcoordX: number;
  prevTexcoordY: number;
  deltaX: number;
  deltaY: number;
  down: boolean;
  moved: boolean;
  color: RGB;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface FBO {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  attach: (id: number) => number;
}

interface DoubleFBO {
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  read: FBO;
  write: FBO;
  swap: () => void;
}

interface TexFormat {
  internalFormat: number;
  format: number;
}

interface Program {
  program: WebGLProgram;
  uniforms: Record<string, WebGLUniformLocation | null>;
  bind: () => void;
}

/* ------------------------------------------------------------------ *
 * Fixed configuration (design spec)
 * ------------------------------------------------------------------ */

const config = {
  SIM_RESOLUTION: 180,
  DYE_RESOLUTION: 460,
  DENSITY_DISSIPATION: 0.963,
  VELOCITY_DISSIPATION: 0.97,
  PRESSURE: 0.72,
  PRESSURE_ITERATIONS: 16,
  CURL: 28,
  SPLAT_RADIUS: 0.18,
  SPLAT_FORCE: 4500,
  SHADING: true,
  COLORFUL: true,
  BLOOM: false,
  PAUSED: false,
} as const;

/** Ink hue band: 0.5 + rand * 0.42, sat 0.95, val 1.0. */
const INK_HUE_BASE = 0.5;
const INK_HUE_SPREAD = 0.42;
const INK_SATURATION = 0.95;
const INK_VALUE = 1.0;

/** Auto-cursor orbit. */
const ORBIT_RADIUS = 240;
const ORBIT_SPEED = 0.018; // radians per frame @ 60fps
const ORBIT_START_DELAY = 700; // ms
const ORBIT_COLOR_INTERVAL = 120; // ms
const ORBIT_BRIGHTNESS = 2.4; // x relative to the base ink strength
const ORBIT_RADIUS_SCALE = 0.18; // fraction of SPLAT_RADIUS for the brush
const INK_BASE_STRENGTH = 0.12;

/** Load burst. */
const BURST_SPLATS = 34;
const BURST_WAVES = 8;

const MAX_DPR = 1.2;

/* ------------------------------------------------------------------ *
 * Shaders
 * ------------------------------------------------------------------ */

const BASE_VERTEX_SHADER = `
precision highp float;
attribute vec2 aPosition;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform vec2 texelSize;
void main () {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(texelSize.x, 0.0);
  vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y);
  vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

const COPY_SHADER = `
precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
uniform sampler2D uTexture;
void main () {
  gl_FragColor = texture2D(uTexture, vUv);
}
`

const CLEAR_SHADER = `
precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
uniform sampler2D uTexture;
uniform float value;
void main () {
  gl_FragColor = value * texture2D(uTexture, vUv);
}
`

const DISPLAY_SHADER = `
precision highp float;
precision highp sampler2D;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D uTexture;
uniform vec2 texelSize;
void main () {
  vec3 c = texture2D(uTexture, vUv).rgb;
#ifdef SHADING
  vec3 lc = texture2D(uTexture, vL).rgb;
  vec3 rc = texture2D(uTexture, vR).rgb;
  vec3 tc = texture2D(uTexture, vT).rgb;
  vec3 bc = texture2D(uTexture, vB).rgb;
  float dx = length(rc) - length(lc);
  float dy = length(tc) - length(bc);
  vec3 n = normalize(vec3(dx, dy, length(texelSize)));
  vec3 l = vec3(0.0, 0.0, 1.0);
  float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
  c *= diffuse;
#endif
  float a = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c, a);
}
`

const SPLAT_SHADER = `
precision highp float;
precision highp sampler2D;
varying vec2 vUv;
uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 color;
uniform vec2 point;
uniform float radius;
void main () {
  vec2 p = vUv - point.xy;
  p.x *= aspectRatio;
  vec3 splat = exp(-dot(p, p) / radius) * color;
  vec3 base = texture2D(uTarget, vUv).xyz;
  gl_FragColor = vec4(base + splat, 1.0);
}
`

const ADVECTION_SHADER = `
precision highp float;
precision highp sampler2D;
varying vec2 vUv;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 texelSize;
uniform vec2 dyeTexelSize;
uniform float dt;
uniform float dissipation;
vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
  vec2 st = uv / tsize - 0.5;
  vec2 iuv = floor(st);
  vec2 fuv = fract(st);
  vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
  vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
  vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
  vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
  return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
}
void main () {
#ifdef MANUAL_FILTERING
  vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
  vec4 result = bilerp(uSource, coord, dyeTexelSize);
#else
  vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
  vec4 result = texture2D(uSource, coord);
#endif
  float decay = 1.0 + dissipation * dt;
  gl_FragColor = result / decay;
}
`

const DIVERGENCE_SHADER = `
precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uVelocity;
void main () {
  float L = texture2D(uVelocity, vL).x;
  float R = texture2D(uVelocity, vR).x;
  float T = texture2D(uVelocity, vT).y;
  float B = texture2D(uVelocity, vB).y;
  vec2 C = texture2D(uVelocity, vUv).xy;
  if (vL.x < 0.0) { L = -C.x; }
  if (vR.x > 1.0) { R = -C.x; }
  if (vT.y > 1.0) { T = -C.y; }
  if (vB.y < 0.0) { B = -C.y; }
  float div = 0.5 * (R - L + T - B);
  gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
}
`

const CURL_SHADER = `
precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uVelocity;
void main () {
  float L = texture2D(uVelocity, vL).y;
  float R = texture2D(uVelocity, vR).y;
  float T = texture2D(uVelocity, vT).x;
  float B = texture2D(uVelocity, vB).x;
  float vorticity = R - L - T + B;
  gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
}
`

const VORTICITY_SHADER = `
precision highp float;
precision highp sampler2D;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float curl;
uniform float dt;
void main () {
  float L = texture2D(uCurl, vL).x;
  float R = texture2D(uCurl, vR).x;
  float T = texture2D(uCurl, vT).x;
  float B = texture2D(uCurl, vB).x;
  float C = texture2D(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= curl * C;
  force.y *= -1.0;
  vec2 velocity = texture2D(uVelocity, vUv).xy;
  velocity += force * dt;
  velocity = min(max(velocity, -1000.0), 1000.0);
  gl_FragColor = vec4(velocity, 0.0, 1.0);
}
`

const PRESSURE_SHADER = `
precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
void main () {
  float L = texture2D(uPressure, vL).x;
  float R = texture2D(uPressure, vR).x;
  float T = texture2D(uPressure, vT).x;
  float B = texture2D(uPressure, vB).x;
  float C = texture2D(uPressure, vUv).x;
  float divergence = texture2D(uDivergence, vUv).x;
  float pressure = (L + R + B + T - divergence) * 0.25;
  gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
}
`

const GRADIENT_SUBTRACT_SHADER = `
precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
void main () {
  float L = texture2D(uPressure, vL).x;
  float R = texture2D(uPressure, vR).x;
  float T = texture2D(uPressure, vT).x;
  float B = texture2D(uPressure, vB).x;
  vec2 velocity = texture2D(uVelocity, vUv).xy;
  velocity.xy -= vec2(R - L, T - B);
  gl_FragColor = vec4(velocity, 0.0, 1.0);
}
`

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

function addKeywords(source: string, keywords: string[] | null): string {
  if (!keywords) return source
  let keywordsString = ''
  keywords.forEach((keyword) => {
    keywordsString += `#define ${keyword}\n`
  })
  return keywordsString + source
}

function scaleByPixelRatio(input: number, dpr: number): number {
  return Math.floor(input * dpr)
}

function hsvToRgb(h: number, s: number, v: number): RGB {
  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)
  switch (i % 6) {
    case 0: return { r: v, g: t, b: p }
    case 1: return { r: q, g: v, b: p }
    case 2: return { r: p, g: v, b: t }
    case 3: return { r: p, g: q, b: v }
    case 4: return { r: t, g: p, b: v }
    default: return { r: v, g: p, b: q }
  }
}

/** Ink from the fixed hue band, scaled to `strength`. */
function inkColor(strength: number): RGB {
  const c = hsvToRgb(
    INK_HUE_BASE + Math.random() * INK_HUE_SPREAD,
    INK_SATURATION,
    INK_VALUE,
  )
  return { r: c.r * strength, g: c.g * strength, b: c.b * strength }
}

/* ------------------------------------------------------------------ *
 * Engine
 * ------------------------------------------------------------------ */

/**
 * Mount the fluid simulation on `canvas`.
 * Returns a teardown function — call it exactly once on unmount.
 */
export function fluidSimulation(canvas: HTMLCanvasElement): () => void {
  const params: WebGLContextAttributes = {
    alpha: true,
    depth: false,
    stencil: false,
    antialias: false,
    preserveDrawingBuffer: false,
    premultipliedAlpha: true,
  }

  let gl = canvas.getContext('webgl2', params) as GL | null
  const isWebGL2 = !!gl
  if (!gl) {
    gl = (canvas.getContext('webgl', params) ||
      canvas.getContext('experimental-webgl', params)) as GL | null
  }
  if (!gl) {
    // No WebGL at all — the CSS surface alone remains as the fallback.
    return () => {}
  }

  const context = gl
  const halfFloat = isWebGL2 ? null : context.getExtension('OES_texture_half_float')
  if (!isWebGL2 && !halfFloat) {
    return () => {}
  }
  const supportLinearFiltering = isWebGL2
    ? context.getExtension('OES_texture_float_linear')
    : context.getExtension('OES_texture_half_float_linear')

  if (isWebGL2) {
    context.getExtension('EXT_color_buffer_float')
  }

  context.clearColor(0, 0, 0, 0)

  const halfFloatTexType = isWebGL2
    ? (context.HALF_FLOAT as number)
    : (halfFloat?.HALF_FLOAT_OES as number) ?? 0

  function getSupportedFormat(
    internalFormat: number,
    format: number,
    type: number,
  ): TexFormat | null {
    if (!supportRenderTextureFormat(internalFormat, format, type)) {
      if (isWebGL2) {
        switch (internalFormat) {
          case context.R16F:
            return getSupportedFormat(context.RG16F, context.RG, type)
          case context.RG16F:
            return getSupportedFormat(context.RGBA16F, context.RGBA, type)
          default:
            return null
        }
      }
      return null
    }
    return { internalFormat, format }
  }

  function supportRenderTextureFormat(
    internalFormat: number,
    format: number,
    type: number,
  ): boolean {
    const texture = context.createTexture()
    context.bindTexture(context.TEXTURE_2D, texture)
    context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.NEAREST)
    context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.NEAREST)
    context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE)
    context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE)
    context.texImage2D(context.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null)

    const fbo = context.createFramebuffer()
    context.bindFramebuffer(context.FRAMEBUFFER, fbo)
    context.framebufferTexture2D(
      context.FRAMEBUFFER,
      context.COLOR_ATTACHMENT0,
      context.TEXTURE_2D,
      texture,
      0,
    )
    const status = context.checkFramebufferStatus(context.FRAMEBUFFER)
    context.bindFramebuffer(context.FRAMEBUFFER, null)
    context.deleteFramebuffer(fbo)
    context.deleteTexture(texture)
    return status === context.FRAMEBUFFER_COMPLETE
  }

  let formatRGBA: TexFormat | null
  let formatRG: TexFormat | null
  let formatR: TexFormat | null

  if (isWebGL2) {
    formatRGBA = getSupportedFormat(context.RGBA16F, context.RGBA, halfFloatTexType)
    formatRG = getSupportedFormat(context.RG16F, context.RG, halfFloatTexType)
    formatR = getSupportedFormat(context.R16F, context.RED, halfFloatTexType)
  } else {
    formatRGBA = getSupportedFormat(context.RGBA, context.RGBA, halfFloatTexType)
    formatRG = getSupportedFormat(context.RGBA, context.RGBA, halfFloatTexType)
    formatR = getSupportedFormat(context.RGBA, context.RGBA, halfFloatTexType)
  }

  if (!formatRGBA || !formatRG || !formatR) {
    return () => {}
  }

  /* ---------------- shader plumbing ---------------- */

  function createShader(type: number, source: string, keywords: string[] | null = null): WebGLShader {
    const shader = context.createShader(type)!
    context.shaderSource(shader, addKeywords(source, keywords))
    context.compileShader(shader)
    if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
      // eslint-disable-next-line no-console
      console.warn('[fluid] shader compile error:', context.getShaderInfoLog(shader))
    }
    return shader
  }

  function createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
    const program = context.createProgram()!
    context.attachShader(program, vertexShader)
    context.attachShader(program, fragmentShader)
    context.bindAttribLocation(program, 0, 'aPosition')
    context.linkProgram(program)
    if (!context.getProgramParameter(program, context.LINK_STATUS)) {
      // eslint-disable-next-line no-console
      console.warn('[fluid] program link error:', context.getProgramInfoLog(program))
    }
    return program
  }

  function getUniforms(program: WebGLProgram): Record<string, WebGLUniformLocation | null> {
    const uniforms: Record<string, WebGLUniformLocation | null> = {}
    const count = context.getProgramParameter(program, context.ACTIVE_UNIFORMS) as number
    for (let i = 0; i < count; i++) {
      const name = context.getActiveUniform(program, i)?.name
      if (name) uniforms[name] = context.getUniformLocation(program, name)
    }
    return uniforms
  }

  function makeProgram(vertexShader: WebGLShader, fragmentSource: string, keywords: string[] | null = null): Program {
    const fragmentShader = createShader(context.FRAGMENT_SHADER, fragmentSource, keywords)
    const program = createProgram(vertexShader, fragmentShader)
    return {
      program,
      uniforms: getUniforms(program),
      bind() {
        context.useProgram(program)
      },
    }
  }

  const baseVertexShader = createShader(context.VERTEX_SHADER, BASE_VERTEX_SHADER)

  const copyProgram = makeProgram(baseVertexShader, COPY_SHADER)
  const clearProgram = makeProgram(baseVertexShader, CLEAR_SHADER)
  const splatProgram = makeProgram(baseVertexShader, SPLAT_SHADER)
  const advectionProgram = makeProgram(
    baseVertexShader,
    ADVECTION_SHADER,
    supportLinearFiltering ? null : ['MANUAL_FILTERING'],
  )
  const divergenceProgram = makeProgram(baseVertexShader, DIVERGENCE_SHADER)
  const curlProgram = makeProgram(baseVertexShader, CURL_SHADER)
  const vorticityProgram = makeProgram(baseVertexShader, VORTICITY_SHADER)
  const pressureProgram = makeProgram(baseVertexShader, PRESSURE_SHADER)
  const gradientSubtractProgram = makeProgram(baseVertexShader, GRADIENT_SUBTRACT_SHADER)
  const displayProgram = makeProgram(
    baseVertexShader,
    DISPLAY_SHADER,
    config.SHADING ? ['SHADING'] : null,
  )

  /* ---------------- geometry ---------------- */

  context.bindBuffer(context.ARRAY_BUFFER, context.createBuffer())
  context.bufferData(
    context.ARRAY_BUFFER,
    new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
    context.STATIC_DRAW,
  )
  context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, context.createBuffer())
  context.bufferData(
    context.ELEMENT_ARRAY_BUFFER,
    new Uint16Array([0, 1, 2, 0, 2, 3]),
    context.STATIC_DRAW,
  )
  context.vertexAttribPointer(0, 2, context.FLOAT, false, 0, 0)
  context.enableVertexAttribArray(0)

  function blit(target: FBO | null, clear = false): void {
    if (target == null) {
      context.viewport(0, 0, context.drawingBufferWidth, context.drawingBufferHeight)
      context.bindFramebuffer(context.FRAMEBUFFER, null)
    } else {
      context.viewport(0, 0, target.width, target.height)
      context.bindFramebuffer(context.FRAMEBUFFER, target.fbo)
    }
    if (clear) {
      context.clearColor(0, 0, 0, 0)
      context.clear(context.COLOR_BUFFER_BIT)
    }
    context.drawElements(context.TRIANGLES, 6, context.UNSIGNED_SHORT, 0)
  }

  /* ---------------- framebuffers ---------------- */

  let dye: DoubleFBO
  let velocity: DoubleFBO
  let divergence: FBO
  let curl: FBO
  let pressure: DoubleFBO

  function createFBO(
    w: number,
    h: number,
    internalFormat: number,
    format: number,
    type: number,
    param: number,
  ): FBO {
    context.activeTexture(context.TEXTURE0)
    const texture = context.createTexture()!
    context.bindTexture(context.TEXTURE_2D, texture)
    context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, param)
    context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, param)
    context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE)
    context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE)
    context.texImage2D(context.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null)

    const fbo = context.createFramebuffer()!
    context.bindFramebuffer(context.FRAMEBUFFER, fbo)
    context.framebufferTexture2D(
      context.FRAMEBUFFER,
      context.COLOR_ATTACHMENT0,
      context.TEXTURE_2D,
      texture,
      0,
    )
    context.viewport(0, 0, w, h)
    context.clearColor(0, 0, 0, 0)
    context.clear(context.COLOR_BUFFER_BIT)

    return {
      texture,
      fbo,
      width: w,
      height: h,
      texelSizeX: 1 / w,
      texelSizeY: 1 / h,
      attach(id: number) {
        context.activeTexture(context.TEXTURE0 + id)
        context.bindTexture(context.TEXTURE_2D, texture)
        return id
      },
    }
  }

  function createDoubleFBO(
    w: number,
    h: number,
    internalFormat: number,
    format: number,
    type: number,
    param: number,
  ): DoubleFBO {
    const fbo1 = createFBO(w, h, internalFormat, format, type, param)
    const fbo2 = createFBO(w, h, internalFormat, format, type, param)
    return {
      width: w,
      height: h,
      texelSizeX: 1 / w,
      texelSizeY: 1 / h,
      read: fbo1,
      write: fbo2,
      swap() {
        const tmp = this.read
        this.read = this.write
        this.write = tmp
      },
    }
  }

  function deleteFBO(target: FBO): void {
    context.deleteTexture(target.texture)
    context.deleteFramebuffer(target.fbo)
  }

  function resizeFBO(
    target: FBO,
    w: number,
    h: number,
    internalFormat: number,
    format: number,
    type: number,
    param: number,
  ): FBO {
    const newFBO = createFBO(w, h, internalFormat, format, type, param)
    copyProgram.bind()
    context.uniform1i(copyProgram.uniforms.uTexture, target.attach(0))
    blit(newFBO)
    deleteFBO(target)
    return newFBO
  }

  function resizeDoubleFBO(
    target: DoubleFBO,
    w: number,
    h: number,
    internalFormat: number,
    format: number,
    type: number,
    param: number,
  ): DoubleFBO {
    if (target.width === w && target.height === h) return target
    target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param)
    const previousWrite = target.write
    target.write = createFBO(w, h, internalFormat, format, type, param)
    deleteFBO(previousWrite)
    target.width = w
    target.height = h
    target.texelSizeX = 1 / w
    target.texelSizeY = 1 / h
    return target
  }

  function getResolution(resolution: number): { width: number; height: number } {
    let aspectRatio = context.drawingBufferWidth / context.drawingBufferHeight
    if (aspectRatio < 1) aspectRatio = 1 / aspectRatio
    const min = Math.round(resolution)
    const max = Math.round(resolution * aspectRatio)
    if (context.drawingBufferWidth > context.drawingBufferHeight) {
      return { width: max, height: min }
    }
    return { width: min, height: max }
  }

  function initFramebuffers(): void {
    const simRes = getResolution(config.SIM_RESOLUTION)
    const dyeRes = getResolution(config.DYE_RESOLUTION)
    const texType = halfFloatTexType
    const rgba = formatRGBA!
    const rg = formatRG!
    const r = formatR!
    const filtering = supportLinearFiltering ? context.LINEAR : context.NEAREST

    dye = dye
      ? resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering)
      : createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering)

    velocity = velocity
      ? resizeDoubleFBO(velocity, simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering)
      : createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering)

    if (divergence) deleteFBO(divergence)
    if (curl) deleteFBO(curl)
    if (pressure) {
      deleteFBO(pressure.read)
      deleteFBO(pressure.write)
    }

    divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, context.NEAREST)
    curl = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, context.NEAREST)
    pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, context.NEAREST)
  }

  /* ---------------- simulation ---------------- */

  function step(dt: number): void {
    context.disable(context.BLEND)

    curlProgram.bind()
    context.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
    context.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0))
    blit(curl)

    vorticityProgram.bind()
    context.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
    context.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0))
    context.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1))
    context.uniform1f(vorticityProgram.uniforms.curl, config.CURL)
    context.uniform1f(vorticityProgram.uniforms.dt, dt)
    blit(velocity.write)
    velocity.swap()

    divergenceProgram.bind()
    context.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
    context.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0))
    blit(divergence)

    clearProgram.bind()
    context.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0))
    context.uniform1f(clearProgram.uniforms.value, config.PRESSURE)
    blit(pressure.write)
    pressure.swap()

    pressureProgram.bind()
    context.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
    context.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0))
    for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
      context.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1))
      blit(pressure.write)
      pressure.swap()
    }

    gradientSubtractProgram.bind()
    context.uniform2f(gradientSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
    context.uniform1i(gradientSubtractProgram.uniforms.uPressure, pressure.read.attach(0))
    context.uniform1i(gradientSubtractProgram.uniforms.uVelocity, velocity.read.attach(1))
    blit(velocity.write)
    velocity.swap()

    advectionProgram.bind()
    context.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
    if (!supportLinearFiltering) {
      context.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY)
    }
    const velocityId = velocity.read.attach(0)
    context.uniform1i(advectionProgram.uniforms.uVelocity, velocityId)
    context.uniform1i(advectionProgram.uniforms.uSource, velocityId)
    context.uniform1f(advectionProgram.uniforms.dt, dt)
    context.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION)
    blit(velocity.write)
    velocity.swap()

    if (!supportLinearFiltering) {
      context.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY)
    }
    context.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0))
    context.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1))
    context.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION)
    blit(dye.write)
    dye.swap()
  }

  function render(target: FBO | null): void {
    context.bindFramebuffer(context.FRAMEBUFFER, target == null ? null : target.fbo)
    context.viewport(
      0,
      0,
      target == null ? context.drawingBufferWidth : target.width,
      target == null ? context.drawingBufferHeight : target.height,
    )
    if (target == null) {
      // The canvas is transparent: wipe it, then composite the dye with
      // premultiplied-alpha blending so the page surface shows through.
      context.blendFunc(context.ONE, context.ONE_MINUS_SRC_ALPHA)
      context.enable(context.BLEND)
      context.clearColor(0, 0, 0, 0)
      context.clear(context.COLOR_BUFFER_BIT)
    } else {
      context.disable(context.BLEND)
    }

    displayProgram.bind()
    context.uniform2f(displayProgram.uniforms.texelSize, 1 / context.drawingBufferWidth, 1 / context.drawingBufferHeight)
    context.uniform1i(displayProgram.uniforms.uTexture, dye.read.attach(0))
    context.drawElements(context.TRIANGLES, 6, context.UNSIGNED_SHORT, 0)
  }

  /* ---------------- splats ---------------- */

  function correctRadius(radius: number): number {
    const aspectRatio = canvas.width / canvas.height
    if (aspectRatio > 1) radius *= aspectRatio
    return radius
  }

  function splat(
    x: number,
    y: number,
    dx: number,
    dy: number,
    color: RGB,
    radius: number = config.SPLAT_RADIUS,
  ): void {
    splatProgram.bind()
    context.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0))
    context.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height)
    context.uniform2f(splatProgram.uniforms.point, x, y)
    context.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0)
    context.uniform1f(splatProgram.uniforms.radius, correctRadius(radius / 100))
    blit(velocity.write)
    velocity.swap()

    context.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0))
    context.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b)
    blit(dye.write)
    dye.swap()
  }

  function multipleSplats(amount: number): void {
    for (let i = 0; i < amount; i++) {
      const color = inkColor(INK_BASE_STRENGTH * 10)
      const x = Math.random()
      const y = Math.random()
      const dx = 1000 * (Math.random() - 0.5)
      const dy = 1000 * (Math.random() - 0.5)
      splat(x, y, dx, dy, color)
    }
  }

  /* ---------------- pointer input ---------------- */

  let hovering = false

  const pointer: Pointer = {
    id: -1,
    texcoordX: 0,
    texcoordY: 0,
    prevTexcoordX: 0,
    prevTexcoordY: 0,
    deltaX: 0,
    deltaY: 0,
    down: false,
    moved: false,
    color: inkColor(INK_BASE_STRENGTH),
  }

  function correctDeltaX(delta: number): number {
    const aspectRatio = canvas.width / canvas.height
    if (aspectRatio < 1) delta *= aspectRatio
    return delta
  }

  function correctDeltaY(delta: number): number {
    const aspectRatio = canvas.width / canvas.height
    if (aspectRatio > 1) delta *= aspectRatio
    return delta
  }

  function pointerDown(posX: number, posY: number): void {
    pointer.down = true
    pointer.moved = false
    pointer.texcoordX = posX / canvas.width
    pointer.texcoordY = 1 - posY / canvas.height
    pointer.prevTexcoordX = pointer.texcoordX
    pointer.prevTexcoordY = pointer.texcoordY
    pointer.deltaX = 0
    pointer.deltaY = 0
    pointer.color = inkColor(INK_BASE_STRENGTH * 10)
  }

  function pointerMove(posX: number, posY: number): void {
    pointer.prevTexcoordX = pointer.texcoordX
    pointer.prevTexcoordY = pointer.texcoordY
    pointer.texcoordX = posX / canvas.width
    pointer.texcoordY = 1 - posY / canvas.height
    pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX)
    pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY)
    pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0
  }

  function pointerEnter(posX: number, posY: number): void {
    pointer.texcoordX = posX / canvas.width
    pointer.texcoordY = 1 - posY / canvas.height
    pointer.prevTexcoordX = pointer.texcoordX
    pointer.prevTexcoordY = pointer.texcoordY
    pointer.deltaX = 0
    pointer.deltaY = 0
    pointer.color = inkColor(INK_BASE_STRENGTH * 10)
  }

  // The canvas is `position: fixed; inset: 0`, so its rect is the viewport.
  // Read it once per event instead of twice to avoid a double layout flush.
  const toLocal = (clientX: number, clientY: number): [number, number] => {
    const rect = canvas.getBoundingClientRect()
    const scaleX = rect.width > 0 ? canvas.width / rect.width : 1
    const scaleY = rect.height > 0 ? canvas.height / rect.height : 1
    return [(clientX - rect.left) * scaleX, (clientY - rect.top) * scaleY]
  }

  const handlePointerMove = (event: PointerEvent) => {
    const [x, y] = toLocal(event.clientX, event.clientY)
    if (!pointer.down) {
      // Track position so a press starts from the current spot.
      pointerEnter(x, y)
      hovering = true
    } else {
      pointerMove(x, y)
    }
  }

  const handlePointerDown = (event: PointerEvent) => {
    const [x, y] = toLocal(event.clientX, event.clientY)
    pointerDown(x, y)
  }

  const handlePointerUp = () => {
    pointer.down = false
  }

  const handlePointerLeave = () => {
    hovering = false
    pointer.down = false
  }

  window.addEventListener('pointermove', handlePointerMove, { passive: true })
  window.addEventListener('pointerdown', handlePointerDown, { passive: true })
  window.addEventListener('pointerup', handlePointerUp, { passive: true })
  window.addEventListener('pointerleave', handlePointerLeave, { passive: true })
  window.addEventListener('blur', handlePointerUp)

  /* ---------------- auto cursor ---------------- */

  const prefersReducedMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let orbitAngle = 0
  let autoX = 0.5
  let autoY = 0.5
  let autoColorAt = 0
  let autoColor = inkColor(INK_BASE_STRENGTH * ORBIT_BRIGHTNESS)

  function applyAutoCursor(elapsed: number, dt: number): void {
    if (prefersReducedMotion) return
    if (elapsed < ORBIT_START_DELAY) return

    orbitAngle += ORBIT_SPEED * dt * 60
    const breathe = 0.72 + 0.28 * Math.sin(orbitAngle * 0.37)
    const nx = 0.5 + (Math.cos(orbitAngle) * ORBIT_RADIUS * breathe) / Math.max(1, canvas.clientWidth)
    const ny = 1 - (0.5 + (Math.sin(orbitAngle) * ORBIT_RADIUS * breathe) / Math.max(1, canvas.clientHeight))

    if (elapsed - autoColorAt > ORBIT_COLOR_INTERVAL) {
      autoColorAt = elapsed
      autoColor = inkColor(INK_BASE_STRENGTH * ORBIT_BRIGHTNESS)
    }

    const dx = (nx - autoX) * config.SPLAT_FORCE
    const dy = (ny - autoY) * config.SPLAT_FORCE
    autoX = nx
    autoY = ny

    splat(nx, ny, dx, dy, autoColor, config.SPLAT_RADIUS * ORBIT_RADIUS_SCALE)
  }

  /* ---------------- frame loop ---------------- */

  let lastUpdateTime = performance.now()
  let colorUpdateTimer = 0
  let waveQueue: number[] = []
  let running = true
  let rafId = 0

  function calcDeltaTime(): number {
    const now = performance.now()
    let dt = (now - lastUpdateTime) / 1000
    dt = Math.min(dt, 0.016666)
    lastUpdateTime = now
    return dt
  }

  function resizeCanvas(): boolean {
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
    const width = scaleByPixelRatio(canvas.clientWidth || window.innerWidth, dpr)
    const height = scaleByPixelRatio(canvas.clientHeight || window.innerHeight, dpr)
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
      return true
    }
    return false
  }

  function updateInk(): void {
    colorUpdateTimer += 0.005
    if (colorUpdateTimer >= 1) {
      colorUpdateTimer %= 1
      pointer.color = inkColor(INK_BASE_STRENGTH * 10)
    }
  }

  /** Very light ink so a hovering cursor glows without washing the page out. */
  const HOVER_STRENGTH = 0.012
  const HOVER_RADIUS_SCALE = 0.4
  let hoverColorAt = 0
  let hoverColor = inkColor(HOVER_STRENGTH)

  function applyInputs(elapsed: number): void {
    if (pointer.moved) {
      pointer.moved = false
      splat(
        pointer.texcoordX,
        pointer.texcoordY,
        pointer.deltaX * config.SPLAT_FORCE,
        pointer.deltaY * config.SPLAT_FORCE,
        pointer.color,
      )
      return
    }
    if (!hovering || pointer.down) return
    if (elapsed - hoverColorAt > 600) {
      hoverColorAt = elapsed
      hoverColor = inkColor(HOVER_STRENGTH)
    }
    splat(pointer.texcoordX, pointer.texcoordY, 0, 0, hoverColor, config.SPLAT_RADIUS * HOVER_RADIUS_SCALE)
  }

  function update(): void {
    if (!running) return
    rafId = requestAnimationFrame(update)

    const dt = calcDeltaTime()
    if (resizeCanvas()) initFramebuffers()

    if (waveQueue.length > 0) {
      multipleSplats(waveQueue.shift() as number)
    }

    const elapsed = performance.now()

    updateInk()
    applyInputs(elapsed)
    applyAutoCursor(elapsed, dt)

    if (!config.PAUSED) step(dt)
    render(null)
  }

  /* ---------------- lifecycle ---------------- */

  const handleVisibility = () => {
    running = !document.hidden
    if (running) {
      lastUpdateTime = performance.now()
      rafId = requestAnimationFrame(update)
    } else if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = 0
    }
  }

  const handleResize = () => {
    if (resizeCanvas()) initFramebuffers()
  }

  document.addEventListener('visibilitychange', handleVisibility)
  window.addEventListener('resize', handleResize)

  // Initial sizing + load burst, then run.
  resizeCanvas()
  initFramebuffers()
  multipleSplats(BURST_SPLATS)
  waveQueue = Array.from({ length: BURST_WAVES }, () => 10 + Math.random() * 10)

  autoX = 0.5
  autoY = 0.5
  update()

  return function destroy(): void {
    running = false
    if (rafId) cancelAnimationFrame(rafId)
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerdown', handlePointerDown)
    window.removeEventListener('pointerup', handlePointerUp)
    window.removeEventListener('pointerleave', handlePointerLeave)
    window.removeEventListener('blur', handlePointerUp)
    document.removeEventListener('visibilitychange', handleVisibility)
    window.removeEventListener('resize', handleResize)

    try {
      deleteFBO(dye.read)
      deleteFBO(dye.write)
      deleteFBO(velocity.read)
      deleteFBO(velocity.write)
      deleteFBO(pressure.read)
      deleteFBO(pressure.write)
      deleteFBO(divergence)
      deleteFBO(curl)
      ;[
        copyProgram,
        clearProgram,
        splatProgram,
        advectionProgram,
        divergenceProgram,
        curlProgram,
        vorticityProgram,
        pressureProgram,
        gradientSubtractProgram,
        displayProgram,
      ].forEach((program) => context.deleteProgram(program.program))
    } catch {
      // Resources may already be gone if the context was lost.
    }
  }
}
