import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Box } from "@mui/material";

const mdSx = {
    "& h1": { fontSize: "1.75rem", fontWeight: 900, mt: 3, mb: 1 },
    "& h2": { fontSize: "1.5rem", fontWeight: 900, mt: 3, mb: 1 },
    "& h3": { fontSize: "1.2rem", fontWeight: 800, mt: 3, mb: 1 },
    "& p, & li": { lineHeight: 1.8 },
    "& table": { width: "100%", borderCollapse: "collapse", my: 2 },
    "& th, & td": { border: (t) => `1px solid ${t.palette.divider}`, p: 1, textAlign: "left" },
    "& blockquote": {
        borderLeft: (t) => `4px solid ${t.palette.primary.main}`,
        pl: 2, ml: 0, color: "text.secondary",
    },
    "& a": { textDecoration: "underline" },
    "& img": { maxWidth: "100%", borderRadius: 2 },
};

export default function Markdown({ children }) {
    return (
        <Box sx={mdSx}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
        </Box>
    );
}
