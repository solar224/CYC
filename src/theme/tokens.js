const core = {
	gray: {
		900: "#121212",
	},
	white: "#ffffff",
	accent: {
		orange: "#f39212",
		green: "#28a745",
	},
};

const semantic = {
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
};

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
	semantic,
	// Backward-compatible aliases for current components.
	color: {
		header: {
			bgDark: semantic.header.background,
			border: semantic.header.border,
			hover: semantic.header.hover,
			textSubtle: semantic.header.textSubtle,
			textStrong: semantic.header.textStrong,
		},
		footer: {
			bg: semantic.footer.background,
			fg: semantic.footer.foreground,
		},
		accent: {
			up: semantic.action.scrollToTop,
			setting: semantic.action.settings,
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
