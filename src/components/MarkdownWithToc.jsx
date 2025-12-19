import React, { useMemo, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import oneLight from "react-syntax-highlighter/dist/esm/styles/prism/one-light";
import vscDarkPlus from "react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus";

import go from "react-syntax-highlighter/dist/esm/languages/prism/go";
import c from "react-syntax-highlighter/dist/esm/languages/prism/c";
import cpp from "react-syntax-highlighter/dist/esm/languages/prism/cpp";
import java from "react-syntax-highlighter/dist/esm/languages/prism/java";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import yaml from "react-syntax-highlighter/dist/esm/languages/prism/yaml";
import markdown from "react-syntax-highlighter/dist/esm/languages/prism/markdown";
import sql from "react-syntax-highlighter/dist/esm/languages/prism/sql";
import rust from "react-syntax-highlighter/dist/esm/languages/prism/rust";
import csharp from "react-syntax-highlighter/dist/esm/languages/prism/csharp";
import php from "react-syntax-highlighter/dist/esm/languages/prism/php";
import ruby from "react-syntax-highlighter/dist/esm/languages/prism/ruby";
import swift from "react-syntax-highlighter/dist/esm/languages/prism/swift";
import kotlin from "react-syntax-highlighter/dist/esm/languages/prism/kotlin";
import scala from "react-syntax-highlighter/dist/esm/languages/prism/scala";
import docker from "react-syntax-highlighter/dist/esm/languages/prism/docker";
import diff from "react-syntax-highlighter/dist/esm/languages/prism/diff";
import ini from "react-syntax-highlighter/dist/esm/languages/prism/ini";
import toml from "react-syntax-highlighter/dist/esm/languages/prism/toml";

import { SpySection } from "../shared/scrollspy";

SyntaxHighlighter.registerLanguage("go", go);
SyntaxHighlighter.registerLanguage("c", c);
SyntaxHighlighter.registerLanguage("cpp", cpp);
SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("py", python);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("js", javascript);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("ts", typescript);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("shell", bash);
SyntaxHighlighter.registerLanguage("sh", bash);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("yaml", yaml);
SyntaxHighlighter.registerLanguage("yml", yaml);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("md", markdown);
SyntaxHighlighter.registerLanguage("sql", sql);
SyntaxHighlighter.registerLanguage("rust", rust);
SyntaxHighlighter.registerLanguage("csharp", csharp);
SyntaxHighlighter.registerLanguage("cs", csharp);
SyntaxHighlighter.registerLanguage("php", php);
SyntaxHighlighter.registerLanguage("ruby", ruby);
SyntaxHighlighter.registerLanguage("rb", ruby);
SyntaxHighlighter.registerLanguage("swift", swift);
SyntaxHighlighter.registerLanguage("kotlin", kotlin);
SyntaxHighlighter.registerLanguage("kt", kotlin);
SyntaxHighlighter.registerLanguage("scala", scala);
SyntaxHighlighter.registerLanguage("docker", docker);
SyntaxHighlighter.registerLanguage("dockerfile", docker);
SyntaxHighlighter.registerLanguage("diff", diff);
SyntaxHighlighter.registerLanguage("ini", ini);
SyntaxHighlighter.registerLanguage("toml", toml);

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

const LANG_ALIASES = {
    "c++": "cpp",
    "h++": "cpp",
    "hpp": "cpp",
    "c#": "csharp",
    "shell": "bash",
    "zsh": "bash",
    "py": "python",
    "js": "javascript",
    "ts": "typescript",
    "md": "markdown",
    "yml": "yaml",
    "rb": "ruby",
    "kt": "kotlin",
    "dockerfile": "docker",
};

const SUPPORTED = new Set([
    "go", "c", "cpp", "java", "python", "javascript", "typescript", "jsx", "tsx",
    "bash", "shell", "sh", "json", "yaml", "yml", "markdown", "md", "sql", "rust",
    "csharp", "cs", "php", "ruby", "rb", "swift", "kotlin", "kt", "scala", "docker",
    "dockerfile", "diff", "ini", "toml"
]);

export default function MarkdownWithToc({ children }) {
    const slug = useSlugger();
    const t = useTheme();

    const components = useMemo(
        () => ({
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

            code: ({ inline, className, children, ...rest }) => {
                const raw = String(children ?? "").replace(/\n$/, "");
                if (inline) {
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
                }

                const match = /language-([\w+#-]+)/i.exec(className || "");
                let lang = match ? match[1].toLowerCase() : undefined;
                if (lang && LANG_ALIASES[lang]) lang = LANG_ALIASES[lang];
                const isSupported = lang && SUPPORTED.has(lang);

                return (
                    <Box sx={{ my: 1.5, "& pre": { m: 0 } }}>
                        <SyntaxHighlighter
                            language={isSupported ? lang : undefined}
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
                            {raw}
                        </SyntaxHighlighter>
                    </Box>
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
