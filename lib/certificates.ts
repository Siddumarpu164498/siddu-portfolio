export type CertCategory = 'Cloud & Dev' | 'Cybersecurity' | 'AI & Internships' | 'Competitions' | 'Academic & Community'

export type Certificate = {
  title: string
  issuer: string
  category: CertCategory
  /** Preview image under /public/certificates */
  image: string
  /** Original PDF, if the certificate was issued as one */
  pdf?: string
  highlight?: boolean
}

const c = (file: string) => `/certificates/${file}`

export const certificates: Certificate[] = [
  // Cloud & Development
  { title: 'AWS Cloud Computing', issuer: 'AP State Skill Development Corporation', category: 'Cloud & Dev', image: c('aws-cloud-computing.jpg'), highlight: true },
  { title: 'Web Development Using Django', issuer: 'AP State Skill Development Corporation', category: 'Cloud & Dev', image: c('web-development-using-django.jpg') },
  { title: 'Data Structures & Algorithms Training', issuer: 'GeeksforGeeks', category: 'Cloud & Dev', image: c('gfg-training-data-structures-and-algorithms.jpg') },
  { title: 'Python Course Completion', issuer: 'GeeksforGeeks', category: 'Cloud & Dev', image: c('python-gfg.jpg') },
  { title: 'C Programming Course', issuer: 'Wingspan', category: 'Cloud & Dev', image: c('c-programming.jpg'), pdf: c('c-programming.pdf') },
  { title: 'Productivity Enhancement Tools', issuer: 'AP State Skill Development Corporation', category: 'Cloud & Dev', image: c('productivity-enhancement-tools.jpg') },

  // Cybersecurity
  { title: 'Network Security Associate Virtual Internship', issuer: 'APSCHE · EduSkills · Fortinet', category: 'Cybersecurity', image: c('network-security-associate-vp-completion.jpg'), highlight: true },
  { title: 'Network Security Associate – Fortinet', issuer: 'EduSkills · AICTE · Fortinet', category: 'Cybersecurity', image: c('network-security-associate-vp-supported-by-fortinet.jpg') },
  { title: 'Network Security Associate Virtual Internship', issuer: 'EduSkills · AICTE', category: 'Cybersecurity', image: c('network-security-associate-vp-eduskills.jpg') },
  { title: 'Cybersecurity Virtual Internship', issuer: 'EduSkills · AICTE · Palo Alto Networks', category: 'Cybersecurity', image: c('cybersecurity-virtual-intertnship.jpg') },
  { title: 'FCF – Getting Started in Cybersecurity 2.0', issuer: 'Fortinet Training Institute', category: 'Cybersecurity', image: c('fcf-getting-started-in-cybersecurity-2.0-self-placed.jpg') },
  { title: 'Security Expert Level-1', issuer: 'Supraja Technologies · Student Activity Center', category: 'Cybersecurity', image: c('completition-certificate-sac-1.jpg') },
  { title: 'Certificate of Excellence', issuer: 'Supraja Technologies · Student Activity Center', category: 'Cybersecurity', image: c('excellence-certificate-sac-1.jpg') },
  { title: 'Ethical Hacking & Cyber Security Internship Offer', issuer: 'Supraja Technologies', category: 'Cybersecurity', image: c('offer-letter-3-2-internship-from-supraja-technologies-cybersecurity.jpg') },

  // AI & Internships
  { title: 'Android Developer Virtual Internship', issuer: 'EduSkills · AICTE · Google for Developers', category: 'AI & Internships', image: c('network-security-associate-vp-google-for-developers.jpg'), highlight: true },
  { title: 'Process Mining Virtual Internship', issuer: 'EduSkills · AICTE · Celonis', category: 'AI & Internships', image: c('network-security-associate-vp-supported-by-celonis.jpg') },
  { title: 'Application Development with AI & Essential Skills', issuer: 'NASSCOM · AICTE · Brainovision', category: 'AI & Internships', image: c('cop-nlw-application-developmentwithai-and-essential-skills.jpg') },
  { title: 'ServiceNow Project Completion', issuer: 'SmartInternz · SmartBridge', category: 'AI & Internships', image: c('smartinternz-servicenow.jpg'), pdf: c('smartinternz-servicenow.pdf') },

  // Competitions
  { title: '1st Prize – SQL Competition 1.0', issuer: 'AITAM', category: 'Competitions', image: c('sql-competition-1.0-winner.jpg'), highlight: true },
  { title: 'SQL Competition 1.0 – Participation', issuer: 'AITAM', category: 'Competitions', image: c('sql-competition-1.0-participation.jpg') },
  { title: 'Build-A-Thon Hackathon', issuer: 'AITAM', category: 'Competitions', image: c('build-a-thon.jpg') },
  { title: 'Model G20 Summit', issuer: 'AITAM', category: 'Competitions', image: c('model-g20-summit.jpg') },
  { title: 'YUGMA National-Level Oratory Contest', issuer: 'Participation', category: 'Competitions', image: c('yugma-national-level-oratory-contest-participation.jpg') },
  { title: 'Certificate of Recognition', issuer: 'My Bharat', category: 'Competitions', image: c('certificate-of-recognition-mybharat.jpg') },

  // Academic & Community
  { title: 'ISTE Student Membership', issuer: 'Indian Society for Technical Education', category: 'Academic & Community', image: c('ap120.jpg'), pdf: c('ap120.pdf') },
  { title: 'CSTA Membership', issuer: 'Computer Science Teachers Association', category: 'Academic & Community', image: c('csta-membership-card.jpg') },
  { title: 'NSS Certificate', issuer: 'National Service Scheme', category: 'Academic & Community', image: c('nss.jpg') },
  { title: 'Independence Day March Past', issuer: 'JNTUGV', category: 'Academic & Community', image: c('march-past-jntugv-independence.jpg') },
  { title: 'Republic Day March Past', issuer: 'JNTUGV', category: 'Academic & Community', image: c('march-past-jntugv-republic.jpg') },
]

export const certCategories: CertCategory[] = ['Cloud & Dev', 'Cybersecurity', 'AI & Internships', 'Competitions', 'Academic & Community']
