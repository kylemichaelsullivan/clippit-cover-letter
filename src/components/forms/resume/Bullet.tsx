'use client';

import { Button } from '@/components/ui/buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { PLACEHOLDERS } from '@/config';

type BulletProps = {
	value: string;
	onChange: (value: string) => void;
	onRemove: () => void;
	placeholder?: string;
};

export function Bullet({
	value,
	onChange,
	onRemove,
	placeholder,
}: BulletProps) {
	return (
		<div className='flex items-start gap-2'>
			<input
				type='search'
				value={value}
				className='text-2xs flex-1 sm:text-base'
				placeholder={placeholder || PLACEHOLDERS.EXPERIENCE?.BULLET}
				onChange={(e) => onChange(e.target.value)}
			/>
			{value.trim() === '' && (
				<Button
					componentName='RemoveBulletButton'
					color='danger'
					size='xs'
					title='Remove Bullet Point'
					onClick={onRemove}
				>
					<FontAwesomeIcon icon={faTrash} aria-hidden='true' />
				</Button>
			)}
		</div>
	);
}
