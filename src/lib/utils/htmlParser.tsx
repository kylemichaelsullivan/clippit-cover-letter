import type { ReactNode } from 'react';

export const parseHtmlToReact = (html: string): ReactNode[] => {
	if (!html) return [];

	const tempDiv = document.createElement('div');
	tempDiv.innerHTML = html;

	const nodes: ReactNode[] = [];
	let keyCounter = 0;

	const convertNode = (node: Node): ReactNode => {
		if (node.nodeType === Node.TEXT_NODE) {
			return node.textContent;
		}

		if (node.nodeType === Node.ELEMENT_NODE) {
			const element = node as Element;
			const tagName = element.tagName.toLowerCase();
			const children = Array.from(element.childNodes).map(convertNode);
			const key = `html-node-${keyCounter++}`;

			switch (tagName) {
				case 'p':
					return <p key={key}>{children}</p>;
				case 'h1':
					return <h1 key={key}>{children}</h1>;
				case 'h2':
					return <h2 key={key}>{children}</h2>;
				case 'h3':
					return <h3 key={key}>{children}</h3>;
				case 'h4':
					return <h4 key={key}>{children}</h4>;
				case 'strong':
					return <strong key={key}>{children}</strong>;
				case 'em':
					return <em key={key}>{children}</em>;
				case 'ul':
					return <ul key={key}>{children}</ul>;
				case 'ol':
					return <ol key={key}>{children}</ol>;
				case 'li':
					return <li key={key}>{children}</li>;
				case 'br':
					return <br key={key} />;
				case 'span':
					const className = element.getAttribute('class');
					return (
						<span className={className || undefined} key={key}>
							{children}
						</span>
					);
				case 'div':
					return <div key={key}>{children}</div>;
				default:
					return <span key={key}>{children}</span>;
			}
		}

		return null;
	};

	Array.from(tempDiv.childNodes).forEach((node) => {
		const converted = convertNode(node);
		if (converted !== null) {
			nodes.push(converted);
		}
	});

	return nodes;
};
