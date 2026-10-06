import { ExperienceItem, PublicationItem, CertificationItem, Project } from './types';

export const PERSONAL_INFO = {
  name: "RISHAV TANDON",
  brand: ".rt",
  title: "CS ENGINEER",
  email: "tandonrishav18@gmail.com",
  phone: "+91 6204578740",
  college: "SRMIST",
  cgpa: "9.16",
  graduatingYear: "2027",
  classX: "91.20%",
  classXII: "81.80%",
  aboutHeroHeadline: {
    prefix: "Just a",
    role: "DEVELOPER",
    mid: "curious enough\nto",
    action: "BUILD",
    suffix: "anything"
  },
  bio: "As a Computer Science undergraduate focused on building software that's not just functional, but intelligent. I develop full stack applications with a design first mindset, create AI and machine learning-powered solutions, and work with data to uncover insights that drive meaningful impact. My goal is to build scalable, intuitive, and user-centric technology that solves real world problems.",
  resumeUrl: "/resume.pdf",
  socials: {
    linkedin: "https://www.linkedin.com/in/tandonrishav18",
    instagram: "https://www.instagram.com/tandon_rishav?stkn=MWYyOHBtbmxveWV1bA%3D%3D&utm_source=qr",
    github: "https://github.com/tandonrishav18"
  }
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "bluestock",
    role: "DATA ANALYST INTERN",
    company: "BLUESTOCK",
    period: "APR 2024 - JUN 2024",
    location: "REMOTE",
    type: "Internship",
    description: "Worked as a Data Analyst Intern at Bluestock Fintech, focusing on data cleaning, preprocessing, exploratory data analysis (EDA), and visualization of financial datasets. Analyzed trends and patterns to generate actionable insights, prepared reports, and supported business intelligence and data driven decision making through focused analysis of financial data.",
    certificateTitle: "Certificate of Internship - Data Analyst",
    certificateIssuer: "Bluestock Fintech & Startup India",
    certificateDate: "June 2024",
    certificateId: "BF-DA-2024-0892",
    skills: ["Data Cleaning", "EDA", "Financial Datasets", "Visualization", "Business Intelligence", "Python", "Pandas"],
    certificateType: "bluestock",
    logoUrl: "https://bluestock.in/static/assets/logo/logo-android.webp",
    imageUrl: "/work-exp-bluestock.png",
    certificatePdf: "/po.png"
  },
  {
    id: "aicte-ibm",
    role: "AI/ML INTERN",
    company: "AICTE - IBM SKILLSBUILD",
    period: "JAN 2024 - FEB 2024",
    location: "REMOTE",
    type: "Internship",
    description: "Completed a 6 week Internship in Artificial Intelligence and Machine Learning with Edunet Foundation in collaboration with AICTE and IBM SkillsBuild. Gained hands on experience in machine learning algorithms, data preprocessing, and model evaluation. Worked on hands on projects and gained practical knowledge in AI, machine learning, and real world applications.",
    certificateTitle: "Certificate of Completion - Artificial Intelligence & Machine Learning",
    certificateIssuer: "Edunet Foundation in collaboration with AICTE and IBM SkillsBuild",
    certificateDate: "February 2024",
    certificateId: "IBM-EF-AIML-2024-5172",
    skills: ["Machine Learning", "Model Evaluation", "IBM SkillsBuild", "Data Preprocessing", "Supervised Learning", "Neural Networks"],
    certificateType: "ibm_edunet",
    imageUrl: "/work-exp-aicte.png",
    certificatePdf: "/INTERNSHIP_cert.pdf"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "cine-suggest",
    title: "CINE SUGGEST - AI MOVIE DISCOVERY & TASTE ENGINE",
    category: "Web App & Recommendation Engine",
    description: "Modern, mood-first movie discovery platform that curates films based on emotional resonance, human tastes, and community curation rather than repetitive algorithms.",
    techStack: ["React.js", "TypeScript", "Tailwind CSS", "Node.js", "TMDB API", "AI Filtering"],
    githubUrl: "https://github.com/tandonrishav18/CineSuggest",
    liveUrl: "https://cine-suggest-murex.vercel.app/",
    highlights: [
      "Mood and vibe-based discovery replacing standard collaborative filtering",
      "Dynamic poster gallery layout with fluid micro-interactions",
      "Integrated search, watchlist curation, and community recommendations"
    ]
  },
  {
    id: "be-plus",
    title: "BE+ DIGITAL IDENTITY & CREATIVE EXPERIENCE",
    category: "Brand Design & Interactive Web",
    description: "Striking minimalist brand identity and interactive digital experience exploring texture, tactile paper tear metaphors, and modern typographic craftsmanship.",
    techStack: ["React.js", "TypeScript", "Tailwind CSS", "Motion", "SVG Shaders", "WebGL"],
    githubUrl: "https://github.com/tandonrishav18/Be-",
    liveUrl: "https://be-plus-frontend.vercel.app/",
    highlights: [
      "Tactile 3D paper tear and curl interaction with custom light-scattering shaders",
      "High-contrast bespoke editorial typography pairing and organic texture maps",
      "Interactive product launch showcase and brand storytelling experience"
    ]
  },
  {
    id: "flit-lifestyle",
    title: "ELIT - BESPOKE EDITORIAL PRODUCT IDENTITY",
    category: "Industrial & Brand Identity",
    description: "Minimalist visual identity system and industrial product showcase exploring bold elongated typography, metallic textures, and refined editorial micro-interactions.",
    techStack: ["React.js", "TypeScript", "Tailwind CSS", "Three.js", "Figma", "WebGL"],
    githubUrl: "https://github.com/tandonrishav18",
    liveUrl: "https://github.com/tandonrishav18",
    highlights: [
      "Custom condensed typographic font system with optical stem elongation",
      "Interactive 3D product material preview with physical lighting reflection",
      "Bespoke packaging and modern lifestyle brand design language"
    ]
  },
  {
    id: "nivala",
    title: "NIVALA - LEFTOVER FOOD MANAGEMENT & REDISTRIBUTION SYSTEM",
    category: "Community Logistics & Sustainability",
    description: "Full-stack food recovery and redistribution platform designed to bridge surplus meals from dining facilities to communities in need, reducing waste with real-time inventory tracking.",
    techStack: ["Java", "OOP", "JDBC", "MySQL", "Java Swing", "REST API", "Spring Boot", "React", "HTML", "CSS"],
    githubUrl: "https://github.com/tandonrishav18",
    liveUrl: "https://github.com/tandonrishav18",
    highlights: [
      "Built with Java OOP & JDBC connectivity with MySQL database backend",
      "Intuitive GUI interface to log, retrieve, and manage food donation and request records",
      "Optimized donation routing supporting zero-waste food logistics"
    ]
  },
  {
    id: "climora-iot",
    title: "CLIMORA - SMART CLIMATE TELEMETRY & ID BADGING",
    category: "IoT & Sustainable Infrastructure",
    description: "Enterprise IoT environment monitoring platform with digital employee credentials, localized climate sensors, and real-time carbon telemetry logging.",
    techStack: ["Python", "FastAPI", "React.js", "Tailwind CSS", "MQTT", "Edge Computing"],
    githubUrl: "https://github.com/tandonrishav18/CLIMORA",
    liveUrl: "https://climora-two.vercel.app/",
    highlights: [
      "Integrated employee RFID/NFC identity badging with environmental zone access",
      "Multi-sensor telemetry streaming for temperature, humidity, and air quality",
      "Automated HVAC optimization reducing facility energy consumption by 24%"
    ]
  },
  {
    id: "adbms-signage",
    title: "ADBMS - AIRPORT WAYFINDING & TERMINAL SIGNAGE",
    category: "Aviation Telemetry & Display Systems",
    description: "High-contrast digital wayfinding and terminal signage system designed for international airports, featuring high-visibility directional flight status and gate navigation.",
    techStack: ["React.js", "TypeScript", "Tailwind CSS", "Electron", "Redis", "WebSockets"],
    githubUrl: "https://github.com/rishavtandon/adbms-terminal-signage",
    liveUrl: "https://adbms-signage.demo.app",
    highlights: [
      "Ultra-high contrast aviation standard visual wayfinding iconography",
      "Sub-50ms synchronized gate updates across 200+ airport terminal screens",
      "Automated flight schedule delay routing and gate change broadcast engine"
    ]
  },
  {
    id: "spatio-temporal-iot",
    title: "SPATIO-TEMPORAL IOT EDGE CLIMATE DETECTOR",
    category: "Edge AI & IoT Analytics",
    description: "Distributed geospatial environmental anomaly detection system using Edge Computing and Machine Learning to process streaming sensor telemetry with sub-50ms latency.",
    techStack: ["Python", "KNN", "Edge Computing", "IoT Telemetry", "FastAPI", "Streamlit"],
    githubUrl: "https://github.com/rishavtandon/spatio-temporal-iot-anomaly",
    liveUrl: "https://climate-edge-ai.demo.app",
    highlights: [
      "KNN-based spatial clustering coupled with rolling temporal anomaly thresholds",
      "Real-time sensor stream ingestion with automated alerting triggers",
      "Accepted at IEEE ICIET 2024 for high precision anomaly localization"
    ]
  },
  {
    id: "yolov8-dental",
    title: "DENTAL DISEASE DIAGNOSTIC VISION SYSTEM",
    category: "Computer Vision & Medical AI",
    description: "Deep learning clinical diagnostic tool trained on 1,493 photographic dental images to identify dental pathologies with 92% precision and real-time 25ms inference.",
    techStack: ["PyTorch", "YOLOv8", "OpenCV", "FastAPI", "React", "Tailwind CSS"],
    githubUrl: "https://github.com/rishavtandon/dental-yolov8-diagnostic",
    liveUrl: "https://dental-vision-ai.demo.app",
    highlights: [
      "Custom annotated dataset of 1,493 clinical dental images",
      "92% mAP accuracy with 25ms GPU inference per intra-oral frame",
      "Clean web interface for non-invasive rapid clinical triage"
    ]
  },
  {
    id: "fintech-eda-engine",
    title: "REAL-TIME FINANCIAL INTELLIGENCE ENGINE",
    category: "Fintech & Data Systems",
    description: "Full-stack financial trend analyzer and automated EDA pipeline providing interactive multi-factor risk models, portfolio volatility heatmaps, and automated reporting.",
    techStack: ["React.js", "Node.js", "Express", "Python", "Tailwind CSS", "Recharts"],
    githubUrl: "https://github.com/rishavtandon/fintech-intelligence-dashboard",
    liveUrl: "https://fintech-analytics.demo.app",
    highlights: [
      "Automated outlier cleaning and statistical anomaly tagging on high-frequency trades",
      "Interactive candlestick charts and dynamic liquidity risk metrics",
      "Built with enterprise-grade microservice architecture"
    ]
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  // Certificate Card 1 (1024x791 -> 1.2946 ratio -> 482px height @ 624px width) - Tilt left -1.8deg
  {
    id: "sap-backend-developer",
    title: "SAP Certified - Back-End Developer - ABAP Cloud",
    issuer: "SAP SE",
    issueDate: "Apr 19, 2024",
    expiryDate: "April 2026",
    credentialId: "SAP-C_ABAPD_2309-881249",
    skills: ["ABAP Cloud", "Clean Core", "Core Data Services (CDS)", "RESTful Application Programming (RAP)", "SAP BTP"],
    description: "Demonstrating core competence in ABAP RESTful Application Programming Model (RAP), Core Data Services, and Clean Core development on SAP BTP.",
    certificateType: "custom_image",
    imageUrl: "/cert-card-1.png",
    height: "482px",
    tilt: -1.8
  },
  // Certificate Card 2 (1024x791 -> 1.2946 ratio -> 482px height @ 624px width) - Tilt right +1.8deg
  {
    id: "cisco-networking-basics",
    title: "Networking Basics",
    issuer: "CISCO",
    issueDate: "Nov 2024",
    expiryDate: "Nov 2025",
    credentialId: "CSCO-NET-2024-99214",
    skills: ["Network Protocols", "IPv4 / IPv6", "Ethernet & Switching", "Routers & Gateways", "Network Troubleshooting"],
    description: "Verified student-level credential for successfully completing the Cisco Networking Academy Networking Basics curriculum.",
    certificateType: "custom_image",
    imageUrl: "/cert-card-2.png",
    height: "482px",
    tilt: 1.8
  },
  // Certificate Card 3 (1024x791 -> 1.2946 ratio -> 482px height @ 624px width)
  {
    id: "ibm-aicte-aiml",
    title: "Artificial Intelligence Fundamentals",
    issuer: "IBM SKILLSBUILD",
    issueDate: "Feb 2024",
    expiryDate: "Lifetime",
    credentialId: "IBM-SB-AIF-2024-7182",
    skills: ["AI Fundamentals", "Machine Learning", "Neural Networks", "Data Ethics", "AI Applications"],
    description: "Rigorous industry certification covering foundational concepts of artificial intelligence, machine learning models, and cognitive computing.",
    certificateType: "custom_image",
    imageUrl: "/cert-card-3.png",
    height: "482px",
    certificatePdf: "/INTERNSHIP_cert.pdf"
  },
  // Certificate Card 4 (1600x1190 -> 1.3445 ratio -> 507px height @ 682px width) - Tilt left -1.8deg
  {
    id: "udemy-c-programming",
    title: "C Programming For Beginners",
    issuer: "UDEMY",
    issueDate: "2024",
    expiryDate: "Lifetime",
    credentialId: "UC-C-PROG-2024-8192",
    skills: ["C Language", "Pointers", "Memory Management", "Data Structures", "Control Flow"],
    description: "Mastery of fundamental programming paradigms, memory allocation, pointers, and data manipulation using standard C.",
    certificateType: "custom_image",
    imageUrl: "/cert-card-4.png",
    width: "682px",
    height: "507px",
    tilt: -1.8
  },
  // Certificate Card 5 (1727x1276 -> 1.3534 ratio -> 461px height @ 624px width)
  {
    id: "dbms-certification",
    title: "DBMS Course - Master the Fundamentals",
    issuer: "SCALER TOPICS",
    issueDate: "2024",
    expiryDate: "Lifetime",
    credentialId: "SCALER-DBMS-2024-3891",
    skills: ["SQL", "Relational Databases", "Normalization", "Query Optimization", "ACID Transactions"],
    description: "Practical proficiency in database system architecture, relational database design, query optimization, and transaction handling.",
    certificateType: "custom_image",
    imageUrl: "/cert-card-5.png",
    height: "461px"
  },
  // Certificate Card 6 (1024x733 -> 1.3970 ratio -> 447px height @ 624px width) - Tilt right +1.8deg
  {
    id: "nptel-machine-learning",
    title: "Introduction to Machine Learning",
    issuer: "NPTEL & IIT KHARAGPUR",
    issueDate: "2024",
    expiryDate: "Lifetime",
    credentialId: "NPTEL24CS91S3502019",
    skills: ["Machine Learning", "Supervised Learning", "Regression & Classification", "Optimization", "Model Evaluation"],
    description: "National programme credential covering mathematical formulations of supervised and unsupervised machine learning algorithms.",
    certificateType: "custom_image",
    imageUrl: "/cert-card-6.png",
    height: "447px",
    tilt: 1.8
  },
  // Certificate Card 7 (2000x1414 -> 1.4144 ratio -> 441px height @ 624px width) - Tilt left -1.8deg
  {
    id: "algo-university-cert",
    title: "Graph Theory Programming Camp",
    issuer: "ALGOUNIVERSITY",
    issueDate: "2024",
    expiryDate: "Lifetime",
    credentialId: "ALGO-GRAPHS-2024-5182",
    skills: ["Graph Algorithms", "BFS / DFS", "Shortest Path", "Network Flow", "Dynamic Programming"],
    description: "Intensive algorithmic training on advanced graph theory, topological sorting, graph traversal, and optimization.",
    certificateType: "custom_image",
    imageUrl: "/cert-card-7.png",
    height: "441px",
    tilt: -1.8
  },
  // Certificate Card 8 (1024x723 -> 1.4163 ratio -> 441px height @ 624px width)
  {
    id: "forage-deloitte-analytics",
    title: "Data Analytics Job Simulation",
    issuer: "DELOITTE & FORAGE",
    issueDate: "2024",
    expiryDate: "Lifetime",
    credentialId: "DELOITTE-FORAGE-DA-2024",
    skills: ["Data Analysis", "Forensic Technology", "Data Visualization", "Business Intelligence", "Problem Solving"],
    description: "Practical virtual experience simulating enterprise data analysis, forensic technology tasks, and visual reporting.",
    certificateType: "custom_image",
    imageUrl: "/cert-card-8.png",
    height: "441px"
  },
  // Certificate Card 9 (2000x1333 -> 1.5004 ratio -> 416px height @ 624px width)
  {
    id: "guvi-hcl-fullstack",
    title: "The Future of Full Stack Development",
    issuer: "GUVI & HCL",
    issueDate: "2026",
    expiryDate: "Lifetime",
    credentialId: "GUVI-HCL-FS-2026-901",
    skills: ["Full Stack Engineering", "Modern Web Systems", "Frontend Frameworks", "API Architecture", "Cloud Integration"],
    description: "Certificate of participation in key skills, architecture patterns, and next-generation frameworks for modern full stack software development.",
    certificateType: "custom_image",
    imageUrl: "/cert-card-9.png",
    height: "416px"
  },
  // Certificate Card 10 (1024x724 -> 1.4144 ratio -> 441px height @ 624px width)
  {
    id: "scriptarc-data-science",
    title: "Data Science Fundamentals",
    issuer: "SCRIPTARC",
    issueDate: "2024",
    expiryDate: "Lifetime",
    credentialId: "SCR-2026-000074",
    skills: ["Data Science", "Python Analytics", "Statistics", "Exploratory Data Analysis", "Predictive Modeling"],
    description: "Foundational training in statistical analysis, data cleaning, exploratory data analysis, and predictive workflows.",
    certificateType: "custom_image",
    imageUrl: "/cert-card-10.png",
    height: "441px"
  }
];

