import { extractTipTapContent } from './tiptap';
import { parseHtmlToReact } from './htmlParser';
import { replaceSignaturePlaceholders } from './signatureReplacement';
import type { CandidateDetails } from '@/types';

export const renderHtmlContent = (
	content: string,
	candidateDetails?: CandidateDetails,
) => {
	const extractedContent = extractTipTapContent(content);
	const contentWithSignature = candidateDetails
		? replaceSignaturePlaceholders(extractedContent, candidateDetails)
		: extractedContent;
	const reactNodes = parseHtmlToReact(contentWithSignature);

	return <div className='flex flex-col gap-2'>{reactNodes}</div>;
};
