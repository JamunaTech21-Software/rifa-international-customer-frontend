/**
 * Company details, contact info and navigation — the single source of truth.
 * Components must read these values from here; never type contact details into JSX.
 *
 * @typedef {{ label: string, to: string }} NavLink
 */

const mapQuery = encodeURIComponent('House 62, Road 15, Block C, Banani, Dhaka 1213, Bangladesh')

// Replace '#' with the real page URLs when the client provides them.
const social = {
  facebook: '#',
  linkedin: '#',
  youtube: '#',
}

export const site = {
  name: 'Rifa International',
  licence: 'RL-693',
  tagline: 'Your Global Career Partner',
  description:
    'Rifa International (RL-693) is a government approved recruiting agency helping Bangladeshi workers build a brighter future in Malaysia and other countries.',

  phone: '+880 1990-359053',
  phoneHref: 'tel:+8801990359053',
  whatsapp: '01968522872',
  whatsappHref: 'https://wa.me/8801968522872',
  email: 'info@rifaint.com',
  emailHref: 'mailto:info@rifaint.com',

  address: 'House 62 (4th Floor), Road 15, Block-C, Banani, Dhaka-1213, Bangladesh',
  addressShort: 'House 62 (4th Floor), Road 15, Block-C, Banani, Dhaka-1213',
  hours: 'Sunday - Thursday, 10:00 AM – 7:00 PM',
  hoursDays: 'Sunday - Thursday',
  hoursTime: '10:00 AM – 7:00 PM',
  hoursNote: 'Friday & Saturday Closed',

  social,
  socialLinks: [
    { network: 'facebook', label: 'Facebook', href: social.facebook },
    { network: 'linkedin', label: 'LinkedIn', href: social.linkedin },
    { network: 'youtube', label: 'YouTube', href: social.youtube },
  ],

  mapEmbedUrl: `https://www.google.com/maps?q=${mapQuery}&z=16&output=embed`,
  mapLink: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,

  accreditations: 'Govt. Licence No. RL-693 · BMET Approved · BAIRA Member',
}

/** Main header navigation (desktop bar and mobile menu). @type {NavLink[]} */
export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Malaysia Jobs', to: '/malaysia-jobs' },
  { label: 'Our Services', to: '/services' },
  { label: 'Recruitment Process', to: '/recruitment-process' },
  { label: 'For Job Seekers', to: '/job-seekers' },
  { label: 'For Employers', to: '/employers' },
  { label: 'News & Updates', to: '/news' },
  { label: 'Contact Us', to: '/contact' },
]

/** Footer "Quick Links" column. @type {NavLink[]} */
export const footerLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Malaysia Jobs', to: '/malaysia-jobs' },
  { label: 'Our Services', to: '/services' },
  { label: 'Recruitment Process', to: '/recruitment-process' },
  { label: 'News & Updates', to: '/news' },
  { label: 'Career', to: '/career' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact Us', to: '/contact' },
]
