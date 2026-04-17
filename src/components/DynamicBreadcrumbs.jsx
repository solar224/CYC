import React, { useContext, useMemo } from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { NOTES } from "../data/notes";
import { appTokens } from "../theme/tokens";
import { LanguageContext } from "../context/LanguageContext";
import { APP_ROUTE_META, APP_ROUTE_PATHS, APP_SEGMENT_LABEL_KEYS } from "../config/app.constants";
import { NOTES_SEGMENT_LABEL_KEYS } from "../config/notes.constants";
import { TOOLS_SEGMENT_LABEL_KEYS } from "../config/tools.constants";
import { t } from "../i18n/messages";

const toFriendlyName = (value) => {
    if (!value) return "";
    return decodeURIComponent(value).replace(/-/g, " ");
};

export default function DynamicBreadcrumbs({ variant = "desktop" }) {
    const location = useLocation();
    const { language } = useContext(LanguageContext);
    const segmentLabelKeys = useMemo(
        () => ({
            ...APP_SEGMENT_LABEL_KEYS,
            ...NOTES_SEGMENT_LABEL_KEYS,
            ...TOOLS_SEGMENT_LABEL_KEYS,
        }),
        []
    );

    const items = useMemo(() => {
        const pathnames = location.pathname.split("/").filter(Boolean);
        const crumbs = [
            { label: t("brand.name", language), to: APP_ROUTE_PATHS.HOME },
            { label: t(APP_ROUTE_META[APP_ROUTE_PATHS.HOME].breadcrumbKey, language), to: APP_ROUTE_PATHS.HOME },
        ];

        pathnames.forEach((segment, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const labelKey = segmentLabelKeys[segment];
            let label = labelKey ? t(labelKey, language) : "";

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
    }, [language, location.pathname, segmentLabelKeys]);

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
                        color: appTokens.color.header.textSubtle,
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
                                    color: appTokens.color.header.textStrong,
                                    backgroundColor: appTokens.color.header.hover,
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
                            backgroundColor: appTokens.color.header.hover,
                            border: `1px solid ${appTokens.color.header.border}`,
                        }}
                    >
                        {item.label}
                    </Typography>
                );
            })}
        </Breadcrumbs>
    );
}
