import { NextResponse } from "next/server";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";


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
        based on the resume provided.


Resume:        
${DATA_RESUME}

Help users learn more about Quddus from his remuse.`
    })

    


    const response = await client.getChatCompletions(model, messages, {
        maxTokens: 129,
    })


    return NextResponse.json({
        message: response.choices[0].message.content
    })
}

// Model data
const DATA_RESUME = `RAHEEM QUDUS


Tel: +91 9032782704		LinkedIn: https://www.linkedin.com/in/quddos/
Email: raheemquddus@gmail.com	GitHub: http://github.com/quddos
Portfolio: Qudmeet AI		 
                     
RESEARCH INTEREST
Artificial Intelligence
Life Science and Integration
Central Model Technologies 
Integration of AI in different Sector
Open to different availability 

EDUCATION 

Bsc	Gitam University – Andhra Pradesh. India	         2020 - May 2023
Computer Application
First Class
Thesis: Job Compete Penetration Portal an Automation resolution procedural approach to placement algorithm sorting and enhance candidateship selection of Gitam University Career Guidance.
Supervisor: Ass Professor MS.Y Niharika

BSc	University of Ilorin – Kwara State. Nigeria                          2014 - August 2018
	Second class upper division
Thesis: Discovery of Measuring Station connectivity bridge default as a failure of excess error in Wincor Nixdorf 2050Xe ATM (Automated Teller Machine) module dispenser and resolution.
   	Advisor: Dr David Oluwole 

RESEARCH EXPERIENCE

Research Interns – Hybrid                                                             2023 - Present
Industrial Software Production Engineer and AI Laboratories, Innopolis University, Russia     
NFTs (Non-Fungible Tokens) in Games: ¬An analysis of the current landscape and future possibilities.	
Supervisor: Professor Hamna Aslam, Hamza Salem
•	Performed blockchain based-based approach on digital games  
•	Exposed to parameters of Artificial intelligent integrations
•	Performed fast cloning for gene construct and complementation of models

Undergraduate Research Project
Gitam University, India				                                       2023
Job Compete Penetration Portal
Guidance: Professor Dr Uma Devi T. Ass Professor MS. Y Niharika
•	Streamlined the recruitment process by automating job postings and candidate screening for improved efficiency.
•	Designed and implemented innovative features such as a resume builder and skill assessment tools to enhance user experience.
•	Conducted a comprehensive analysis of job search challenges, leading to the development of the “job compete penetration Portal”.

Contributed (Fellow Student Research Prohect)
Gitam University, AP. India					         2022
Study of the Development of Leightweight and Secure IOT Device Management Framework. By: Faith E.O
Supervisor: S. Padma 
 
WORK EXPERIENCE

Software Engineer (Chief Technical Officer)			              2023-Current
Edygrad Private Ltd
Responsibility: 
•	Designed and planned product development solutions, ensuring performance, security, and scalability for diverse projects.
•	Oversee the design, development, and deployment of project, while I Implement the client credentials grant type and limit access using oAuth 2.0 scopes in, along with implementation of Drupal developer portal with API.	
•	Research and Development: Focus abreast of emerging technologies and trends in the educational technology.
•	Build a scalable and innovative platform, delivering exceptional user experiences and driving continuous growth and expansion using AI, Edge Runtime, and RAG drive innovation. 
Senior Software Developer (Part-time)			                        2022 - Present
Bdnaturetech – co-founder
Responsibility: 
•	Developed a fast performance and seamless navigation application using Next.js and Provides secure authentication processes with Clerk Auth.
•	Worked on optimizes data processing for AI workloads using PineoneDB, and also use Langchain to enhances text analysis and generation, while I utilize the OpenAI to provides state-of-the-art AI capabilities of the application.
•	I used Drizzle ORM + NeonDB to manages data efficiently for scalability, also utilized the AWS S3 to offers scalable and reliable data storage.
•	I worked on integration of Stripe in the application to facilitates secure and seamless payment processing
Junior Technical Developer (Internship)			       Oct 2022-Feb 2023
Elakk Technologies 




