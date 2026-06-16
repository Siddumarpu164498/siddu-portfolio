'use client';

import { Mail, Phone, MapPin, LinkIcon, ExternalLink, Award, Code, BookOpen } from 'lucide-react';
import Image from 'next/image';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <h1 className="text-xl font-bold text-gray-900">MS</h1>
          <div className="flex gap-8">
            <a href="#about" className="text-sm text-gray-700 hover:text-blue-600 transition-colors">About</a>
            <a href="#experience" className="text-sm text-gray-700 hover:text-blue-600 transition-colors">Experience</a>
            <a href="#projects" className="text-sm text-gray-700 hover:text-blue-600 transition-colors">Projects</a>
            <a href="#contact" className="text-sm text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-gray-900">
              Marpu <span className="text-blue-600">Siddardha</span>
            </h1>
            <p className="text-xl text-gray-700 mb-4">Software Developer & AI Enthusiast</p>
            <p className="text-base text-gray-600 mb-8 leading-relaxed">
              B.Tech in Information Technology student with a strong foundation in full-stack development, AI/LLM infrastructure, and cloud technologies. Passionate about building scalable solutions and exploring emerging technologies.
            </p>
            <div className="flex gap-4">
              <a href="#contact" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Get in Touch
              </a>
              <a href="#projects" className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                View Work
              </a>
            </div>
            <div className="flex gap-6 mt-8">
              <a href="mailto:siddumarpu123@gmail.com" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                <Mail size={20} /> Email
              </a>
              <a href="tel:+917013602154" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                <Phone size={20} /> Call
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SIDDU_PIC-x5myYHywQdvkjuUzGns7OZzLo3pXQQ.jpg"
                alt="Marpu Siddardha"
                width={320}
                height={320}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Academic Excellence Section */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <h2 className="text-3xl font-bold mb-12 text-gray-900">Academic Excellence</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Current Education */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200">
            <BookOpen className="text-blue-600 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2 text-gray-900">B.Tech Information Technology</h3>
            <p className="text-gray-600 text-sm mb-4">Aditya Institute of Technology and Management</p>
            <div className="space-y-2">
              <p className="text-gray-900 font-semibold">CGPA: <span className="text-blue-600">9.16</span></p>
              <p className="text-gray-600 text-sm">Expected: 2026</p>
              <p className="text-gray-600 text-sm">JNTUGV, Vizianagaram</p>
            </div>
          </div>

          {/* Intermediate */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200">
            <Award className="text-blue-600 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2 text-gray-900">Intermediate (MPC)</h3>
            <p className="text-gray-600 text-sm mb-4">Gayatri Junior College</p>
            <div className="space-y-2">
              <p className="text-gray-900 font-semibold">Grade: <span className="text-blue-600">A (86.7%)</span></p>
              <p className="text-gray-600 text-sm">2022</p>
              <p className="text-gray-600 text-sm">BIE, Andhra Pradesh</p>
            </div>
          </div>

          {/* SSC */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200">
            <Award className="text-blue-600 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2 text-gray-900">Secondary School Certificate</h3>
            <p className="text-gray-600 text-sm mb-4">Government High School, Santhabommali</p>
            <div className="space-y-2">
              <p className="text-gray-900 font-semibold">Score: <span className="text-blue-600">600/600 (100%)</span></p>
              <p className="text-gray-600 text-sm">2020 - First Division</p>
              <p className="text-gray-600 text-sm">BSE, Andhra Pradesh</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <h2 className="text-3xl font-bold mb-12 text-gray-900">Technical Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900">
              <Code size={20} className="text-blue-600" /> Programming Languages
            </h3>
            <div className="flex flex-wrap gap-3">
              {['Java', 'Python', 'C++', 'C', 'JavaScript', 'TypeScript'].map(skill => (
                <span key={skill} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900">
              <Code size={20} className="text-blue-600" /> Web Development
            </h3>
            <div className="flex flex-wrap gap-3">
              {['React.js', 'HTML/CSS', 'Tailwind CSS', 'Next.js', 'Django'].map(skill => (
                <span key={skill} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900">
              <Code size={20} className="text-blue-600" /> Databases
            </h3>
            <div className="flex flex-wrap gap-3">
              {['MySQL', 'PostgreSQL', 'MongoDB'].map(skill => (
                <span key={skill} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900">
              <Code size={20} className="text-blue-600" /> Tools & Platforms
            </h3>
            <div className="flex flex-wrap gap-3">
              {['AWS', 'Docker', 'Git', 'Linux', 'ServiceNow'].map(skill => (
                <span key={skill} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <h2 className="text-3xl font-bold mb-12 text-gray-900">Professional Experience</h2>
        <div className="space-y-8">
          {/* ML Internship */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Machine Learning Intern</h3>
                <p className="text-blue-600 font-semibold mt-1">Yanthraa Information Systems Pvt Ltd</p>
              </div>
              <span className="text-gray-600">May 2025</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Developed and optimized enterprise LLM infrastructure solutions. Gained hands-on experience in AI solution development and contributed to building scalable, secure, and context-aware AI systems with seamless enterprise integration.
            </p>
          </div>

          {/* ServiceNow Internship */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Certified ServiceNow Intern</h3>
                <p className="text-blue-600 font-semibold mt-1">ServiceNow Virtual Internship</p>
              </div>
              <span className="text-gray-600">May 2025</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Completed certified virtual internship with hands-on experience in ITSM fundamentals. Gained expertise in incident management, automated workflows, UI policy scripting, and ServiceNow instance configuration.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <h2 className="text-3xl font-bold mb-12 text-gray-900">Featured Project</h2>
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Holocron</h3>
              <p className="text-gray-600">Proprietary Large Language Model Infrastructure</p>
            </div>
            <ExternalLink className="text-blue-600" size={24} />
          </div>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Developed secure and customizable LLM infrastructure for enterprise clients. Implemented data ingestion pipelines, sensitive data masking for HIPAA/GDPR compliance, embedding generation using advanced models, FAISS indexing for efficient semantic search, query optimization, and GPT-4 integration for AI-driven responses.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Python', 'React.js', 'TypeScript', 'Tailwind CSS', 'LLM', 'AI'].map(tech => (
              <span key={tech} className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <h2 className="text-3xl font-bold mb-12 text-gray-900">Certifications & Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Web Development using Django (APSSDC)',
            'AWS Cloud Computing (APSSDC)',
            'Network Security Associate (AICTE)',
            'Data Science for Engineers (IIT Madras)',
            'Introduction to Machine Learning (IIT Madras)',
            'Ethical Hacking & Cybersecurity',
            'Python Course (GeeksforGeeks)',
            'Full Stack Developer (GeeksforGeeks)',
            'ServiceNow System Administrator',
            'Business Analytics & Text Mining (IIT Kharagpur)',
            'IDE Bootcamp (GITAM)',
            'Model G20 Summit (3rd Prize)'
          ].map(cert => (
            <div key={cert} className="flex items-start gap-3 p-4 rounded-lg bg-gray-100">
              <Award size={20} className="text-blue-600 mt-1 flex-shrink-0" />
              <span className="text-gray-800 text-sm">{cert}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <h2 className="text-3xl font-bold mb-12 text-gray-900">Get In Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="mailto:siddumarpu123@gmail.com" className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-gray-200 hover:shadow-lg hover:border-blue-600 transition-all text-center">
            <Mail className="text-blue-600 mx-auto mb-4" size={32} />
            <h3 className="font-bold mb-2 text-gray-900">Email</h3>
            <p className="text-gray-600 text-sm">siddumarpu123@gmail.com</p>
          </a>
          <a href="tel:+917013602154" className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-gray-200 hover:shadow-lg hover:border-blue-600 transition-all text-center">
            <Phone className="text-blue-600 mx-auto mb-4" size={32} />
            <h3 className="font-bold mb-2 text-gray-900">Phone</h3>
            <p className="text-gray-600 text-sm">+91 7013 602 154</p>
          </a>
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-gray-200 text-center">
            <MapPin className="text-blue-600 mx-auto mb-4" size={32} />
            <h3 className="font-bold mb-2 text-gray-900">Location</h3>
            <p className="text-gray-600 text-sm">Srikakulam, Andhra Pradesh, India</p>
          </div>
        </div>

        <div className="mt-12 flex justify-center gap-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition-colors" aria-label="GitHub">
            <Code size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition-colors">
            <LinkIcon size={24} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400">© 2025 Marpu Siddardha. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
