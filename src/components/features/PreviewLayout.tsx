'use client';

import { memo, type ReactNode } from 'react';

import { PreviewHeader } from './PreviewHeader';
import { PreviewStateManager } from './PreviewStateManager';

type PreviewLayoutProps = {
	hasData: boolean;
	hasSelectedDocuments: boolean;
	children: ReactNode;
};

export const PreviewLayout = memo(function PreviewLayout({
	hasData,
	hasSelectedDocuments,
	children,
}: PreviewLayoutProps) {
	return (
		<div className='PreviewContent flex flex-col gap-12'>
			<PreviewHeader />
			<div className='flex flex-col gap-4'>
				<PreviewStateManager
					hasData={hasData}
					hasSelectedDocuments={hasSelectedDocuments}
				>
					{children}
				</PreviewStateManager>
			</div>
		</div>
	);
});

