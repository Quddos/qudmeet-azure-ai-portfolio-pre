"use client";
import { useState } from "react"
import Image from "next/image";
import { stringify } from "postcss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleStop
} from "@fortawesome/free-solid-svg-icons";


export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [messageInput, setMessageInput] = useState('');

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi, Welcome to QudMeet AI, a chance to Meet Quddus before meeting him. How can i help you know more about his Profile & Resume?'
    },

  ])

  const submitForm = async (e) => {
    e.preventDefault();
    // alert('form submitted');
    let newMessages = [...messages, { role: 'user', content: messageInput }]
    setMessages(newMessages);

    setMessageInput('');

    const apiMessage = await fetch(
      '/api',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages })
      }
    ).then(res => res.json());
    setMessages([...newMessages, { role: 'system', content: apiMessage.message }]);

  }

  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen)

  }

  return (
    <>
      <header>
        <a href="#" className="logo-holder">
          <div className="logo">Q </div>
          <div className="logo-text">Quddus Profile</div>
        </a>
        <nav>

          <ul id="menu" className={menuOpen ? "active" : ""}>
            <li>
              <a href="#Chatbot" className="button"><span style={{ color: "var(--yellow)", font: "bold" }}>AI</span></a>
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
              <a href="https://in.linkedin.com/company/bdnaturetech" className="button">Founder Of <span style={{ color: "var(--yellow)", font: "bold" }}>Bdnaturetech</span></a>
            </li>
          </ul>
          <a href="#" className="mobile-toggle" onClick={toggleMobileMenu}>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h10" />
            </svg>
          </a>
        </nav>

      </header>

      <main>
        <section className="hero container">
          <div className="hero-blue">
            <div>
              <h1><small>Hi.. I'm</small>
                Raheem Quddus
              </h1>
              <p>
                Software Engineer with 5 years of experience designing and implementing scalable, high-performance infrastructure solutions. <span> I possess a strong background in multi-technical domains, in Project development, AI, Software Development, Saas, DevOps, Technical Support etc. </span>
              </p>
              <div className="call-to-action">
                <a href="./Sample_Resume_Template.pdf" className="button black">
                  View Resume
                </a>
                <a href="mailto:hello@adriantwarog.com" className="button white">
                  Contact Me
                </a>

                <a href="http://github.com/quddos" className="button black">
                  <img src="./imgs/github.png" alt="GitHub" width="48" />
                </a>
                <a href="https://www.linkedin.com/in/quddos/" className="button white">
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

              </ul>


              <h3 >Backend</h3>
              <ul>
                <li>Node.js</li>
                <li>Express</li>
                <li>Python</li>
                <li>Java</li>
                <li>PHP</li>
                <li>Ruby</li>
              </ul>



              <h3 >AI/ML</h3>
              <ul>
                <li>Node.js</li>
                <li>Express</li>
                <li>Python</li>
                <li>Java</li>
                <li>PHP</li>
                <li>Ruby</li>
              </ul>



              <h3 >CLOUD/ DevOps</h3>
              <ul>
                <li>Node.js</li>
                <li>Express</li>
                <li>Python</li>
                <li>Java</li>
                <li>PHP</li>
                <li>Ruby</li>
              </ul>

            </div>
            <div className="right-column">

              <p>
                Hi I'm Adrian Twarog, a designer and developer who creates educational content on YouTube to teach others about HTML, CSS and JavaScript.  I'm interested in AI topics which is why I also add things like ChatGPT into my projects these days!
              </p>


              <p style={{ top: "30px" }}>
                I'm currently working on a project that uses Azure AI to create a chatbot that can help answer questions about web development.  I'm also working on a project that uses React and Next.js to create a portfolio website design that looks good.
              </p>

              <p style={{ top: "20px" }}>
                I'm currently working on a project that uses Azure AI to create a chatbot that can help answer questions about web development.  I'm also working on a project that uses React and Next.js to create a portfolio website design that looks good.
              </p>

              <p sstyle={{ top: "30px" }}>
                I'm currently working on a project that uses Azure AI to create a chatbot that can help answer questions about web development.  I'm also working on a project that uses React and Next.js to create a portfolio website design that looks good.
              </p>

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
                  <img src="./imgs/workplace-1.jpg" alt="Workplace 1 - Edygrad - Raheem Quddus" width="100%" />
                  <figcaption>
                    India - Visakhapatnam
                  </figcaption>
                </div>
              </figure>
              <h3>Software Engineer - (Chief Technical Officer)</h3>
              <div>2023-current</div>
              <a href="https://in.linkedin.com/company/edygrad-1">EDYGRAD.</a>
            </article>
            <article>
              <figure>
                <div>
                  <img src="./imgs/workplace-2.png" alt="Workplace 2 - Bdnaturetech - Raheem Quddus" width="100%" />
                  <figcaption>
                    Nigeria - Lagos
                  </figcaption>
                </div>
              </figure>
              <h3>Senior Software Engineer</h3>
              <div>2021 - Founder</div>
              <a href="https://in.linkedin.com/company/bdnaturetech">BDNATURE TECH </a>
            </article>
            <article>
              <figure>
                <div>
                  <img src="./imgs/workplace-3.jpg" alt="Workplace 3 - Elakk Technologies - Raheem Quddus" width="100%" />
                  <figcaption>
                    Hyderabad - India
                  </figcaption>
                </div>
              </figure>
              <h3>Junior Technical Developer</h3>
              <div>2022-2023</div>
              <a href="https://in.linkedin.com/company/elakktechnologies">ELAKK TECHNOLOGIES.</a>
            </article>

            <article>
              <figure>
                <div>
                  <img src="./imgs/workplace-4.jpg" alt="Workplace 4 - Ark Technologies - Raheem Quddus" width="100%" />
                  <figcaption>
                    Lagos - Nigeria
                  </figcaption>
                </div>
              </figure>
              <h3>ATM - Software Engineer</h3>
              <div>2018-2020</div>
              <a href="https://www.linkedin.com/company/ark-technologies-group-ltd/">ARK TECHNOLOGIES.</a>
            </article>

          </div>
        </section>
        <section id="Chatbot" className="chatbot container">
          <h2>
            <small>
              AI Chatbot
            </small>
            Meet Me
          </h2>
          <div className="chatbot-blue">
            <div className="chat-info">
              <h3>QUDMEET AI Chatbot</h3>
              <p>Welcome! This chatbot is designed to help you learn about my skills, work experience, and qualifications. Feel free to ask questions to get to know me better. </p>
              <p>You can also download my resume. I'm actively seeking new opportunities, so if you have a project in mind, let's connect!</p>
              <a href="./Sample_Resume_Template.pdf" className="button black">Download Resume</a>
            </div>
            <div className="chat-box">
              <div className="scroll-area">
                <ul id="chat-log">
                  {messages.map((message, index) => (
                    <li key={index} className={`${message.role}`}>
                      <span className={`avatar`}>{message.role === 'user' ? 'You' : 'AI'}</span>
                      <div className="message">{message.content}

                      </div>
                    </li>

                  ))}

                </ul>
              </div>
              <form onSubmit={submitForm} className="chat-message">
                <input type="text" placeholder="Hey Quddus, what skills are you best at?" value={messageInput} onChange={e => setMessageInput(e.target.value)} />
                <button className="button black">Send</button>
              </form>
            </div>
          </div>
        </section>
        <section className="container" id="portfolio">
          <div className="main-title">
            <h2>My <span>Portfolio</span></h2>
          </div>
          <p className="port-text">
            Here is some of my work that I've done in various programming languages.
          </p>
          <div className="portfolios">
            <div className="portfolio-item">
              <div className="image">
                <img src="imgs/port1.jpg" alt="" />
              </div>
              <div className="hover-items">
                <h3>Project Source</h3>
                <div className="icons">
                  <a href="#" className="icon">
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                    />
                  </a>
                  <a href="#" className="icon">
                    <i className="fab fa-behance"></i>
                  </a>
                  <a href="#" className="icon">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="portfolio-item">
              <div className="image">
                <img src="imgs/port2.jpg" alt="" />
              </div>
              <div className="hover-items">
                <h3>Project Source</h3>
                <div className="icons">
                  <a href="#" className="icon">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="#" className="icon">
                    <i className="fab fa-behance"></i>
                  </a>
                  <a href="#" className="icon">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="portfolio-item">
              <div className="image">
                <img src="imgs/port3.jpg" alt="" />
              </div>
              <div className="hover-items">
                <h3>Project Source</h3>
                <div className="icons">
                  <a href="#" className="icon">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="#" className="icon">
                    <i className="fab fa-behance"></i>
                  </a>
                  <a href="#" className="icon">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="portfolio-item">
              <div className="image">
                <img src="imgs/port4.jpg" alt="" />
              </div>
              <div className="hover-items">
                <h3>Project Source</h3>
                <div className="icons">
                  <a href="#" className="icon">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="#" className="icon">
                    <i className="fab fa-behance"></i>
                  </a>
                  <a href="#" className="icon">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="portfolio-item">
              <div className="image">
                <img src="imgs/port5.jpg" alt="" />
              </div>
              <div className="hover-items">
                <h3>Project Source</h3>
                <div className="icons">
                  <a href="#" className="icon">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="#" className="icon">
                    <i className="fab fa-behance"></i>
                  </a>
                  <a href="#" className="icon">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="portfolio-item">
              <div className="image">
                <img src="imgs/port2.jpg" alt="" />
              </div>
              <div className="hover-items">
                <h3>Project Source</h3>
                <div className="icons">
                  <a href="#" className="icon">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="#" className="icon">
                    <i className="fab fa-behance"></i>
                  </a>
                  <a href="#" className="icon">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="portfolio-item">
              <div className="image">
                <img src="imgs/port7.jpg" alt="" />
              </div>
              <div className="hover-items">
                <h3>Project Source</h3>
                <div className="icons">
                  <a href="#" className="icon">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="#" className="icon">
                    <i className="fab fa-behance"></i>
                  </a>
                  <a href="#" className="icon">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="projects" className="bento container">
          <h2>
            <small>
              Achievement
            </small>
            Completed Projects
          </h2>
          <div className="bento-grid">
            <a href="#" className="bento-item"> <span>help</span>
              <img src="./imgs/bento-1.jpg" alt="BGCCI" width="100%" />
            </a>
            <a href="#" className="bento-item">
              <img src="./imgs/bento-2.jpg" alt="Churhview" width="100%" />
            </a>
            <a href="#" className="bento-item">
              <img src="./imgs/bento-3.jpg" alt="Harley" width="100%" />
            </a>
            <a href="#" className="bento-item">
              <img src="./imgs/bento-5.jpg" alt="Bunbury" width="100%" />
            </a>
            <a href="#" className="bento-item">
              <img src="./imgs/bento-6.jpg" alt="Running" width="100%" />
            </a>
            <a href="https://www.linkedin.com/posts/quddos_techmahindra-edygrad-edygrad-activity-7124810204998750208-uQfV?utm_source=share&utm_medium=member_desktop" className="bento-item">
              <img src="./imgs/bento-7.png" alt="School" width="100%" />
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
