export const spacing = {
	xs: '0.25rem', // 4px
	sm: '0.5rem', // 8px
	md: '1rem', // 16px
	lg: '1.5rem', // 24px
	xl: '2rem', // 32px
	'2xl': '3rem', // 48px
	'3xl': '4rem', // 64px
} as const;

export type SpacingSize = keyof typeof spacing;

export const getSpacing = (size: SpacingSize): string => spacing[size];

export const spacingPatterns = {
	formSection: spacing.lg,
	formField: spacing.md,
	formFieldSmall: spacing.sm,

	pageSection: spacing.xl,
	componentSection: spacing.lg,
	buttonGroup: spacing.sm,

	contentBlock: spacing.md,
	contentSmall: spacing.sm,
	contentLarge: spacing.xl,
} as const;
