const core = {
	gray: {
		50: "#f8fafc",
		100: "#f1f5f9",
		700: "#334155",
		900: "#121212",
	},
	ink: {
		900: "#111827",
	},
	white: "#ffffff",
	accent: {
		orange: "#f39212",
		green: "#28a745",
	},
};

const semanticByMode = {
	light: {
		surface: {
			canvas: core.gray[50],
			paper: core.white,
		},
		header: {
			background: core.gray[50],
			border: "rgba(15,23,42,0.12)",
			hover: "rgba(15,23,42,0.06)",
			textSubtle: "rgba(15,23,42,0.72)",
			textStrong: "rgba(15,23,42,0.96)",
		},
		footer: {
			background: core.gray[100],
			foreground: core.ink[900],
		},
		action: {
			scrollToTop: core.accent.orange,
			settings: core.accent.green,
		},
	},
	dark: {
		surface: {
			canvas: core.gray[900],
			paper: "#1e1e1e",
		},
		header: {
			background: core.gray[900],
			border: "rgba(255,255,255,0.08)",
			hover: "rgba(255,255,255,0.04)",
			textSubtle: "rgba(255,255,255,0.66)",
			textStrong: "rgba(255,255,255,0.95)",
		},
		footer: {
			background: "#222222",
			foreground: core.white,
		},
		action: {
			scrollToTop: core.accent.orange,
			settings: core.accent.green,
		},
	},
};

export function resolveSemanticTokens(mode = "dark") {
	return semanticByMode[mode] || semanticByMode.dark;
}

export const appTokens = {
	breakpoints: {
		mobileMax: 767,
		tabletMin: 768,
		tabletMax: 1023,
		desktopMin: 1024,
		desktopWideMin: 1440,
		mui: {
			xs: 0,
			sm: 600,
			md: 768,
			lg: 1024,
			xl: 1440,
		},
	},
	layout: {
		headerHeight: {
			mobile: 56,
			desktop: 64,
		},
		scrollSpyOffset: 72,
		tocTop: 80,
		floating: {
			bottom: 16,
			right: 16,
			footerSpace: 128,
			size: 56,
			gap: 12,
			zIndex: 1200,
		},
	},
	typography: {
		family:
			'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans TC", "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
		size: {
			xs: 12,
			sm: 13,
			md: 14,
			lg: 16,
			xl: 20,
		},
		weight: {
			medium: 500,
			semibold: 600,
			bold: 700,
			black: 900,
		},
	},
	core,
	semanticByMode,
	semantic: resolveSemanticTokens("dark"),
	// Backward-compatible aliases now read from theme-driven CSS variables.
	color: {
		header: {
			bgDark: "var(--app-color-header-bg)",
			border: "var(--app-color-header-border)",
			hover: "var(--app-color-header-hover)",
			textSubtle: "var(--app-color-header-text-subtle)",
			textStrong: "var(--app-color-header-text-strong)",
		},
		footer: {
			bg: "var(--app-color-footer-bg)",
			fg: "var(--app-color-footer-fg)",
		},
		accent: {
			up: "var(--app-color-action-up)",
			setting: "var(--app-color-action-settings)",
		},
		surface: {
			canvas: "var(--app-color-surface-canvas)",
			paper: "var(--app-color-surface-paper)",
		},
	},
	radius: {
		sm: 8,
		md: 12,
		lg: 16,
	},
	motion: {
		fast: "0.18s ease",
		normal: "0.3s ease",
	},
};
