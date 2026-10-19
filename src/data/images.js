/**
 * Every photo used on the site, by key. Values are Cloudinary public IDs (e.g. "rifa/hero/home")
 * or local paths ("/images/hero-home.webp"). Empty string = CloudinaryImage shows a placeholder gradient.
 * Pages reference keys only: <CloudinaryImage publicId={image('hero.home')} … />
 *
 * TEMPORARY: "/images/ref/*" files (WebP) are low-resolution crops from the reference designs in /doc.
 * Replace them with the real photos (Cloudinary IDs) before launch.
 */
const REF = '/images/ref'

export const images = {
  // Page heroes
  'hero.home': `${REF}/hero-home.webp`, // two workers in hard hats facing the Petronas Towers
  'hero.about': `${REF}/hero-about.webp`, // Rifa office reception with logo wall
  'hero.malaysia-jobs': `${REF}/hero-malaysia-jobs.webp`, // group of workers with KL skyline
  'hero.recruitment-process': `${REF}/hero-recruitment-process.webp`, // smiling worker + team, KL skyline
  'hero.contact': `${REF}/hero-contact.webp`, // worker + team, KL skyline, Malaysian flag
  'hero.apply': `${REF}/hero-apply.webp`, // smiling worker in hard hat, flag and KL skyline
  'hero.apply-success': `${REF}/hero-apply-success.webp`, // Petronas Towers (page background)
  'hero.services': `${REF}/hero-malaysia-jobs.webp`, // stand-in until a services photo exists
  'hero.job-seekers': `${REF}/hero-apply.webp`, // stand-in until a job seekers photo exists
  'hero.employers': `${REF}/hero-about.webp`, // stand-in until an employers photo exists
  'hero.news': `${REF}/hero-recruitment-process.webp`, // stand-in until a news photo exists
  'hero.career': `${REF}/hero-about.webp`, // stand-in until a career photo exists
  'hero.faq': `${REF}/hero-contact.webp`, // stand-in until a FAQ photo exists

  // Job categories
  'category.construction': `${REF}/category-construction.webp`,
  'category.factory-manufacturing': `${REF}/category-factory-manufacturing.webp`,
  'category.plantation-agriculture': `${REF}/category-plantation-agriculture.webp`,
  'category.hospitality': `${REF}/category-hospitality.webp`,
  'category.cleaning-service': `${REF}/category-cleaning-service.webp`,
  'category.logistics-warehouse': `${REF}/category-logistics-warehouse.webp`,

  // Job listings (the last six reuse the closest reference photo until real ones exist)
  'job.construction-worker': `${REF}/job-construction-worker.webp`,
  'job.production-operator': `${REF}/job-production-operator.webp`,
  'job.palm-oil-plantation-worker': `${REF}/job-palm-oil-plantation-worker.webp`,
  'job.kitchen-helper': `${REF}/job-kitchen-helper.webp`,
  'job.cleaning-staff': `${REF}/job-cleaning-staff.webp`,
  'job.warehouse-assistant': `${REF}/job-warehouse-assistant.webp`,
  'job.scaffolder': `${REF}/job-construction-worker.webp`,
  'job.machine-operator': `${REF}/job-production-operator.webp`,
  'job.farm-worker': `${REF}/job-palm-oil-plantation-worker.webp`,
  'job.housekeeping-attendant': `${REF}/category-hospitality.webp`,
  'job.office-cleaner': `${REF}/job-cleaning-staff.webp`,
  'job.forklift-driver': `${REF}/job-warehouse-assistant.webp`,

  // Recruitment process steps
  'process.apply-online': `${REF}/process-apply-online.webp`,
  'process.screening': `${REF}/process-screening.webp`,
  'process.interview': `${REF}/process-interview.webp`,
  'process.medical': `${REF}/process-medical.webp`,
  'process.visa': `${REF}/process-visa.webp`,
  'process.orientation': `${REF}/process-orientation.webp`,
  'process.departure': `${REF}/process-departure.webp`,

  // About page
  'about.banner': `${REF}/about-banner.webp`, // workers + skyline banner
  'about.bmet-logo': `${REF}/about-bmet-logo.webp`,
  'about.baira-logo': `${REF}/about-baira-logo.webp`,

  // Contact page
  'contact.building': `${REF}/contact-building.webp`, // office building exterior, "62 Road 15"
  'contact.reception': `${REF}/contact-reception.webp`, // office reception with Rifa logo
  'contact.meeting-room': `${REF}/contact-meeting-room.webp`,

  // Shared
  'help.agent': `${REF}/help-agent.webp`, // support agent with headset (Need Help box)
  'malaysia.skyline': `${REF}/malaysia-skyline.webp`, // "Why Work in Malaysia?" card background
  'documents.passport': `${REF}/documents-passport.webp`, // Bangladesh passport (Required Documents card)
}

/**
 * Stand-in photos whose handwritten tagline is part of the image itself. PageHero must not draw its
 * `script` text over these, or the tagline would appear twice. Remove keys once real photos are in.
 */
export const imagesWithBakedTagline = new Set([
  'hero.home',
  'hero.recruitment-process',
  'hero.contact',
  'about.banner',
])

/** Returns the image source for a key ('' if unknown or not uploaded yet). */
export function image(key) {
  return images[key] ?? ''
}
