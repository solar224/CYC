export const profileData = {
  contacts: [
    { label: "Email", value: "cyc.cs14 [at] nycu.edu.tw" },
    { label: "Phone", value: "(+886) 912 407 992" },
    { label: "Website", value: "https://solar224.github.io/CYC/", href: "https://solar224.github.io/CYC/" },
    { label: "LinkedIn", value: "YU-CHEN CHAN" },
    { label: "Github", value: "solar224 (YU-CHEN CHAN)", href: "https://github.com/solar224" },
  ],
  researchInterests:
    "My research integrates Next-Generation Network Architectures and Applied Mathematical Optimization. I apply metaheuristic algorithms and data-driven modeling to solve dynamic resource allocation challenges. Furthermore, I implement 3GPP standards via the free5GC project to optimize 5G Core (5GC) signaling flows. My ongoing work explores Cloud-Native Technologies, Network Function Virtualization (NFV), and Next-Generation Radio Architecture Frameworks to maximize telecommunication efficiency.",
  education: [
    {
      degree: "Master in Data Science and Engineering",
      school: "National Yang Ming Chiao Tung University, Hsinchu, Taiwan, Advisor: Dr. Jyh-Cheng Chen",
      gpa: "GPA:4.12/4.3",
      courses: "Relevant Coursework: Core Network Design and Implementation, Deep Learning, Pattern Recognition, Data  Mining.",
      period: "2025-Present",
    },
    {
      degree: "Bachelor of Computer and Communication Engineering",
      school: "National Kaohsiung University of Science and Technology, Kaohsiung, Taiwan, Advisor: Dr. Chuan-Wen Chiang",
      gpa: "GPA:3.93/4.0    Graduated Summa Cum Laude (Rank: 3/59)",
      courses: "Core CS : Algorithms, Evolutionary Computation, Operating Systems, Big Data Analysis, Computer Graphics.",
      extra: "Networking & Hardware: Computer Networks, Communication Principles, Introduction to VLSI, Digital Design.",
      period: "2021-2025",
    },
  ],
  researchExperience: [
    {
      role: "free5GC Research Contributor, NYCU Wireless Internet Engineering Lab",
      topics:
        "Participate in the free5GC open-source project, conduct in-depth research on 3GPP standards, and be responsible for implementing or optimizing the signaling processing flow of core network elements.",
      keywords: "5G-core, Next Generation Radio Architecture Framework, Linux foundation open source",
      period: "2025-Present",
    },
    {
      role: "Undergraduate Research Fellow, NKUST, NSTC Project",
      topics:
        "Develop an advanced surgical duration prediction model by integrating the Harris Hawks Optimization (HHO) algorithm with a mathematical framework to account for optimistic bias. Conducted data-driven analysis to improve the precision of hospital scheduling and optimize the allocation of critical medical resources.",
      keywords:
        "Harris Hawks Optimization (HHO), Surgical Duration Prediction, Optimistic Bias, Metaheuristic Algorithms, Healthcare Analytics",
      period: "2023-2024",
    },
  ],
  academicHonors: [
    { title: "2nd Place, AI Tool Application Category, The 29th International ICT Innovative Services Awards", year: "2024" },
    { title: "Honorable Mention, Educational AI Category, The 29th International ICT Innovative Services Awards" },
    { title: "First Prize, Senior Project Competition, College of Electrical Engineering and Computer Science, NKUST" },
    { title: "Bronze Award, National Technological University Programming Contest" },
    { title: "2nd Place, Senior Project Competition, Dept. of Computer and Communication Engineering, NKUST" },
    { title: "Excellence Award, Campus Creative Thinking Competition, NKUST" },
    { title: "Silver Award, National Technological University Programming Contest", year: "2023" },
    { title: "Honorable Mention, International Collegiate Programming Contest (ICPC) Asia Region" },
    { title: "Finalist, Educational Big Data Analysis Competition" },
    { title: "CPE Certificate, Solved 5 problems in Collegiate Programming Examination" },
    { title: "ITSA Certificate, Solved 7 problems in ITSA Online Programming Self-Assessment" },
  ],
  scholarships: [
    { title: "book Award, NKUST (Recipient for 4 Semesters)", year: "2022-2024" },
    { title: "Wen-Hsiang Educational Foundation Scholarship", year: "2023, 2024" },
    { title: "Outstanding Teaching Assistant Award, NKUST", year: "2023" },
    { title: "Enthusiastic Service Award, Undergraduate Summer Internship Program", year: "2024" },
  ],
  teachingExperience: [
    {
      role: "Undergraduate Teaching Assistant",
      org: "National Kaohsiung University of Science and Technology, CCE 22C00046: Probability",
      term: "Spring Semester 2024",
    },
    {
      role: "Undergraduate Teaching Assistant",
      org: "National Kaohsiung University of Science and Technology, CCE 122C10141: Linear Algebra",
      term: "Fall Semester 2024",
    },
    {
      role: "Volunteer Teacher",
      org: "Fude Elementary School",
      term: "Summer 2024",
    },
  ],
  certifications: [
    { title: "Level B technician for digital electronics, Workforce Development Agency", year: "2020" },
    { title: "Level C technician for computer software application, Workforce Development Agency", year: "2019" },
    { title: "Level C technician for industrial electronics", year: "2019" },
  ],
  projects: [
    {
      title: "5G-DPOP, NYCU Open-Source Core Network Design and Implementation CSIC30195",
      topics:
        "A 5G UPF observability platform powered by eBPF. Features real-time traffic monitoring, granular packet drop detection, and PFCP session correlation for free5GC without source code modification.",
      stack: "Go (Golang), C (eBPF), TypeScript, React, Docker, Prometheus, OpenTelemetry.",
      keywords: "eBPF、observability、5g-core",
      links: ["github"],
    },
    {
      title: "A Differentiated Teaching Platform for Computational Thinking, NKUST Data Mining and Optimization Lab",
      topics:
        "Developed a comprehensive programming learning platform that integrates Educational Data Mining (EDM) with diverse pedagogical approaches, including Adaptive Learning, Instructional Scaffolding, Pair Programming, and Digital Game-Based Learning (DGBL), to effectively cater to the diverse needs of programming learners.",
      stack:
        "React.js, JavaScript, Sass, Blockly (Visual Programming), 3D Data Visualization, C++ (Online Judge Compiler Integration).",
      keywords: "Educational Data Mining (EDM)、Digital Game-Based Learning (DGBL)、Pair Programming",
      links: ["github"],
    },
    {
      title: "Hybrid Optimization for Task Matching and Scheduling, NKUST Evolutionary Computation 122C10197",
      topics:
        "Developed an advanced task scheduling framework that integrates Tabu Search (TS), Simulated Annealing (SA), and Genetic Algorithm (GA) to solve the Task Matching and Scheduling (TMS) problem. The system optimizes task-to-processor allocation in heterogeneous computing environments, utilizing a Greedy-based Best-fit Mapping strategy to minimize the total Makespan (completion time) while adhering to 3GPP-like signaling flow constraints.",
      stack: "C++ (Algorithm Implementation), Python (Matplotlib for Data Analysis), NetworkX (DAG Visualization), Multithreading, Metaheuristic Optimization.",
      keywords:
        "Tabu Search (TS)、Simulated Annealing (SA)、Genetic Algorithm (GA)、Task Scheduling、Heterogeneous Computing Optimization",
      links: ["github"],
    },
  ],
};
