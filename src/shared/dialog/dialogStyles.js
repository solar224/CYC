export function getAppDialogSx(isDark) {
    return {
        paper: {
            backgroundColor: isDark ? "#1a1a1a" : "#fafafa",
            borderRadius: "16px",
            minWidth: "280px",
            maxWidth: "320px",
            boxShadow: isDark
                ? "0 8px 32px rgba(0,0,0,0.4)"
                : "0 8px 32px rgba(0,0,0,0.12)",
        },
        titleRow: {
            px: 2,
            py: 1.5,
            borderBottom: `1px solid ${isDark ? "#333" : "#eee"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        },
        titleText: {
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "0.4px",
            color: isDark ? "#e0e0e0" : "#333",
        },
        closeButton: {
            color: isDark ? "#888" : "#999",
            "&:hover": {
                backgroundColor: isDark ? "#333" : "#f0f0f0",
            },
        },
        content: {
            px: 2,
            py: 2,
        },
        bodyText: {
            color: isDark ? "#b0b0b0" : "#666",
            fontSize: 14,
            lineHeight: 1.5,
        },
        footer: {
            px: 2,
            py: 1.5,
            borderTop: `1px solid ${isDark ? "#333" : "#eee"}`,
            justifyContent: "flex-end",
            gap: 1,
        },
        cancelButton: {
            textTransform: "none",
            borderRadius: "8px",
            px: 2,
            py: 0.8,
            color: isDark ? "#888" : "#666",
            "&:hover": { backgroundColor: isDark ? "#2a2a2a" : "#f0f0f0" },
        },
        primaryButton: {
            textTransform: "none",
            borderRadius: "8px",
            px: 2.2,
            py: 0.8,
            fontSize: 13,
            fontWeight: 500,
            bgcolor: isDark ? "#4a9eff" : "#2196f3",
            color: "#fff",
            boxShadow: "none",
            "&:hover": { bgcolor: isDark ? "#3d8be0" : "#1976d2", boxShadow: "none" },
        },
        segmentWrap: {
            display: "flex",
            borderRadius: "8px",
            p: "3px",
            backgroundColor: isDark ? "#2a2a2a" : "#f0f0f0",
        },
        segmentButton: (active) => ({
            px: 1.5,
            py: 0.75,
            minWidth: "auto",
            borderRadius: "6px",
            textTransform: "none",
            fontSize: 12,
            backgroundColor: active ? (isDark ? "#444" : "#fff") : "transparent",
            color: active
                ? (isDark ? "#fff" : "#333")
                : (isDark ? "#888" : "#888"),
            boxShadow: active ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
            "&:hover": {
                backgroundColor: active
                    ? (isDark ? "#444" : "#fff")
                    : (isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"),
            },
        }),
    };
}
