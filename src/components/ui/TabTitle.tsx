import clsx from 'clsx';
import { type ReactNode, memo } from 'react';

type TabTitleProps = {
	title: string;
	componentName?: string;
	actionButton?: ReactNode;
};

export const TabTitle = memo(function TabTitle({
	title,
	componentName,
	actionButton,
}: TabTitleProps) {
	return (
		<div className='flex items-start justify-between'>
			<h2
				className={clsx(
					componentName || 'TabTitle',
					'text-2xl font-bold text-black'
				)}
			>
				{title}
			</h2>
			{actionButton}
		</div>
	);
});
