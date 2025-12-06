'use client';

import { type ReactNode, memo } from 'react';

import { PreviewHeader } from './PreviewHeader';
import { PreviewStateManager } from './PreviewStateManager';

type PreviewLayoutProps = {
	hasData: boolean;
	hasSelectedDocuments: boolean;
	isProcessing: boolean;
	children: ReactNode;
};

export const PreviewLayout = memo(function PreviewLayout({
	hasData,
	hasSelectedDocuments,
	isProcessing,
	children,
}: PreviewLayoutProps) {
	return (
		<div className='PreviewContent flex flex-col gap-12'>
			<PreviewHeader />
			<div className='flex flex-col gap-4'>
				<PreviewStateManager
					hasData={hasData}
					hasSelectedDocuments={hasSelectedDocuments}
					isProcessing={isProcessing}
				>
					{children}
				</PreviewStateManager>
			</div>
		</div>
	);
});
