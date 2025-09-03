'use client';

import { BulletManager } from '@/components/forms/core';
import { PLACEHOLDERS } from '@/config';

type BulletsProps = {
	form: any; // TanStack Form
	experienceIndex: number;
	handleFieldChange?: (fieldName: string, value: any) => void;
};

export function Bullets({
	form,
	experienceIndex,
	handleFieldChange,
}: BulletsProps) {
	return (
		<BulletManager
			className='col-span-full'
			label='Bullets'
			form={form}
			fieldPath={`experience.${experienceIndex}.bullets`}
			placeholder={PLACEHOLDERS.EXPERIENCE?.BULLET}
			onFieldChange={handleFieldChange}
		/>
	);
}
