'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plane } from 'lucide-react'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const certifications = [
  { id: 1, name: "AWS Certified Solutions Essential", details: "Amazon (Coursera)", color: "#FF9900" },
  { id: 2, name: "Google Cloud Professional Data Engineer", details: "Google", color: "#4285F4" },
  { id: 3, name: "Agile Project Management", details: "HP", color: "#00A4EF" },
  { id: 4, name: "Java Master Class", details: "Udemy", color: "#FF6F00" },
  { id: 5, name: "Data Structure and Algorithm", details: "Skillsoft (Vodafone)", color: "#326CE5" },
]

const CertificationItem = ({ cert }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isFlying, setIsFlying] = useState(false)

  const handleInteraction = () => {
    setIsFlying(true)
    setTimeout(() => setIsFlying(false), 2000) // Reset after animation
  }

  return (
    <motion.div
      className="mb-4 p-4 bg-white rounded-lg shadow-md relative overflow-hidden"
      style={{ borderLeft: `4px solid ${cert.color}` }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleInteraction}
    >
      <h3 className="text-lg font-semibold mb-2">{cert.name}</h3>
      <AnimatePresence>
        {isHovered && !isFlying && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-sm text-gray-600 mb-2"
          >
            {cert.details}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="absolute right-4 top-4 cursor-pointer"
        animate={isFlying ? { x: [-100, -200], y: 0, opacity: [0, 1] } : {}}
        transition={{ duration: 1 }}
      >
        <Plane size={40} color={cert.color} />
      </motion.div>
    </motion.div>
  )
}

const Certifications = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Certifications</h2>
      <div className="max-w-2xl mx-auto">
        {certifications.map(cert => (
          <CertificationItem key={cert.id} cert={cert} />
        ))}
        <a
                href="https://github.com/quddos"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-600 text-white px-4 py-1 rounded-full hover:bg-gray-900 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faLinkedin} className="mr-2" />
                more
              </a>
      </div>

      
      
    </div>
    
  )
}

export default Certifications