export const SKILLS_LIST = [
  "Python",
  "C",
  "C++",
  "Java",
  "JavaScript",
  "HTML",
  "Spring Boot",
  "APIs",
  "Flask",
  "Django",
  "Flutter",
  "CSS",
  "React.js",
  "Node.js",
  "Angular",
  "Docker",
  "Kubernetes",
  "DevOps",
  "AWS",
  "SQL",
  "OpenCV",
  "Computer Vision",
  "PyTorch",
  "Matplotlib",
  "Visualization",
  "DSA",
  "AI/ML/DL",
  "NLP",
  "Data Science",
  "Data Analysis",
  "AIOT",
  "OOP",
  "Operating System",
  "Computer Networks",
  "Web Development",
  "Cloud Computing",
  "Git",
  "Figma",
  "Agile & Scrum"
];

export const PUBLICATIONS: PublicationItem[] = [
  {
    id: "pub-climate-iot",
    title: "SPATIO - TEMPORAL EDGE INTELLIGENCE FRAMEWORK FOR RESILIENT GEOSPATIAL IOT-BASED CLIMATE ANOMALY DETECTION",
    journal: "ICIET 2026",
    date: "June 2026",
    authors: ["Nayan Raj", "Rishav Tandon", "Dr. R. Subash"],
    abstract: "Co-authored an IEEE ICIET 2026 accepted research paper on climate anomaly detection using IoT, Edge Computing, Machine Learning, and Geospatial Analytics. Developed a spatio-temporal framework leveraging KNN-based spatial analysis and temporal anomaly detection on environmental data to enable real-time monitoring, alerts, and data-driven decision support.",
    keyContributions: [
      "Edge-native inference pipeline minimizing cloud bandwidth overhead",
      "Hybrid spatial KNN neighbor correlation and temporal statistical deviation",
      "Validated across multi-station geospatial atmospheric sensor grids"
    ],
    pdfUrl: "/Paper2.pdf"
  },
  {
    id: "pub-dental-yolo",
    title: "DENTAL DISEASE DETECTION FROM PHOTOGRAPHIC IMAGES USING DEEP LEARNING",
    journal: "ICSTSDG 2024",
    date: "NOV 2024",
    authors: ["Ananya Agarwal", "Rishav Tandon", "Arya Awasthi", "Dr. Jyothna Lalithakumari", "Dr. R. Subash"],
    abstract: "Exploring AI powered dental screening using YOLOv8, deep learning, and computer vision to detect four dental conditions from photographic images. The system combines image preprocessing, data augmentation, and real-time object detection to identify affected areas, with a web-based AI assistant achieving 92% accuracy, 93.2% mAP@0.5, and 25ms inference in real time.",
    keyContributions: [
      "Curated and annotated 1,493 high-resolution intra-oral clinical photos",
      "Fine-tuned lightweight YOLOv8 network optimized for edge diagnosis",
      "Demonstrated 92% mean average precision with non-invasive patient screening"
    ],
    pdfUrl: "/RndPaper (2).pdf"
  }
];

export const WHAT_I_BRING = [
  {
    number: "01",
    title: "INTELLIGENT ENGINEERING",
    tag: "AI & ML",
    description: "AI, ML, DL, and computer vision – building intelligent systems where data becomes insight, models become decisions, and technology creates impact. Crafting intuitive journeys that reduce friction and maximize user efficiency through logical flow and architecture."
  },
  {
    number: "02",
    title: "THE STACK",
    tag: "Full Stack Architecture",
    description: "Design led development across the stack, creating thoughtful interfaces, building powerful backends, and connecting experiences through clean, reliable APIs. Crafting intuitive journeys that reduce friction and maximize user efficiency through logical flow and architecture."
  },
  {
    number: "03",
    title: "DECODE DATA",
    tag: "Data Analytics & Insights",
    description: "Turning raw data into meaningful insights from preprocessing and exploratory analysis to visualization and machine learning, using data to uncover patterns, answer questions, and drive smarter decisions."
  }
];
