'use client'

import React, { useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const workExperiences = [
  { id: 1, year: 2024, company: "OUTLIER", role: "AI Training Engineer", description: "Trained AI models on divers’ datasets, improving model accuracy and reliability" },
  { id: 2, year: 2024, company: "EDYGRAD", role: "CTO - Software Engineer", description: "Designed and planned product development solutions, ensuring performance, security, and scalability for diverse projects" },
  { id: 3, year: 2022, company: "BDNATURETECH", role: "Senior Software Developer", description: "Build a scalable and innovative platform, delivering exceptional user experiences and driving continuous growth and expansion using AI, Edge Runtime, and RAG drive innovation" },
  { id: 4, year: 2012, company: "Elakk Technologies", role: "Junior Technical Developer", description: "Effective collaboration actively engaging with the front-end developers, ensured a cohesive integration between the API’s functionality and the user interface" },
  { id: 6, year: 2021, company: "Brainlox (Triluxo) Technologies.", role: "Python Programming Language Instructor(Intern)", description: "Build a scalable and innovative platform, delivering exceptional user experiences and driving continuous growth and expansion using AI, Edge Runtime, and RAG drive innovation" },
  { id: 7, year: 2018, company: "Ark Technologies Group", role: "ATM Software Technical Engineer", description: "Used Microsoft identifiers platform to integrate user’s authentication in system application with MSAL.js Deployed and managed various file server’s backup servers and active directories for easy data administration and accessibility" },
 
]

const TypewriterText = ({ text }) => {
  const [displayedText, setDisplayedText] = React.useState('')
  const [currentIndex, setCurrentIndex] = React.useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prevText => prevText + text[currentIndex])
        setCurrentIndex(prevIndex => prevIndex + 1)
      }, 50)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  return <span>{displayedText}</span>
}

const WorkExperience = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <div className="container mx-auto px-4 py-16" ref={ref}>
      <h2 className="text-4xl font-bold text-center mb-12">Work Experience</h2>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-500"></div>
        
        {workExperiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            className={`flex items-center mb-16 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
            initial="hidden"
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 50 }
            }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
              <motion.div
                className="bg-white p-6 rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <h3 className="text-2xl font-bold mb-2">{exp.company}</h3>
                <h4 className="text-xl text-blue-600 mb-2">{exp.role}</h4>
                <p className="text-gray-600 mb-4">{exp.description}</p>
                <div className="text-sm text-gray-500">
                  {/* <TypewriterText  text={`Worked here in ${exp.year}`} /> */}
                </div>
              </motion.div>
            </div>
            <div className="w-1/2 flex justify-center">
              <motion.div
                className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360, 0],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  times: [0, 0.5, 1],
                  repeat: Infinity,
                }}
              >
                {exp.year}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default WorkExperience