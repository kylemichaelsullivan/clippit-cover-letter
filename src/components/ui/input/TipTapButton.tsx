'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type IconDefinition } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { Button } from '@/components/ui/buttons/Button';

type TipTapButtonProps = {
	onClick: () => void;
	icon: IconDefinition;
	label: string;
	title?: string;
	number?: number;
	iconClassName?: string;
	showShadow?: boolean;
};

export function TipTapButton({
	onClick,
	icon,
	label,
	title,
	number,
	iconClassName,
	showShadow,
}: TipTapButtonProps) {
	return (
		<Button
			componentName='TipTapButton'
			color='secondary'
			size='tiptap'
			aria-label={label}
			title={title || label}
			onClick={onClick}
		>
			{showShadow && (
				<FontAwesomeIcon
					icon={icon}
					className={clsx('absolute translate-x-0.5 opacity-25', iconClassName)}
				/>
			)}
			<FontAwesomeIcon icon={icon} className={iconClassName} />
			{number && (
				<span className='absolute right-1/12 bottom-0 text-xs font-bold'>
					{number}
				</span>
			)}
		</Button>
	);
}
