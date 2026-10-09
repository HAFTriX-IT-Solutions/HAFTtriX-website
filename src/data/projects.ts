export interface ProjectCaseStudy {
  id: number
  title: string
  clientContext: string
  category: string
  problem: string
  researchFindings: string
  requirements: string[]
  deliverables: string[]
  technologies: string[]
  outcome: string
  link?: string
  github?: string
  image?: string
}

export const projects: ProjectCaseStudy[] = [
  {
    id: 1,
    title: 'Hospitality Reservation & Resource Planning',
    clientContext: 'Illustrative context: a small resort group managing bookings across several properties.',
    category: 'Full-Stack Systems',
    problem: 'Reservations arrive through phone, email, and third-party booking channels. Staff reconcile room availability by hand, so a late update can leave two guests assigned to the same room.',
    researchFindings: 'Discovery would trace how reservations move between reception, housekeeping, and management, then compare that workflow with the available booking data and channel rules.',
    requirements: [
      'A shared availability record with clear conflict handling',
      'A front-desk view for reservations, room assignment, and billing',
      'Guest itinerary and confirmation generation',
      'A low-connectivity workflow for essential front-desk tasks'
    ],
    deliverables: [
      'Needs analysis and booking workflow report',
      'Interactive desktop and mobile prototype',
      'Reservation and housekeeping system specification',
      'Staff guide and administrator runbook'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    outcome: 'The proposed system would give staff one place to review availability and booking changes. A pilot would measure reservation conflicts and check-in time against an agreed baseline.'
  },
  {
    id: 2,
    title: 'Distributed Inventory & Point of Sale',
    clientContext: 'Illustrative context: a regional retailer operating stores and a central warehouse.',
    category: 'Operational Systems',
    problem: 'Branch teams maintain stock records in separate spreadsheets. Reconciliation takes time, and managers cannot easily tell whether a mismatch came from a sale, transfer, or delayed update.',
    researchFindings: 'Needs analysis would follow a stock item through receiving, sale, return, and transfer, including the devices and network conditions used at each branch.',
    requirements: [
      'A shared item catalogue and branch-level stock ledger',
      'Fast barcode lookup and receipt printing',
      'Reorder suggestions with manager review',
      'A reconciliation view that explains each stock movement'
    ],
    deliverables: [
      'Branch workflow and needs analysis report',
      'Hardware and connectivity feasibility review',
      'Data model and system architecture specification',
      'Prototype and rollout training materials'
    ],
    technologies: ['React', 'Electron', 'Node.js', 'PostgreSQL'],
    outcome: 'The design would make stock changes traceable across branches. Reconciliation time and stock accuracy could then be measured during a staged rollout.'
  },
  {
    id: 3,
    title: 'Clinical Laboratory Results Workflow',
    clientContext: 'Illustrative context: a diagnostic laboratory coordinating analyzer output and clinician review.',
    category: 'Research & Data Systems',
    problem: 'Staff copy analyzer results into report templates and notify clinicians through separate channels. The handoffs make it difficult to see which results are ready for review.',
    researchFindings: 'Discovery would map the result lifecycle with laboratory staff, document analyzer data formats, and identify the review and retention rules the system must follow.',
    requirements: [
      'A documented import format for supported analyzer data',
      'A review queue with named approval steps',
      'A clinician-facing results view with role-based access',
      'An audit record for edits and release decisions'
    ],
    deliverables: [
      'Clinical workflow and stakeholder needs report',
      'Analyzer integration feasibility assessment',
      'Requirements specification and data flow diagrams',
      'Prototype, operator guide, and training plan'
    ],
    technologies: ['React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL'],
    outcome: 'A single review queue could reduce repeated data entry and clarify ownership at each handoff. Validation would compare processing time and correction rates with the laboratory’s baseline.'
  },
  {
    id: 4,
    title: 'Learning & Assessment Platform',
    clientContext: 'Illustrative context: a training institution with modular coursework and students using varied devices.',
    category: 'Web Platforms',
    problem: 'The institution needs practical coursework, flexible assessment rubrics, and access for students whose connection or device may be limited.',
    researchFindings: 'Research would examine course preparation, instructor marking, student device use, and the materials learners need when they are offline.',
    requirements: [
      'Course modules with downloadable learning materials',
      'Configurable assessment rubrics and instructor feedback',
      'A responsive student view for low-bandwidth connections',
      'A record of grades, completion, and issued certificates'
    ],
    deliverables: [
      'Student and instructor needs analysis',
      'Course and assessment workflow prototype',
      'Platform requirements and architecture plan',
      'Faculty guide and student onboarding materials'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Progressive Web App'],
    outcome: 'The platform could bring coursework and feedback into one place while keeping essential materials available offline. A pilot would assess access, completion, and instructor workload.'
  },
  {
    id: 5,
    title: 'Produce Planning & Shipment Analysis',
    clientContext: 'Illustrative context: an agricultural cooperative coordinating collection, storage, and export.',
    category: 'Data & Analytics',
    problem: 'Harvest estimates, storage availability, and freight dates sit in separate records. Planners have little time to compare a changing harvest plan with shipment capacity.',
    researchFindings: 'A feasibility study would assess the quality and history of harvest, storage, and shipping data before deciding which forecasts can be supported.',
    requirements: [
      'A shared view of expected harvest and storage capacity',
      'Planning scenarios based on documented assumptions',
      'A shipment timeline linked to produce batches',
      'A mobile workflow for field collection updates'
    ],
    deliverables: [
      'Data quality and feasibility report',
      'Forecasting assumptions and model specification',
      'Planning dashboard prototype and API contract',
      'Field and logistics team user guide'
    ],
    technologies: ['Python', 'Pandas', 'React', 'FastAPI', 'PostgreSQL'],
    outcome: 'A shared planning view could help teams compare supply with storage and shipment capacity. Forecast accuracy would be reported against agreed historical data.'
  },
  {
    id: 6,
    title: 'Municipal Service Request Portal',
    clientContext: 'Illustrative context: a local administration receiving service requests across several departments.',
    category: 'Public Sector Platforms',
    problem: 'Residents submit requests in person and have limited visibility after handoff. Staff need a consistent way to route each request and report its status.',
    researchFindings: 'Stakeholder research would document resident access needs, department responsibilities, language requirements, and the existing steps from submission to resolution.',
    requirements: [
      'A mobile-friendly form with language support',
      'Department routing based on request type and service area',
      'Status updates residents can check without returning in person',
      'A staff dashboard for workload and request history'
    ],
    deliverables: [
      'Resident and staff needs assessment',
      'Service routing and status workflow diagram',
      'Portal prototype and requirements specification',
      'Department operations guide and handoff session'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    outcome: 'The portal could make request ownership and status visible to residents and staff. A phased launch would track response time, routing accuracy, and accessibility feedback.'
  }
]
