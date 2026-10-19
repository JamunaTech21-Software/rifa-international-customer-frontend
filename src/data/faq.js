/**
 * Frequently asked questions. PLACEHOLDER COPY — the client has not supplied the final wording yet;
 * replace the text here only.
 *
 * group    — heading on the FAQ page: one of FAQ_GROUPS.
 * category — which other page also shows the question ('job-seekers' → For Job Seekers page).
 *
 * @typedef {{ group: string, category?: string, question: string, answer: string }} Faq
 */

/** Order of the groups on the FAQ page. */
export const FAQ_GROUPS = ['Application', 'Documents', 'Fees', 'Process', 'Employers']

/** @type {Faq[]} */
export const faqs = [
  // ---- Application
  {
    group: 'Application',
    category: 'job-seekers',
    question: 'Who can apply, and do I need experience?',
    answer:
      'Applicants must be at least 18 years old; most jobs prefer 18 to 45 years, but this varies by job. Many jobs do not require experience, while some need specific skills. The job details will tell you what is required.',
  },
  {
    group: 'Application',
    question: 'How do I apply for a job in Malaysia?',
    answer:
      'Open the Apply Now page, fill out the online application form and upload your documents. Our recruitment team will review your application and contact you if you are shortlisted.',
  },
  {
    group: 'Application',
    question: 'Can I apply for more than one job category?',
    answer:
      'You choose one preferred job category on the form. If you are interested in another category, you can mention it when our team contacts you or send us a message through the Contact Us page.',
  },
  // ---- Documents
  {
    group: 'Documents',
    category: 'job-seekers',
    question: 'Do I need a passport to apply?',
    answer:
      'You can apply with a valid passport, or tell us that you will apply for one soon. A valid passport (with at least 18 months before it expires) is needed before your visa can be processed.',
  },
  {
    group: 'Documents',
    question: 'Which documents do I need to upload?',
    answer:
      'A copy of your passport if you have one, and optionally your CV. Later in the process you may also need your NID copy, a recent passport-size photo and your educational certificate, if it applies.',
  },
  {
    group: 'Documents',
    question: 'What file types and sizes can I upload?',
    answer:
      'You can upload PDF, JPG or PNG files of up to 5 MB each. If your file is larger, please reduce its size or take a clearer, smaller photo of the document.',
  },
  // ---- Fees
  {
    group: 'Fees',
    category: 'job-seekers',
    question: 'Do I have to pay any fee to apply online?',
    answer:
      'No. Rifa International (RL-693) does not charge any fee for online application. Please be careful of anyone who asks for money to submit your application, and only contact us through our official numbers.',
  },
  {
    group: 'Fees',
    question: 'How can I check that an agent is genuine?',
    answer:
      'We are a government approved recruiting agency (licence RL-693). Always confirm offers through our official phone, WhatsApp and email on the Contact Us page, and never pay anyone who contacts you from another number.',
  },
  // ---- Process
  {
    group: 'Process',
    category: 'job-seekers',
    question: 'How long does the whole process take?',
    answer:
      'The process usually takes 4–8 weeks, depending on the employer and visa approval. Our team will keep you informed at each step.',
  },
  {
    group: 'Process',
    question: 'What happens after I submit my application?',
    answer:
      'You will see a reference number. Our team reviews your information and documents, and shortlisted candidates are contacted for an interview. You can read all the steps on the Recruitment Process page.',
  },
  {
    group: 'Process',
    question: 'Will I get a medical checkup and orientation?',
    answer:
      'Yes. Selected candidates have a medical checkup at an authorized medical center and receive a pre-departure orientation about work culture, rules and safety before they travel.',
  },
  // ---- Employers
  {
    group: 'Employers',
    question: 'How can employers hire workers through Rifa International?',
    answer:
      'Contact our team through the Contact Us page and choose “Employer Partnership”. We will discuss your requirements and guide you through the demand letter, approval and selection steps.',
  },
  {
    group: 'Employers',
    question: 'Which sectors do you supply workers for?',
    answer:
      'Construction, factory and manufacturing, plantation and agriculture, hospitality, cleaning and services, and logistics and warehouse.',
  },
]

/** FAQs also shown on another page. @param {string} category */
export function faqsFor(category) {
  return faqs.filter((faq) => faq.category === category)
}

/** FAQs for one FAQ page group. @param {string} group */
export function faqsInGroup(group) {
  return faqs.filter((faq) => faq.group === group)
}
