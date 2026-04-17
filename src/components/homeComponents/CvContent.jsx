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
import useProfileData from "../../hooks/useProfileData";

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
    const {
        contacts: CONTACTS,
        education: EDUCATION,
        researchExperience: RESEARCH_EXPERIENCE,
        academicHonors: ACADEMIC_HONORS,
        scholarships: SCHOLARSHIPS,
        teachingExperience: TEACHING_EXPERIENCE,
        certifications: CERTIFICATIONS,
        projects: PROJECTS,
        researchInterests,
        cvPdfUrl,
    } = useProfileData();

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
                                        href={cvPdfUrl}
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
                                    {researchInterests}
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
