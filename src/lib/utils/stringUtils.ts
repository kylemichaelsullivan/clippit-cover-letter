export const toCamelCase = (str: string): string => {
	return str.toLowerCase().replace(/\s+(.)/g, (_, char) => char.toUpperCase());
};
