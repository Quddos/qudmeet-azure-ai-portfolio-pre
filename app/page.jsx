"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import AniProjectSession from "@/components/AniProjectSession";

import AchievementBreakout from "@/components/AchievementBreakout";
import BentoGrid from "@/components/BentoGrid";
// import ArticleSidebar from '@/components/ArticleSidebar'
import EducationSession from "@/components/EducationSession";
import WorkExperience from "@/components/WorkExperience";
import Certifications from "@/components/Certifications";
import FloatingFAQ from "@/components/FloatingFAQ";
import FooterSignature from "@/components/FooterSignature";

import {
  faMicrophone,
  faStopCircle,
  faVolumeUp,
  faTimes,
  faVideo,
  faPlay,
  faRedo,
} from "@fortawesome/free-solid-svg-icons";

const skillCategories = {
  Frontend: [
    {
      name: "& Development",
      description:
        "HTML, CSS, Javascript, React, Angular, Vue, SCSS, JQuery, Boostrap, Tailwind css",
    },
  ],
  Backend: [
    {
      name: "& Programming",
      description: "Java, Node.js, Express, PhP, Webhook, Next.js, Python",
    },
  ],
  "AI/ML Tech Stack": [
    {
      name: "& AI Tech",
      description:
        "PineonDB, Langchain, TensorFlow, OpenAI, Vercel AI SDK, Prisma",
    },
  ],
  "CLOUD/ DevOps": [
    {
      name: "& Cloud Computing",
      description:
        "Amazon AWS, Linux, Firebase, Docker, Microsoft Azure, Automation, VPS",
    },
  ],
  Frameworks: [
    { name: "& Libraries", description: "WordPress, Stripe, Hubspot, Shopify" },
  ],
  "UI/UX Graphics Design": [
    {
      name: "& Design",
      description: "Figma, Canva, Adobe Photoshop, Workflow Diagram",
    },
  ],
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi, Welcome to QudMeet AI, a chance to Meet Quddus before meeting him. How can I help you know more about his Profile & Resume?",
    },
  ]);

  const [recognition, setRecognition] = useState(null);
  const [listening, setListening] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const speechRecognition = new SpeechRecognition();
      speechRecognition.continuous = false;
      speechRecognition.interimResults = false;
      speechRecognition.lang = "en-US";

      speechRecognition.onstart = () => setListening(true);
      speechRecognition.onend = () => setListening(false);
      speechRecognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleVoiceInput(transcript);
      };

      setRecognition(speechRecognition);
    } else {
      console.warn("Speech recognition not supported in this browser.");
    }
  }, []);

  const handleVoiceInput = (transcript) => {
    setMessageInput(transcript);
    handleSubmit(transcript);
  };

  const handleStartStop = () => {
    if (recognition) {
      if (listening) {
        recognition.stop();
      } else {
        recognition.start();
      }
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoRef.current.srcObject = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);

      const chunks = [];
      mediaRecorderRef.current.ondataavailable = (event) =>
        chunks.push(event.data);
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        setRecordedBlob(blob);
        videoRef.current.src = URL.createObjectURL(blob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const playRecordedVideo = () => {
    if (recordedBlob) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const sendVideoMessage = async () => {
    if (recordedBlob) {
      const formData = new FormData();
      formData.append("video", recordedBlob, "video_message.webm");

      try {
        const response = await fetch("/api/send-video", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          alert("Video message sent successfully!");
          setShowVideoModal(false);
          setRecordedBlob(null);
        } else {
          throw new Error("Failed to send video message");
        }
      } catch (error) {
        console.error("Error sending video message:", error);
        alert("Failed to send video message. Please try again.");
      }
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await handleSubmit(messageInput);
  };

  const handleSubmit = async (input) => {
    let newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setMessageInput("");

    // Simulating API call (replace with actual API call when ready)
    setTimeout(() => {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "Hi, Welcome to QudMeet AI, a chance to Meet Quddus before meeting him. How can I help you know more about his Profile & Resume??",
        },
      ]);
    }, 1000);

    const apiMessage = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: newMessages }),
    }).then((res) => res.json());
    setMessages([
      ...newMessages,
      { role: "assistant", content: apiMessage.message },
    ]);
  };

  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const readAloud = (text) => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.onerror = (event) => {
        console.error("SpeechSynthesisUtterance.onerror", event);
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSkillInteraction = (skill) => {
    if (isMobile) {
      setActiveSkill(activeSkill?.name === skill.name ? null : skill);
    }
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-blue-400 to-yellow-300">
      <header className="bg-white bg-opacity-80 shadow-md px-4 z-40">
        <a href="#" className="logo-holder">
          <div className="logo">Q </div>
          <div className="logo-text">Qudmeet AI</div>
        </a>
        <nav>
          <ul id="menu" className={menuOpen ? "active" : ""}>
            <li>
              <a href="#Chatbot" className="button">
                <span style={{ color: "var(--yellow)", font: "bold" }}>AI</span>
              </a>
            </li>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/quddos/"
                className="button"
              >
                Arti
                <span style={{ color: "var(--yellow)", font: "bold" }}>
                  cles
                </span>
              </a>
            </li>
          </ul>
          <a href="#" className="mobile-toggle" onClick={toggleMobileMenu}>
            <svg
              className="w-8 h-8 text-gray-800 dark:text-yellow-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M5 7h14M5 12h14M5 17h10"
              />
            </svg>
          </a>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="flex flex-col md:flex-row items-center justify-between mb-16">
          <motion.div
            className="w-full md:w-1/2 mb-8 md:mb-0 border-spacing-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src="/imgs/quddus.png"
              alt="Quddus"
              className="w-100% p-2 rounded-lg shadow-lg"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                clipPath:
                  "polygon(0% 0%, 100% 0%, 100% 75%, 75% 100%, 0% 100%)",
              }}
            />
          </motion.div>
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-bold mb-4">Quddus Raheem</h1>

            <p className="text-xl mb-6">
              Over 5 Years of Professional Experience in Multiple Technical
              Domain
            </p>
            <div className="flex flex-wrap gap-4">
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
              {/* <button
                onClick={() => setShowVideoModal(true)}
                className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faVideo} className="mr-2" />
                Video Message
              </button> */}
            </div>
          </div>
        </section>

        <section id="skills" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">
            <small className="block text-lg text-gray-800">About Me</small>
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skillCategories).map(
              ([category, skills], index) => (
                <motion.div
                  key={category}
                  className="relative"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.div
                    className="bg-white bg-opacity-80 rounded-lg shadow-lg p-6 h-full"
                    whileHover={{ scale: 1.05, zIndex: 1 }}
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                      y: {
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      },
                    }}
                  >
                    <h3 className="text-xl font-semibold mb-4">{category}</h3>
                    <ul className="space-y-2">
                      {skills.map((skill) => (
                        <motion.li
                          key={skill.name}
                          className="cursor-pointer hover:text-blue-600 transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          onHoverStart={() =>
                            !isMobile && setActiveSkill(skill)
                          }
                          onHoverEnd={() => !isMobile && setActiveSkill(null)}
                          onClick={() => handleSkillInteraction(skill)}
                        >
                          {skill.name}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              )
            )}
          </div>
        </section>

        <AnimatePresence>
          {activeSkill && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
              <motion.div
                className="bg-white p-6 rounded-lg shadow-lg max-w-md pointer-events-auto relative"
                style={{
                  position: "absolute",
                  left: `${Math.random() * 60 + 20}%`,
                  top: `${Math.random() * 60 + 20}%`,
                }}
              >
                <h3 className="text-xl font-bold mb-2">{activeSkill.name}</h3>
                <p>{activeSkill.description}</p>
                {isMobile && (
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setActiveSkill(null)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chatbot section remains unchanged */}
        <section
          id="Chatbot"
          className="bg-white bg-opacity-80 rounded-lg shadow-lg p-6"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            <small className="block text-lg text-gray-600">AI Chatbot</small>
            Meet Me
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <h3 className="text-xl font-semibold mb-4">QUDMEET AI Chatbot</h3>
              <p className="mb-4">
                Welcome! This chatbot is designed to help you learn about my
                skills, work experience, and qualifications. Feel free to ask
                questions to get to know me better.
              </p>
              <p className="mb-4">
                You can also download my resume. I'm actively seeking new
                opportunities, so if you have a project in mind, let's connect!
              </p>
              <a
                href="./Raheem-Qudus.pdf"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
              >
                Download Resume
              </a>
            </div>
            <div className="md:w-2/3 bg-gray-100 rounded-lg p-4">
              <div className="h-80 overflow-y-auto mb-4">
                <ul className="space-y-4">
                  {messages.map((message, index) => (
                    <motion.li
                      key={index}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.role === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-white"
                        }`}
                      >
                        <span className="font-semibold">
                          {message.role === "user" ? "You" : "AI"}:
                        </span>
                        <p>{message.content}</p>
                        {message.role === "assistant" && (
                          <button
                            onClick={() => readAloud(message.content)}
                            className="mt-2 text-sm underline hover:text-gray-300"
                          >
                            <FontAwesomeIcon
                              icon={faVolumeUp}
                              className="mr-1"
                            />
                            Read Aloud
                          </button>
                        )}
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <form onSubmit={submitForm} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Hey Quddus, what skills are you best at?"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="flex-grow px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
                >
                  Send
                </button>
                <button
                  type="button"
                  onClick={handleStartStop}
                  className="bg-gray-200 text-gray-800 px-4  rounded-full hover:bg-gray-300 transition-colors duration-200"
                >
                  <FontAwesomeIcon
                    icon={listening ? faStopCircle : faMicrophone}
                  />
                </button>
              </form>
            </div>
          </div>
        </section>
        {/* 
        <div>
          <h1>Our Projects</h1>
          <ProjectSession />
        </div> */}

        <div id="projects">
          <AniProjectSession />
        </div>

        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
            Get to Know Quddus
          </h1>
          <AchievementBreakout />
        </div>
        <EducationSession />
        <BentoGrid />

        <WorkExperience />
        <Certifications />
        <FloatingFAQ />
        <FooterSignature />

       
        
       
        
      </main>
      {/* This is for popvid */}
      {/* About Modal */}
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

      {/* Video Message Modal
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            className="fixed inset-0 bg-black  bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-r  from-purple-400 via-pink-500 to-red-500 rounded-lg max-w-2xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="bg-white p-6 rounded-lg relative z-50">
                <button
                  onClick={() => {
                    setShowVideoModal(false);
                    setRecordedBlob(null);
                    setIsRecording(false);
                    setIsPlaying(false);
                    if (videoRef.current && videoRef.current.srcObject) {
                      const tracks = videoRef.current.srcObject.getTracks();
                      tracks.forEach((track) => track.stop());
                    }
                  }}
                  className="absolute  text-gray-500 hover:text-gray-700 "
                  aria-label="Close modal"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
                <h2 className="text-2xl p-0 font-bold ">Record Video Message</h2>
                <div className="aspect-w-9 aspect-h-5 mb-1 bg-gray-100 rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-full h-50 object-cover z-50"
                    autoPlay
                    muted
                    playsInline
                  />
                </div>
                <div className="flex justify-center space-x-4 mb-4 z-50">
                  {!isRecording && !recordedBlob && (
                    <button
                      onClick={startRecording}
                      className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors duration-200"
                    >
                      Start Recording
                    </button>
                  )}
                  {isRecording && (
                    <button
                      onClick={stopRecording}
                      className="bg-gray-600 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
                    >
                      Stop Recording
                    </button>
                  )}
                  {recordedBlob && !isPlaying && (
                    <button
                      onClick={playRecordedVideo}
                      className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
                    >
                      <FontAwesomeIcon icon={faPlay} className="mr-2" />
                      Play
                    </button>
                  )}
                  {recordedBlob && (
                    <>
                      <button
                        onClick={sendVideoMessage}
                        className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors duration-200"
                      >
                        Send Message
                      </button>
                      <button
                        onClick={() => {
                          setRecordedBlob(null);
                          setIsPlaying(false);
                        }}
                        className="bg-yellow-600 text-white px-6 py-2 rounded-full hover:bg-yellow-700 transition-colors duration-200"
                      >
                        <FontAwesomeIcon icon={faRedo} className="mr-2" />
                        Re-record
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  );
}
