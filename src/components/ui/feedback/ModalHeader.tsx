'use client';

import { Button } from '@/components/ui/buttons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ModalHeaderProps = {
	title: string;
	onClose: () => void;
	className?: string;
};

export const ModalHeader = function ModalHeader({
	title,
	onClose,
	className = '',
}: ModalHeaderProps) {
	return (
		<div className={`flex items-center justify-between pb-4 ${className}`}>
			<h3 className='xs:text-lg text-md font-semibold text-black'>{title}</h3>
			<Button
				componentName='ModalCloseButton'
				title='Close'
				color='danger'
				size='sm'
				onClick={onClose}
			>
				<FontAwesomeIcon icon={faXmark} aria-hidden='true' />
			</Button>
		</div>
	);
};
