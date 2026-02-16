import React, { useMemo } from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { NOTES } from "../data/notes";
import { appTokens } from "../theme/tokens";

const STATIC_NAME_MAP = {
    "about-me": "關於我",
    "contact-me": "聯絡",
    note: "筆記",
    notes: "筆記",
    "school-curriculum": "學校課程",
    "coding-practice": "程式練習",
    "other-practice": "其他",
};

const toFriendlyName = (value) => {
    if (!value) return "";
    return decodeURIComponent(value).replace(/-/g, " ");
};

export default function DynamicBreadcrumbs({ variant = "desktop" }) {
    const location = useLocation();

    const items = useMemo(() => {
        const pathnames = location.pathname.split("/").filter(Boolean);
        const crumbs = [
            { label: "YC-Chan", to: "/" },
            { label: "首頁", to: "/" },
        ];

        pathnames.forEach((segment, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            let label = STATIC_NAME_MAP[segment];

            if (!label && pathnames[index - 1] === "notes") {
                const note = NOTES.find((n) => n.slug === segment);
                label = note?.title || toFriendlyName(segment);
            }

            crumbs.push({
                label: label || toFriendlyName(segment),
                to: routeTo,
            });
        });

        return crumbs;
    }, [location.pathname]);

    const mobileItems = useMemo(() => {
        if (items.length <= 2) return items;
        return [items[0], items[items.length - 1]];
    }, [items]);

    const renderItems = variant === "mobile" ? mobileItems : items;

    return (
        <Breadcrumbs
            separator={
                <NavigateNextIcon
                    fontSize="small"
                    sx={{
                        color: "rgba(255,255,255,0.28)",
                        fontSize: appTokens.typography.size.md,
                    }}
                />
            }
            aria-label="breadcrumb"
            sx={{
                minWidth: 0,
                "& .MuiBreadcrumbs-ol": {
                    flexWrap: "nowrap",
                    alignItems: "center",
                    gap: 0.25,
                },
                "& .MuiBreadcrumbs-separator": {
                    mx: 0.25,
                    lineHeight: 1,
                },
                "& .MuiBreadcrumbs-li": {
                    minWidth: 0,
                },
            }}
        >
            {renderItems.map((item, index) => {
                const isLast = index === renderItems.length - 1;
                if (!isLast) {
                    return (
                        <Link
                            key={`${item.to}-${item.label}-${index}`}
                            component={RouterLink}
                            to={item.to}
                            underline="none"
                            color="inherit"
                            sx={{
                                whiteSpace: "nowrap",
                                fontWeight: appTokens.typography.weight.medium,
                                fontSize:
                                    variant === "mobile"
                                        ? appTokens.typography.size.md
                                        : appTokens.typography.size.lg,
                                letterSpacing: 0,
                                color: appTokens.color.header.textSubtle,
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                textDecoration: "none",
                                transition: "all .18s ease",
                                "&:hover": {
                                    color: "rgba(255,255,255,0.92)",
                                    backgroundColor: "rgba(255,255,255,0.05)",
                                    textDecoration: "none",
                                },
                            }}
                        >
                            {item.label}
                        </Link>
                    );
                }

                return (
                    <Typography
                        key={`${item.to}-${item.label}-${index}`}
                        sx={{
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            maxWidth: variant === "mobile" ? "42vw" : "24vw",
                            fontWeight: appTokens.typography.weight.semibold,
                            fontSize:
                                variant === "mobile"
                                    ? appTokens.typography.size.md
                                    : appTokens.typography.size.lg,
                            color: appTokens.color.header.textStrong,
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            backgroundColor: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.08)",
                        }}
                    >
                        {item.label}
                    </Typography>
                );
            })}
        </Breadcrumbs>
    );
}
