'use client';

import { memo } from 'react';
import QRCode from 'react-qr-code';
import type { CandidateDetails } from '@/types';

type QRCodeProps = {
	candidateDetails: CandidateDetails;
	className?: string;
	size?: number;
};

export const PortfolioQRCode = memo(function PortfolioQRCode({
	candidateDetails,
	className = '',
	size = 80,
}: QRCodeProps) {
	const { portfolio, portfolioQRCode } = candidateDetails;

	if (!portfolioQRCode || !portfolio || portfolio.trim() === '') {
		return null;
	}

	return (
		<div className={`PortfolioQRCode ${className}`}>
			<QRCode
				value={portfolio}
				size={size}
				viewBox={`0 0 ${size} ${size}`}
				style={{ width: '100%', maxWidth: '100%', height: 'auto' }}
			/>
		</div>
	);
});
