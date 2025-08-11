import type { CandidateDetails } from '@/types';

type PageHeaderProps = {
	candidateDetails: CandidateDetails;
};

export function PageHeader({ candidateDetails }: PageHeaderProps) {
	const { fullName, email, phone, linkedin, portfolio } = candidateDetails;

	const formattedLinkedin = linkedin ? `/in/${linkedin}` : '';
	const contactInfo = [email, phone, formattedLinkedin, portfolio]
		.filter(Boolean)
		.join(' | ');

	return (
		<div className='page-header'>
			<h1 className='page-header-name'>{fullName}</h1>
			{contactInfo && <div className='page-header-contact'>{contactInfo}</div>}
		</div>
	);
}
