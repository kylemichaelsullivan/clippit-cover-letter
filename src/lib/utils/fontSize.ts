import type { FontSize, FontUnit } from '@/types';

export const FONT_UNITS: FontUnit[] = ['pt', 'px'];

export const FONT_SIZE_MIN = 8;
export const FONT_SIZE_MAX = 24;

export function clampFontSize(fontSize: FontSize): FontSize {
	const [size, unit] = fontSize;
	const clampedSize = Math.max(FONT_SIZE_MIN, Math.min(FONT_SIZE_MAX, size));
	return [clampedSize, unit];
}

export function createFontSize(size: number, unit: FontUnit): FontSize {
	return [size, unit];
}

export function getFontSizeString(fontSize: FontSize): string {
	const [size, unit] = fontSize;
	return `${size}${unit}`;
}
