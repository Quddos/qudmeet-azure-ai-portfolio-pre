'use client'

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

import AniProjectSession from "@/components/AniProjectSession"
import AchievementBreakout from "@/components/AchievementBreakout"
import BentoGrid from "@/components/BentoGrid"
import EducationSession from "@/components/EducationSession"
import WorkExperience from "@/components/WorkExperience"
import Certifications from "@/components/Certifications"
import FloatingFAQ from "@/components/FloatingFAQ"
import FooterSignature from "@/components/FooterSignature"

const skillCategories = {
  Frontend: [{ name: "& Development", description: "HTML, CSS, Javascript, React, Angular, Vue, SCSS, JQuery, Boostrap, Tailwind css" }],
  Backend: [{ name: "& Programming", description: "Java, Node.js, Express, PhP, Webhook, Next.js, Python" }],
  "AI/ML Tech Stack": [{ name: "& AI Tech", description: "PineonDB, Langchain, TensorFlow, OpenAI, Vercel AI SDK, Prisma" }],
  "CLOUD/ DevOps": [{ name: "& Cloud Computing", description: "Amazon AWS, Linux, Firebase, Docker, Microsoft Azure, Automation, VPS" }],
  Frameworks: [{ name: "& Libraries", description: "WordPress, Stripe, Hubspot, Shopify" }],
  "UI/UX Graphics Design": [{ name: "& Design", description: "Figma, Canva, Adobe Photoshop, Workflow Diagram" }],
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showAboutModal, setShowAboutModal] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-blue-400 to-yellow-300 overflow-x-hidden">
      <header className="bg-white bg-opacity-80 shadow-md px-4 py-2 w-full">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <a href="#" className="flex items-center">
            <div className="bg-blue-400 text-yellow-400 h-12 w-12 rounded-full flex items-center justify-center text-2xl font-bold mr-2">Q</div>
            <div className="text-xl font-semibold">Qudmeet AI</div>
          </a>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li><a href="#Chatbot" className="button">AI</a></li>
              <li><a href="#">Home</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="https://www.linkedin.com/in/quddos/" className="button">Articles</a></li>
            </ul>
          </nav>
          <button className="md:hidden" onClick={toggleMobileMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="md:hidden bg-white">
          <ul className="flex flex-col items-center py-4">
            <li><a href="#Chatbot" className="block py-2">AI</a></li>
            <li><a href="#" className="block py-2">Home</a></li>
            <li><a href="#skills" className="block py-2">Skills</a></li>
            <li><a href="#projects" className="block py-2">Projects</a></li>
            <li><a href="https://www.linkedin.com/in/quddos/" className="block py-2">Articles</a></li>
          </ul>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        <section className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <img
              src="/imgs/quddus.png"
              alt="Quddus"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-4">Quddus Raheem</h1>
            <p className="text-xl mb-6">
              Over 5 Years of Professional Experience in Multiple Technical Domain
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button
                onClick={() => setShowAboutModal(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
              >
                About Me
              </button>
              <a
                href="https://www.linkedin.com/in/quddos"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-800 text-white px-6 py-2 rounded-full hover:bg-blue-900 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faLinkedin} className="mr-2" />
                LinkedIn
              </a>
              <a
                href="https://github.com/quddos"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-900 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faGithub} className="mr-2" />
                GitHub
              </a>
            </div>
          </div>
        </section>

        <section id="skills" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">
            <small className="block text-lg text-gray-800">About Me</small>
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skillCategories).map(([category, skills]) => (
              <div key={category} className="bg-white bg-opacity-80 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">{category}</h3>
                <ul className="space-y-2">
                  {skills.map((skill) => (
                    <li key={skill.name} className="hover:text-blue-600 transition-colors duration-200">
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <AniProjectSession />
        <AchievementBreakout />
        <EducationSession />
        <BentoGrid />
        <WorkExperience />
        <Certifications />
        <FloatingFAQ />
        <FooterSignature />
      </main>

      <AnimatePresence>
        {showAboutModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-lg max-w-md relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => setShowAboutModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <h2 className="text-2xl font-bold mb-4">About Quddus Raheem</h2>
              <p className="mb-4">
                I'm a passionate Full Stack Developer with expertise in modern
                web technologies and AI integration. With a strong foundation in
                both frontend and backend development, I create innovative
                solutions that bridge the gap between user experience and
                cutting-edge technology.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}