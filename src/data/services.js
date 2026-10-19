import {
  BadgeCheck,
  FileCheck,
  Globe,
  HeartHandshake,
  Plane,
  Presentation,
  Stethoscope,
  UserCheck,
} from 'lucide-react'

/**
 * Services shown on the Our Services page.
 * PLACEHOLDER COPY — the client has not supplied the final wording yet; replace the text here only.
 *
 * @typedef {{ icon: import('lucide-react').LucideIcon, title: string, text: string }} Service
 */

/** @type {Service[]} */
export const services = [
  {
    icon: Globe,
    title: 'Overseas Recruitment',
    text: 'We connect skilled and unskilled workers with trusted employers in Malaysia and other countries.',
  },
  {
    icon: UserCheck,
    title: 'Candidate Screening & Selection',
    text: 'Applications are reviewed carefully so the right candidates are shortlisted for each job.',
  },
  {
    icon: FileCheck,
    title: 'Documentation & Visa Processing',
    text: 'We prepare your documents and handle the work visa process from start to finish.',
  },
  {
    icon: BadgeCheck,
    title: 'BMET Registration & Clearance',
    text: 'We complete your BMET registration and clearance so your departure is fully legal.',
  },
  {
    icon: Stethoscope,
    title: 'Medical Arrangement',
    text: 'We arrange your medical checkup at an authorized medical center for a smooth process.',
  },
  {
    icon: Presentation,
    title: 'Pre-Departure Orientation',
    text: 'Learn about work culture, rules, safety and life in Malaysia before you travel.',
  },
  {
    icon: Plane,
    title: 'Air Ticketing & Travel Support',
    text: 'We help with your flight booking and travel arrangements for a comfortable journey.',
  },
  {
    icon: HeartHandshake,
    title: 'Post-Arrival Support',
    text: 'Our team stays in touch to support you and answer your questions after you arrive.',
  },
]
