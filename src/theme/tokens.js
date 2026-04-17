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

const px = (value) => `${value}px`;

const typographyRoles = Object.freeze({
	title: {
		fontSize: 32,
		lineHeight: 1.2,
		fontWeight: 800,
	},
	heading: {
		fontSize: 24,
		lineHeight: 1.3,
		fontWeight: 700,
	},
	subheading: {
		fontSize: 18,
		lineHeight: 1.45,
		fontWeight: 600,
	},
	body: {
		fontSize: 14,
		lineHeight: 1.6,
		fontWeight: 400,
	},
});

const radius = Object.freeze({
	base: 4,
	sm: 8,
	md: 12,
	lg: 16,
	xl: 20,
	pill: "999px",
	circle: "50%",
	squircle: "35%",
});

const radiusRoles = Object.freeze({
	button: px(radius.md),
	card: px(radius.xl),
	floating: px(radius.lg),
	field: px(radius.md),
	chip: px(radius.sm),
	indicator: px(radius.sm),
	micro: px(radius.base),
	pill: radius.pill,
	circle: radius.circle,
	fab: radius.squircle,
});

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
		roles: typographyRoles,
		size: {
			title: typographyRoles.title.fontSize,
			heading: typographyRoles.heading.fontSize,
			subheading: typographyRoles.subheading.fontSize,
			body: typographyRoles.body.fontSize,
			xs: 12,
			sm: 13,
			md: typographyRoles.body.fontSize,
			lg: typographyRoles.subheading.fontSize,
			xl: typographyRoles.heading.fontSize,
		},
		weight: {
			regular: 400,
			medium: 500,
			semibold: 600,
			bold: 700,
			black: 900,
		},
	},
	core,
	semanticByMode,
	semantic: resolveSemanticTokens("dark"),
	radius,
	radiusRoles,
	motion: {
		fast: "0.18s ease",
		normal: "0.3s ease",
	},
};
