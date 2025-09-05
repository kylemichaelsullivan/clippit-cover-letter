import type { CandidateDetails } from '@/types';

export const mockCandidateDetails: CandidateDetails = {
	fullName: 'John Doe',
	email: 'john@example.com',
	phone: '(123) 456-7890',
	location: 'New York, NY',
	linkedin: 'johndoe',
	portfolio: 'https://johndoe.com',
	logo: '',
	logoInclude: true,
	signature: 'data:image/png;base64,test-signature',
	portfolioQRCode: true,
	signatureUseImage: true,
};

export const mockEmptyCandidateDetails: CandidateDetails = {
	fullName: '',
	email: '',
	phone: '',
	location: '',
	linkedin: '',
	portfolio: '',
	logo: '',
	logoInclude: true,
	signature: '',
	portfolioQRCode: true,
	signatureUseImage: false,
};

export const mockPartialCandidateDetails: CandidateDetails = {
	fullName: 'Jane Smith',
	email: 'jane@example.com',
	phone: '',
	location: 'San Francisco, CA',
	linkedin: 'janesmith',
	portfolio: '',
	logo: '',
	logoInclude: false,
	signature: '',
	portfolioQRCode: false,
	signatureUseImage: false,
};
