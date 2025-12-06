'use client';

import clsx from 'clsx';
import { type ReactNode, memo } from 'react';
import { Toaster } from 'react-hot-toast';

import { Body, Footer, Header } from '@/components/layout';

type ClientLayoutContentProps = {
	children: ReactNode;
};

export const ClientLayoutContent = memo(function ClientLayoutContent({
	children,
}: ClientLayoutContentProps) {
	const toastBaseClasses =
		'bg-white text-black border rounded-lg shadow-lg text-sm p-3';
	const toastBorderClasses = {
		default: 'border-light-gray',
		success: 'border-green',
		error: 'border-red',
	};

	return (
		<div className='ClientLayoutContent bg-light-gray flex min-h-screen flex-col items-center'>
			<Header />
			<Body>{children}</Body>
			<Footer />
			<Toaster
				toastOptions={{
					className: clsx(toastBaseClasses, toastBorderClasses.default),
					success: {
						className: clsx(toastBaseClasses, toastBorderClasses.success),
					},
					error: {
						className: clsx(toastBaseClasses, toastBorderClasses.error),
					},
				}}
			/>
		</div>
	);
});
