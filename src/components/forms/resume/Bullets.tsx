'use client';

import { useState } from 'react';
import { Field } from '@tanstack/react-form';
import { Button } from '@/components/ui/buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowsUpDown } from '@fortawesome/free-solid-svg-icons';
import { DraggableBullet } from './DraggableBullet';
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
	const [isDragMode, setIsDragMode] = useState(false);
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

	const moveBullet = (dragIndex: number, hoverIndex: number) => {
		const currentBullets =
			form.getFieldValue(`experience.${experienceIndex}.bullets`) || [];
		const draggedItem = currentBullets[dragIndex];
		const updatedBullets = [...currentBullets];
		updatedBullets.splice(dragIndex, 1);
		updatedBullets.splice(hoverIndex, 0, draggedItem);
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
					<div className='flex gap-2'>
						<Button
							color={isDragMode ? 'secondary' : 'primary'}
							componentName='ToggleDragButton'
							size='sm'
							title={isDragMode ? 'Disable Drag Mode' : 'Enable Drag Mode'}
							onClick={() => setIsDragMode(!isDragMode)}
							className={isDragMode ? 'shadow-md' : ''}
						>
							<FontAwesomeIcon icon={faArrowsUpDown} aria-hidden='true' />
						</Button>
						<Button
							color='success'
							componentName='AddBulletButton'
							size='sm'
							title='Add Bullet Point'
							onClick={addBullet}
						>
							<FontAwesomeIcon icon={faPlus} aria-hidden='true' />
						</Button>
					</div>
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
							{bullets.map((bullet: string, bulletIndex: number) =>
								isDragMode ? (
									<DraggableBullet
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
										index={bulletIndex}
										moveBullet={moveBullet}
										onDoubleClick={() => setIsDragMode(false)}
										key={bulletIndex}
									/>
								) : (
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
										onDoubleClick={() => setIsDragMode(true)}
										key={bulletIndex}
									/>
								),
							)}
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
