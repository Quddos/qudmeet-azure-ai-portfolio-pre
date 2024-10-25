"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faMagnifyingGlass,
  faCircleStop,
  faMicrophone,
  faStopCircle,
  faVolumeUp,
  faIdBadge,
} from "@fortawesome/free-solid-svg-icons";
import { PinCard } from "@/components/PinCard";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { ScrollAchiever } from "@/components/ScrollAchiever";
import { NavbarHeader } from "@/components/Navbar";

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

  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const [recognition, setRecognition] = useState(null);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const speechRecognition = new window.webkitSpeechRecognition();
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

  const submitForm = async (e) => {
    e.preventDefault();
    await handleSubmit(messageInput);
  };

  const handleSubmit = async (input) => {
    let newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setMessageInput("");

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
    // Stop any ongoing speech synthesis
    window.speechSynthesis.cancel();

    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";

    // Error handling for speech synthesis
    utterance.onerror = (event) => {
      console.error("SpeechSynthesisUtterance.onerror", event);
    };

    // Speak the text
    window.speechSynthesis.speak(utterance);
  };

  const toggleModal = (text) => {
    setModalText(text);

    setModalOpen(!modalOpen);
  };

  const handleClick = (e, text) => {
    e.preventDefault(); // Prevent default behavior
    toggleModal(text);
  };

  const [whatsappChatOpen, setWhatsappChatOpen] = useState(false);

  const toggleWhatsappChat = () => {
    setWhatsappChatOpen(!whatsappChatOpen);
  };

  return (
    <>
 {/*       
      <header>
        <a href="#" className="logo-holder">
          <div className="logo">Q </div>
          <div className="logo-text">Quddus Profile</div>
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
                href="https://in.linkedin.com/company/bdnaturetech"
                className="button"
              >
                Founder Of{" "}
                <span style={{ color: "var(--yellow)", font: "bold" }}>
                  Bdnaturetech
                </span>
              </a>
            </li>
          </ul>
          <a href="#" className="mobile-toggle" onClick={toggleMobileMenu}>
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
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
      
      </header> */}

      <NavbarHeader/>

     

      <main>
      <section className="hero container">
          <div className="hero-blue">
            <div>
              <h1>
                <small>Hi.. I'm</small>
                Raheem Quddus
              </h1>
              <p>
                Software Engineer with 5 years of experience designing and
                implementing scalable, high-performance infrastructure
                solutions.{" "}
                <span>
                  {" "}
                  I possess a strong background in multi-technical domains, in
                  Project development, AI, Software Development, Saas, DevOps,
                  Technical Support etc.{" "}
                </span>
              </p>
              <div className="call-to-action">
                <a href="./Raheem_Qudus.pdf" className="button black">
                  View Resume
                </a>
                <a
                  href="mailto:raheemrquddus@gmail.com"
                  className="button white"
                >
                  Contact Me
                </a>

                <a href="http://github.com/quddos" className="button black">
                  <img src="./imgs/github.png" alt="GitHub" width="48" />
                </a>
                <a
                  href="https://www.linkedin.com/in/quddos/"
                  className="button white"
                >
                  <img src="./imgs/linkedin.png" alt="LinkedIn" width="48" />
                </a>
              </div>
            </div>
          </div>
          <div className="hero-yellow">
            <img src="./imgs/hero-image.png" alt="Adrian Twarog" width="100%" />
          </div>
        </section>

        <section className="logos container">
          <div className="marquee">
            <div className="track">
              <img src="./imgs/html.png" alt="HTML" width="128" />
              <img src="./imgs/css.png" alt="CSS" width="128" />
              <img src="./imgs/javascript.png" alt="JS" width="128" />
              <img src="./imgs/sass.png" width="128" alt="Sass" />
              <img src="./imgs/react.png" width="128" alt="React" />
              <img src="./imgs/nextjs.png" width="128" alt="Next JS" />
              <img src="./imgs/azure.png" width="128" alt="Azure" />
              <img src="./imgs/vscode.png" width="128" alt="VS Code" />
              <img src="./imgs/python.png" width="128" alt="Python" />
              <img src="./imgs/html.png" alt="HTML" width="128" />
              <img src="./imgs/css.png" alt="CSS" width="128" />
              <img src="./imgs/javascript.png" alt="JS" width="128" />
              <img src="./imgs/sass.png" width="128" alt="Sass" />
              <img src="./imgs/react.png" width="128" alt="React" />
              <img src="./imgs/nextjs.png" width="128" alt="Next JS" />
              <img src="./imgs/azure.png" width="128" alt="Azure" />
              <img src="./imgs/vscode.png" width="128" alt="VS Code" />
              <img src="./imgs/python.png" width="128" alt="Python" />
            </div>
          </div>
        </section>

        <section id="skills" className="skills container">
          <h2>
            <small>About Me</small>
            Skills
          </h2>
          <div className="holder-blue">
            <div className="left-column">
              <h3>Frontend</h3>
              <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>React</li>
                <li>Angular</li>
                <li>Vue</li>
                <li>SCSS</li>
                <li>jQuery</li>
                <li>Boostrap & Taiwind</li>
                <li>GraphQL</li>
                <li>AJAX/API</li>
              </ul>

              <h3>Backend</h3>
              <ul>
                <li>Node.js</li>
                <li>Express</li>
                <li>Python</li>
                <li>Java</li>
                <li>PHP</li>
                <li>Webhooks</li>
                <li>Dart</li>
                <li>Nextjs</li>
              </ul>

              <h3>AI/ML Tech Stack</h3>
              <ul>
                <li>PineonDB</li>
                <li>Langchain</li>
                <li>TensorFlow</li>
                <li>OpenAI</li>
                <li>Vercel AI Sdk</li>
                <li>Prisma</li>
              </ul>

              <h3>CLOUD/ DevOps</h3>
              <ul>
                <li>Amazon AWS</li>
                <li>Linux</li>
                <li>Cloud</li>
                <li>Automation</li>
                <li>AWS</li>
                <li>Firebase</li>
                <li>Microsoft Azure</li>
              </ul>

              <h3>Frameworks</h3>
              <ul>
                <li>wordpress</li>
                <li>Joomla</li>
                <li>Shopify</li>
                <li>Stripe</li>
                <li>Paypal</li>
                <li>Hubspot</li>
              </ul>

              <h3>UI/UX Graphics Design</h3>
              <ul>
                <li>Figma</li>
                <li>Flutterwave</li>
                <li>Canva</li>
                <li>Adobe Photoshop</li>
                <li>Sketch</li>
                <li>Workflow Diagram</li>
              </ul>
            </div>
          </div>
        </section>

      
        <section className="work-experience container ">
          <h2>
            <small></small>
            Work Experience
          </h2>
          <div className="jobs">
            <article>
              <figure>
                <div>
                  <img
                    src="./imgs/workplace-1.jpg"
                    alt="Workplace 1 - Edygrad - Raheem Quddus"
                    width="100%"
                  />
                  <figcaption>India - Visakhapatnam</figcaption>
                </div>
              </figure>
              <h3>Software Engineer - (Chief Technical Officer)</h3>
              <div>2023-current</div>
              <a href="https://in.linkedin.com/company/edygrad-1">EDYGRAD.</a>
            </article>
            <article>
              <figure>
                <div>
                  <img
                    src="./imgs/workplace-2.png"
                    alt="Workplace 2 - Bdnaturetech - Raheem Quddus"
                    width="100%"
                  />
                  <figcaption>Nigeria - Lagos</figcaption>
                </div>
              </figure>
              <h3>Senior Software Engineer</h3>
              <div>2021 - Founder</div>
              <a href="https://in.linkedin.com/company/bdnaturetech">
                BDNATURE TECH{" "}
              </a>
            </article>
            <article>
              <figure>
                <div>
                  <img
                    src="./imgs/workplace-3.jpg"
                    alt="Workplace 3 - Elakk Technologies - Raheem Quddus"
                    width="100%"
                  />
                  <figcaption>Hyderabad - India</figcaption>
                </div>
              </figure>
              <h3>Junior Technical Developer</h3>
              <div>2022-2023</div>
              <a href="https://in.linkedin.com/company/elakktechnologies">
                ELAKK TECHNOLOGIES.
              </a>
            </article>

            <article>
              <figure>
                <div>
                  <img
                    src="./imgs/workplace-4.jpg"
                    alt="Workplace 4 - Ark Technologies - Raheem Quddus"
                    width="100%"
                  />
                  <figcaption>Lagos - Nigeria</figcaption>
                </div>
              </figure>
              <h3>ATM - Software Engineer</h3>
              <div>2018-2020</div>
              <a href="https://www.linkedin.com/company/ark-technologies-group-ltd/">
                ARK TECHNOLOGIES.
              </a>
            </article>
          </div>
        </section>

        <section id="Chatbot" className="chatbot container">
          <h2>
            <small>AI Chatbot</small>
            Meet Me
          </h2>
          <div className="chatbot-blue">
            <div className="chat-info">
              <h3>QUDMEET AI Chatbot</h3>
              <p>
                Welcome! This chatbot is designed to help you learn about my
                skills, work experience, and qualifications. Feel free to ask
                questions to get to know me better.{" "}
              </p>
              <p>
                You can also download my resume. I'm actively seeking new
                opportunities, so if you have a project in mind, let's connect!
              </p>
              <a href="./Raheem_Qudus.pdf" className="button black">
                Download Resume
              </a>
            </div>
            <div className="chat-box">
              <div className="scroll-area">
                <ul id="chat-log">
                  {messages.map((message, index) => (
                    <li key={index} className={`${message.role}`}>
                      <span className={`avatar`}>
                        {message.role === "user" ? "You" : "AI"}
                      </span>
                      <div className="message">
                        {message.content}
                        {/* Button to read aloud the assistant's message */}
                        {message.role === "assistant" && (
                          <button
                            onClick={() => readAloud(message.content)}
                            className="read-aloud-button"
                          >
                            <FontAwesomeIcon icon={faVolumeUp} />
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <form onSubmit={submitForm} className="chat-message">
                <input
                  type="text"
                  placeholder="Hey Quddus, what skills are you best at?"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
                <button className="button black">Send</button>
                <button
                  type="button"
                  className="button black"
                  onClick={handleStartStop}
                >
                  <FontAwesomeIcon
                    icon={listening ? faStopCircle : faMicrophone}
                  />
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="container" id="portfolio">
          <div className="main-title">
            <h2>
              My Recent <span>Projects</span>
            </h2>
          </div>

          <div className="portfolios">
            <div className="portfolio-item">
              <div className="image">
                <img src="imgs/port1.png" alt="" />
              </div>
              <div className="hover-items">
                {modalOpen && (
                  <div className="modal">
                    <div className="modal-content">
                      <span
                        className="close"
                        onClick={() => setModalOpen(false)}
                      >
                        &times;
                      </span>
                      {/* Your modal content here */}
                      <p>
                        <small>Tech Use:</small>
                        {modalText}
                      </p>
                    </div>
                  </div>
                )}
                <h3>QudMEET AI Portfolio</h3>
                <div className="icons">
                  <a
                    href="https://github.com/Quddos/qudmeet-azure-ai-portfolio"
                    className="icon"
                  >
                    <FontAwesomeIcon icon={faMagnifyingGlass} rotation={90} />
                  </a>
                  <a href="" className="icon">
                    <FontAwesomeIcon
                      icon={faIdBadge}
                      onClick={(e) =>
                        handleClick(
                          e,
                          "Next.Js, Azure, OpenAI, Tailwind, Framer..."
                        )
                      }
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="portfolio-item">
              <div className="image">
                <img src="imgs/port2.jpg" alt="" />
              </div>
              <div className="hover-items">
                {modalOpen && (
                  <div className="modal">
                    <div className="modal-content">
                      <span
                        className="close"
                        onClick={() => setModalOpen(false)}
                      >
                        &times;
                      </span>
                      {/* Your modal content here */}
                      <p>
                        <small>Tech Use:</small>
                        {modalText}
                      </p>
                    </div>
                  </div>
                )}
                <h3>ChatPDF AI</h3>
                <div className="icons">
                  <a href="https://github.com/Quddos/bd-docai" className="icon">
                    <FontAwesomeIcon icon={faMagnifyingGlass} rotation={90} />
                  </a>
                  <a href="" className="icon">
                    <FontAwesomeIcon
                      icon={faIdBadge}
                      onClick={(e) =>
                        handleClick(
                          e,
                          "Langchain,Vercel,AWS S3, OpenAI,Nextjs,Stripe, NeomBD......."
                        )
                      }
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="portfolio-item">
              <div className="image">
                <img src="imgs/port3.png" alt="" />
              </div>
              <div className="hover-items">
                {modalOpen && (
                  <div className="modal">
                    <div className="modal-content">
                      <span
                        className="close"
                        onClick={() => setModalOpen(false)}
                      >
                        &times;
                      </span>
                      {/* Your modal content here */}
                      <p>
                        <small>Tech Use:</small>
                        {modalText}
                      </p>
                    </div>
                  </div>
                )}
                <h3>LMS- Learning Management system</h3>
                <div className="icons">
                  <a href="https://learn.bdnaturetech.com/" className="icon">
                    <FontAwesomeIcon icon={faMagnifyingGlass} rotation={90} />
                  </a>
                  <a href="" className="icon">
                    <FontAwesomeIcon
                      icon={faIdBadge}
                      onClick={(e) =>
                        handleClick(
                          e,
                          "Laravel,Php,Stripe,React, Sql, Tailwind CSS, RESTful API, PhPunit......."
                        )
                      }
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="portfolio-item">
              <div className="image">
                <img src="imgs/port5.png" alt="" />
              </div>
              <div className="hover-items">
                {modalOpen && (
                  <div className="modal">
                    <div className="modal-content">
                      <span
                        className="close"
                        onClick={() => setModalOpen(false)}
                      >
                        &times;
                      </span>
                      {/* Your modal content here */}
                      <p>
                        <small>Tech Use:</small>
                        {modalText}
                      </p>
                    </div>
                  </div>
                )}
                <h3>Job Compete Penetration Portal</h3>
                <div className="icons">
                  <a href="https://github.com/Quddos/bdjob" className="icon">
                    <FontAwesomeIcon icon={faMagnifyingGlass} rotation={90} />
                  </a>
                  <a href="" className="icon">
                    <FontAwesomeIcon
                      icon={faIdBadge}
                      onClick={(e) =>
                        handleClick(
                          e,
                          "Nexus, firebase, React, Radix UI, Taiwind CSS, tRPC, Prisma........"
                        )
                      }
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="portfolio-item">
              <div className="image">
                <img src="imgs/port6.png" alt="" />
              </div>
              <div className="hover-items">
                {modalOpen && (
                  <div className="modal">
                    <div className="modal-content">
                      <span
                        className="close"
                        onClick={() => setModalOpen(false)}
                      >
                        &times;
                      </span>
                      {/* Your modal content here */}
                      <p>
                        <small>Tech Use:</small>
                        {modalText}
                      </p>
                    </div>
                  </div>
                )}
                <h3>DevOps Bootcamp Project Instructor</h3>
                <div className="icons">
                  <a
                    href="https://github.com/Quddos/DevOps-20-Days-2024"
                    className="icon"
                  >
                    <FontAwesomeIcon icon={faMagnifyingGlass} rotation={90} />
                  </a>
                  <a href="" className="icon">
                    <FontAwesomeIcon
                      icon={faIdBadge}
                      onClick={(e) =>
                        handleClick(
                          e,
                          "Marven, Apache Tomcat, Jenkins, Ansible, Kubernetes........"
                        )
                      }
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="portfolio-item">
              <div className="image">
                <img src="imgs/port7.png" alt="" />
              </div>
              <div className="hover-items">
                {modalOpen && (
                  <div className="modal">
                    <div className="modal-content">
                      <span
                        className="close"
                        onClick={() => setModalOpen(false)}
                      >
                        &times;
                      </span>
                      {/* Your modal content here */}
                      <p>
                        <small>Tech Use:</small>
                        {modalText}
                      </p>
                    </div>
                  </div>
                )}
                <h3>Other Projects</h3>
                <div className="icons">
                  <a href="https://github.com/Quddos/" className="icon">
                    <FontAwesomeIcon icon={faMagnifyingGlass} rotation={90} />
                  </a>
                  <a href="" className="icon">
                    <FontAwesomeIcon
                      icon={faIdBadge}
                      onClick={(e) => handleClick(e, "Other Projects.....")}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="projects" className="bento container">
          <h2>
            <small>Achievement</small>
            Completed Projects
          </h2>
          <div className="bento-grid">
            <a href="#" className="bento-item">
              {" "}
              <span>help</span>
              <img src="./imgs/bento-1.png" alt="BGCCI" width="100%" />
            </a>
            <a href="#" className="bento-item">
              <img src="./imgs/bento-2.png" alt="Churhview" width="100%" />
            </a>
            <a href="#" className="bento-item">
              <img src="./imgs/bento-3.png" alt="Harley" width="100%" />
            </a>
            <a href="#" className="bento-item">
              <img src="./imgs/bento-4.png" alt="Bunbury" width="100%" />
            </a>
            <a href="#" className="bento-item">
              <img src="./imgs/bento-6.png" alt="Running" width="100%" />
            </a>
            <a
              href="https://www.linkedin.com/posts/quddos_techmahindra-edygrad-edygrad-activity-7124810204998750208-uQfV?utm_source=share&utm_medium=member_desktop"
              className="bento-item"
            >
              <img src="./imgs/bento-7.png" alt="School" width="100%" />
            </a>
          </div>
        </section>

        <section id="Achievement" className="skills container">
          <h2>
            <small>Record of </small>
            Achievements | Volunteer
          </h2>
          <ScrollAchiever/>
          <div className="holder-blue">
            <div className="left-column">
              <h3>2023</h3>
              <ul>
                <li>
                  Cross-Plarform application Development Workshop - Instructor
                  Visakha Engineering College
                </li>
              </ul>

              <h3>2023</h3>
              <ul>
                <li>Young Achiever Exceptional Performance by (GCGC)</li>
              </ul>

              <h3>2022-2023</h3>
              <ul>
                <li>Leadership Skills Attestation Award (GISA)</li>
              </ul>

              <h3>2022</h3>
              <ul>
                <li>
                  • Vigilance Awareness Week (Participant) - by Union Bank Of
                  India
                </li>
              </ul>

              <h3>2021</h3>
              <ul>
                <li>Advance Africa Scholarship Grant </li>
              </ul>

              <h3>2021</h3>
              <ul>
                <li>
                  Minister of Education (Study In India) - Best Shot Recognition{" "}
                </li>
              </ul>

              <h3>2020</h3>
              <ul>
                <li>
                  Merit Scholarship Award Winning the SII (Study In India){" "}
                </li>
              </ul>

              <h3>2019</h3>
              <ul>
                <li>Promotion Award (Ark Technologies Group) </li>
              </ul>
            </div>
            <div className="right-column">
              <p style={{ paddingTop: "60px" }}>
                I Tutored around 70+ Visakha Engineering college students on
                application development, using Flutter and Firebase.
              </p>

              <p style={{ paddingTop: "40px" }}>
                Awarded by Gitam University Career Guidance Council, for
                completion of 4 internships and achievement of Extracurricular
                activities in the academy year 2021-2023
              </p>

              <p style={{ paddingTop: "35px" }}>
                Awarded by the Directorate of Student Life Visakhapatnam for
                representing Gitam University international students (over 500+
                students) as they elected President for the academy year
                2022/2023, Also organized more than 18+ events with my Teammates
                for internal and external social activities.
              </p>

              <p style={{ paddingTop: "20px" }}>
                workshop organized by Union Bank of India on the cyber risk
                involved in the Electronic Transaction process
              </p>

              <p style={{ paddingTop: "60px" }}>
                Programming for Data Science Certification Course Scholarship,
                awarded by Udemy | Access Bank of Nigeria. • 2020 - Merit
                Scholarship Award Winning the SII (Study In India) 2020
                scholarship award worth 10,500 USD, Under the Ministry of
                Education India, based on Outstanding performance in the SAT
                examination and Academy records.
              </p>

              <p style={{ paddingTop: "20px" }}>
                Best photoshoot of the month recognition.
              </p>

              <p style={{ paddingTop: "60px" }}>
                Winning the SII (Study In India) 2020 scholarship award worth
                10,500 USD, Under the Ministry of Education India, based on
                Outstanding performance in the SAT examination and Academy
                records.
              </p>

              <p style={{ paddingTop: "40px" }}>
                Award based on outstanding performance, and dedication to
                duties, awarded by Ark Technologies Group.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
