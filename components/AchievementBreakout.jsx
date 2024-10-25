'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from 'framer-motion'

const achievements = [
  "Collaboration with Tech Giants",
  "AI Workshop Leader",
  "Blockchain Project Success",
  "Project Dev Expert",
  "Web3 Innovation Award",
  "Cloud Architecture Mastery",
  "Data Science Breakthrough",
  "IoT Solution Provider",
  "Cybersecurity Specialist",
  "Full-Stack Development Guru"
]

export default function AchievementBreakout() {
  const canvasRef = useRef(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [showModal, setShowModal] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (!gameStarted || gameOver) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    let animationFrameId

    // Game objects
    const paddleHeight = 10
    const paddleWidth = 75
    let paddleX = (canvas.width / dpr - paddleWidth) / 2
    const ballRadius = 5
    let x = canvas.width / (2 * dpr)
    let y = canvas.height / dpr - 30
    let dx = 2
    let dy = -2

    // Bricks
    const brickRowCount = 3
    const brickColumnCount = 5
    const brickWidth = (canvas.width / dpr - 50) / brickColumnCount
    const brickHeight = 20
    const brickPadding = 10
    const brickOffsetTop = 30
    const brickOffsetLeft = 25

    const bricks = []
    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = []
      for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 }
      }
    }

    function drawBall() {
      ctx.beginPath()
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
      ctx.fillStyle = '#fbbf24'
      ctx.fill()
      ctx.closePath()
    }

    function drawPaddle() {
      const gradient = ctx.createLinearGradient(paddleX, 0, paddleX + paddleWidth, 0)
      gradient.addColorStop(0, '#fbbf24')
      gradient.addColorStop(1, '#3b82f6')
      
      ctx.beginPath()
      ctx.rect(paddleX, canvas.height / dpr - paddleHeight, paddleWidth, paddleHeight)
      ctx.fillStyle = gradient
      ctx.fill()
      ctx.closePath()
    }

    function drawBricks() {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status === 1) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop
            bricks[c][r].x = brickX
            bricks[c][r].y = brickY

            const gradient = ctx.createLinearGradient(brickX, brickY, brickX + brickWidth, brickY)
            gradient.addColorStop(0, '#fbbf24')
            gradient.addColorStop(1, '#3b82f6')

            ctx.beginPath()
            ctx.rect(brickX, brickY, brickWidth, brickHeight)
            ctx.fillStyle = gradient
            ctx.fill()
            ctx.closePath()

            // Draw achievement text
            ctx.font = '10px Arial'
            ctx.fillStyle = '#ffffff'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            const achievementIndex = c + r * brickColumnCount
            if (achievementIndex < achievements.length) {
              ctx.fillText(achievements[achievementIndex], brickX + brickWidth / 2, brickY + brickHeight / 2, brickWidth - 5)
            }
          }
        }
      }
    }

    function collisionDetection() {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          const b = bricks[c][r]
          if (b.status === 1) {
            if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
              dy = -dy
              b.status = 0
              setScore(prevScore => prevScore + 1)
            }
          }
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)
      drawBricks()
      drawBall()
      drawPaddle()
      collisionDetection()

      if (x + dx > canvas.width / dpr - ballRadius || x + dx < ballRadius) {
        dx = -dx
      }
      if (y + dy < ballRadius) {
        dy = -dy
      } else if (y + dy > canvas.height / dpr - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy
        } else {
          setGameOver(true)
          setShowModal(true)
          return
        }
      }

      x += dx
      y += dy

      paddleX = Math.max(0, Math.min(canvas.width / dpr - paddleWidth, paddleX))

      animationFrameId = requestAnimationFrame(draw)
    }

    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect()
      const root = document.documentElement
      const relativeX = e.clientX - rect.left - root.scrollLeft
      movePaddle(relativeX)
    }

    function handleTouchMove(e) {
      e.preventDefault()
      const rect = canvas.getBoundingClientRect()
      const root = document.documentElement
      const relativeX = e.touches[0].clientX - rect.left - root.scrollLeft
      movePaddle(relativeX)
    }

    function movePaddle(relativeX) {
      if (relativeX > 0 && relativeX < canvas.width / dpr) {
        paddleX = relativeX - paddleWidth / 2
        paddleX = Math.max(0, Math.min(canvas.width / dpr - paddleWidth, paddleX))
      }
    }

    function handleKeyDown(e) {
      const key = e.key
      const moveAmount = 20

      if (key === 'ArrowLeft') {
        paddleX = Math.max(0, paddleX - moveAmount)
      } else if (key === 'ArrowRight') {
        paddleX = Math.min(canvas.width / dpr - paddleWidth, paddleX + moveAmount)
      }
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('keydown', handleKeyDown)

    draw()

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          cancelAnimationFrame(animationFrameId)
          setGameOver(true)
          setShowModal(true)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => {
      cancelAnimationFrame(animationFrameId)
      clearInterval(timer)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [gameStarted, gameOver])

  const handleStartGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setTimeLeft(30)
    setScore(0)
    setShowModal(false)
  }

  const handleHire = () => {
    window.open('https://wa.me/+919032782704', 'Hi Quddus, I came accross your profile on your Qudmeet AI Portfolio ....')
  }

  return (
    <Card className="w-full max-w-3xl mx-auto bg-gradient-to-br from-yellow-200 to-blue-200">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-blue-600">Quddus Achievement Breakout</CardTitle>
        <CardDescription className="text-center text-yellow-600">Break the blocks to discover Quddus&apos; achievements!</CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatePresence>
          {!gameStarted || gameOver ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-4"
            >
              <Button onClick={handleStartGame} className="bg-gradient-to-r from-yellow-400 to-blue-500 hover:from-yellow-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105">
                {gameOver ? 'Restart Game' : 'Start Game'}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center mb-4 text-blue-600 font-semibold">
                <span>Time Left: {timeLeft}s</span>
                <span>Score: {score}</span>
              </div>
              <canvas
                ref={canvasRef}
                className="w-full h-64 border-4 border-yellow-400 rounded-lg shadow-lg"
                tabIndex="0"
              />
              <p className="text-center text-sm text-blue-600">
                Use arrow keys, mouse, or touch to control the paddle
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <CardFooter className="flex flex-col items-center gap-4 bg-gradient-to-br from-yellow-100 to-blue-100 rounded-b-lg p-6">
              <p className="text-center text-lg font-semibold text-blue-600">
                You&apos;ve dedicated time to know Quddus. Would you like to hire him for a project or collaborate?
              </p>
              <div className="flex gap-4">
                <Button onClick={handleHire} className="bg-gradient-to-r from-yellow-400 to-blue-500 hover:from-yellow-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105">
                  Yes, Let&apos;s Connect!
                </Button>
                <Button variant="outline" onClick={() => setShowModal(false)} className="border-2 border-yellow-400 text-blue-600 hover:bg-yellow-100 font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105">
                  Maybe Later
                </Button>
              </div>
            </CardFooter>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}