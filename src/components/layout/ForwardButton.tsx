'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { CONSTANTS } from '@/config';
import { Button } from '@/components/ui/buttons';

type ForwardButtonProps = {
	onClick?: () => void;
	title?: string;
	disabled?: boolean;
};

export function ForwardButton({
	onClick,
	title,
	disabled = false,
}: ForwardButtonProps) {
	return (
		<Button
			componentName='ForwardButton'
			color='secondary'
			size='md'
			aria-label={CONSTANTS.ARIA_LABELS.NAVIGATION.FORWARD}
			title={title}
			onClick={onClick}
			tabIndex={0}
			disabled={disabled}
		>
			<FontAwesomeIcon icon={faChevronRight} aria-hidden='true' />
		</Button>
	);
}
