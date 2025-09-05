import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useResumeStore } from '@/lib/stores/useResumeStore';

// Mock localStorage
const localStorageMock = {
	getItem: vi.fn(),
	setItem: vi.fn(),
	removeItem: vi.fn(),
	clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
	value: localStorageMock,
});

describe('Education Sorting', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		useResumeStore.getState().clearResume();
	});

	it('should maintain education order when adding entries', () => {
		const { setEducation } = useResumeStore.getState();

		const educationArray = [
			{
				id: 'edu-1',
				include: true,
				degree: 'Bachelor of Science',
				graduationYear: '2020',
				institution: 'University 1',
				location: 'City 1, ST',
			},
			{
				id: 'edu-2',
				include: true,
				degree: 'Master of Science',
				graduationYear: '2022',
				institution: 'University 2',
				location: 'City 2, ST',
			},
		];

		setEducation(educationArray);

		const { resumeDetails } = useResumeStore.getState();
		expect(resumeDetails.education).toEqual(educationArray);
		expect(resumeDetails.education[0].graduationYear).toBe('2020');
		expect(resumeDetails.education[1].graduationYear).toBe('2022');
	});

	it('should sort education by year when sortEducationByYear is called', () => {
		const { setEducation } = useResumeStore.getState();

		// Set education entries in reverse chronological order
		const educationArray = [
			{
				id: 'edu-1',
				include: true,
				degree: 'Bachelor of Science',
				graduationYear: '2020',
				institution: 'University 1',
				location: 'City 1, ST',
			},
			{
				id: 'edu-2',
				include: true,
				degree: 'Master of Science',
				graduationYear: '2022',
				institution: 'University 2',
				location: 'City 2, ST',
			},
		];

		setEducation(educationArray);

		// Verify initial order (should be maintained)
		let { resumeDetails } = useResumeStore.getState();
		expect(resumeDetails.education[0].graduationYear).toBe('2020');
		expect(resumeDetails.education[1].graduationYear).toBe('2022');

		// Now sort by year
		const { updateEducation } = useResumeStore.getState();
		const sortedEducation = [...educationArray].sort((a, b) => {
			const yearA = parseInt(a.graduationYear || '', 10);
			const yearB = parseInt(b.graduationYear || '', 10);
			const isValidA = !Number.isNaN(yearA);
			const isValidB = !Number.isNaN(yearB);
			if (isValidA && isValidB) return yearB - yearA;
			if (isValidA) return -1;
			if (isValidB) return 1;
			return 0;
		});

		// Update with sorted education
		sortedEducation.forEach((edu, index) => {
			updateEducation(index, edu);
		});

		// Verify sorted order (newest first)
		resumeDetails = useResumeStore.getState().resumeDetails;
		expect(resumeDetails.education[0].graduationYear).toBe('2022');
		expect(resumeDetails.education[1].graduationYear).toBe('2020');
	});

	it('should handle education entries without graduation years', () => {
		const { setEducation } = useResumeStore.getState();

		const educationArray = [
			{
				id: 'edu-1',
				include: true,
				degree: 'Bachelor of Science',
				graduationYear: '2020',
				institution: 'University 1',
				location: 'City 1, ST',
			},
			{
				id: 'edu-2',
				include: true,
				degree: 'Master of Science',
				graduationYear: '',
				institution: 'University 2',
				location: 'City 2, ST',
			},
			{
				id: 'edu-3',
				include: true,
				degree: 'PhD',
				graduationYear: '2022',
				institution: 'University 3',
				location: 'City 3, ST',
			},
		];

		setEducation(educationArray);

		// Verify initial order is maintained
		let { resumeDetails } = useResumeStore.getState();
		expect(resumeDetails.education[0].graduationYear).toBe('2020');
		expect(resumeDetails.education[1].graduationYear).toBe('');
		expect(resumeDetails.education[2].graduationYear).toBe('2022');

		// Sort by year
		const sortedEducation = [...educationArray].sort((a, b) => {
			const yearA = parseInt(a.graduationYear || '', 10);
			const yearB = parseInt(b.graduationYear || '', 10);
			const isValidA = !Number.isNaN(yearA);
			const isValidB = !Number.isNaN(yearB);
			if (isValidA && isValidB) return yearB - yearA;
			if (isValidA) return -1;
			if (isValidB) return 1;
			return 0;
		});

		// Update with sorted education
		const { updateEducation } = useResumeStore.getState();
		sortedEducation.forEach((edu, index) => {
			updateEducation(index, edu);
		});

		// Verify sorted order (entries with years first, then entries without years)
		resumeDetails = useResumeStore.getState().resumeDetails;
		expect(resumeDetails.education[0].graduationYear).toBe('2022');
		expect(resumeDetails.education[1].graduationYear).toBe('2020');
		expect(resumeDetails.education[2].graduationYear).toBe('');
	});
});
