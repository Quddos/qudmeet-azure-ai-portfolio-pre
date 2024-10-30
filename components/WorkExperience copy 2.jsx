"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const workExperiences = [
  {
    id: 1,
    year: 2024,
    newyear: "-current",
    company: "OUTLIER",
    role: "AI Training Engineer",
    description:
      "Trained AI models on divers’ datasets, improving model accuracy and reliability",
  },
  {
    id: 2,
    year: 2023,
    newyear: "-current",
    company: "EDYGRAD",
    role: "Software Engineer - CTO",
    description:
      "Designed and planned product development solutions, ensuring performance, security, and scalability for diverse projects",
  },
  {
    id: 3,
    year: 2022,
    newyear: "",
    company: "BDNATURETECH",
    role: "Senior Software Developer",
    description:
      "Build a scalable and innovative platform, delivering exceptional user experiences and driving continuous growth and expansion using AI, Edge Runtime, and RAG drive innovation",
  },
  {
    id: 4,
    year: 2012,
    newyear: "",
    company: "Elakk Technologies",
    role: "Junior Technical Developer",
    description:
      "Effective collaboration actively engaging with the front-end developers, ensured a cohesive integration between the API’s functionality and the user interface",
  },
  {
    id: 6,
    year: 2021,
    newyear: "",
    company: "Brainlox (Triluxo) Technologies.",
    role: "Python Programming Language Instructor(Intern)",
    description:
      "Build a scalable and innovative platform, delivering exceptional user experiences and driving continuous growth and expansion using AI, Edge Runtime, and RAG drive innovation",
  },
  {
    id: 7,
    year: 2018,
    newyear: "-2020",
    company: "Ark Technologies Group",
    role: "ATM Software Technical Engineer",
    description:
      "Used Microsoft identifiers platform to integrate user’s authentication in system application with MSAL.js Deployed and managed various file server’s backup servers and active directories for easy data administration and accessibility",
  },
];

const TypewriterText = ({ text }) => {
  const [displayedText, setDisplayedText] = React.useState("");
  const [currentIndex, setCurrentIndex] = React.useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return <span>{displayedText}</span>;
};

const WorkExperience = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <div className="container mx-auto px-4 py-16" ref={ref}>
      <h2 className="text-4xl font-bold text-center mb-12">Work Experience</h2>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-500 hidden md:block"></div>
        {/* <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-500"></div> */}

        {workExperiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            className={`flex flex-col md:flex-row items-center mb-16 ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
            // className={`flex items-center mb-16 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
            initial="hidden"
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 50 },
            }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div
              className={`w-full md:w-1/2 ${
                index % 2 === 0 ? "md:pl-8" : "md:pr-8"
              } mb-4 md:mb-0`}
            >
              {/* <div className={`w-1/2 ${index % 2 === 0 ? 'pl-2' : 'pr-2'}`}> */}
              <motion.div
                className="bg-white p-6 rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  {exp.company}
                </h3>
                <h4 className="text-lg md:text-xl text-blue-600 mb-2">
                  {exp.role}
                </h4>
                <p className="text-sm md:text-base text-gray-600 mb-4">
                  {exp.description}
                </p>
                <div className="text-sm text-gray-500">
                <TypewriterText text={`Worked here in ${exp.year}  ${exp.newyear}`} />
                  {/* <TypewriterText  text={`Worked here in ${exp.year}`} /> */}
                </div>
              </motion.div>
            </div>

            <div className="w-1/2 flex justify-center">
              <motion.div
              className="w-12 h-12 md:w-16 md:h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-base md:text-xl"
                // className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl"
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
                {exp.year} {exp.newyear}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperience;
