// src/components/MarkdownWithToc.jsx
import React, { useMemo, useRef } from "react";
import { Box, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SpySection } from "../shared/scrollspy";

// 取得所有子節點的純文字（處理斜體/粗體/行內碼等）
function getText(node) {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(getText).join("");
    if (node && node.props && node.props.children) return getText(node.props.children);
    return "";
}

// 乾淨的 slug 化（同文字多次出現時自動加 -1, -2…）
const useSlugger = () => {
    const mapRef = useRef(new Map());
    return (raw) => {
        const base = (raw || "")
            .toLowerCase()
            .trim()
            .replace(/[^\p{L}\p{N}\s-]/gu, "")
            .replace(/\s+/g, "-");
        const hit = mapRef.current.get(base) || 0;
        mapRef.current.set(base, hit + 1);
        return hit ? `${base}-${hit}` : base;
    };
};

export default function MarkdownWithToc({ children }) {
    const slug = useSlugger();

    const components = useMemo(
        () => ({
            // 只把 h1~h3 納入章節（你也可放寬到 h4）
            h1: ({ children, ...rest }) => {
                const title = getText(children);
                const id = slug(title);
                return (
                    <SpySection id={id} title={title} level={1}>
                        <Typography id={id} variant="h4" fontWeight={900} sx={{ mt: 3, mb: 1 }} {...rest}>
                            {children}
                        </Typography>
                    </SpySection>
                );
            },
            h2: ({ children, ...rest }) => {
                const title = getText(children);
                const id = slug(title);
                return (
                    <SpySection id={id} title={title} level={2}>
                        <Typography id={id} variant="h5" fontWeight={900} sx={{ mt: 3, mb: 1 }} {...rest}>
                            {children}
                        </Typography>
                    </SpySection>
                );
            },
            h3: ({ children, ...rest }) => {
                const title = getText(children);
                const id = slug(title);
                return (
                    <SpySection id={id} title={title} level={3}>
                        <Typography id={id} variant="h6" fontWeight={800} sx={{ mt: 3, mb: 1 }} {...rest}>
                            {children}
                        </Typography>
                    </SpySection>
                );
            },

            // 其他常見標籤：維持一致的閱讀樣式
            p: (props) => <Typography sx={{ lineHeight: 1.8, mb: 1 }} {...props} />,
            li: (props) => <li style={{ lineHeight: 1.8, marginBottom: 6 }} {...props} />,
            a: ({ href, children, ...rest }) => (
                <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }} {...rest}>
                    {children}
                </a>
            ),
            img: ({ src, alt }) => (
                <Box component="img" src={src} alt={alt} sx={{ maxWidth: "100%", borderRadius: 2, my: 1 }} />
            ),
            table: (props) => <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", my: 2 }} {...props} />,
            th: (props) => (
                <Box
                    component="th"
                    sx={(t) => ({ border: `1px solid ${t.palette.divider}`, p: 1, textAlign: "left", fontWeight: 700 })}
                    {...props}
                />
            ),
            td: (props) => (
                <Box component="td" sx={(t) => ({ border: `1px solid ${t.palette.divider}`, p: 1, textAlign: "left" })} {...props} />
            ),
            blockquote: (props) => (
                <Box
                    component="blockquote"
                    sx={(t) => ({
                        borderLeft: `4px solid ${t.palette.primary.main}`,
                        pl: 2,
                        ml: 0,
                        color: "text.secondary",
                        my: 1.5,
                    })}
                    {...props}
                />
            ),
            code: ({ inline, children, ...rest }) =>
                inline ? (
                    <code style={{ padding: "0 6px", borderRadius: 6, background: "rgba(128,128,128,.15)" }} {...rest}>
                        {children}
                    </code>
                ) : (
                    <Box
                        component="pre"
                        sx={(t) => ({
                            p: 1.5,
                            borderRadius: 2,
                            overflow: "auto",
                            my: 1.5,
                            fontSize: 14,
                            border: `1px solid ${t.palette.divider}`,
                            background: t.palette.mode === "dark" ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.03)",
                        })}
                        {...rest}
                    >
                        <code>{children}</code>
                    </Box>
                ),
        }),
        [slug]
    );

    return (
        <Box
            sx={{
                // 整體 Markdown 區塊樣式
                "& ul, & ol": { paddingLeft: 3, marginTop: 0.5, marginBottom: 1 },
            }}
        >
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                {children}
            </ReactMarkdown>
        </Box>
    );
}
