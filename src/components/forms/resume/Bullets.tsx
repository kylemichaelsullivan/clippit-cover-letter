'use client';

import { Field } from '@tanstack/react-form';
import { Button } from '@/components/ui/buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Bullet } from './Bullet';
import { PLACEHOLDERS } from '@/config';
import { FormFieldLabel } from '@/components/ui/FormFieldLabel';

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
	const addBullet = () => {
		const currentBullets =
			form.getFieldValue(`experience.${experienceIndex}.bullets`) || [];
		const updatedBullets = [...currentBullets, ''];
		form.setFieldValue(`experience.${experienceIndex}.bullets`, updatedBullets);
		handleFieldChange?.(
			`experience.${experienceIndex}.bullets`,
			updatedBullets,
		);
	};

	const removeBullet = (bulletIndex: number) => {
		const currentBullets =
			form.getFieldValue(`experience.${experienceIndex}.bullets`) || [];
		const updatedBullets = currentBullets.filter(
			(_: string, index: number) => index !== bulletIndex,
		);
		form.setFieldValue(`experience.${experienceIndex}.bullets`, updatedBullets);
		handleFieldChange?.(
			`experience.${experienceIndex}.bullets`,
			updatedBullets,
		);
	};

	return (
		<div className='flex flex-col gap-2'>
			<FormFieldLabel
				labelContent={
					<Button
						color='success'
						componentName='AddBulletButton'
						size='sm'
						title='Add Bullet Point'
						onClick={addBullet}
					>
						<FontAwesomeIcon icon={faPlus} aria-hidden='true' />
					</Button>
				}
			>
				Bullets
			</FormFieldLabel>

			<Field name={`experience.${experienceIndex}.bullets`} form={form}>
				{(field) => {
					const bullets = Array.isArray(field.state.value)
						? field.state.value
						: [];

					return (
						<div className='flex flex-col gap-2'>
							{bullets.map((bullet: string, bulletIndex: number) => (
								<Bullet
									value={bullet}
									onChange={(value) => {
										const updatedBullets = [...bullets];
										updatedBullets[bulletIndex] = value;
										field.handleChange(updatedBullets);
										handleFieldChange?.(
											`experience.${experienceIndex}.bullets`,
											updatedBullets,
										);
									}}
									placeholder={PLACEHOLDERS.EXPERIENCE?.BULLET}
									onRemove={() => removeBullet(bulletIndex)}
									key={bulletIndex}
								/>
							))}
							{bullets.length === 0 && (
								<p className='text-gray text-sm italic'>
									No bullets yet. Click the + button to add your achievements.
								</p>
							)}
						</div>
					);
				}}
			</Field>
		</div>
	);
}
