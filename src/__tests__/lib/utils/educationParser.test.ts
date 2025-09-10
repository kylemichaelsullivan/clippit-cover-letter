import { describe, it, expect } from 'vitest';
import { parseEducationFromText } from '@/lib/utils/educationParser';

describe('parseEducationFromText', () => {
	it('should parse markdown format education entries', () => {
		const markdownText = `### Juris Doctor

**Western Michigan University Thomas M. Cooley Law School** | Grand Rapids, MI

### Bachelor's Degree

**University of Michigan** | Ann Arbor, MI`;

		const result = parseEducationFromText(markdownText);

		expect(result).toHaveLength(2);
		expect(result[0]).toEqual({
			degree: 'Juris Doctor',
			institution: 'Western Michigan University Thomas M. Cooley Law School',
			location: 'Grand Rapids, MI',
			graduationYear: undefined,
		});
		expect(result[1]).toEqual({
			degree: "Bachelor's Degree",
			institution: 'University of Michigan',
			location: 'Ann Arbor, MI',
			graduationYear: undefined,
		});
	});

	it('should parse plain text format education entries', () => {
		const plainText = `Bachelor's Degree

University of Michigan | Ann Arbor, MI

Master of Science

Stanford University | Stanford, CA`;

		const result = parseEducationFromText(plainText);

		expect(result).toHaveLength(2);
		expect(result[0]).toEqual({
			degree: "Bachelor's Degree",
			institution: 'University of Michigan',
			location: 'Ann Arbor, MI',
			graduationYear: undefined,
		});
		expect(result[1]).toEqual({
			degree: 'Master of Science',
			institution: 'Stanford University',
			location: 'Stanford, CA',
			graduationYear: undefined,
		});
	});

	it('should parse education entries with graduation years', () => {
		const textWithYears = `Bachelor's Degree

University of Michigan | Ann Arbor, MI
2020

Master of Science

Stanford University | Stanford, CA
2022`;

		const result = parseEducationFromText(textWithYears);

		expect(result).toHaveLength(2);
		expect(result[0]).toEqual({
			degree: "Bachelor's Degree",
			institution: 'University of Michigan',
			location: 'Ann Arbor, MI',
			graduationYear: '2020',
		});
		expect(result[1]).toEqual({
			degree: 'Master of Science',
			institution: 'Stanford University',
			location: 'Stanford, CA',
			graduationYear: '2022',
		});
	});

	it('should handle education entries with parentheses for location', () => {
		const textWithParens = `Bachelor's Degree

University of Michigan (Ann Arbor, MI)

Master of Science

Stanford University (Stanford, CA)`;

		const result = parseEducationFromText(textWithParens);

		expect(result).toHaveLength(2);
		expect(result[0]).toEqual({
			degree: "Bachelor's Degree",
			institution: 'University of Michigan',
			location: 'Ann Arbor, MI',
			graduationYear: undefined,
		});
		expect(result[1]).toEqual({
			degree: 'Master of Science',
			institution: 'Stanford University',
			location: 'Stanford, CA',
			graduationYear: undefined,
		});
	});

	it('should handle single education entry', () => {
		const singleEntry = `Bachelor's Degree

University of Michigan | Ann Arbor, MI`;

		const result = parseEducationFromText(singleEntry);

		expect(result).toHaveLength(1);
		expect(result[0]).toEqual({
			degree: "Bachelor's Degree",
			institution: 'University of Michigan',
			location: 'Ann Arbor, MI',
			graduationYear: undefined,
		});
	});

	it('should return empty array for empty text', () => {
		const result = parseEducationFromText('');
		expect(result).toHaveLength(0);
	});

	it('should return empty array for whitespace-only text', () => {
		const result = parseEducationFromText('   \n  \t  ');
		expect(result).toHaveLength(0);
	});

	it('should handle various degree formats', () => {
		const variousDegrees = `PhD

University of California | Berkeley, CA

MBA

Harvard Business School | Boston, MA

Associate Degree

Community College | Local, ST

Certificate

Online University | Remote`;

		const result = parseEducationFromText(variousDegrees);

		expect(result).toHaveLength(4);
		expect(result[0].degree).toBe('PhD');
		expect(result[1].degree).toBe('MBA');
		expect(result[2].degree).toBe('Associate Degree');
		expect(result[3].degree).toBe('Certificate');
	});

	it('should handle institution names without location', () => {
		const noLocation = `Bachelor's Degree

University of Michigan

Master of Science

Stanford University`;

		const result = parseEducationFromText(noLocation);

		expect(result).toHaveLength(2);
		expect(result[0]).toEqual({
			degree: "Bachelor's Degree",
			institution: 'University of Michigan',
			location: '',
			graduationYear: undefined,
		});
		expect(result[1]).toEqual({
			degree: 'Master of Science',
			institution: 'Stanford University',
			location: '',
			graduationYear: undefined,
		});
	});
});
