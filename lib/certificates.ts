export type CertCategory = 'Awards & Research' | 'Internships' | 'Cybersecurity' | 'Courses' | 'Events & Community'

export type Certificate = {
  title: string
  issuer: string
  date: string
  category: CertCategory
  /** Preview image under /public/certificates */
  image: string
  /** Original PDF, if the certificate was issued as one */
  pdf?: string
  featured?: boolean
}

const c = (file: string) => `/certificates/${file}`

export const certificates: Certificate[] = [
  // Awards & Research
  { title: 'Paper Presentation – IEEE WAMS 2026', issuer: 'IEEE AP-S · B V Raju Institute of Technology', date: 'Jun 2026', category: 'Awards & Research', image: c('ieee-wams-2026-paper-presentation.jpg'), featured: true },
  { title: '1st Prize – SQL Competition 1.0', issuer: 'Dept. of IT, AITAM · Institution Innovation Council', date: 'Jun 2024', category: 'Awards & Research', image: c('sql-competition-1.0-winner.jpg'), featured: true },
  { title: 'Certificate of Excellence – Best Student, Level-1 Hackathon', issuer: 'Supraja Technologies · Student Activity Center', date: 'Oct 2024', category: 'Awards & Research', image: c('excellence-certificate-sac-1.jpg'), featured: true },

  // Internships
  { title: 'Android Developer Virtual Internship', issuer: 'EduSkills · AICTE · Google for Developers', date: 'Apr – Jun 2024', category: 'Internships', image: c('network-security-associate-vp-google-for-developers.jpg') },
  { title: 'Process Mining Virtual Internship', issuer: 'EduSkills · AICTE · Celonis', date: 'Jul – Sep 2024', category: 'Internships', image: c('network-security-associate-vp-supported-by-celonis.jpg') },
  { title: 'Network Security Associate Virtual Internship', issuer: 'EduSkills · AICTE · Fortinet', date: 'Jan – Mar 2024', category: 'Internships', image: c('network-security-associate-vp-eduskills.jpg') },
  { title: 'Network Security Associate Virtual Internship', issuer: 'APSCHE · EduSkills · Fortinet', date: 'Jan – Mar 2024', category: 'Internships', image: c('network-security-associate-vp-completion.jpg') },
  { title: 'Cybersecurity Virtual Internship', issuer: 'EduSkills · AICTE · Palo Alto Networks', date: 'Sep – Nov 2023', category: 'Internships', image: c('cybersecurity-virtual-intertnship.jpg') },
  { title: 'ServiceNow Project – Calculating Family Expenses', issuer: 'SmartInternz · SmartBridge', date: 'Oct 2025', category: 'Internships', image: c('smartinternz-servicenow.jpg'), pdf: c('smartinternz-servicenow.pdf') },
  { title: 'Community Internship', issuer: 'Marripadu Grama Sachivalayam, Srikakulam', date: 'May – Jun 2024', category: 'Internships', image: c('community-internship.jpg') },
  { title: 'Ethical Hacking & Cyber Security Internship Offer', issuer: 'Supraja Technologies', date: 'Oct 2024', category: 'Internships', image: c('offer-letter-3-2-internship-from-supraja-technologies-cybersecurity.jpg') },

  // Cybersecurity
  { title: 'Certified Security Expert (Level-2)', issuer: 'Supraja Technologies · Dept. of IT, AITAM', date: 'Oct 2025', category: 'Cybersecurity', image: c('security-expert-level-2.jpg') },
  { title: 'Certified Security Expert (Level-1)', issuer: 'Supraja Technologies · Student Activity Center', date: 'Oct 2024', category: 'Cybersecurity', image: c('completition-certificate-sac-1.jpg') },
  { title: 'FCF – Getting Started in Cybersecurity 2.0', issuer: 'Fortinet Training Institute', date: 'Feb 2024', category: 'Cybersecurity', image: c('fcf-getting-started-in-cybersecurity-2.0-self-placed.jpg') },

  // Courses
  { title: 'Application Development with AI & Essential Skills', issuer: 'AITAM · Brainovision · AICTE', date: 'Jun 2025', category: 'Courses', image: c('cop-nlw-application-developmentwithai-and-essential-skills.jpg') },
  { title: 'AWS Cloud Computing', issuer: 'AP State Skill Development Corporation', date: 'Jan 2024', category: 'Courses', image: c('aws-cloud-computing.jpg') },
  { title: 'Web Development Using Django', issuer: 'AP State Skill Development Corporation', date: 'Sep 2023', category: 'Courses', image: c('web-development-using-django.jpg') },
  { title: 'Data Structures & Algorithms', issuer: 'GeeksforGeeks · AITAM', date: '2025', category: 'Courses', image: c('gfg-training-data-structures-and-algorithms.jpg') },
  { title: 'Python Course', issuer: 'GeeksforGeeks', date: 'Aug 2024', category: 'Courses', image: c('python-gfg.jpg') },
  { title: 'C Programming Course', issuer: 'Infosys Springboard', date: 'Aug 2023', category: 'Courses', image: c('c-programming.jpg'), pdf: c('c-programming.pdf') },
  { title: 'Productivity Enhancement Tools', issuer: 'AP State Skill Development Corporation', date: 'May 2023', category: 'Courses', image: c('productivity-enhancement-tools.jpg') },

  // Events & Community
  { title: 'Innovation, Design & Entrepreneurship Bootcamp', issuer: 'AICTE · MoE Innovation Cell · GITAM', date: 'Sep 2024', category: 'Events & Community', image: c('ide-bootcamp-gitam.jpg') },
  { title: 'Build-A-Thon Hackathon', issuer: 'Dept. of IT, AITAM', date: 'Jul 2025', category: 'Events & Community', image: c('build-a-thon.jpg') },
  { title: 'YUGMA National Level Oratory Contest', issuer: 'ASTHA School of Management, Bhubaneswar', date: 'Feb 2025', category: 'Events & Community', image: c('yugma-national-level-oratory-contest-participation.jpg') },
  { title: 'SQL Competition 1.0 – Participation', issuer: 'Dept. of IT, AITAM', date: 'Jun 2024', category: 'Events & Community', image: c('sql-competition-1.0-participation.jpg') },
  { title: 'Model G20 Summit', issuer: 'Dept. of IT, AITAM', date: 'Nov 2023', category: 'Events & Community', image: c('model-g20-summit.jpg') },
  { title: 'Republic Day March Past', issuer: 'JNTU Gurajada Vizianagaram', date: 'Jan 2025', category: 'Events & Community', image: c('march-past-jntugv-republic.jpg') },
  { title: 'Independence Day March Past', issuer: 'JNTU Gurajada Vizianagaram', date: 'Aug 2024', category: 'Events & Community', image: c('march-past-jntugv-independence.jpg') },
  { title: 'National Service Scheme (NSS)', issuer: 'AITAM', date: '2023 – 2024', category: 'Events & Community', image: c('nss.jpg') },
  { title: 'ISTE Student Membership', issuer: 'Indian Society for Technical Education', date: '2024 – 2027', category: 'Events & Community', image: c('ap120.jpg'), pdf: c('ap120.pdf') },
  { title: 'CSTA Membership', issuer: 'Computer Science Teachers Association', date: 'Dec 2024', category: 'Events & Community', image: c('csta-membership-card.jpg') },
  { title: 'Certificate of Recognition', issuer: 'MY Bharat · Ministry of Youth Affairs & Sports', date: '', category: 'Events & Community', image: c('certificate-of-recognition-mybharat.jpg') },
]

export const certCategories: CertCategory[] = ['Awards & Research', 'Internships', 'Cybersecurity', 'Courses', 'Events & Community']
