'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const achievements = [
  {
    id: 1,
    title: "EduConsult Licence",
    image: "/imgs/bento-1.png?height=200&width=200",
    bookImage: "/imgs/bento-1.png?height=300&width=200",
    content: " Sign MOU with SRM University for mentorship and guiding international Student in achieving there Study in India Dream."
  },
  {
    id: 2,
    title: "Technical Innovation",
    image: "/imgs/bento-2.png?height=200&width=200",
    bookImage: "/imgs/bento-2.png?height=300&width=200",
    content: "Lead a workshop session with Tech Mahindra Staff "
  },
  {
    id: 3,
    title: "Leadership Achievement",
    image: "/imgs/bento-3.png?height=200&width=200",
    bookImage: "/imgs/bento-3.png?height=300&width=200",
    content: "As the president and Representative of Gitam University international student for AY 2022/2023 Award."
  },
  {
    id: 4,
    title: "Young Achiever Award",
    image: "/imgs/bento-4.png?height=200&width=200",
    bookImage: "/imgs/bento-4.png?height=300&width=200",
    content: "Award by Gitam Career guidance for outstanding performance through out the academy year."
  },
  {
    id: 5,
    title: "Project Development MOU",
    image: "/imgs/bento-6.png?height=200&width=200",
    bookImage: "/imgs/bento-6.png?height=300&width=200",
    content: "First MOU with Edygrad CEO, on Project development collaboration with ANITS."
  },
  {
    id: 6,
    title: "Technical Drive Collaboration",
    image: "/imgs/bento-7.png?height=200&width=200",
    bookImage: "/imgs/bento-7.png?height=300&width=200",
    content: "Technical drive Collaboration with Tech Mahindra ."
  }
]

const BentoGrid = () => {
  const [selectedAchievement, setSelectedAchievement] = useState(null)

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">My Achievements</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedAchievement(achievement)}
          >
            <img
              src={achievement.image}
              alt={achievement.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white text-center font-bold px-4">
                {achievement.title}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              initial={{ scale: 0, rotateY: 180 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0, rotateY: 180 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-gray-200 p-4 flex items-center justify-center">
                  <img
                    src={selectedAchievement.bookImage}
                    alt={`${selectedAchievement.title} Book`}
                    className="max-w-full h-auto shadow-lg"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold">{selectedAchievement.title}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedAchievement(null)}
                    >
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="bg-gray-800 text-white p-4 rounded-lg shadow-inner">
                    <pre className="font-mono text-sm overflow-x-auto">
                      <code>{selectedAchievement.content}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default BentoGrid