HONOURS AND AWARDS ACHIEVEMENT

Nigeria Data Protection Commission, Grant		                        2024
Responsible Data Management Cohort 1

Young Achiever Exceptional Performance Award                           2023     
Awarded by Gitam University Career Guidance Council 

Leadership Skill Attestation Award Certification                             2023
Awarded by the Directorate of Student life. Visakhapatnam

Advance Africa Scholarship Grant                                                    2021
Programming for Data Science Certification Schorlaship, awarded by Udemy | Access Bank of Nigeria.

Merit Scholarship Award – Study In India (SII)                               2020
Awarded by Ministry of Education India Scholarship worth 10,500USD based on outstanding performance in the SAT examination and Academic record.

Promotion Award                                                                                2019
Awarded by Ark Technologies Group – Nigeria, based on outstanding performance on duties.

CERTIFICATIONS

Google Project Management: Professional Certificate				2023
UI UX Bootcamp Designex (CSI)							2022
AWS Cloud Practitioner Essentials							2021
Microsoft Certified Trainer (MCT)							2021
Introduction to TCP/IP (YONSEI UNIVERSITY)					2021
Data Science and Analytics								2021
Customer Support Data Analysis (COURSERA)					2021
Mobile Application Development (ACM)						2020


TEACHING EXPERIENCE AND INVITED LECTURES

Visakha Institute of Engineering and Technology                 Feb 2024
Conducted Cross-Platform Application Development 14 days workshop

Tech Mahindra.                                                                      Dec - 2023
Conducted AI Development Bootcamp

Triluxo (Brainlox) Technologies.                                  July – sept 2021
Python Programming Language Instructor
Utter Pradesh India (Remotely)

SKILLS 

Soft Skill

•	Research and Project Development, Project Management
•	Leadership and Team work, Product Development and Upsclling
•	Problem solving skills, Business Intelligent
•	Teaching and Mentorship, Time Management
•	Excellent Communication, Analytic Skills

Technical Skill

•	Front End: HTML, CSS, JavaScript, SASS, SCSS, LESS, React, Angular, jQuery Bootstrap, REST, GraphQL, AJAX/API, Responsive Design, WC3, flutter, Laravel, wordpress, Tailwind css, Framer
•	Back End/Programming: 	python, Java, NodeJS, PHP, Express, IIS, C#, Webhooks, Dart, C++, typescript
•	Database:       NoSQL Apache, SQL, PostgrwSQL, Firebase, PineonDB, Mongodb, MySQL
•	Platforms:	Amazon AWS, Linux, .NET Windows, Cloud, Automation, Firebase, Microsoft Azure, API, Vercel ,VPS, Docker, Kubernetes
•	Frameworks:	WordPress, Joomla, PrestaShop, Shopify, Stripe, PayPal, GitHub, NextJs
•	Management:	Google Analytics, Adwords, Facebook Ads, Web Masters, etc 

•	AI Tech Stack
•	Platforms:	 PineoneDB, Langchain, OpenAI, Vercel AI Sdk, 
•	UX and UI Designer 
•	Platforms: 	Adobe Photoshop, Sketch, Figma, Canva, Flutter wave 
•	UI: 		Website Mock-ups, App Mock-ups, Infographics, Stylesheets, Logos 
•	UX: 		Wireframing, Workflow Diagrams, Technical Specifications 
•	Robust Tech Stack
•	Microsoft Office: 	Word, Excel, PowerPoint 
•	Testing: Manual Testing, UAT, Performance Testing, Regression and End-to-end testing
•	CI/CD: GIT, GITHUB actions, Jenkins
•	Scripting Language: Bash, PowerShell, Yaml, Json

PROFESSIONAL AFFILIATIONS / VOLUNTEER SERVICE

Gitam University					         	                       2022-2023
President - Gitam International Student Association 

Union Bank of India							 2021
Vigilant Awareness Week  

Member, Federation of International Student Association, 	            2021

