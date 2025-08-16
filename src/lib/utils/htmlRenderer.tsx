import { extractTipTapContent } from './tiptap';
import { parseHtmlToReact } from './htmlParser';

export const renderHtmlContent = (content: string) => {
	const extractedContent = extractTipTapContent(content);
	const reactNodes = parseHtmlToReact(extractedContent);

	return <div className='flex flex-col gap-2'>{reactNodes}</div>;
};
