'use client';

import { memo } from 'react';
import { FormSection } from '@/components/forms/core';
import { SkillsRangeSlider } from '@/components/ui/input';
import { SkillsSummarySection } from '@/components/features';
import { useSkillsStore } from '@/lib/stores';

export const JobSkillsSection = memo(function JobSkillsSection() {
	const { skills, setSkillsRange } = useSkillsStore();

	return (
		<FormSection title='Select Skills'>
			<div className='flex flex-col gap-4'>
				{skills?.groups?.length > 0 && (
					<div className='flex flex-col gap-2'>
						<SkillsRangeSlider
							minSkills={skills.minSkillsToUse}
							maxSkills={skills.maxSkillsToUse}
							onRangeChange={setSkillsRange}
						/>
					</div>
				)}

				<SkillsSummarySection />
			</div>
		</FormSection>
	);
});
