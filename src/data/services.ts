import { Search, Code2, PenTool, FileText, GraduationCap } from 'lucide-react'

export const services = [
  {
    id: 'research-analysis',
    name: 'Research & Needs Analysis',
    tagline: 'Understanding root problems before writing a single line of code.',
    icon: Search,
    deliverables: ['Stakeholder Needs Analysis Report', 'Feasibility Assessment', 'Functional & Non-Functional Requirements Specification'],
    details: [
      'Problem framing & operational discovery',
      'Stakeholder interviews & user workflow research',
      'Market review & technological feasibility analysis',
      'Requirements engineering (FR & NFR matrices)',
      'Data-driven evaluation & architecture trade-offs',
      'Risk modeling & constraint identification'
    ]
  },
  {
    id: 'software-development',
    name: 'Custom Software Development',
    tagline: 'Engineered web platforms, APIs, and scalable production systems.',
    icon: Code2,
    deliverables: ['Production-Grade Software', 'Documented REST/GraphQL APIs', 'Scalable Database Schemas'],
    details: [
      'Custom web platforms & enterprise portals',
      'Full-stack applications & microservices',
      'Database architecture & relational modeling',
      'Integration with existing operational tools & APIs',
      'Automated testing suites & CI/CD workflows',
      'High-performance backend systems'
    ]
  },
  {
    id: 'system-ux-design',
    name: 'System Architecture & UX Design',
    tagline: 'Map user journeys alongside the architecture that supports them.',
    icon: PenTool,
    deliverables: ['Interactive High-Fidelity Prototype', 'Design System & Component Library', 'System Architecture Diagram'],
    details: [
      'Information architecture & state machine mapping',
      'Wireframing & user journey orchestration',
      'Interactive design systems & UI component kits',
      'Usability testing & feedback validation',
      'Responsive design across viewport spectrums',
      'Accessibility & WCAG compliance audits'
    ]
  },
  {
    id: 'technical-documentation',
    name: 'Technical Writing & Documentation',
    tagline: 'Specifications and operating guides that preserve how the system works.',
    icon: FileText,
    deliverables: ['Comprehensive System Specification', 'Interactive API Reference', 'Operational Runbooks & SOPs'],
    details: [
      'Formal software requirements specifications (SRS)',
      'API documentation & schema definitions (OpenAPI/Swagger)',
      'Infrastructure runbooks & deployment manuals',
      'User guides & administrative manuals',
      'Data flow diagrams & entity relationship blueprints',
      'Audit-ready technical handoff documentation'
    ]
  },
  {
    id: 'training-transfer',
    name: 'Training & Knowledge Transfer',
    tagline: 'Prepare internal teams to run, maintain, and extend the system.',
    icon: GraduationCap,
    deliverables: ['Hands-on Training Workshops', 'Recorded Video Walkthroughs', 'Team Onboarding Roadmap'],
    details: [
      'Structured technical handoff to in-house engineers',
      'Administrative & end-user training sessions',
      'Operational guidelines & troubleshooting guides',
      'Best practice mentoring & code walkthroughs',
      'Post-deployment advisory & stabilization support',
      'Continuous maintenance & evolution roadmaps'
    ]
  }
]
