'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const FooterSignature = () => {
  const [text, setText] = useState('')
  const fullText = "All-right reserved @.... :Qudmeet AI Portfolio"

  useEffect(() => {
    let index = 0
    const intervalId = setInterval(() => {
      setText(fullText.slice(0, index))
      index++
      if (index > fullText.length) {
        index = 0
      }
    }, 100)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <motion.div 
      className="fixed bottom-4 left-4 flex items-center space-x-2"
      animate={{
        x: [0, 10, 0],
        y: [0, 5, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      <Image
        src="/imgs/quddus.png?height=32&width=32"
        alt="Raheem Quddus"
        width={32}
        height={32}
        className="rounded-full"
      />
      <p className="text-sm font-bold text-gray-600">{text}</p>
    </motion.div>
  )
}

export default FooterSignature