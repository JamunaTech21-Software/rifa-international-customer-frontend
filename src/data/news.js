/**
 * News & Updates articles. PLACEHOLDER COPY — the client has not supplied real articles yet;
 * replace or add items here only. Newest first. `body` is an array of paragraphs.
 *
 * @typedef {{
 *   slug: string,
 *   title: string,
 *   date: string,
 *   excerpt: string,
 *   imageKey: string,
 *   body: string[],
 * }} NewsItem
 */

/** @type {NewsItem[]} */
export const news = [
  {
    slug: 'new-job-openings-in-malaysia',
    title: 'New Job Openings in Malaysia',
    date: '2026-10-12',
    excerpt: 'Fresh opportunities are now open in construction, manufacturing and hospitality.',
    imageKey: 'hero.malaysia-jobs',
    body: [
      'Rifa International (RL-693) has new job openings in Malaysia across construction, factory and manufacturing, plantation, hospitality, cleaning and logistics.',
      'Interested candidates can browse the latest jobs on our Malaysia Jobs page and apply online. Our team will review every application and contact shortlisted candidates about the next steps.',
      'Please remember that we do not charge any fee for online applications.',
    ],
  },
  {
    slug: 'beware-of-fraud-agents',
    title: 'Beware of Fraud Agents',
    date: '2026-09-28',
    excerpt: 'We never charge for online applications. Contact us only through our official numbers.',
    imageKey: 'hero.about',
    body: [
      'We have learned that some people may be using the name of recruiting agencies to ask workers for money. Rifa International (RL-693) does not charge any fee for online application.',
      'Always confirm any offer through our official phone numbers, WhatsApp and email listed on the Contact Us page. If you are unsure, call our office before you share documents or make any payment.',
    ],
  },
  {
    slug: 'how-to-prepare-your-documents',
    title: 'How to Prepare Your Documents',
    date: '2026-09-10',
    excerpt: 'A simple checklist to help you get ready before you apply.',
    imageKey: 'hero.apply',
    body: [
      'Having your documents ready makes the process faster. You will need a valid passport with at least 18 months before it expires, a copy of your NID, a recent passport-size photo and your educational certificate if it applies.',
      'If you do not have a passport yet, you can still apply and tell us that you will apply for one soon. Our team will guide you on the next steps.',
    ],
  },
]

/** The article with this slug, or undefined. @param {string} slug */
export function getNews(slug) {
  return news.find((item) => item.slug === slug)
}
