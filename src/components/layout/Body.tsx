'use client';

import { SkipLinkTarget } from '@/components/ui/navigation';
import { memo } from 'react';
import type { ReactNode } from 'react';

type BodyProps = {
	children: ReactNode;
};

export const Body = memo(function Body({ children }: BodyProps) {
	return (
		<SkipLinkTarget
			className='Body flex w-full max-w-7xl flex-1 flex-col justify-start gap-2 overflow-y-auto px-3 py-6 focus:outline-none sm:px-4 sm:py-8 lg:px-8'
			id='Body'
			tabIndex={-1}
		>
			{children}
		</SkipLinkTarget>
	);
});
