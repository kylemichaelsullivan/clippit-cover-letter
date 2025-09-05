import type { Experience, Education } from '@/types';

export const mockExperience: Experience[] = [
	{
		id: 'exp-1',
		include: true,
		title: 'Senior Software Engineer',
		company: 'Tech Corp',
		start: 'January 2020',
		end: 'Present',
		bullets: [
			'Led development of microservices architecture',
			'Improved system performance by 40%',
			'Mentored junior developers',
		],
	},
	{
		id: 'exp-2',
		include: true,
		title: 'Software Engineer',
		company: 'Startup Inc',
		start: 'June 2018',
		end: 'December 2019',
		bullets: [
			'Developed React applications',
			'Collaborated with design team',
			'Implemented automated testing',
		],
	},
];

export const mockEducation: Education[] = [
	{
		id: 'edu-1',
		include: true,
		degree: 'Bachelor of Science in Computer Science',
		graduationYear: '2018',
		institution: 'University of Technology',
		location: 'Boston, MA',
	},
];

export const mockSkills = [
	'JavaScript',
	'TypeScript',
	'React',
	'Node.js',
	'Python',
	'SQL',
];

export const mockSkillGroups = [
	{
		id: '1',
		name: 'Programming Languages',
		skills: ['JavaScript', 'TypeScript', 'Python'],
		include: true,
	},
	{
		id: '2',
		name: 'Frameworks',
		skills: ['React', 'Node.js', 'Express'],
		include: true,
	},
	{
		id: '3',
		name: 'Tools',
		skills: ['Git', 'Docker', 'AWS'],
		include: false,
	},
];
