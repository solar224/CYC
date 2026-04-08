import React from "react";
import {
    Button,
    Box,
    Chip,
    Container,
    Divider,
    Grid,
    Link,
    Paper,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { ScrollSpyProvider, SpySection, Toc, useScrollSpy } from "../../shared/scrollspy";

const CV_PDF_URL = `${process.env.PUBLIC_URL}/CV.pdf`;

function MobileToc() {
    const { sections, activeId, scrollTo } = useScrollSpy();

    return (
        <Box
            sx={(t) => ({
                position: "sticky",
                top: 0,
                zIndex: 2,
                py: 0.5,
                mb: 0.4,
                bgcolor: alpha(t.palette.background.paper, 0.88),
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                borderBottom: `1px solid ${alpha(t.palette.divider, 0.6)}`,
            })}
        >
            <Stack direction="row" spacing={0.6} sx={{ overflowX: "auto", pb: 0.2 }}>
                {sections.map((s) => (
                    <Button
                        key={s.id}
                        size="small"
                        onClick={() => scrollTo(s.id)}
                        sx={(t) => ({
                            textTransform: "none",
                            whiteSpace: "nowrap",
                            borderRadius: 99,
                            minWidth: "auto",
                            px: 1,
                            color: s.id === activeId ? "#0041CC" : t.palette.text.secondary,
                            bgcolor: s.id === activeId ? alpha("#0041CC", 0.1) : "transparent",
                            border: `1px solid ${s.id === activeId ? alpha("#0041CC", 0.3) : "transparent"}`,
                        })}
                    >
                        {s.title}
                    </Button>
                ))}
            </Stack>
        </Box>
    );
}

const CONTACTS = [
    { label: "Email", value: "cyc.cs14 [at] nycu.edu.tw" },
    { label: "Phone", value: "(+886) 912 407 992" },
    { label: "Website", value: "https://solar224.github.io/CYC/", href: "https://solar224.github.io/CYC/" },
    { label: "LinkedIn", value: "YU-CHEN CHAN" },
    { label: "Github", value: "solar224 (YU-CHEN CHAN)", href: "https://github.com/solar224" },
];

const EDUCATION = [
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
];

const RESEARCH_EXPERIENCE = [
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
];

const ACADEMIC_HONORS = [
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
];

const SCHOLARSHIPS = [
    { title: "book Award, NKUST (Recipient for 4 Semesters)", year: "2022-2024" },
    { title: "Wen-Hsiang Educational Foundation Scholarship", year: "2023, 2024" },
    { title: "Outstanding Teaching Assistant Award, NKUST", year: "2023" },
    { title: "Enthusiastic Service Award, Undergraduate Summer Internship Program", year: "2024" },
];

const TEACHING_EXPERIENCE = [
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
];

const CERTIFICATIONS = [
    { title: "Level B technician for digital electronics, Workforce Development Agency", year: "2020" },
    { title: "Level C technician for computer software application, Workforce Development Agency", year: "2019" },
    { title: "Level C technician for industrial electronics", year: "2019" },
];

const PROJECTS = [
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
];

function SectionTitle({ children }) {
    return (
        <Typography
            variant="subtitle2"
            sx={{
                letterSpacing: 1.2,
                fontWeight: 700,
                color: "#0041CC",
                textTransform: "uppercase",
            }}
        >
            {children}
        </Typography>
    );
}

function SectionBlock({ title, children }) {
    return (
        <Box>
            <SectionTitle>{title}</SectionTitle>
            <Divider sx={{ mt: 0.5, mb: 1, borderColor: "#0041CC" }} />
            {children}
        </Box>
    );
}

function EntryCard({ children, compact = false }) {
    return (
        <Paper
            variant="outlined"
            sx={{
                p: compact ? { xs: 0.9, md: 1 } : { xs: 1.1, md: 1.2 },
                borderRadius: 1,
                bgcolor: "transparent",
                borderColor: "transparent",
            }}
        >
            {children}
        </Paper>
    );
}

export function CvContent({ mobile = false }) {
    return (
        <ScrollSpyProvider>
            <Container maxWidth="lg" sx={{ py: { xs: 1.5, md: 2.5 } }}>
                <Paper
                    variant="outlined"
                    sx={{
                        borderRadius: 2,
                        borderColor: "transparent",
                        p: { xs: 1.2, sm: 1.8, md: 2.2 },
                        bgcolor: "background.paper",
                    }}
                >
                    <Stack spacing={1.8}>
                        {mobile ? <MobileToc /> : null}
                        <Box>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1.5}>
                                <Typography
                                    variant={mobile ? "h5" : "h4"}
                                    fontWeight={800}
                                    sx={{
                                        letterSpacing: 0.6,
                                        fontFamily: "Times New Roman, Georgia, serif",
                                        color: "#0041CC",
                                    }}
                                >
                                    YU-CHEN CHAN
                                </Typography>
                                <Tooltip title="View CV" placement="left">
                                    <Button
                                        variant="text"
                                        size="small"
                                        component="a"
                                        href={CV_PDF_URL}
                                        target="_blank"
                                        rel="noreferrer"
                                        sx={{
                                            textTransform: "none",
                                            color: "#0041CC",
                                            whiteSpace: "nowrap",
                                            minWidth: "auto",
                                            px: 0.75,
                                        }}
                                    >
                                        View CV
                                    </Button>
                                </Tooltip>
                            </Stack>
                            <Divider sx={{ mt: 0.8 }} />
                        </Box>

                        <Grid container spacing={0.8}>
                            {CONTACTS.map((item) => (
                                <Grid item xs={12} md={6} key={`${item.label}-${item.value}`}>
                                    <Stack direction="row" spacing={0.9} alignItems="baseline" sx={{ minHeight: 22 }}>
                                        <Typography variant="body2" fontWeight={700} sx={{ minWidth: 76 }}>
                                            {item.label}:
                                        </Typography>
                                        {item.href ? (
                                            <Link href={item.href} target="_blank" rel="noreferrer" underline="hover" color="inherit">
                                                <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                                                    {item.value}
                                                </Typography>
                                            </Link>
                                        ) : (
                                            <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                                                {item.value}
                                            </Typography>
                                        )}
                                    </Stack>
                                </Grid>
                            ))}
                        </Grid>

                        <SpySection id="research-interests" title="RESEARCH INTERESTS">
                            <SectionBlock title="RESEARCH INTERESTS">
                                <Typography variant="body2" sx={{ lineHeight: 1.75 }}>
                                    My research integrates Next-Generation Network Architectures and Applied Mathematical Optimization. I apply metaheuristic algorithms and data-driven modeling to solve dynamic resource allocation challenges. Furthermore, I implement 3GPP standards via the free5GC project to optimize 5G Core (5GC) signaling flows. My ongoing work explores Cloud-Native Technologies, Network Function Virtualization (NFV), and Next-Generation Radio Architecture Frameworks to maximize telecommunication efficiency.
                                </Typography>
                            </SectionBlock>
                        </SpySection>

                        <SpySection id="education" title="EDUCATION">
                            <SectionBlock title="EDUCATION">
                                <Stack spacing={0.8}>
                                    {EDUCATION.map((item) => (
                                        <EntryCard key={item.degree} compact>
                                            <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
                                                <Typography variant="subtitle2" fontWeight={700}>{item.degree}</Typography>
                                                <Typography variant="caption" color="text.secondary">{item.period}</Typography>
                                            </Stack>
                                            <Typography variant="body2" sx={{ mt: 0.35 }}>{item.school}</Typography>
                                            <Typography variant="body2" sx={{ mt: 0.35 }}>{item.gpa}</Typography>
                                            <Typography variant="body2" sx={{ mt: 0.35 }}>{item.courses}</Typography>
                                            {item.extra ? <Typography variant="body2" sx={{ mt: 0.35 }}>{item.extra}</Typography> : null}
                                        </EntryCard>
                                    ))}
                                </Stack>
                            </SectionBlock>
                        </SpySection>

                        <SpySection id="research-experience" title="RESEARCH EXPERIENCE">
                            <SectionBlock title="RESEARCH EXPERIENCE">
                                <Stack spacing={0.8}>
                                    {RESEARCH_EXPERIENCE.map((item) => (
                                        <EntryCard key={item.role} compact>
                                            <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
                                                <Typography variant="subtitle2" fontWeight={700}>{item.role}</Typography>
                                                <Typography variant="caption" color="text.secondary">{item.period}</Typography>
                                            </Stack>
                                            <Typography variant="body2" sx={{ mt: 0.35 }}><b>Topics:</b> {item.topics}</Typography>
                                            <Typography variant="body2" sx={{ mt: 0.35 }}><b>Keywords:</b> {item.keywords}</Typography>
                                        </EntryCard>
                                    ))}
                                </Stack>
                            </SectionBlock>
                        </SpySection>

                        <SpySection id="honors-and-scholarships" title="HONORS AND SCHOLARSHIPS">
                            <SectionBlock title="HONORS AND SCHOLARSHIPS">
                                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 0.5 }}>Academic Honors</Typography>
                                <Stack spacing={0.55}>
                                    {ACADEMIC_HONORS.map((item) => (
                                        <EntryCard key={item.title} compact>
                                            <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
                                                <Typography variant="body2">{item.title}</Typography>
                                                {item.year ? <Typography variant="caption" color="text.secondary">{item.year}</Typography> : null}
                                            </Stack>
                                        </EntryCard>
                                    ))}
                                </Stack>

                                <Typography variant="subtitle2" fontWeight={700} sx={{ mt: 1, mb: 0.5 }}>Scholarships</Typography>
                                <Stack spacing={0.55}>
                                    {SCHOLARSHIPS.map((item) => (
                                        <EntryCard key={item.title} compact>
                                            <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
                                                <Typography variant="body2">{item.title}</Typography>
                                                <Typography variant="caption" color="text.secondary">{item.year}</Typography>
                                            </Stack>
                                        </EntryCard>
                                    ))}
                                </Stack>
                            </SectionBlock>
                        </SpySection>

                        <SpySection id="teaching-experience" title="TEACHING EXPERIENCE">
                            <SectionBlock title="TEACHING EXPERIENCE">
                                <Stack spacing={0.55}>
                                    {TEACHING_EXPERIENCE.map((item) => (
                                        <EntryCard key={`${item.role}-${item.term}`} compact>
                                            <Typography variant="subtitle2" fontWeight={700}>{item.role}</Typography>
                                            <Typography variant="body2" sx={{ mt: 0.25 }}>{item.org}</Typography>
                                            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.3, display: "block" }}>{item.term}</Typography>
                                        </EntryCard>
                                    ))}
                                </Stack>
                            </SectionBlock>
                        </SpySection>

                        <SpySection id="certifications" title="CERTIFICATIONS">
                            <SectionBlock title="CERTIFICATIONS">
                                <Stack spacing={0.55}>
                                    {CERTIFICATIONS.map((item) => (
                                        <EntryCard key={`${item.title}-${item.year}`} compact>
                                            <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
                                                <Typography variant="body2">{item.title}</Typography>
                                                <Typography variant="caption" color="text.secondary">{item.year}</Typography>
                                            </Stack>
                                        </EntryCard>
                                    ))}
                                </Stack>
                            </SectionBlock>
                        </SpySection>

                        <SpySection id="projects" title="PROJECTS">
                            <SectionBlock title="PROJECTS">
                                <Stack spacing={0.8}>
                                    {PROJECTS.map((item) => (
                                        <EntryCard key={item.title} compact>
                                            <Typography variant="subtitle2" fontWeight={700}>{item.title}</Typography>
                                            <Typography variant="body2" sx={{ mt: 0.35 }}><b>Topics:</b> {item.topics}</Typography>
                                            <Typography variant="body2" sx={{ mt: 0.35 }}><b>Tech Stack:</b> {item.stack}</Typography>
                                            <Typography variant="body2" sx={{ mt: 0.35 }}><b>Keywords:</b> {item.keywords}</Typography>
                                            <Stack direction="row" spacing={0.55} sx={{ mt: 0.7 }}>
                                                {item.links.map((link) => (
                                                    <Chip
                                                        key={`${item.title}-${link}`}
                                                        size="small"
                                                        label={`[${link}]`}
                                                        variant="outlined"
                                                        sx={{ borderColor: "transparent" }}
                                                    />
                                                ))}
                                            </Stack>
                                        </EntryCard>
                                    ))}
                                </Stack>
                            </SectionBlock>
                        </SpySection>
                    </Stack>
                </Paper>
            </Container>
            <Toc hiddenOnMobile={mobile ? true : false} sidebarWidth={240} collapsedWidth={16} containerMaxWidth={1200} />
        </ScrollSpyProvider>
    );
}
