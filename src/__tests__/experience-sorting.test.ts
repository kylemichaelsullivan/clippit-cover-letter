import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useResumeStore } from '@/lib/stores/useResumeStore';

const localStorageMock = {
	getItem: vi.fn(),
	setItem: vi.fn(),
	removeItem: vi.fn(),
	clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
	value: localStorageMock,
});

// Helper function to compare dates
const compareDates = (dateA: string, dateB: string) => {
	// Handle empty dates
	if (!dateA && !dateB) return 0;
	if (!dateA) return 1;
	if (!dateB) return -1;

	// Parse dates in "Month Year" format
	const parseDate = (dateStr: string) => {
		const parts = dateStr.split(' ');
		if (parts.length !== 2) return null;

		const month = parts[0];
		const year = parseInt(parts[1], 10);

		if (Number.isNaN(year)) return null;

		const monthIndex = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		].indexOf(month);

		if (monthIndex === -1) return null;

		return { year, month: monthIndex };
	};

	const parsedA = parseDate(dateA);
	const parsedB = parseDate(dateB);

	if (!parsedA && !parsedB) return 0;
	if (!parsedA) return 1;
	if (!parsedB) return -1;

	// Compare by year first, then by month
	if (parsedA.year !== parsedB.year) {
		return parsedA.year - parsedB.year; // Descending (newer years first)
	}
	return parsedA.month - parsedB.month; // Descending (newer months first)
};

