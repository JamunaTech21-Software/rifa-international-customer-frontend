/**
 * Every photo used on the site, by key. Values are Cloudinary public IDs (e.g. "rifa/hero/home")
 * or local paths ("/images/hero-home.jpg"). Empty string = CloudinaryImage shows a placeholder gradient.
 * Pages reference keys only: <CloudinaryImage publicId={image('hero.home')} … />
 *
 * TEMPORARY: "/images/ref/*" files are low-resolution crops from the reference designs in /doc.
 * Replace them with the real photos (Cloudinary IDs) before launch.
 */
const REF = '/images/ref'

export const images = {
  // Page heroes
  'hero.home': `${REF}/hero-home.jpg`, // two workers in hard hats facing the Petronas Towers
  'hero.about': `${REF}/hero-about.jpg`, // Rifa office reception with logo wall
  'hero.malaysia-jobs': `${REF}/hero-malaysia-jobs.jpg`, // group of workers with KL skyline
  'hero.recruitment-process': `${REF}/hero-recruitment-process.jpg`, // smiling worker + team, KL skyline
  'hero.contact': `${REF}/hero-contact.jpg`, // worker + team, KL skyline, Malaysian flag
  'hero.apply': `${REF}/hero-apply.jpg`, // smiling worker in hard hat, flag and KL skyline
  'hero.apply-success': `${REF}/hero-apply-success.jpg`, // Petronas Towers (page background)
  'hero.services': '',
  'hero.job-seekers': '',
  'hero.employers': '',
  'hero.news': '',
  'hero.career': '',
  'hero.faq': '',

  // Job categories
  'category.construction': `${REF}/category-construction.jpg`,
  'category.factory-manufacturing': `${REF}/category-factory-manufacturing.jpg`,
  'category.plantation-agriculture': `${REF}/category-plantation-agriculture.jpg`,
  'category.hospitality': `${REF}/category-hospitality.jpg`,
  'category.cleaning-service': `${REF}/category-cleaning-service.jpg`,
  'category.logistics-warehouse': `${REF}/category-logistics-warehouse.jpg`,

  // Job listings (the last six reuse the closest reference photo until real ones exist)
  'job.construction-worker': `${REF}/job-construction-worker.jpg`,
  'job.production-operator': `${REF}/job-production-operator.jpg`,
  'job.palm-oil-plantation-worker': `${REF}/job-palm-oil-plantation-worker.jpg`,
  'job.kitchen-helper': `${REF}/job-kitchen-helper.jpg`,
  'job.cleaning-staff': `${REF}/job-cleaning-staff.jpg`,
  'job.warehouse-assistant': `${REF}/job-warehouse-assistant.jpg`,
  'job.scaffolder': `${REF}/job-construction-worker.jpg`,
  'job.machine-operator': `${REF}/job-production-operator.jpg`,
  'job.farm-worker': `${REF}/job-palm-oil-plantation-worker.jpg`,
  'job.housekeeping-attendant': `${REF}/category-hospitality.jpg`,
  'job.office-cleaner': `${REF}/job-cleaning-staff.jpg`,
  'job.forklift-driver': `${REF}/job-warehouse-assistant.jpg`,

  // Recruitment process steps
  'process.apply-online': `${REF}/process-apply-online.jpg`,
  'process.screening': `${REF}/process-screening.jpg`,
  'process.interview': `${REF}/process-interview.jpg`,
  'process.medical': `${REF}/process-medical.jpg`,
  'process.visa': `${REF}/process-visa.jpg`,
  'process.orientation': `${REF}/process-orientation.jpg`,
  'process.departure': `${REF}/process-departure.jpg`,

  // About page
  'about.banner': `${REF}/about-banner.jpg`, // workers + skyline banner
  'about.bmet-logo': `${REF}/about-bmet-logo.jpg`,
  'about.baira-logo': `${REF}/about-baira-logo.jpg`,

  // Contact page
  'contact.building': `${REF}/contact-building.jpg`, // office building exterior, "62 Road 15"
  'contact.reception': `${REF}/contact-reception.jpg`, // office reception with Rifa logo
  'contact.meeting-room': `${REF}/contact-meeting-room.jpg`,

  // Shared
  'help.agent': `${REF}/help-agent.jpg`, // support agent with headset (Need Help box)
  'malaysia.skyline': `${REF}/malaysia-skyline.jpg`, // "Why Work in Malaysia?" card background
  'documents.passport': `${REF}/documents-passport.jpg`, // Bangladesh passport (Required Documents card)
}

/**
 * Stand-in photos whose handwritten tagline is part of the image itself. PageHero must not draw its
 * `script` text over these, or the tagline would appear twice. Remove keys once real photos are in.
 */
export const imagesWithBakedTagline = new Set(['hero.recruitment-process', 'hero.contact'])

/** Returns the image source for a key ('' if unknown or not uploaded yet). */
export function image(key) {
  return images[key] ?? ''
}
