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

describe('useResumeStore', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		useResumeStore.getState().clearResume();
	});

	it('should initialize with default education entry', () => {
		const { resumeDetails } = useResumeStore.getState();

		expect(resumeDetails.education).toHaveLength(1);
		expect(resumeDetails.education[0]).toEqual({
			id: expect.any(String),
			include: true,
			degree: '',
			graduationYear: '',
			institution: '',
			location: '',
		});
	});

	it('should add education entry', () => {
		const { addEducation } = useResumeStore.getState();
		const newEducation = {
			id: 'test-id',
			include: true,
			degree: 'Bachelor of Science',
			graduationYear: '2020',
			institution: 'Test University',
			location: 'Test City, ST',
		};

		addEducation(newEducation);

		const { resumeDetails } = useResumeStore.getState();
		expect(resumeDetails.education).toHaveLength(2);
		expect(resumeDetails.education[1]).toEqual(newEducation);
	});

	it('should remove education entry', () => {
		const { addEducation, removeEducation } = useResumeStore.getState();
		const newEducation = {
			id: 'test-id',
			include: true,
			degree: 'Bachelor of Science',
			graduationYear: '2020',
			institution: 'Test University',
			location: 'Test City, ST',
		};

		addEducation(newEducation);
		expect(useResumeStore.getState().resumeDetails.education).toHaveLength(2);

		removeEducation(1);
		expect(useResumeStore.getState().resumeDetails.education).toHaveLength(1);
	});

	it('should ensure at least one education entry remains when removing all', () => {
		const { removeEducation } = useResumeStore.getState();

		removeEducation(0);

		const { resumeDetails } = useResumeStore.getState();
		expect(resumeDetails.education).toHaveLength(1);
		expect(resumeDetails.education[0]).toEqual({
			id: expect.any(String),
			include: true,
			degree: '',
			graduationYear: '',
			institution: '',
			location: '',
		});
	});

	it('should update education entry', () => {
		const { updateEducation } = useResumeStore.getState();
		const updatedEducation = {
			id: 'updated-id',
			include: true,
			degree: 'Master of Science',
			graduationYear: '2022',
			institution: 'Updated University',
			location: 'Updated City, ST',
		};

		updateEducation(0, updatedEducation);

		const { resumeDetails } = useResumeStore.getState();
		expect(resumeDetails.education[0]).toEqual(updatedEducation);
	});

	it('should set education array', () => {
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
	});

	it('should set resume field', () => {
		const { setResumeField } = useResumeStore.getState();

		setResumeField('summary', 'Updated summary');
		setResumeField('experience', 'Updated experience');

		const { resumeDetails } = useResumeStore.getState();
		expect(resumeDetails.summary).toBe('Updated summary');
		expect(resumeDetails.experience).toBe('Updated experience');
	});

	it('should clear resume data', () => {
		const { setResumeDetails, clearResume } = useResumeStore.getState();

		setResumeDetails({
			summary: 'Test summary',
			experience: 'Test experience',
			education: [
				{
					id: 'test-id',
					include: true,
					degree: 'Test Degree',
					graduationYear: '2020',
					institution: 'Test Institution',
					location: 'Test Location',
				},
			],
		});

		clearResume();

		const { resumeDetails } = useResumeStore.getState();
		expect(resumeDetails.summary).toBe('');
		expect(resumeDetails.experience).toBe('');
		expect(resumeDetails.education).toHaveLength(1);
		expect(resumeDetails.education[0]).toEqual({
			id: expect.any(String),
			include: true,
			degree: '',
			graduationYear: '',
			institution: '',
			location: '',
		});
	});
});