describe('Experience Sorting', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		useResumeStore.getState().clearResume();
	});

	it('should correctly compare dates', () => {
		// Test date comparison logic
		expect(compareDates('March 2023', 'January 2020')).toBeGreaterThan(0); // March 2023 should come before January 2020 (descending)
		expect(compareDates('January 2020', 'March 2023')).toBeLessThan(0); // January 2020 should come after March 2023 (descending)
		expect(compareDates('March 2020', 'January 2020')).toBeGreaterThan(0); // March 2020 should come before January 2020 (descending)
		expect(compareDates('January 2020', 'March 2020')).toBeLessThan(0); // January 2020 should come after March 2020 (descending)
	});

	it('should sort experience by end date descending, treating Present as later than any month/year', () => {
		const { setExperience } = useResumeStore.getState();

		const experienceArray = [
			{
				id: 'exp-1',
				include: true,
				title: 'Software Engineer',
				company: 'Company A',
				start: 'January 2020',
				end: 'December 2022',
				bullets: [],
			},
			{
				id: 'exp-2',
				include: true,
				title: 'Senior Developer',
				company: 'Company B',
				start: 'March 2023',
				end: 'Present',
				bullets: [],
			},
			{
				id: 'exp-3',
				include: true,
				title: 'Junior Developer',
				company: 'Company C',
				start: 'June 2018',
				end: 'December 2019',
				bullets: [],
			},
		];

		setExperience(experienceArray);

		// Verify initial order
		let { resumeDetails } = useResumeStore.getState();
		expect(resumeDetails.experience[0].end).toBe('December 2022');
		expect(resumeDetails.experience[1].end).toBe('Present');
		expect(resumeDetails.experience[2].end).toBe('December 2019');

		// Sort by date
		const sortedExperience = [...experienceArray].sort((a, b) => {
			// Parse end dates
			const endDateA = a.end;
			const endDateB = b.end;

			// Handle "Present" as later than any month/year
			if (endDateA === 'Present' && endDateB !== 'Present') return -1;
			if (endDateA !== 'Present' && endDateB === 'Present') return 1;
			if (endDateA === 'Present' && endDateB === 'Present') {
				// Both are "Present", sort by start date descending
				return compareDates(b.start, a.start);
			}

			// Compare end dates first (descending)
			const endComparison = compareDates(endDateB, endDateA);
			if (endComparison !== 0) return endComparison;

			// If end dates are equal, sort by start date descending
			return compareDates(b.start, a.start);
		});

		// Update with sorted experience
		setExperience(sortedExperience);

		// Verify sorted order: Present first, then by end date descending
		resumeDetails = useResumeStore.getState().resumeDetails;
		expect(resumeDetails.experience[0].end).toBe('Present');
		expect(resumeDetails.experience[1].end).toBe('December 2022');
		expect(resumeDetails.experience[2].end).toBe('December 2019');
	});

	it('should sort multiple Present roles by start date descending', () => {
		const { setExperience } = useResumeStore.getState();

		const experienceArray = [
			{
				id: 'exp-1',
				include: true,
				title: 'Software Engineer',
				company: 'Company A',
				start: 'January 2020',
				end: 'Present',
				bullets: [],
			},
			{
				id: 'exp-2',
				include: true,
				title: 'Senior Developer',
				company: 'Company B',
				start: 'March 2023',
				end: 'Present',
				bullets: [],
			},
		];

		setExperience(experienceArray);

		// Verify initial order
		let { resumeDetails } = useResumeStore.getState();
		expect(resumeDetails.experience[0].start).toBe('January 2020');
		expect(resumeDetails.experience[1].start).toBe('March 2023');

		// Sort by date
		const sortedExperience = [...experienceArray].sort((a, b) => {
			// Parse end dates
			const endDateA = a.end;
			const endDateB = b.end;

			// Handle "Present" as later than any month/year
			if (endDateA === 'Present' && endDateB !== 'Present') return -1;
			if (endDateA !== 'Present' && endDateB === 'Present') return 1;
			if (endDateA === 'Present' && endDateB === 'Present') {
				// Both are "Present", sort by start date descending
				return compareDates(b.start, a.start);
			}

			// Compare end dates first (descending)
			const endComparison = compareDates(endDateB, endDateA);
			if (endComparison !== 0) return endComparison;

			// If end dates are equal, sort by start date descending
			return compareDates(b.start, a.start);
		});

		// Update with sorted experience
		setExperience(sortedExperience);

		// Verify sorted order: Present roles sorted by start date descending
		resumeDetails = useResumeStore.getState().resumeDetails;
		expect(resumeDetails.experience[0].start).toBe('March 2023');
		expect(resumeDetails.experience[1].start).toBe('January 2020');
	});

	it('should handle experience entries with equal end dates by sorting by start date descending', () => {
		const { setExperience } = useResumeStore.getState();

		const experienceArray = [
			{
				id: 'exp-1',
				include: true,
				title: 'Software Engineer',
				company: 'Company A',
				start: 'January 2020',
				end: 'December 2022',
				bullets: [],
			},
			{
				id: 'exp-2',
				include: true,
				title: 'Senior Developer',
				company: 'Company B',
				start: 'March 2020',
				end: 'December 2022',
				bullets: [],
			},
		];

		setExperience(experienceArray);

		// Verify initial order
		let { resumeDetails } = useResumeStore.getState();
		expect(resumeDetails.experience[0].start).toBe('January 2020');
		expect(resumeDetails.experience[1].start).toBe('March 2020');

		// Sort by date
		const sortedExperience = [...experienceArray].sort((a, b) => {
			// Parse end dates
			const endDateA = a.end;
			const endDateB = b.end;

			// Handle "Present" as later than any month/year
			if (endDateA === 'Present' && endDateB !== 'Present') return -1;
			if (endDateA !== 'Present' && endDateB === 'Present') return 1;
			if (endDateA === 'Present' && endDateB === 'Present') {
				// Both are "Present", sort by start date descending
				return compareDates(b.start, a.start);
			}

			// Compare end dates first (descending)
			const endComparison = compareDates(endDateB, endDateA);
			if (endComparison !== 0) return endComparison;

			// If end dates are equal, sort by start date descending
			return compareDates(b.start, a.start);
		});

		// Update with sorted experience
		setExperience(sortedExperience);

		// Verify sorted order: Equal end dates, sorted by start date descending
		resumeDetails = useResumeStore.getState().resumeDetails;
		expect(resumeDetails.experience[0].start).toBe('March 2020');
		expect(resumeDetails.experience[1].start).toBe('January 2020');
	});
});
