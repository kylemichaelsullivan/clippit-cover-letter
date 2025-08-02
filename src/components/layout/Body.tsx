'use client';

import { memo } from 'react';
import type { ReactNode } from 'react';
import { SkipLinkTarget } from '@/components/ui/navigation';

type BodyProps = {
	children: ReactNode;
};

export const Body = memo(function Body({ children }: BodyProps) {
	return (
		<SkipLinkTarget
			className='Body focus:ring-blue flex w-full max-w-7xl flex-1 flex-col justify-start gap-2 px-3 py-6 focus:ring-2 focus:ring-offset-2 focus:outline-none sm:px-4 sm:py-8 lg:px-8'
			id='Body'
			tabIndex={-1}
		>
			{children}
		</SkipLinkTarget>
	);
});
