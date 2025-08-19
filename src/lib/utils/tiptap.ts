/**
 * Extract content from TipTap HTML, removing the editor wrapper
 */
export function extractTipTapContent(html: string): string {
	if (!html) return '';

	if (html.includes('class="tiptap ProseMirror"')) {
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = html;

		const proseMirrorDiv = tempDiv.querySelector('.ProseMirror');
		if (proseMirrorDiv) {
			let content = proseMirrorDiv.innerHTML;

			content = content
				.replace(/<br class="ProseMirror-trailingBreak">/g, '')
				.replace(
					/<p><br class="ProseMirror-trailingBreak"><\/p>/g,
					'<p><br></p>',
				)
				.replace(/<p><\/p>/g, '<p><br></p>')
				.replace(/<p>\s*<ul[^>]*>.*?<\/ul>\s*<\/p>/gs, (match) => {
					const ulMatch = match.match(/<ul[^>]*>(.*?)<\/ul>/s);
					return ulMatch ? `<ul>${ulMatch[1]}</ul>` : match;
				});

			return content;
		}
	}

	return html;
}
