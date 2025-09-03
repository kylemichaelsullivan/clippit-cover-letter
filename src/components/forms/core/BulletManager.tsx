'use client';

import { useState } from 'react';

import { Bullet } from '../resume/Bullet';
import { Button } from '@/components/ui/buttons';
import { DraggableBullet } from '../resume/DraggableBullet';
import { faPlus, faArrowsUpDown } from '@fortawesome/free-solid-svg-icons';
import { Field } from '@tanstack/react-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormFieldLabel } from '@/components/ui/FormFieldLabel';

type BulletManagerProps = {
	fieldPath: string;
	form: any;
	className?: string;
	label?: string;
	placeholder?: string;
	onFieldChange?: (fieldName: string, value: any) => void;
};

export function BulletManager({
	fieldPath,
	form,
	className = '',
	label = 'Bullets',
	placeholder = 'Enter bullet point...',
	onFieldChange,
}: BulletManagerProps) {
	const [isDragMode, setIsDragMode] = useState(false);

	const addBullet = () => {
		const currentBullets = form.getFieldValue(fieldPath) || [];
		const updatedBullets = [...currentBullets, ''];
		form.setFieldValue(fieldPath, updatedBullets);
		onFieldChange?.(fieldPath, updatedBullets);
	};

	const removeBullet = (bulletIndex: number) => {
		const currentBullets = form.getFieldValue(fieldPath) || [];
		const updatedBullets = currentBullets.filter(
			(_: string, index: number) => index !== bulletIndex,
		);
		form.setFieldValue(fieldPath, updatedBullets);
		onFieldChange?.(fieldPath, updatedBullets);
	};

	const moveBullet = (dragIndex: number, hoverIndex: number) => {
		const currentBullets = form.getFieldValue(fieldPath) || [];
		const draggedItem = currentBullets[dragIndex];
		const updatedBullets = [...currentBullets];
		updatedBullets.splice(dragIndex, 1);
		updatedBullets.splice(hoverIndex, 0, draggedItem);
		form.setFieldValue(fieldPath, updatedBullets);
		onFieldChange?.(fieldPath, updatedBullets);
	};

	return (
		<div className={`flex flex-col gap-2 ${className}`}>
			<FormFieldLabel
				labelContent={
					<div className='flex gap-2'>
						<Button
							componentName='ToggleDragButton'
							className={isDragMode ? 'shadow-md' : ''}
							color={isDragMode ? 'secondary' : 'primary'}
							size='sm'
							title={isDragMode ? 'Disable Drag Mode' : 'Enable Drag Mode'}
							onClick={() => setIsDragMode(!isDragMode)}
						>
							<FontAwesomeIcon icon={faArrowsUpDown} aria-hidden='true' />
						</Button>
						<Button
							componentName='AddBulletButton'
							color='success'
							size='sm'
							title='Add Bullet Point'
							onClick={addBullet}
						>
							<FontAwesomeIcon icon={faPlus} aria-hidden='true' />
						</Button>
					</div>
				}
			>
				{label}
			</FormFieldLabel>

			<Field name={fieldPath} form={form}>
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
										placeholder={placeholder}
										index={bulletIndex}
										moveBullet={moveBullet}
										key={bulletIndex}
										onChange={(value) => {
											const updatedBullets = [...bullets];
											updatedBullets[bulletIndex] = value;
											field.handleChange(updatedBullets);
											onFieldChange?.(fieldPath, updatedBullets);
										}}
										onRemove={() => removeBullet(bulletIndex)}
										onDoubleClick={() => setIsDragMode(false)}
									/>
								) : (
									<Bullet
										value={bullet}
										placeholder={placeholder}
										onChange={(value) => {
											const updatedBullets = [...bullets];
											updatedBullets[bulletIndex] = value;
											field.handleChange(updatedBullets);
											onFieldChange?.(fieldPath, updatedBullets);
										}}
										onDoubleClick={() => setIsDragMode(true)}
										onRemove={() => removeBullet(bulletIndex)}
										key={bulletIndex}
									/>
								),
							)}
							{bullets.length === 0 && (
								<p className='text-gray text-sm italic'>
									No bullets yet. Click the + button to add your items.
								</p>
							)}
						</div>
					);
				}}
			</Field>
		</div>
	);
}
