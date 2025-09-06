// src/components/MarkdownWithToc.jsx
import React, { useMemo, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// ⬇️ 新增：語法上色
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import go from "react-syntax-highlighter/dist/esm/languages/prism/go";
import oneLight from "react-syntax-highlighter/dist/esm/styles/prism/one-light";
import vscDarkPlus from "react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus";

import { SpySection } from "../shared/scrollspy";

// 登錄需要的語言（你也可再加 js/py/bash…）
SyntaxHighlighter.registerLanguage("go", go);

// ---- 下面維持你原本的工具函式 ----
function getText(node) {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(getText).join("");
    if (node && node.props && node.props.children) return getText(node.props.children);
    return "";
}
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
    const t = useTheme(); // <- 取 MUI mode 以切換亮/暗 code theme

    const components = useMemo(
        () => ({
            // 只把 h1~h3 納入章節
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

            // 其他常見標籤
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

            // ✅ 語法上色的 code renderer
            code: ({ inline, className, children, ...rest }) => {
                const code = String(children ?? "").replace(/\n$/, "");
                const match = /language-(\w+)/.exec(className || "");

                if (!inline && match) {
                    const lang = match[1]; // 例如 'go'
                    return (
                        <Box sx={{ my: 1.5, "& pre": { m: 0 } }}>
                            <SyntaxHighlighter
                                language={lang}
                                PreTag="div"
                                style={t.palette.mode === "dark" ? vscDarkPlus : oneLight}
                                customStyle={{
                                    margin: 0,
                                    borderRadius: 8,
                                    fontSize: 14,
                                    lineHeight: 1.6,
                                }}
                                showLineNumbers
                                {...rest}
                            >
                                {code}
                            </SyntaxHighlighter>
                        </Box>
                    );
                }
                // 行內程式碼
                return (
                    <code
                        style={{
                            padding: "0 6px",
                            borderRadius: 6,
                            background: "rgba(128,128,128,.15)",
                        }}
                        {...rest}
                    >
                        {children}
                    </code>
                );
            },
        }),
        [slug, t.palette.mode]
    );

    return (
        <Box sx={{ "& ul, & ol": { pl: 3, mt: 0.5, mb: 1 } }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                {children}
            </ReactMarkdown>
        </Box>
    );
}
