import { SkillsHeader } from '@/components/forms/skills/SkillsHeader';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('SkillsHeader', () => {
	it('displays correct group counts', () => {
		render(<SkillsHeader groupsCount={3} activeGroupsCount={2} />);

		expect(screen.getByText('Skill Groups')).toBeInTheDocument();
		expect(screen.getByText('(2/3)')).toBeInTheDocument();
	});

	it('displays zero counts correctly', () => {
		render(<SkillsHeader groupsCount={0} activeGroupsCount={0} />);

		expect(screen.getByText('(0/0)')).toBeInTheDocument();
	});

	it('displays alphabetize button when onAlphabetizeGroups is provided', () => {
		const mockAlphabetizeGroups = vi.fn();

		render(
			<SkillsHeader
				groupsCount={2}
				activeGroupsCount={1}
				onAlphabetizeGroups={mockAlphabetizeGroups}
			/>
		);

		expect(screen.getByText('Alphabetize')).toBeInTheDocument();
		expect(
			screen.getByTitle('Alphabetize Skill Group Names')
		).toBeInTheDocument();
	});

	it('does not display alphabetize button when onAlphabetizeGroups is not provided', () => {
		render(<SkillsHeader groupsCount={2} activeGroupsCount={1} />);

		expect(screen.queryByText('Alphabetize')).not.toBeInTheDocument();
	});
});
