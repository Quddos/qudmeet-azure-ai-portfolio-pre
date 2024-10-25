'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const faqs = [
  { 
    id: 1, 
    question: "What are your primary areas of expertise?",
    answer: "My primary areas of expertise include AI/Machine Learning, Cloud Architecture, Full-Stack Development, and Cybersecurity."
  },
  {
    id: 2,
    question: "What programming languages are you proficient in?",
    answer: "I'm proficient in Python, JavaScript/TypeScript, Java, and C++. I also have experience with Go and Rust."
  },
  {
    id: 3,
    question: "Do you offer consulting services?",
    answer: "Yes, I offer consulting services in AI implementation, cloud migration, and cybersecurity audits."
  },
  {
    id: 4,
    question: "How can I collaborate with you on a project?",
    answer: "You can reach out to me via the contact form on this website or connect with me on LinkedIn to discuss potential collaborations."
  },
  {
    id: 5,
    question: "What's your approach to problem-solving?",
    answer: "I approach problems systematically, breaking them down into manageable parts, researching potential solutions, and iterating on implementations until I find the most efficient solution."
  }
]

const FloatingFAQ = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFAQ, setSelectedFAQ] = useState(null)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="mb-4"
          >
            <Card className="w-80 shadow-lg">
              <CardHeader className="bg-blue-500 text-white">
                <CardTitle className="flex justify-between items-center">
                  <span>FAQ</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-blue-200"
                  >
                    <X size={20} />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-96">
                  {faqs.map((faq) => (
                    <div
                      key={faq.id}
                      className="p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-100"
                      onClick={() => setSelectedFAQ(faq)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{faq.question}</span>
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        className="rounded-full w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle size={24} />
      </Button>

      <AnimatePresence>
        {selectedFAQ && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setSelectedFAQ(null)}
          >
            <Card className="w-full max-w-md m-4" onClick={(e) => e.stopPropagation()}>
              <CardHeader className="bg-blue-500 text-white">
                <CardTitle className="flex justify-between items-center">
                  <span>{selectedFAQ.question}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedFAQ(null)}
                    className="text-white hover:text-blue-200"
                  >
                    <X size={20} />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p>{selectedFAQ.answer}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FloatingFAQ