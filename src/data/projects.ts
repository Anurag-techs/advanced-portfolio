import type { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: "railway-safety",
    title: "Edge AI Railway Safety Dashboard",
    category: "AI/ML",
    subtitle: "Real-time monitoring and safety alerts using Edge AI and IoT.",
    shortDescription: "A real-time monitoring system using Edge AI to detect railway hazards, track conditions, and trigger instant safety warnings.",
    tags: ["Python", "React", "IoT", "AI/ML", "Vite", "TailwindCSS"],
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?auto=format&fit=crop&w=1200&q=80",
    ],
    githubUrl: "https://github.com/Anurag-techs/railway",
    liveUrl: "https://railway-mu-gules.vercel.app/",
    overview: "Edge AI Railway Safety Dashboard is an intelligent telemetric monitoring interface engineered to bridge machine learning computer vision with trackside IoT sensors. It offers low-latency obstacle detection, vibration anomalies monitoring, and critical audio-visual alert broadcasting for train operators.",
    problem: "Traditional railway track inspection relies heavily on periodic manual audits and delayed reporting, leading to undetected track obstructions, foreign object debris (FOD), or critical track fracture risks.",
    features: [
      "Real-time hazard detection pipeline simulation with sub-second alert broadcasting",
      "Interactive multi-sensor telemetry cards tracking track temperature, vibration, and obstacle proximity",
      "Auditory alarm engine with custom alert frequencies for urgent threat levels",
      "Dynamic obstacle categorization (Stationary Object, Debris, Animal / Track Incursion)",
      "Low-bandwidth telemetry polling simulator designed for remote edge connectivity",
      "Responsive high-contrast dark cockpit HUD designed for 24/7 operator readability"
    ],
    techStack: [
      { name: "React + Vite", role: "Frontend UI architecture with real-time UI state re-rendering" },
      { name: "Tailwind CSS", role: "High-contrast telemetry HUD styling and radar animations" },
      { name: "Edge AI / Computer Vision", role: "Object detection model architecture simulation" },
      { name: "Audio Web API", role: "Critical audible alarm cues for warning thresholds" },
    ],
    architecture: "Edge Sensor Ingestion -> Lightweight Vision Inference Layer -> WebSocket / Polling Stream -> React Telemetry Dashboard -> Audio Visual Notification Engine",
    challenges: [
      "Ensuring constant 60 FPS UI performance during rapid telemetry data stream updates",
      "Designing an unambiguous, mission-critical alarm hierarchy without visual clutter",
      "Simulating unstable track-side connectivity with resilient fallback states"
    ],
    results: [
      "Successfully deployed public web application on Vercel with zero cold-start delay",
      "Under 200ms simulated telemetry-to-screen alert propagation latency",
      "High praise for cockpit-grade accessibility and clarity in project presentations"
    ],
    lessonsLearned: [
      "Operator UX in mission-critical applications requires strict color discipline and zero ambiguity.",
      "Optimizing React re-renders with decoupled state slices is essential for telemetry streams."
    ]
  },
  {
    id: "rideagent-car-sharing",
    title: "RideAgent - Car Sharing App",
    category: "Full Stack",
    subtitle: "Full stack ridesharing platform with Razorpay integration.",
    shortDescription: "A modern MERN-stack ridesharing and carpooling platform featuring interactive map routing, seat booking, and secure Razorpay payment integration.",
    tags: ["MERN", "Razorpay", "Maps", "Real-time", "Node.js", "MongoDB"],
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
    ],
    githubUrl: "https://github.com/Anurag-techs",
    liveUrl: undefined,
    overview: "RideAgent is an end-to-end carpooling and shared-mobility platform engineered to connect drivers with passengers heading along the same transit corridors, reducing urban carbon footprints and commute expenses.",
    problem: "Urban commuters face inflated solo ride-hailing fares and congested highways, while vehicle owners travel with empty passenger seats without a safe, seamless way to coordinate and split costs.",
    features: [
      "Driver ride posting engine with pickup/drop locations, schedule, and fare per seat",
      "Passenger search with intelligent route filtering and seat reservation workflow",
      "Secure payment checkout gateway powered by Razorpay API integration",
      "JWT-based dual-role authentication (Driver & Passenger profiles)",
      "Ride history, live booking status indicators, and booking confirmation receipts",
      "Responsive mobile-first navigation designed for on-the-go booking"
    ],
    techStack: [
      { name: "React + Vite", role: "Modern frontend SPA with instant page transitions" },
      { name: "Node.js & Express", role: "RESTful API handling authentication, rides, and payment webhooks" },
      { name: "MongoDB & Mongoose", role: "Document schema modeling for users, rides, and transactions" },
      { name: "Razorpay SDK", role: "End-to-end checkout processing and order verification" },
    ],
    architecture: "Client SPA -> Express REST Gateway -> JWT Auth Guard -> MongoDB Data Tier -> Razorpay Webhook Callback",
    challenges: [
      "Guaranteeing transactional atomicity to prevent double-booking the last available seat",
      "Securing Razorpay signature verification on backend server to prevent forged payment tokens",
      "Handling edge-case passenger cancellations and refund states"
    ],
    results: [
      "Complete end-to-end booking and payment flow verified in sandbox environment",
      "Modular backend architecture ready for future geolocation map clustering"
    ],
    lessonsLearned: [
      "Cryptographic webhook verification is crucial when integrating financial payment gateways.",
      "Structuring relational data in MongoDB requires careful reference design to maintain integrity."
    ]
  },
  {
    id: "jarvis-assistant",
    title: "JARVIS AI Assistant",
    category: "Desktop Apps",
    subtitle: "Desktop voice assistant with AI capabilities.",
    shortDescription: "A Python-based desktop voice assistant integrating speech recognition, audio response generation, and automated system command execution.",
    tags: ["Python", "Voice AI", "Automation", "SpeechRecognition", "Pyttsx3"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    ],
    githubUrl: "https://github.com/Anurag-techs",
    liveUrl: undefined,
    overview: "JARVIS is an intelligent desktop voice assistant engineered in Python to streamline hands-free daily computer operations, system controls, information retrieval, and productivity automation.",
    problem: "Executing repetitive desktop workflows like searching articles, launching developer environments, and controlling system states interrupts deep focus and requires frequent context switching.",
    features: [
      "Real-time voice input capture with noise calibration via SpeechRecognition",
      "Natural conversational voice response synthesis using offline Pyttsx3 TTS engine",
      "System automation commands: application launching, volume control, and web searches",
      "Wikipedia and quick-fact scraping pipeline for instant knowledge answers",
      "Modular command handler routing architecture for easily extending new skills"
    ],
    techStack: [
      { name: "Python 3", role: "Core runtime execution and asynchronous process management" },
      { name: "SpeechRecognition", role: "Microphone audio signal digitization and speech-to-text parsing" },
      { name: "Pyttsx3", role: "Offline low-latency text-to-speech audio synthesis engine" },
      { name: "Subprocess & OS", role: "Desktop operating system hooks and program launch automation" }
    ],
    architecture: "Microphone Stream -> Noise Reduction Filter -> Speech-to-Text Parser -> Intent Router -> Skill Execution Engine -> TTS Audio Output",
    challenges: [
      "Filtering ambient background noise to prevent false-trigger voice interpretations",
      "Providing zero-latency speech feedback without blocking the main event loop"
    ],
    results: [
      "Reliable voice execution for frequent desktop actions with high recognition accuracy",
      "Fully offline-capable core commands with zero reliance on costly paid speech APIs"
    ],
    lessonsLearned: [
      "Speech input requires defensive acoustic threshold calibration across varied microphone hardware.",
      "Decoupling the speech listener from command executors prevents UI/loop freezes."
    ]
  },
  {
    id: "medimind-ai",
    title: "MediMind AI Healthcare Assistant",
    category: "AI/ML",
    subtitle: "Intelligent diagnostic assistant and healthcare symptom analysis.",
    shortDescription: "An AI-powered medical symptom reasoning assistant providing preliminary health assessments, triage guidance, and contextual wellness explanations.",
    tags: ["AI/ML", "NLP", "Python", "React", "HealthTech"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80",
    ],
    githubUrl: "https://github.com/Anurag-techs",
    liveUrl: undefined,
    overview: "MediMind AI assists users in understanding health symptoms through structured reasoning, providing informative preliminary triage insights while emphasizing professional medical consultations.",
    problem: "Navigating online health symptoms often leads to anxiety and inaccurate self-diagnoses due to disorganized, alarmist search results.",
    features: [
      "Interactive multi-question symptom intake questionnaire",
      "AI semantic assessment categorized by urgency level",
      "Preventive health recommendations and specialist doctor directory matching",
      "Clear medical disclaimers and emergency hotline prompts"
    ],
    techStack: [
      { name: "React + TypeScript", role: "Accessible, patient-friendly medical interface" },
      { name: "Python / Flask API", role: "Symptom extraction and classification pipeline" },
      { name: "Tailwind CSS", role: "Calming clinical dark-mode aesthetics" }
    ],
    architecture: "User Symptom Input -> NLP Parsing -> Clinical Knowledge Graph Classifier -> Urgency Scoring -> Patient Guidance View",
    challenges: [
      "Ensuring strict ethical safeguards and disclaimers so users never substitute AI for real doctors",
      "Accurately disambiguating vague user symptom descriptions"
    ],
    results: [
      "Clean, intuitive symptom triage workflow built with high user satisfaction in usability trials"
    ],
    lessonsLearned: [
      "AI in healthtech must prioritize safety, transparency, and conservative recommendation models."
    ]
  },
  {
    id: "spendsmart-finance",
    title: "SpendSmart Personal Finance",
    category: "Web Apps",
    subtitle: "Interactive financial tracking and budget forecasting dashboard.",
    shortDescription: "A smart expense management web app with interactive charts, recurring budget alerts, and automated financial insights.",
    tags: ["React", "TypeScript", "TailwindCSS", "ChartJS", "FinTech"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
    ],
    githubUrl: "https://github.com/Anurag-techs",
    liveUrl: undefined,
    overview: "SpendSmart is a modern personal finance tracker giving users clear visibility into spending habits, savings progress, and category breakdowns with intuitive data visualizations.",
    problem: "Most finance apps are cluttered with advertisements, confusing banking jargon, and lack clean, responsive visualizations for everyday users.",
    features: [
      "Dynamic expense logging with instant category tagging and visual color codes",
      "Visual financial breakdown with monthly burn-rate and category allocation charts",
      "Custom monthly spending caps with threshold progress warnings",
      "Exportable CSV summaries and offline local storage persistence"
    ],
    techStack: [
      { name: "React + Vite", role: "Fast component architecture" },
      { name: "Tailwind CSS", role: "Sleek glassmorphism financial cards" },
      { name: "Data Visualization", role: "Smooth animated expense distribution charts" }
    ],
    architecture: "Client Entry -> Local Storage / Redux Store -> Visual Chart Projection -> Budget Alert Logic",
    challenges: [
      "Creating seamless real-time recalculations across multiple chart views without layout stutter"
    ],
    results: [
      "Zero-latency interaction with complete client-side data privacy"
    ],
    lessonsLearned: [
      "Data visualization UX works best when complex numbers are paired with simple visual metaphors."
    ]
  },
  {
    id: "ai-travel-guide",
    title: "AI Travel Guide & Itinerary Planner",
    category: "AI/ML",
    subtitle: "Custom itinerary generator and intelligent route planner.",
    shortDescription: "An intelligent vacation planning tool that generates tailored multi-day itineraries, points of interest, and optimized daily travel schedules.",
    tags: ["Python", "AI/ML", "Flask", "React", "APIs"],
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80"
    ],
    githubUrl: "https://github.com/Anurag-techs",
    liveUrl: undefined,
    overview: "AI Travel Guide generates smart, day-by-day travel itineraries based on user interests, budget constraints, and group dynamics.",
    problem: "Planning vacations requires hours of cross-referencing maps, blog posts, and operating hours, often leading to poorly sequenced travel routes.",
    features: [
      "Preference-driven itinerary generator (Adventure, Culture, Culinary, Relaxation)",
      "Daily time-slotted activity scheduling with travel transit buffers",
      "Interactive destination cards highlighting local hidden gems and tips",
      "Shareable travel plans with one-click itinerary export"
    ],
    techStack: [
      { name: "Python / AI Prompting", role: "Structured itinerary synthesis engine" },
      { name: "React + Tailwind", role: "Interactive day-by-day timeline view" }
    ],
    architecture: "User Criteria -> AI Prompt Pipeline -> Structured JSON Parser -> Interactive Timeline UI",
    challenges: [
      "Enforcing strict JSON structure parsing from AI output to ensure stable UI rendering"
    ],
    results: [
      "Generates comprehensive 3-7 day travel itineraries in under 3 seconds"
    ],
    lessonsLearned: [
      "Validating AI outputs against TypeScript schemas prevents runtime breaking changes in UI."
    ]
  }
];

