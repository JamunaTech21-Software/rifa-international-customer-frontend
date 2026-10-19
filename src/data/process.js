import {
  BookUser,
  ClipboardList,
  FileUser,
  Phone,
  Plane,
  Presentation,
  Search,
  Stethoscope,
  Users,
} from 'lucide-react'

/**
 * Recruitment process steps used on several pages.
 *
 * @typedef {{
 *   icon: import('lucide-react').LucideIcon,
 *   title: string,
 *   text?: string,
 *   tone?: 'blue' | 'green' | 'purple' | 'orange' | 'teal' | 'red',
 *   imageKey?: string,
 * }} ProcessStep
 */

/** Recruitment Process page — 7 colour-coded cards with photos. @type {ProcessStep[]} */
export const steps7 = [
  {
    icon: ClipboardList,
    title: 'Apply Online',
    text: 'Fill out the online application form and upload required documents.',
    tone: 'blue',
    imageKey: 'process.apply-online',
  },
  {
    icon: Users,
    title: 'Screening & Shortlisting',
    text: 'Our team reviews your application and shortlisted candidates are contacted for the next step.',
    tone: 'green',
    imageKey: 'process.screening',
  },
  {
    icon: FileUser,
    title: 'Interview & Employer Selection',
    text: 'You will attend an interview (online/offline) with the approved Malaysian employer.',
    tone: 'purple',
    imageKey: 'process.interview',
  },
  {
    icon: Stethoscope,
    title: 'Medical Checkup',
    text: 'Selected candidates will undergo a medical examination at an authorized medical center.',
    tone: 'orange',
    imageKey: 'process.medical',
  },
  {
    icon: BookUser,
    title: 'Visa Processing',
    text: 'We process the work visa and complete all required documentation with BMET clearance.',
    tone: 'blue',
    imageKey: 'process.visa',
  },
  {
    icon: Presentation,
    title: 'Pre-Departure Orientation',
    text: 'You will receive pre-departure briefing on work culture, rules, safety and other important information.',
    tone: 'green',
    imageKey: 'process.orientation',
  },
  {
    icon: Plane,
    title: 'Departure to Malaysia',
    text: 'After final clearance, you will fly to Malaysia and start your new journey to a better future.',
    tone: 'red',
    imageKey: 'process.departure',
  },
]

/** Apply page — 6 icon steps with a short line under each. @type {ProcessStep[]} */
export const steps6 = [
  { icon: ClipboardList, title: 'Apply Online', text: '(Fill the Form)' },
  { icon: Search, title: 'Screening & Shortlisting' },
  { icon: Phone, title: 'Interview', text: '(Online / Physical)' },
  { icon: Stethoscope, title: 'Medical Checkup' },
  { icon: BookUser, title: 'Visa Processing & BMET Clearance' },
  { icon: Plane, title: 'Departure to Malaysia' },
]

/** Malaysia Jobs sidebar — 5 compact icon steps, titles only. @type {ProcessStep[]} */
export const steps5 = [
  { icon: ClipboardList, title: 'Apply Online' },
  { icon: Users, title: 'Screening & Interview' },
  { icon: Stethoscope, title: 'Medical Checkup' },
  { icon: BookUser, title: 'Visa Processing' },
  { icon: Plane, title: 'Departure to Malaysia' },
]
