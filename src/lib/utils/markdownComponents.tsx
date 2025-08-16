import ReactMarkdown from 'react-markdown';

export const convertHtmlToMarkdown = (htmlContent: string): string => {
	const content = htmlContent;

	return content
		.replace(/<h2>(.*?)<\/h2>/g, '## $1')
		.replace(/<h3>(.*?)<\/h3>/g, '### $1')
		.replace(/<h4>(.*?)<\/h4>/g, '#### $1')
		.replace(/<strong>(.*?)<\/strong>/g, '**$1**')
		.replace(/<em>(.*?)<\/em>/g, '*$1*')
		.replace(/<span class="text-shadow">(.*?)<\/span>/g, '_$1_')

		.replace(/<li>(.*?)<\/li>/g, '- $1')
		.replace(/<ul>/g, '')
		.replace(/<\/ul>/g, '')
		.replace(/<p>(.*?)<\/p>/g, '$1\n')

		.replace(/<[^>]*>/g, '');
};

export const sharedMarkdownComponents = {
	h1: ({ children, ...props }: any) => (
		<h2 className='text-xl font-bold' {...props}>
			{children}
		</h2>
	),
	h2: ({ children, ...props }: any) => (
		<h3 className='text-lg font-bold' {...props}>
			{children}
		</h3>
	),
	h3: ({ children, ...props }: any) => (
		<h4 className='text-base font-semibold' {...props}>
			{children}
		</h4>
	),
	p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
	ul: ({ children, ...props }: any) => (
		<ul className='list-disc pl-6' {...props}>
			{children}
		</ul>
	),
	li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
	strong: ({ children, ...props }: any) => (
		<strong className='font-bold' {...props}>
			{children}
		</strong>
	),
	em: ({ children, ...props }: any) => (
		<em className='italic' {...props}>
			{children}
		</em>
	),
	span: ({ children, className, ...props }: any) => {
		if (className === 'text-shadow') {
			return (
				<span className='text-shadow' {...props}>
					{children}
				</span>
			);
		}

		return <span {...props}>{children}</span>;
	},
};

export const renderMarkdownContent = (content: string) => {
	return (
		<div className='flex flex-col gap-2'>
			<ReactMarkdown components={sharedMarkdownComponents}>
				{content}
			</ReactMarkdown>
		</div>
	);
};
