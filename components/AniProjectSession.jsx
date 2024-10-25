'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub} from "@fortawesome/free-brands-svg-icons";

// Mock data for projects
const projects = [
  { id: 1, title: 'Qudmeet AI Portfolio', category: 'Technical', content: 'An advanced AI-powered ... Used:Typescript, Next.Js, Microsoft Azure, OpenAI, Vercel, Tailwind css, Framer...', image: '/imgs/port1.png?height=100&width=100' },
  { id: 2, title: 'Six Senses of Robot Workshop', category: 'Workshop', content: 'I was honored to facilitate a 3-day intensive workshop on the "Six Senses of Robot" at SATYA INSTITUTE OF TECHNOLOGY AND MANAGEMENT.. used: C++, Arduino Programming, PCB...', image: '/imgs/p-arduino.jpeg?height=100&width=100' },
  { id: 3, title: 'Leadership Event Cordinator', category: 'Non-Technical', content: 'Awarding for International event, cordinated and supervised team into winning the Trophy...', image: '/imgs/shagram.jpg?height=100&width=100' },
  // Add more projects as needed
  { id: 4, title: 'Mirahcheck Multivendor Store', category: 'Technical', content: 'PhP, Javascript, MySQL, GIT, Linux, VPS...', image: '/imgs/port7.png?height=100&width=100' },
  { id: 5, title: 'Java Generative AI Integration OpenAI', category: 'Technical', content: ' used: Java, OpenAI, Curl, Spring, LLM, OOP, API...', image: '/imgs/port2.jpg?height=100&width=100' },
  { id: 6, title: 'Progressive Web Application ', category: 'Workshop', content: 'Cordinate and Instruct a realtime project development of cross platform application development.', image: '/imgs/pwa.jpeg?height=100&width=100' },
  // Add more projects as needed
]

const categories = ['All', 'Technical', 'Non-Technical', 'Workshop']

const BicycleAnimation = ({ targetX, isMoving }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <motion.svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      initial={{ x: 0, y: 0 }}
      animate={{ 
        x: isMobile ? Math.min(targetX, window.innerWidth - 100) : targetX, 
        y: 0, // Force the bicycle to move only horizontally
        scale: isMobile ? 0.7 : 1
      }}
      transition={{ duration: 1, type: 'spring', stiffness: 50 }}
    >
      <motion.g animate={{ fill: isMoving ? "#ff0000" : "#000000" }}>
        <circle cx="30" cy="70" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="70" cy="70" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M30 70 L50 50 L70 70 M50 50 L50 30" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="30" r="10" />
      </motion.g>
    </motion.svg>
  )
}

export default function AniProjectSession() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [bicycleTarget, setBicycleTarget] = useState({ x: 0 })
  const [isBicycleMoving, setIsBicycleMoving] = useState(false)
  const projectRefs = useRef({})

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const handleProjectClick = (project, event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setBicycleTarget({ x: rect.left }) // Only set the X value for horizontal movement
    setIsBicycleMoving(true)
    setTimeout(() => {
      setSelectedProject(project)
      setIsBicycleMoving(false)
    }, 1000)
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
            className="mr-2 mb-2"
          >
            {category}
          </Button>
        ))}
        <a
                href="https://github.com/quddos"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-600 text-white px-4 py-1 rounded-full hover:bg-gray-900 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faGithub} className="mr-2" />
                more
              </a>
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

      <BicycleAnimation targetX={bicycleTarget.x} isMoving={isBicycleMoving} />

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
                <div className="flex items-start space-x-4">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    width={150}
                    height={150}
                    className="rounded-md"
                  />
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>
                    <p className="text-yellow-600 mb-4">{selectedProject.category}</p>
                    <p>{selectedProject.content}</p>
                  </div>
                </div>
                <Button className="mt-4" onClick={() => setSelectedProject(null)}>Close</Button>
                
                
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
