interface SectionHeadingProps {
  label?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export default function SectionHeading({
  label,
  title,
  description,
  align = 'center',
}: SectionHeadingProps) {
  const isCenter = align === 'center'

  return (
    <div
      data-animate="fade-up"
      className={`mb-16 md:mb-20 ${isCenter ? 'text-center' : 'text-left'}`}
    >
      {label && (
        <div className={`mb-3.5 ${isCenter ? 'flex justify-center' : ''}`}>
          <span className="editorial-pill font-mono">
            {label}
          </span>
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-4">
        {title}
      </h2>

      {description && (
        <p className={`text-base sm:text-lg text-slate-600 dark:text-slate-400 font-sans leading-relaxed ${
          isCenter ? 'max-w-2xl mx-auto' : 'max-w-2xl'
        }`}>
          {description}
        </p>
      )}
    </div>
  )
}