PROFESSIONAL SERVICE

Peer-Reviewed Articles for:
•	Blockchain Research 
•	AI and Large Language Model
LANGUAGES

English: Native Language, Distinguished levels in Listening, Speaking, Reading, and Writing.
Telugu: Basic levels in Listening.

OTHERS
Mentoring students on career paths and public speaking
Sport of expertise: Badminton, Table Tennis, Swimming

Employment History

Software Engineer (Chief Technical Officer)						             2023 Jul – Current
Edygrad Private Ltd. Link
	Designed and planned product development solutions, ensuring performance, security, and scalability for diverse projects.
	Implement the client credentials grant type and limit access using oAuth 2.0 scopes in, along with implementation of Drupal developer portal with APIgee.
	Implemented DevOps practices in Cross-Platform development using CI/CD pipelines to automate the build and integrated Git with Azure Repos.
	Led the team in providing adequate software quality assurance by designing test cases, thoroughly executing test scenarios reporting bugs on all Clients’ products to increase delivery time by 40%.
	I Implemented Cross-platform application views data context Postman as it API development endpoint HTTP request and responses handlers, and handling both Token-Based and SPA authentication using Sanctum

Senior Software Developer (Part-time)						                                    2021 – Current
Bdnaturetech – Lagos – Nigeria
	Build a scalable and innovative platform, delivering exceptional user experiences and driving continuous growth and expansion using AI, Edge Runtime, and RAG drive innovation. 
	Developed a fast performance and seamless navigation application using Next.js and Provides secure authentication processes with Clerk Auth.
	Worked on optimizes data processing for AI workloads using PineoneDB, and also use Langchain to enhances text analysis and generation, while I utilize the OpenAI to provides state-of-the-art AI capabilities of the application.
	I used Drizzle ORM + NeonDB to manages data efficiently for scalability, also utilized the AWS S3 to offers scalable and reliable data storage.
	I worked on integration of Stripe in the application to facilitates secure and seamless payment processing.

Junior Technical Developer        						                            Oct 2022 – Feb 2023
Elakk Technologies.  Hyderabad - India
	Designed RESTful API endpoints using best practices for resource naming HTTP methods and implementing CRUD functionality to ensure data integration and security.
	Exposure to unit testing of applications using the Junit framework and understanding of writing and executing test cases.
	I achieved a matched skill of sensitive Data and adding XML support, this also help us in view of Mashing the client application Traffic and caching.
	Effective collaboration actively engaging with the front-end developers, ensured a cohesive integration between the API’s functionality and the user interface. 
	Trained and guide interns of 10 teams on web application development.

Python Programming Language Instructor (Internship)				             July 2021 – Sep 2021
Triluxo (Brainlox) Technologies.  Utter Pradesh - India
	Assumed Teaching responsibility and guided a diverse group of 30 students at the intermediate level of programming language
	Design presentation and Training curriculum
	Provided a design guidance to students for various deployable projects showcasing desktop user interface development, database management, and machine learning. This involves utilizing frameworks like PyQT, employing database solutions such as SQLite, and implementing machine learning functionalities with TensorFlow, among other relevant tools and frameworks.


ATM Software Technical Engineer				                                                                      2018 – 2020
Ark Technologies Group.  Lagos - Nigeria
	Provided technical support to customers, clients, and internal teams, via phone, email, or in-person. 
	Installed and configured the IIS web server on Microsoft Windows 2012, 2012R2 and 2016 servers.
	Used Microsoft identifiers platform to integrate user’s authentication in system application with MSAL.js
	Deployed and managed various file server’s backup servers and active directories for easy data administration and accessibility.
	Conducted an FLM (First Level Maintenance) usage of ATM modules training to bank staff before deployment.
	Wrote a clean and upscaling code to implement client’s needs.

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
	Discovery of Measuring Station flex connectivity bridge default, as a failure of excess error in Wincor Nixdorf 2050Xe ATM (Automated Teller Machine) dispenser module and how to fix it. (2019)`