import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { DocumentContent } from '@/components/results/panels';
import { mockCandidateStore } from '@/lib/test-utils';

vi.mock('@/lib/stores', () => ({
	useCandidateStore: () => mockCandidateStore,
}));

vi.mock('@/components/results/panels/DocumentHeader', () => ({
	DocumentHeader: ({ title, fontSizeInput, headerElement }: any) => (
		<div data-testid='document-header'>
			{title} - {fontSizeInput ? 'has-font-size' : 'no-font-size'} -{' '}
			{headerElement ? 'has-header-element' : 'no-header-element'}
			{headerElement}
		</div>
	),
}));

vi.mock('@/components/results/panels/DocumentPreview', () => ({
	DocumentPreview: ({ content, documentType, fontSize }: any) => (
		<div data-testid='document-preview'>
			{content} - {documentType} - {fontSize}
		</div>
	),
}));

vi.mock('@/components/results/panels/DocumentGenerationState', () => ({
	DocumentGenerationState: ({ isGenerating, title }: any) => (
		<div data-testid='generation-state'>
			{isGenerating ? `Generating ${title}…` : 'Not generating'}
		</div>
	),
}));

vi.mock('@/components/ui/input', () => ({
	TipTapEditor: ({ value, onChange, placeholder, id }: any) => (
		<div data-testid='tiptap-editor'>
			<textarea
				data-testid='tiptap-textarea'
				value={value}
				onChange={(e) => onChange?.(e.target.value)}
				placeholder={placeholder}
				id={id}
			/>
		</div>
	),
}));

vi.mock('@/components/ui/buttons', () => ({
	ViewToggle: ({ isTipTapView, onToggle }: any) => (
		<button data-testid='view-toggle' onClick={onToggle}>
			{isTipTapView ? 'TipTap View' : 'Preview View'}
		</button>
	),
}));

vi.mock('@/config', () => ({
	PLACEHOLDERS: {
		GENERAL: {
			DOCUMENT_CONTENT: 'Enter {title} content here',
		},
	},
	DEFAULTS: {
		FORM_DEFAULTS: {
			INCLUDE_COVER_LETTER: true,
			INCLUDE_RESUME: true,
			INCLUDE_SKILL_GROUP_NAMES: true,
		},
		INITIAL_STATES: {
			DOCUMENT_INSTRUCTIONS: {
				skillsInstructions: '',
				coverLetterInstructions: '',
				resumeInstructions: '',
			},
			GENERATION: {
				generatedSkills: '',
			},
			TEMPLATES: {
				coverLetter: '',
				resume: '',
			},
			RESUME: {
				summary: '',
			},
		},
	},
}));

describe('DocumentContent', () => {
	const defaultProps = {
		title: 'Test Document',
		content: 'Test content',
		fontSize: [12, 'pt'] as [number, 'pt'],
	};

	it('renders document header with title', () => {
		render(<DocumentContent {...defaultProps} />);

		expect(screen.getByTestId('document-header')).toBeInTheDocument();
		expect(screen.getByTestId('document-header')).toHaveTextContent(
			'Test Document',
		);
	});

	it('renders document preview by default', () => {
		render(<DocumentContent {...defaultProps} />);

		expect(screen.getByTestId('document-preview')).toBeInTheDocument();
		expect(screen.getByTestId('document-preview')).toHaveTextContent(
			'Test content',
		);
	});

	it('renders generation state when isGenerating is true', () => {
		render(<DocumentContent {...defaultProps} isGenerating={true} />);

		expect(screen.getByTestId('generation-state')).toBeInTheDocument();
		expect(screen.getByTestId('generation-state')).toHaveTextContent(
			'Generating Test Document…',
		);
	});

	it('renders TipTap editor when editable and in TipTap view', () => {
		render(
			<DocumentContent
				{...defaultProps}
				isEditable={true}
				documentType='cover-letter'
			/>,
		);

		expect(screen.getByTestId('view-toggle')).toBeInTheDocument();

		fireEvent.click(screen.getByTestId('view-toggle'));

		expect(screen.getByTestId('tiptap-editor')).toBeInTheDocument();
	});

	it('shows view toggle for editable cover letter', () => {
		render(
			<DocumentContent
				{...defaultProps}
				isEditable={true}
				documentType='cover-letter'
			/>,
		);

		expect(screen.getByTestId('view-toggle')).toBeInTheDocument();
	});

	it('shows view toggle for editable resume', () => {
		render(
			<DocumentContent
				{...defaultProps}
				isEditable={true}
				documentType='resume'
			/>,
		);

		expect(screen.getByTestId('view-toggle')).toBeInTheDocument();
	});

	it('does not show view toggle for non-editable documents', () => {
		render(
			<DocumentContent
				{...defaultProps}
				isEditable={false}
				documentType='cover-letter'
			/>,
		);

		expect(screen.queryByTestId('view-toggle')).not.toBeInTheDocument();
	});

	it('does not show view toggle for non-cover-letter/resume documents', () => {
		render(
			<DocumentContent
				{...defaultProps}
				isEditable={true}
				documentType='cover-letter'
			/>,
		);

		expect(screen.queryByTestId('view-toggle')).toBeInTheDocument();
	});

	it('passes fontSizeInput to DocumentHeader', () => {
		const fontSizeInput = <div data-testid='font-size-input'>Font Size</div>;

		render(<DocumentContent {...defaultProps} fontSizeInput={fontSizeInput} />);

		expect(screen.getByTestId('document-header')).toHaveTextContent(
			'has-font-size',
		);
	});

	it('passes headerElement to DocumentHeader when not editable', () => {
		const headerElement = <div data-testid='header-element'>Header</div>;

		render(<DocumentContent {...defaultProps} headerElement={headerElement} />);

		expect(screen.getByTestId('document-header')).toHaveTextContent(
			'has-header-element',
		);
	});

	it('uses view toggle as header element when editable and cover letter/resume', () => {
		render(
			<DocumentContent
				{...defaultProps}
				isEditable={true}
				documentType='cover-letter'
			/>,
		);

		expect(screen.getByTestId('document-header')).toHaveTextContent(
			'has-header-element',
		);
	});

	it('handles content change in TipTap editor', () => {
		const onContentChange = vi.fn();

		render(
			<DocumentContent
				{...defaultProps}
				isEditable={true}
				documentType='cover-letter'
				onContentChange={onContentChange}
			/>,
		);

		fireEvent.click(screen.getByTestId('view-toggle'));

		const textarea = screen.getByTestId('tiptap-textarea');
		fireEvent.change(textarea, { target: { value: 'New content' } });

		expect(onContentChange).toHaveBeenCalledWith('New content');
	});

	it('uses template content when content is empty', () => {
		render(
			<DocumentContent
				{...defaultProps}
				content=''
				templateContent='Template content'
				isEditable={true}
				documentType='cover-letter'
			/>,
		);

		fireEvent.click(screen.getByTestId('view-toggle'));

		const textarea = screen.getByTestId('tiptap-textarea');
		expect(textarea).toHaveValue('Template content');
	});

	it('applies custom className', () => {
		const { container } = render(
			<DocumentContent {...defaultProps} className='custom-class' />,
		);

		expect(container.firstChild).toHaveClass('custom-class');
	});

	it('has correct structure with flex layout', () => {
		const { container } = render(<DocumentContent {...defaultProps} />);

		expect(container.firstChild).toHaveClass(
			'DocumentContent',
			'flex',
			'flex-col',
			'gap-4',
		);
	});
});
