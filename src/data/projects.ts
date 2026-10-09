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
    title: 'Nilaveli Happy Cabs',
    clientContext: 'Travel, private rides, and island tours in Nilaveli, Sri Lanka.',
    category: 'Travel Website',
    problem: 'Travelers need a clear way to explore local transport and tour services and contact the team to arrange a ride.',
    researchFindings: 'The live website brings together private rides, island-wide tours, fleet information, service coverage, and direct contact options.',
    requirements: [
      'Present local rides and island tours clearly',
      'Make phone and WhatsApp contact easy to find',
      'Show fleet and service coverage information',
      'Keep the experience readable on mobile devices'
    ],
    deliverables: [
      'Travel and transport website',
      'Ride and tour service presentation',
      'Fleet and coverage information',
      'Direct contact links'
    ],
    technologies: ['Travel', 'Tours', 'Sri Lanka'],
    outcome: 'The live site gives visitors a direct path to review local ride and tour services and contact Nilaveli Happy Cabs.',
    link: 'https://nilavelihappycabs.com',
    image: '/projects/nilaveli-happy-cabs.png'
  },
  {
    id: 2,
    title: 'Zenvesture Clothings',
    clientContext: 'Online fashion storefront featuring abayas and clothing collections.',
    category: 'E-commerce',
    problem: 'Customers need a polished online storefront where they can discover clothing collections and explore products.',
    researchFindings: 'The live storefront highlights collections and abayas through a fashion-led shopping experience.',
    requirements: [
      'Create a clear, fashion-focused storefront',
      'Make collections and abayas easy to discover',
      'Present product imagery prominently',
      'Support browsing across desktop and mobile'
    ],
    deliverables: [
      'Clothing storefront',
      'Collection and product presentation',
      'Responsive shopping experience',
      'Brand-led visual design'
    ],
    technologies: ['Fashion', 'Online Store', 'Clothing'],
    outcome: 'The live website presents Zenvesture collections in a dedicated online storefront.',
    link: 'https://zenvesture.com',
    image: '/projects/zenvesture-clothings.png'
  },
  {
    id: 3,
    title: 'Dreamwoods Studio',
    clientContext: 'Creative production studio based in Dubai, UAE.',
    category: 'Creative Studio',
    problem: 'Brands looking for creative production need a clear view of a studio’s work, services, and approach before making an inquiry.',
    researchFindings: 'The studio website introduces Dreamwoods, its creative production services, and its team through a cinematic, portfolio-led experience.',
    requirements: [
      'Introduce the studio and its creative work',
      'Present production services clearly',
      'Use a visual identity suited to a creative studio',
      'Provide a clear path for prospective clients to make contact'
    ],
    deliverables: [
      'Creative studio website',
      'Studio and service presentation',
      'Portfolio-led visual experience',
      'Client inquiry entry point'
    ],
    technologies: ['Creative Studio', 'Video Production', '3D Animation'],
    outcome: 'The live website presents Dreamwoods as a Dubai-based creative studio and gives prospective clients a way to explore its work and services.',
    link: 'https://dreamwoods.ae/',
    image: '/projects/dreamwoods-studio.svg'
  },
  {
    id: 4,
    title: 'SMART POS System',
    clientContext: 'Point-of-sale system for day-to-day business sales operations.',
    category: 'Business Systems',
    problem: 'Businesses need a straightforward way to handle sales through a point-of-sale system.',
    researchFindings: 'The project focuses on a clear point-of-sale interface designed around common in-store sales tasks.',
    requirements: [
      'Keep the checkout flow clear and easy to follow',
      'Present sales items and order totals in one view',
      'Provide a focused interface for point-of-sale tasks',
      'Design the system to work across common screen sizes'
    ],
    deliverables: [
      'SMART POS system',
      'Point-of-sale interface',
      'Sales workflow design',
      'Responsive system preview'
    ],
    technologies: ['Point of Sale', 'Retail', 'Business Software'],
    outcome: 'SMART POS is presented as a focused system concept for everyday point-of-sale operations.',
    image: '/projects/smart-pos.svg'
  }
]
