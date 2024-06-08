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
const DATA_RESUME = `Raheem Qudus

Phone:		+91 9032782704					
 Email:	raheemrquddus@gmail.com
Portfolio:		Qudmeet AI : https://qudmeet.bdnaturetech.com/ 					 
LinkedIn: Quddus Raheem : https://www.linkedin.com/in/quddos/
GitHub:	http://github.com/quddos

Education
BSc. Computer Application								2020-2023
Gitam University 
AP. India

BSc. Computer Science								2014-2018
Gitam University 
AP. India

Certifications
Google Project Management: Professional Certificate					2023
UI UX Bootcamp Designex (CSI)								2022
AWS Cloud Practitioner Essentials							2021
Microsoft Certified Trainer (MCT)							2021
Introduction to TCP/IP (YONSEI UNIVERSITY)						2021
Data Science and Analytics								2021
Customer Support Data Analysis (COURSERA)						2021
Mobile Application Development (ACM)							2020

Technical Skills and Competences
Full Stack Developer 
Front End: HTML, CSS, JavaScript, SASS, SCSS, LESS, SEO React, Angular, jQuery Bootstrap, REST, GraphQL, AJAX/API, Responsive Design, WC3, flutter, Laravel, wordpress
Back End: 	NodeJS, PHP MySQL, PostgreSQL, SQL, NoSQL Apache, Express, IIS, Webhooks, Dart
Platforms:	Amazon AWS, Linux, Windows, Cloud, Automation, Firebase, Microsoft Azure, API
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
UI: 		Website Mock-ups, App Mock-ups, Infographics, Stylesheets, Logos 
Testing: Manual Testing, UAT, Performance Testing, Regression and End-to-end testing
CI/CD: GIT, GITHUB actions, Jenkins
Scripting Language: Bash, PowerShell, Yaml, Json
Additional Skill
Fluent Language: English
Soft Skills: Leadership and Team Player, Time Management, Digital Skills, Problem Solving, Teaching & Mentor, Excellent Communication, Project Management, Product Development and Upscaling .
Employment History

Software Engineer (Chief Technical Officer)						                    2023 Jul – Current
Edygrad Private Ltd. Link
	Designed and planned product development solutions, ensuring performance, security, and scalability for diverse projects.
	Implement the client credentials grant type and limit access using oAuth 2.0 scopes in, along with implementation of Drupal developer portal with APIgee.
	Implemented DevOps practices in Cross-Platform development using CI/CD pipelines to automate the build and integrated Git with Azure Repos.
	Led the team in providing adequate software quality assurance by designing test cases, thoroughly executing test scenarios reporting bugs on all Clients’ products to increase delivery time by 40%.
	Implement Cross-platform application views data context Postman as it API development endpoint HTTP request and responses handlers, and handling both Token-Based and SPA authentication using Sanctum

Senior Software Developer (Part-time)						                                         2021  – Current
Bdnaturetech – Lagos - Nigeria
	Build a scalable and innovative platform, delivering exceptional user experiences and driving continuous growth and expansion using AI, Edge Runtime, and RAG drive innovation. 
	Developed a fast performance and seamless navigation application using Next.js and Provides secure authentication processes with Clerk Auth.
	Worked on optimizes data processing for AI workloads using PineoneDB, and also use Langchain to enhances text analysis and generation, while I utilize the OpenAI to provides state-of-the-art AI capabilities of the application.
	I used Drizzle ORM + NeonDB to manages data efficiently for scalability, also utilized the AWS S3 to offers scalable and reliable data storage.
	I worked on integration of Stripe in the application to facilitates secure and seamless payment processing.

Junior Technical Developer        						                                Oct 2022 – Feb 2023
Elakk Technologies.  Hyderabad - India
	Designed RESTful API endpoints using best practices for resource naming HTTP methods and implementing CRUD functionality to ensure data integration and security.
	Exposure to unit testing of applications using the Junit framework and understanding of writing and executing test cases.
	Mashing of sensitive Data and adding XML support, this also help us in view of Mashing the client application Traffic and caching.
	Effective collaboration actively engaging with the front-end developers, ensured a cohesive integration between the API’s functionality and the user interface. 
	Train and guide interns of 10 teams on web application development.

Python Programming Language Instructor (Internship)				                                July 2021 – Sep 2021
Triluxo (Brainlox) Technologies.  Utter Pradesh - India
	Assumed Teaching responsibility and guided a diverse group of 30 students at the intermediate level of programming language
	Design presentation and Training curriculum
	Provide design guidance to students for various deployable projects showcasing desktop user interface development, database management, and machine learning. This involves utilizing frameworks like PyQT, employing database solutions such as SQLite, and implementing machine learning functionalities with TensorFlow, among other relevant tools and frameworks.

ATM Software Technical Engineer				                                                                               2018 – 2020
Ark Technologies Group.  Lagos - Nigeria
	Provided technical support to customers, clients, and internal teams, via phone, email, or in-person. 
	Installed and configured the IIS web server on Microsoft Windows 2012, 2012R2 and 2016 servers.
	Used Microsoft identifiers platform to integrate user’s authentication in system application with MSAL.js
	Deployed and managed various file server’s backup servers and active directories for easy data administration and accessibility.
	Conduct an FLM (First Level Maintenance) usage of ATM modules training to bank staff before deployment.
	Write a clean and upscaling code to implement client’s needs.


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


Hobbies: Badminton, Reading, Table Tennis`

