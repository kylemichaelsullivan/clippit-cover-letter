'use client';

import { memo } from 'react';
import type { ReactNode } from 'react';

type BodyProps = {
	children: ReactNode;
};

export const Body = memo(function Body({ children }: BodyProps) {
	return (
		<main className='Body flex w-full max-w-7xl flex-1 flex-col justify-start gap-2 px-3 py-6 sm:px-4 sm:py-8 lg:px-8'>
			{children}
		</main>
	);
});
