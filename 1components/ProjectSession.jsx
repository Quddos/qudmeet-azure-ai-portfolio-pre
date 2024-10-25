'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Mock data for projects
const projects = [
  { id: 1, title: 'AI Chatbot', category: 'Technical', content: 'An advanced AI-powered chatbot...' },
  { id: 2, title: 'Team Building Workshop', category: 'Workshop', content: 'Interactive workshop for team building...' },
  { id: 3, title: 'Branding Strategy', category: 'Non-Technical', content: 'Comprehensive branding strategy...' },
  // Add more projects as needed
]

const categories = ['All', 'Technical', 'Non-Technical', 'Workshop']

const BicycleAnimation = ({ targetX, targetY }) => {
  return (
    <motion.svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      initial={{ x: 0, y: 0 }}
      animate={{ x: targetX, y: targetY }}
      transition={{ duration: 1, type: 'spring', stiffness: 50 }}
    >
      <circle cx="30" cy="70" r="20" fill="none" stroke="black" strokeWidth="2" />
      <circle cx="70" cy="70" r="20" fill="none" stroke="black" strokeWidth="2" />
      <path d="M30 70 L50 50 L70 70 M50 50 L50 30" stroke="black" strokeWidth="2" />
      <circle cx="50" cy="30" r="10" fill="black" />
    </motion.svg>
  )
}

export default function ProjectSession() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [bicycleTarget, setBicycleTarget] = useState({ x: 0, y: 0 })
  const projectRefs = useRef({})

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const handleProjectClick = (project, event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setBicycleTarget({ x: rect.left, y: rect.top })
    setTimeout(() => setSelectedProject(project), 1000)
  }

  useEffect(() => {
    if (selectedProject) {
      const element = projectRefs.current[selectedProject.id]
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [selectedProject])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Project Showcase</h1>
      
      <div className="mb-6">
        {categories.map(category => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant={selectedCategory === category ? 'default' : 'outline'}
            className="mr-2"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredProjects.map(project => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={(e) => handleProjectClick(project, e)}
                ref={el => projectRefs.current[project.id] = el}
              >
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                  <p className="text-sm text-gray-600">{project.category}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <BicycleAnimation targetX={bicycleTarget.x} targetY={bicycleTarget.y} />

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <Card className="w-full max-w-2xl" onClick={e => e.stopPropagation()}>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">{selectedProject.title}</h2>
                <p className="text-gray-600 mb-4">{selectedProject.category}</p>
                <p>{selectedProject.content}</p>
                <Button className="mt-4" onClick={() => setSelectedProject(null)}>Close</Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}