'use client';

import { Button } from '@/components/ui/buttons';
import { PLACEHOLDERS } from '@/config';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type BulletProps = {
	value: string;
	onChange: (value: string) => void;
	onRemove: () => void;
	placeholder?: string;
	onDoubleClick?: () => void;
};

export function Bullet({
	value,
	onChange,
	onRemove,
	placeholder,
	onDoubleClick,
}: BulletProps) {
	return (
		<div
			className='Bullet flex w-full min-w-0 items-start gap-2'
			onDoubleClick={onDoubleClick}
		>
			<input
				type='search'
				value={value}
				className='bullet-input min-w-0 flex-1'
				placeholder={placeholder || PLACEHOLDERS.EXPERIENCE?.BULLET}
				onChange={(e) => onChange(e.target.value)}
			/>
			{value.trim() === '' && (
				<Button
					componentName='RemoveBulletButton'
					className='flex-shrink-0'
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
