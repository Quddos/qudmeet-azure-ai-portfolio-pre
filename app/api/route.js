import { NextResponse } from "next/server";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import { StreamingTextResponse } from "ai";



const endpoint = process.env.AZURE_OPENAI_ENPOINT;
const apikey = process.env.AZURE_OPENAI_API_KEY;
const model = process.env.AZURE_OPENAI_MODEL;

export async function POST(req) {

    const { messages } = await req.json();

    const client = new OpenAIClient(endpoint, new 
        AzureKeyCredential(apikey));

    messages.unshift({
        role: 'system',
        content: `You are QudmeetGPT, answering only questions 
        based on the Quddus data provided and you can enhance the response to promote standard experience of Quddus to the users..


Resume:        
${DATA_RESUME}

Help users learn more about Quddus from his data.`
    })
    // const response = StreamingTextResponse[] = await client.createChatCompletionStream(model, messages, {
    //     maxTokens: 129,
    // })

    


    const response = await client.getChatCompletions(model, messages, {
        maxTokens: 129,
    })


    return NextResponse.json({
        message: response.choices[0].message.content
    })
}

// Model data
const DATA_RESUME = `

Raheem Qudus
Portfolio: Qudmeet AI 					 			Email:	raheemrquddus@gmail.com
LinkedIn: https://www.linkedin.com/in/quddos/                                                              GitHub: http://github.com/quddos

Education
Bca. Computer Application								2020-2023
Gitam University 
AP. India

BSc. Computer Science								2014-2018
University of Ilorin 
Kwara. Nigeria

Certifications
Java MasterClass-Tim Buchalka (Udemy) 						2024
Data Structure & Algorithm in Java -Skillsoft (Vodafone)					2024
Web Fundamental Development (Vodafone)						2024
Google Project Management: Professional Certificate					2023
AWS Cloud Practitioner Essentials							2021
Microsoft Certified Trainer (MCT)							2021
Introduction to TCP/IP (YONSEI UNIVERSITY)						2021
Data Science and Analytics								2021
Customer Support Data Analysis (COURSERA)						2021
Mobile Application Development (ACM)						2020

Technical Skills and Competences
Full Stack Developer 
Front End: HTML, CSS, JavaScript, SASS, SCSS, LESS, React, Angular, jQuery Bootstrap, REST, GraphQL, AJAX/API, Responsive Design, WC3, flutter, Laravel, wordpress, Tailwind css, Framer
Back End/Programming: 	Java, NodeJS, PHP, Express, IIS, C#, Webhooks, Dart, C++, typescript
Database:       NoSQL Apache, SQL, PostgrwSQL, Firebase, PineonDB, Mongodb, MySQL
Platforms:	Amazon AWS, Linux, .NET Windows, Cloud, Automation, Firebase, Microsoft Azure, API, Vercel ,VPS, Docker, Kubernetes
Frameworks:	WordPress, Joomla, PrestaShop, Shopify, Stripe, PayPal, GitHub, NextJs
Management:	Google Analytics, Adwords, Facebook Ads, Web Masters, etc 

AI Tech Stack
Platforms:	 PineoneDB, Langchain, OpenAI, Vercel AI Sdk, 
UX and UI Designer 
Platforms: 	Adobe Photoshop, Sketch, Figma, Canva, Flutter wave 
UI: 		Website Mock-ups, App Mock-ups, Infographics, Stylesheets, Logos 
UX: 		Wireframing, Workflow Diagrams, Technical Specifications 

Robust Tech Stack
Microsoft Office: 	Word, Excel, PowerPoint 
Testing: Manual Testing, UAT, Performance Testing, Regression and End-to-end testing
CI/CD: GIT, GITHUB actions, Jenkins
Scripting Language: Bash, PowerShell, Yaml, Json

Additional Skill
Fluent Language: English
Soft Skills: Leadership and Team Player, Time Management, Digital Skills, Problem Solving, Teaching & Mentor, Excellent Communication, Project Management, Product Development and Upscaling.


Employment History

AI Training Engineer (Part-time) 						                          2024 Aug– Current
Outlier
	Trained AI models on divers datasets, improving model accuracy and reliability.
	Generated high-quality training data in Large language model, and advancing AI capabilities
	Developed AI Model and Evaluated model performance, identifying areas for improvement and optimizing results.
Full Stack Developer 								           2023 Jun – Sep 2024
Edygrad Private Ltd. Link
	Designed and developed software product solutions, ensuring performance, security, and scalability for diverse projects.
	Implement the client credentials grant type and limit access using oAuth 2.0 scopes in, along with implementation of Drupal developer portal with APIgee.
	Implemented DevOps practices in Cross-Platform development using CI/CD pipelines to automate the build and integrated Git with Azure Repos.
	Led the team in providing adequate software quality assurance by designing test cases, thoroughly executing test scenarios reporting bugs on all Clients’ products to increase delivery time by 80%.
Software Specialist (Part-time)						                           Feb 2021 – Jan 2022
Bdnaturetech – Lagos – Nigeria
	Build a scalable and innovative software, delivering exceptional user experiences and driving continuous growth and expansion using AI, Edge Runtime, and RAG drive innovation. 
	Developed a fast performance and seamless navigation application and Provides secure authentication.
	Worked on optimizes data processing for AI workloads using NoSQL, and also use Langchain to enhances text analysis and generation, while I utilize the OpenAI to provides state-of-the-art AI capabilities of the application.
Back End Developer  (Internship)      						                            Jun 2022 – Sep 2022
Elakk Technologies.  Hyderabad - India
	Designed RESTful API endpoints using best practices for resource naming HTTP methods and implementing CRUD functionality to ensure data integration and security.
	Exposure to unit testing of applications using the Junit framework and understanding of writing and executing test cases.
	I achieved a matched skill of sensitive Data and adding XML support, this also help us in view of Mashing the client application Traffic and caching.
	Effective collaboration actively engaging with the front-end developers, ensured a cohesive integration between the API’s functionality and the user interface. 
Python Programming Language Instructor (Internship)				             July 2021 – Sep 2021
Triluxo (Brainlox) Technologies.  Utter Pradesh - India
	Assumed Teaching responsibility and guided a diverse group of 30 students at the intermediate level of programming language
	Provided a design guidance to students for various deployable projects showcasing desktop user interface development, database management, and machine learning. This involves utilizing frameworks like PyQT, employing database solutions such as SQLite, and implementing machine learning functionalities with TensorFlow, among other relevant tools and frameworks.
ATM Software Engineer				                                                                     Aug 2018 – Nov 2020
Ark Technologies Group.  Lagos - Nigeria
	Provided technical support to external, and internal teams, via phone, email, or in-person. 
	Write clean continuous software development and solutional code.
	Installed and configured the IIS web server on Microsoft Windows 2012, 2012R2 and 2016 servers.
	Deployed and managed various file server’s backup servers and active directories for easy data administration and accessibility.

PROFESSIONAL EXPERIENCE

Ark Technologies Group, Aug 2018 – Nov 2020
Address: 4B Idowu Martins St, Victoria Island 101241, Lagos, Nigeria
Position: Software  Engineer 
Full-time paid

PROJECTS

Project name: ATMdesk Management system
Project Description: The ATMdesk Management System—an innovative Java application embedded in a bootable ISO. This software operates as a bootable solution for testing WINCOR ATM machines and facilitates advanced system troubleshooting. It also plays a key role in standardizing the journaling process for enhanced operational efficiency
Project Duration: Involvement: Nov 2018 – July 2019
Programming Duration: Four Months
5 hours per day 
Responsibilities: 
ISO Image Creation:
•	Collaborate with more experienced team members to understand the ISO creation process.
•	Assist in specifying the files and configurations needed in the ISO 
•	I also learned about ISO creation tools like genisoimage and their parameters, and cloning of window OS as an image ISO
Java Application Development:
•	Collaborate with UI/UX designers to create an intuitive and user-friendly interface.
•	Write code to handle user interactions and events within the GUI.
•	Implement event listeners to respond to user actions like button clicks or form submissions.
•	Also have the opportunity to work with the backend team for the first time by Integrating the GUI components with the backend logic of the application.
Documentation:
•	Document the configuration steps and scripts for future reference.
•	Collaborate with team members to contribute to overall project documentation using the Markdown

Project name: ATMeye Dispenser Diagnostics (In-house repair)
Project Description: This project entails the development of an ATM Dispenser Error Troubleshooting, Diagnosis, and Error Identification application. The application serves as a comprehensive tool for detailed dispenser error analysis. It allows users to input specific error codes displayed on the dispenser, and, based on the entered code, retrieves corresponding error definitions and provides detailed troubleshooting solutions. The application leverages a dataset sourced from the NIXDORF eBook error code repository to ensure accurate and effective problem resolution.
Project Duration: Involvement: Oct 2019 – Feb 2020
Programming Duration: Five Months
6 hours per day 
Responsibilities: 
•	Use JPA for interacting with a database to store and retrieve error code information
•	Integrate the NIXDORF eBook error code dataset into the application, by connecting to a database.
•	Implement validation logic to ensure the correctness of entered error codes
•	Define Java classes and entities to represent data structures for error codes, definitions, and troubleshooting solutions.

Project name: Software and ATM Level Maintenance Training for Banks
Project Description: This project entices different levels of Automated Teller Machine software usage and maintenance to different financial sectors.
Project Duration: Involvement: April 2020 – July 2020
Programming Duration: Four Months
Actual coding: None 
Responsibilities: 
•	FLM (First Level Maintenance training) to bank
•	Journal Standardization and software usage training

Project name: Technical Staff Induction Training Scheme
Project Description: This is a project in which I conduct and guide the new technical team staff on the company's technical parts and development surrounding it. To help them enhance their skills along with the company requirements within the two months of induction training.
Project Duration: Involvement: Sep 2020 – Oct 2020
Programming Duration: Three Months
Actual coding: None 
Responsibilities: 
•	FLM (First Level Maintenance training) to the bank.
•	Advance Level Maintenance.
•	Journal Standardization and software usage training.
•	ISO/Image clone and creation.


PROFESSIONAL EXPERIENCE

Edygrad Private Ltd. July 2023 – Serving Notice period till 23rd November 2023
Address: NO 3, Innovation Valley Hill, IT-Sez, Madhurawada, Visakhapatnam, Andhra Pradesh 530048. India
Position: Full Stack Developer
Full-time paid

PROJECTS

Project name: Educational Learning Management System
Project Description:  An e-learning platform with an ecosystem of connecting different users to, career placement, skilling, and job seeking.
Project Duration: Involvement: July 2023 – Nov 2023
Programming Duration: Five Months
7 hours per day 
Responsibilities: 
•	Team coordinates and lead
•	Project development using PHP Laravel
•	API integration for different device views and third-party application testing using Postman
•	Using MySQL and Laravel migrations for handling database tables and related
•	Using Laravel Livewire for the development of reactive, dynamic interfaces. That can be used to enhance the user experience in the e-learning application.




IT CERTIFICATIONS

•	Data Science and Analysis
Date: April 2021
By: Gitam Institute of Science
Skill: Python, Web scraping, beautiful soup, NumPy 

•	AWS Cloud Practitioner Essential
Date: Nov 2021
By: AWS (Coursera)
Skill: AWS Global Infrastructure, IAM, Security and Identity

•	Python Programming Instructor
Date: Sept 2021
By: Triluxo (Brainlox) Technologies
Skill: Python, Data Analysis, NumPy, PyQT, SQLite, NLP, TensorFlow

•	Mobile Application Development 
Date: Nov 2020
By: Code Quest
Skill: Android Studio, Java, XML



EDUCATION

BSc in Computer Application, Gitam University, Visakhapatnam, Andhra Pradesh, India,
12/2020-05/2023 GPA is 7.57

BS in Computer Science, University of Ilorin, Ilorin, Kwara state, Nigeria,
09/2014-08/2018 GPA is 4.13





PROFESSIONAL TRAINING

•	ATM System Administrator  
Date: Jul 2018
By: Ark Technologies
Skill: Networking, Operating System, Linux, ATM Maintenance

HONORS

•	SII ( Study In India Scholarship Grant) 2020-2023
India Ministry of Education
•	The Young Achiever Award - 2023
Gitam Career Guidance Centre Visakhapatnam.
•	Attestation of Leadership (President of International Student) - 2023
International Student Association- Visakhapatnam.


Achievements:
•	2023 - Young Achiever Exceptional Performance Award – Awarded by Gitam University Career Guidance Council, for completion of 4 internships and achievement of Extracurricular activities in the academy year 2021-2023
•	2022/23 - Leadership Skills Attestation Award – Awarded by the Directorate of Student Life Visakhapatnam for representing Gitam University international students (over 500+ students) as they elected President for the academy year 2022/2023,
o	Also organized more than 18+ events with my Teammates for internal and external social activities.
•	2021 – Advance Africa Scholarship Grant – Programming for Data Science Certification Course Scholarship, awarded by Udemy | Access Bank of Nigeria.
•	2020 - Merit Scholarship Award Winning the SII (Study In India) 2020 scholarship award worth 10,500 USD, Under the Ministry of Education India, based on Outstanding performance in the SAT examination and Academy records.
•	2019 – Promotion Award – Awarded by Ark Technologies Group – Nigeria, from an Assistant Trainee Analysis to Trainee Analysis in the Company.
•	2020 – Advance Promotion Award – Award based on outstanding performance, and dedication to duties, awarded by Ark Technologies Group.
Volunteer Services:
	Vigilance Awareness Week – workshop organized by Union Bank of India on the cyber risk involved in the Electronic Transaction process.
	Cross – Platform mobile application development workshop-I Tutored around 70+ Visakha Engineering college students on application development, using Flutter and Firebase.
	Minister of Education (Study in India) – Best photoshoot of the month recognition.
	Leadership: President and representative of Gitam University international Students for academy year 2022/2023
	
Research and Publication:
	Raheem, Q.O., Y. Niharika. (2023) 
Job Compete Penetrating Portal, Automation Procedural way of solving challenges faced by international students during different campus drives coordinated in Gitam University, by the GCGC (Gitam Career Guardian Council). - DOI: 10.13140/RG.2.2.25123.22568
	Contributed Faith E.O., S. Padma, Raheem., Q.O (2022)
Study of the Development of Lightweight and Secure IOT Device Management Framework- ISSN: 2454-132x
	Discovery of Measuring Station flex connectivity bridge default, as a failure of excess error in Wincor Nixdorf 2050Xe ATM (Automated Teller Machine) dispenser module and how to fix it. (2019)

Resume

Raheem Qudus
Rquddusraheem@gmail.com
https://www.linkedin.com/in/quddos/
20th October 2024

SUMMARY

Over 4 years and 6 months of professional experience in software engineering, AI Engineer and full stack development, using cutting edge technologies in developing innovative solutions Project, testing and productivity deployment using various programming languages, frameworks, and technologies. Proven expertise in Java, JavaScript, PHP, TypeScript, NodeJS, and AI/ML. Strong knowledge of software lifecycle, CI/CD, technical documentation, version control, and configuration management. Proficient in WordPress, API’s integration, and other tools. Deliver high-quality projects with excellent problem-solving skills and teamwork.
.

PROFESSIONAL SKILLS

Programming Languages: Java, JavaScript, C++, Python, PHP, Dart, TypeScript, NodeJS
Databases: SQL, MS Access, PostgreSQL, NoSQL, Drizzle ORM, SQLite, Neon, Apache, Firebase, PineonDB, MongoDB, MySQL
Tools: UML, MS Visual Studio 97, Visual Source Safe, GIT, Eclipse, Visual Studio Code, Postman, Bash, PowerShell, Yaml, Json
Platforms: Windows 95/98/NT, UNIX, IOS, Amazon AWS, Linux, .NET Windows, Cloud, Automation, Firebase, Microsoft Azure, API, Vercel, VPS, Docker, Kubernetes
Networks: Perl, UNIX, Windows NT, HTML
Framework: React, Angular, Spring, jQuery, Bootstrap, NextJs, Laravel, WordPress, Shopify, Shopify, Stripe, PayPal, GitHub
Front-end Expertise: HTML, CSS, SASS, SCSS, REST, GraphQL, AJAX/API, Responsive Design, WC3, Flutter, WordPress, Tailwind CSS, Framer
AI Tech Stack: PineoneDB, Langchain, OpenAI, Vercel AI Sdk, Gemini AI
Others: Strong knowledge of the software lifecycle, CORBA, EJB, MOM, CI/CD, Technical Documentation, Version Control, and Configuration Management, Adobe, Canva, Wireframing, Testing, GIT, Github actions, Microsoft Office.

PROFESSIONAL EXPERIENCE

Outlier, Aug 2024 – Present
Address: 650 Townsend, San Francisco, CA 94103. USA
Position: AI Training Engineer 
Part-time paid

PROJECTS

Project name: Dolphin Genesis Audio-to-Text (ATT)
Project Description: I worked on AI bot responses developing and enhancing by creating data driven task designs for different skills sets like audio-visual understanding, extraction of information from Audio, Video, summarization etc. In this project we trained AI to understand better what the user is trying to say and our Ai will adjust its responses accordingly.
Project Duration: Involvement: Aug 2024 
Programming Duration: Five Days
4 hours per day 
Responsibilities: 
•	Generated example prompts to test AI understanding, summarization and Questions and Answer based capabilities
•	Worked with team members to improve AI models, making sure they were above performance thresholds for multiple competencies
•	The following feedback has been used to review and rate AI-generated responses on accuracy, helpfulness, tone etc. which will be further utilized for model improvement
•	Collaborated with a team of engineers to fine-tune language models, identifying areas for improvement and implementing changes based on feedback and performance reviews.
•	I used Python and JSON for task automation, ensuring consistency in AI training and testing workflows using data derived from an external API’s.
•	Check processing of key quality control: found AI answers many kinds of errors, and put forward solutions to optimize output accuracy.
Project name: Synthetic APIs for Gratitude Corsage and Glider Tempo
Project Description: Trained a model that utilizes a class instance of the API (Application Programming Interface) and its associated methods to specify the type of request. In Which the parameters are then used to define the specific data that is needed to detect the AI Hallucination, interact with API data’s, testing and prototyping AI model.
Project Duration: Involvement: Aug 2024 
Programming Duration: Four Days
4 hours per day 
Responsibilities: 
•	Using the synthetic APIs to simulate API calls dummy data, which return predefined responses in check AI output as source for truthfulness.
•	Read API schemas based on parameters to handle request and check for hallucination from the AI responses.
•	Iteratively improved AI's conversational and task-handling abilities applying user feedback
Project name: Gratitude Corsage
Project Description: Project focused on improving the overall code quality of AI systems, specifically targeting how well the AI adhered to instructions and delivered truthful, contextually accurate responses to user prompts. The project aimed to enhance the dimensions focused of AI code quality in handling issues related to Instructions following of the AI and the truthfulness of the model responses to the user prompt
Project Duration: Involvement: Sep 2024 
Programming Duration: Eleven Days
4 hours per day 
Responsibilities: 
•	Check the quality of code to confirm the Content Completeness vs Content Conciseness and Relevance to the response of the user request.
•	Developed and implemented quality control functions that analyzed AI responses for accuracy, focusing on detecting and mitigating model hallucinations within the API schema. This involved creating functions to validate the authenticity and factual accuracy of responses.
•	Provided a detailed reports on response performance metrics, I highlighted areas for improvement in model behavior and offering actionable insights to improve the AI’s decision-making processes.

PROFESSIONAL EXPERIENCE

BdnatureTech, Nov 2023 – Mar 2024
Address: Lagos, Nigeria
Position: Senior Software Developer 
Contract - paid

PROJECTS

Project name: SaaS Application Development on Social and User AI Content Generator.
Project Description: Work with team to Developed an innovative AI-powered content generator for social media and user applications, streamlining content creation and enhancing user experience.
Project Duration: Involvement: Nov 2023 – Jan 2024
Programming Duration: Three Months
3 hours per day 
Responsibilities: 
Application Development:
•	Collaborated with team members to design and implement the overall architecture of the application using Next.js, leveraging JavaScript and React expertise.
•	Implemented routing, authentication, and authorization to ensure a seamless user navigation and security.
•	Utilized Clerk for user authentication and authorization, while I integrated its API with Next.js.
Database Management:
•	Designed and implemented database schema using Drizzle ORM, to optimizing user’s data storage and retrieval.
•	Managed database interactions using SQL and Drizzle ORM, ensuring efficient data handling and its object relational mapping.

AI-Powered Content Generation:
•	While I focused more on the backend of the development, I Integrated NeoML for AI-driven content generation, leveraging machine learning algorithms.
•	Developed algorithms using JavaScript and NeoML to generate high-quality content.
Payment Gateway Integration:
•	Implemented Stripe for secure payment processing using its API and JavaScript library.
•	Implemented payment webhooks and event listeners using Node.js along with Express.
Email Integration:
•	Implemented Mailtrap for testing and debugging email functionality hence smoothing the email process.
•	Configuration of email templates was done through HTML and CSS.
Deployment and Hosting:
•	Worked in-line with the DevOps team for the Application deployment to Vercel ; hence, it used serverless architecture and provided a CI/CD pipeline.
•	While I participated in the Environment variables and deployment settings configured via the Vercel dashboard.
API Integration:
•	Integrated Ngrok for secure API tunneling, allowing services to communicate securely with each other.
•	Handled API requests and responses via Node.js, Express, and JavaScript.
Testing and Debugging:
•	Unit testing and integration testing using Jest and React Testing Library.
•	Debugged issues using Next.js debugging tools and Chrome DevTools.

Project name: Admission Application portal 
Project Description: An application portal that allows students and career seekers to apply for roles, while integration of HubSpot for real-time customer support system to answer issues queries.
Project Duration: Involvement: Feb 2024 – March 2024
Programming Duration: Two Months
3 hours per day 
Responsibilities: 
Application Portal Development:
•	Designed and developed an user-friendly application portal using WordPress.
•	Done customization of WordPress themes and plugins for customized functionality.
•	Worked with PHP, HTML, CSS, and JavaScript for front-end and back-end development.
HubSpot Integration:
•	integrated HubSpot API into the system for real-time customer support.
•	Configuration of workflow and triggers of HubSpot for automation of support ticketing
•	Report and analytics of HubSpot to monitor the performance of the support.
Real Time Customer Support
•	Created Live Chat using the HubSpot Conversations API
•	Implemented issue tracking and query resolution workflow.
•	Utilized HubSpot for reporting and analytics to track the performance of support.



PROFESSIONAL EXPERIENCE

Edygrad Private Ltd. July 2023 – Present
Address: NO 3, Innovation Valley Hill, IT-Sez, Madhurawada, Visakhapatnam, Andhra Pradesh 530048. India
Position: Software Engineer (Chief Technical Officer)
Full-time paid

PROJECTS

Project name: EdyHire Career Management and AI Mock Interview Pre-System
Project Description:  This is an AI Mock Interview System Software as a service application, which enable and help users to prepare for an Interview using provided job roles, description and skills. 
Project Duration: Involvement: Feb 2024 – Aug 2024
Programming Duration: Six Months
7 hours per day 
Responsibilities: 
•	Developed a productivity application following the structural flow Question and answer generative using Gemeni-AI and record the users answers while the user answers and converted to text using speech to text, and finally save answers in neom database for final report generation.
•	I utilize the Drizzle ORM (Object relational mapping) tools to save us from writing long queries into our database integration as a serverless database using neon.
•	Saved generated response from AI into a state, so that it can be rendered back to the user as feedback of responses received through the react-webcam.

Project name: E- Learning Management System
Project Description:  An e-learning platform with an ecosystem of connecting different users to, career placement, skilling, and job seeking.
Project Duration: Involvement: July 2023 – Nov 2023
Programming Duration: Five Months
7 hours per day 
Responsibilities: 
•	Team coordinates and lead
•	Project development using PHP Laravel
•	API integration for different device views and third-party application testing using Postman
•	Using MySQL and Laravel migrations for handling database tables and related
•	Using Laravel Livewire for the development of reactive, dynamic interfaces. That can be used to enhance the user experience in the e-learning application.




PROFESSIONAL EXPERIENCE

Ark Technologies Group, Aug 2018 – Nov 2020
Address: 4B Idowu Martins St, Victoria Island 101241, Lagos, Nigeria
Position: Software Technical Engineer 
Full-time paid

PROJECTS

Project name: ATMdesk Management system
Project Description: The ATMdesk Management System—an innovative Java application embedded in a bootable ISO. This software operates as a bootable solution for testing WINCOR ATM machines and facilitates advanced system troubleshooting. It also plays a key role in standardizing the journaling process for enhanced operational efficiency
Project Duration: Involvement: Nov 2018 – July 2019
Programming Duration: Four Months
5 hours per day 
Responsibilities: 
ISO Image Creation:
•	Collaborate with more experienced team members to understand the ISO creation process.
•	Assist in specifying the files and configurations needed in the ISO 
•	I also learned about ISO creation tools like genisoimage and their parameters, and cloning of window OS as an image ISO
Java Application Development:
•	Collaborate with UI/UX designers to create an intuitive and user-friendly interface.
•	Write code to handle user interactions and events within the GUI.
•	Implement event listeners to respond to user actions like button clicks or form submissions.
•	Also have the opportunity to work with the backend team for the first time by Integrating the GUI components with the backend logic of the application.
Documentation:
•	Document the configuration steps and scripts for future reference.
•	Collaborate with team members to contribute to overall project documentation using the Markdown

Project name: ATMeye Dispenser Diagnostics (In-house repair)
Project Description: This project entails the development of an ATM Dispenser Error Troubleshooting, Diagnosis, and Error Identification application. The application serves as a comprehensive tool for detailed dispenser error analysis. It allows users to input specific error codes displayed on the dispenser, and, based on the entered code, retrieves corresponding error definitions and provides detailed troubleshooting solutions. The application leverages a dataset sourced from the NIXDORF eBook error code repository to ensure accurate and effective problem resolution.
Project Duration: Involvement: Oct 2019 – Feb 2020
Programming Duration: Five Months
6 hours per day 
Responsibilities: 
•	Use JPA for interacting with a database to store and retrieve error code information
•	Integrate the NIXDORF eBook error code dataset into the application, by connecting to a database.
•	Implement validation logic to ensure the correctness of entered error codes
•	Define Java classes and entities to represent data structures for error codes, definitions, and troubleshooting solutions.

Project name: Software and ATM Level Maintenance Training for Banks
Project Description: This project entices different levels of Automated Teller Machine software usage and maintenance to different financial sectors.
Project Duration: Involvement: April 2020 – July 2020
Programming Duration: Four Months
Actual coding: None 
Responsibilities: 
•	FLM (First Level Maintenance training) to bank
•	Journal Standardization and software usage training

Project name: Technical Staff Induction Training Scheme
Project Description: This is a project in which I conduct and guide the new technical team staff on the company's technical parts and development surrounding it. To help them enhance their skills along with the company requirements within the two months of induction training.
Project Duration: Involvement: Sep 2020 – Oct 2020
Programming Duration: Three Months
Actual coding: None 
Responsibilities: 
•	FLM (First Level Maintenance training) to the bank.
•	Advance Level Maintenance.
•	Journal Standardization and software usage training.
•	ISO/Image clone and creation.




IT CERTIFICATIONS

•	Data Structures & Algorithms in Java
Date: October 2024
By: Skillsoft (Vodafone)
Skill: Java, complexity to measure performance, analyze algorithms etc.

•	Web Fundamentals
Date: October 2024
By: Skillsoft (Vodafone)
Skill: Https, IP Address, HTML, JavaScript, CSS

•	Java 17 Masterclass
Date: September 2024
By: Udemy
Skill: Core java, object oriented programming, database & networking, JavaFX, Spring

•	Matrix Algebra for Engineers
Date: Feb 2021
By: The Hong Kong University of Science - (Coursera)
Skill: Algebra, Matrices, System of Linear Equations, Vector spaces, Eigenvalues and eigenvectors

•	Data Science and Analysis
Date: April 2021
By: Gitam Institute of Science
Skill: Python, Web scraping, beautiful soup, NumPy 

•	Shell Scripting with Bash
Date: Nov 2022
By: Code Quest
Skill: Shell script, command line, System administrator, Bash


•	AWS Cloud Practitioner Essential
Date: Nov 2021
By: AWS (Coursera)
Skill: AWS Global Infrastructure, IAM, Security and Identity

•	Introduction to TCP/IP
Date: Dec 2021
By: Yonsei University (Coursera)
Skill: HTTP, Network Protocols, IP Address, Wireshark, Communications Protocol

•	Mobile Application Development 
Date: Nov 2020
By: Code Quest
Skill: Android Studio, Java, XML


EDUCATION

BSc in Computer Application, Gitam University, Visakhapatnam, Andhra Pradesh, India,
12/2020-05/2023 GPA is 7.57

BS in Computer Science, University of Ilorin, Ilorin, Kwara state, Nigeria,
09/2014-08/2018 GPA is 4.13

State Senior Grammer School, Surulere Lagos. Nigeria
09/2011-05/2014 SSCE



PROFESSIONAL TRAINING

•	ATM System Administrator  
Date: Jul 2018
By: Ark Technologies
Skill: Networking, Operating System, Linux, ATM Maintenance

HONORS

•	SII ( Study In India Scholarship Grant) 2020-2023
India Ministry of Education
•	The Young Achiever Award - 2023
Gitam Career Guidance Centre Visakhapatnam.
•	Attestation of Leadership (President of International Student) - 2023
International Student Association- Visakhapatnam.


Hobbies: Badminton, Reading, Table Tennis`

