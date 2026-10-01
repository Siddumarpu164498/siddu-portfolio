import { certificates } from './certificates';
import {
  ACHIEVEMENTS, EDUCATION, EXPERIENCE, FOCUS, LEADERSHIP, LINKS, MORE_CERTS, PROFILE, PROJECTS, SKILLS,
} from './profile';

/** Plain-text knowledge base shared by the Claude system prompt and the offline answer engine. */
export function knowledgeBase(): string {
  const exp = EXPERIENCE.flatMap(j =>
    j.roles.map(r => `- ${r.title}, ${j.company} (${r.date}, ${r.mode}): ${r.points.join(' ')}`),
  ).join('\n');
  const edu = EDUCATION.map(e => `- ${e.t}, ${e.s} (${e.b}), ${e.d}: ${e.v}`).join('\n');
  const projects = PROJECTS.map(p => `- ${p.name} (${p.tagline}): ${p.text} Tech: ${p.tech.join(', ')}.`).join('\n');
  const skills = SKILLS.map(s => `- ${s.name} [${s.category}]: ${s.note}`).join('\n');
  const certs = [
    ...certificates.map(c => `- ${c.title} — ${c.issuer}${c.date ? ` (${c.date})` : ''}`),
    ...MORE_CERTS.map(c => `- ${c.t} — ${c.i} (${c.d})`),
  ].join('\n');

  return `Name: ${PROFILE.name}
Current role: ${PROFILE.role}
Location: ${PROFILE.location}
Summary: ${PROFILE.summary}
Languages spoken: ${PROFILE.languages.join(', ')}
Interests: ${PROFILE.interests.join(', ')}
Public contact: email ${LINKS.email}, LinkedIn ${LINKS.linkedin}, GitHub ${LINKS.github}

Engineering focus:
${FOCUS.map(f => `- ${f.title}: ${f.text}`).join('\n')}

Experience:
${exp}

Education:
${edu}

Projects and research:
${projects}

Skills:
${skills}

Awards:
${ACHIEVEMENTS.map(a => `- ${a}`).join('\n')}

Leadership and community:
${LEADERSHIP.map(a => `- ${a}`).join('\n')}

Certifications (${certificates.length + MORE_CERTS.length}):
${certs}`;
}

export const SUGGESTIONS = [
  'What does Siddardha do at Brightcone.ai?',
  'Tell me about the Holocron project',
  'What are his top skills?',
  'What was his IEEE paper about?',
  'How can I contact him?',
];

type Intent = { keys: string[]; answer: () => string };

const list = (items: string[]) => items.map(i => `• ${i}`).join('\n');

const INTENTS: Intent[] = [
  {
    keys: ['contact', 'email', 'reach', 'hire', 'linkedin', 'connect', 'mail'],
    answer: () => `You can reach Siddardha by email at ${LINKS.email}, or connect on LinkedIn (${LINKS.linkedin}). The contact form at the bottom of this page opens a pre-filled email too.`,
  },
  {
    keys: ['brightcone', 'current', 'job', 'work now', 'role', 'position', 'doing now'],
    answer: () => {
      const [now, intern] = EXPERIENCE[0].roles;
      return `Siddardha is an ${now.title} at Brightcone.ai (${now.date}), building machine learning systems, data pipelines and AI/LLM-powered solutions. He joined after an ${intern.title.toLowerCase()} there (${intern.date}).`;
    },
  },
  {
    keys: ['holocron', 'yanthraa', 'llm infra', 'rag', 'faiss'],
    answer: () => `At Yanthraa Information Systems (May – Aug 2025) Siddardha worked on Holocron, an enterprise LLM platform:\n${list(EXPERIENCE[1].roles[0].points)}`,
  },
  {
    keys: ['ieee', 'paper', 'research', 'publication', 'lstm', 'battery', 'wams'],
    answer: () => 'He co-authored and presented "Single-Head Attention LSTM for Remaining Useful Life Prediction of Lithium-Ion Batteries" at the 5th IEEE Wireless, Antenna, and Microwave Symposium (WAMS 2026), B V Raju Institute of Technology, in June 2026.',
  },
  {
    keys: ['experience', 'internship', 'intern', 'worked', 'career', 'servicenow'],
    answer: () => `Here is his experience:\n${list(EXPERIENCE.flatMap(j => j.roles.map(r => `${r.title} — ${j.company} (${r.date})`)))}`,
  },
  {
    keys: ['skill', 'stack', 'tech', 'language', 'know', 'tools', 'python', 'react'],
    answer: () => `His core stack is ${PROFILE.stack.join(', ')}. Highlights:\n${list(SKILLS.slice(0, 8).map(s => `${s.name} — ${s.note}`))}`,
  },
  {
    keys: ['project', 'built', 'portfolio', 'github', 'repo', 'budget'],
    answer: () => `Selected projects:\n${list(PROJECTS.map(p => `${p.name} — ${p.tagline}`))}`,
  },
  {
    keys: ['education', 'cgpa', 'college', 'degree', 'study', 'aitam', 'school', 'marks', 'gpa'],
    answer: () => `Education:\n${list(EDUCATION.map(e => `${e.t}, ${e.s} — ${e.v} (${e.d})`))}`,
  },
  {
    keys: ['certif', 'course', 'nptel', 'aws'],
    answer: () => `He holds ${certificates.length + MORE_CERTS.length}+ certifications, including:\n${list([
      'Network Security Associate & Cybersecurity virtual internships (AICTE · Fortinet · Palo Alto)',
      'Android Developer virtual internship (Google for Developers)',
      'AWS Cloud Computing (APSSDC)',
      'NPTEL: Data Science for Engineers & Introduction to Machine Learning (IIT Madras)',
      'ServiceNow Certified System Administrator',
    ])}\nScroll to the Certifications section to view them.`,
  },
  {
    keys: ['award', 'achievement', 'prize', 'won', 'winner', 'hackathon', 'leader', 'nss', 'volunteer'],
    answer: () => `Awards:\n${list(ACHIEVEMENTS)}\n\nLeadership:\n${list(LEADERSHIP)}`,
  },
  {
    keys: ['location', 'where', 'based', 'live', 'from'],
    answer: () => `He is based in ${PROFILE.location}.`,
  },
  {
    keys: ['who', 'about', 'yourself', 'introduce', 'summary', 'siddardha'],
    answer: () => PROFILE.summary,
  },
  {
    keys: ['hi', 'hello', 'hey', 'namaste'],
    answer: () => `Hi! I'm Siddardha's portfolio assistant. Ask me about his work at Brightcone.ai, projects, skills, research or certifications.`,
  },
];

const PRIVATE = ['phone', 'number', 'mobile', 'address', 'birth', 'dob', 'age', 'father', 'mother', 'family', 'salary', 'aadhar', 'aadhaar'];

/** Keyword-matching answers used when the Claude API is unavailable. */
export function localAnswer(question: string): string {
  const q = question.toLowerCase();
  if (PRIVATE.some(k => q.includes(k))) {
    return `I don't share personal details like that. For anything else, please email Siddardha at ${LINKS.email}.`;
  }
  let best: Intent | undefined;
  let bestScore = 0;
  for (const intent of INTENTS) {
    const score = intent.keys.reduce((n, k) => n + (q.includes(k) ? k.length : 0), 0);
    if (score > bestScore) { best = intent; bestScore = score; }
  }
  return best
    ? best.answer()
    : `I'm not sure about that one. I can tell you about Siddardha's experience, projects, skills, research, education or certifications — or you can email him at ${LINKS.email}.`;
}
