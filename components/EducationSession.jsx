'use client'

import React from 'react'
import { motion } from 'framer-motion'

const educationData = [
  { id: 1, year: 2023, degree: "B.s Computer Application", institution: "Gitam University" },
  { id: 2, year: 2022, degree: "President (GISA)", institution: "Leadership Attestation Award" },
  { id: 3, year: 2020, degree: "Ministry of Education (India)", institution: "Merit Scholarship Award Winning the SII" },
  { id: 4, year: 2018, degree: "BS.c. Computer Science", institution: "University of Ilorin" },
  { id: 5, year: 2013, degree: "West Africa Examonation Cert", institution: "SSCE" },
//   { id: 4, year: 2016, degree: "Associate's in Programming", institution: "Community College" },
]

const EducationSession = () => {
  const sortedEducation = [...educationData].sort((a, b) => b.year - a.year)
  const maxYear = Math.max(...sortedEducation.map(edu => edu.year))
  const minYear = Math.min(...sortedEducation.map(edu => edu.year))
  const yearRange = maxYear - minYear

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Education Achievement</h2>
      <div className="flex flex-wrap justify-center items-end">
        {sortedEducation.map((edu, index) => {
          const size = 100 + ((edu.year - minYear) / yearRange) * 100 // Size ranges from 100px to 200px
          return (
            <motion.div
              key={edu.id}
              className="flex flex-col items-center m-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="relative"
                style={{ width: size, height: size }}
                whileHover={{ scale: 1.1 }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="45" fill="#FFD700" />
                  <text x="50" y="50" textAnchor="middle" dy=".3em" fontSize="20" fill="#000">
                    {edu.year}
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl">🏅</span>
                </div>
              </motion.div>
              <div className="mt-2 text-center">
                <h3 className="font-bold">{edu.degree}</h3>
                <p className="text-sm text-gray-600">{edu.institution}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default EducationSession