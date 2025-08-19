/**
 * Returns the ordinal suffix for a given number (1st, 2nd, 3rd, 4th, etc.)
 * Handles special cases like 11th, 12th, 13th correctly.
 */
export const getOrdinalSuffix = (num: number): string => {
	if (num >= 11 && num <= 13) return 'th';
	switch (num % 10) {
		case 1:
			return 'st';
		case 2:
			return 'nd';
		case 3:
			return 'rd';
		default:
			return 'th';
	}
};
