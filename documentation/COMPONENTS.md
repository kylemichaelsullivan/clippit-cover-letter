# Components Documentation

This document provides comprehensive documentation for all React components in the Clippit Cover Letter project, including AI-powered features.

## Overview

The application provides three core AI-powered features:

1. **Intelligent Skill Selection**: AI analyzes job requirements to select relevant skills
2. **Custom Cover Letter Generation**: AI creates personalized cover letters
3. **Resume Tailoring**: AI customizes resume content for specific positions

## Directory Structure

```
src/components/
├── ui/                    # UI components by function
│   ├── buttons/          # Button components
│   ├── display/          # Display and preview components
│   ├── feedback/         # Status and feedback components
│   ├── input/            # Input components
│   ├── navigation/       # Navigation components
│   └── debug/            # Development debugging components
├── forms/                # Form components
│   ├── core/             # Core form components
│   ├── candidate/        # Candidate form components
│   ├── job/              # Job form components
│   ├── skills/           # Skills form components
│   └── templates/        # Template form components
├── layout/               # Layout components
├── providers/            # Context providers
├── utils/                # Utility components
├── features/             # Feature-based components
│   └── document-generation/ # Document generation components
└── results/              # Results display components
    ├── actions/          # Action buttons
    ├── display/          # Display components
    ├── feedback/         # Feedback components
    └── panels/           # Panel components
```

## Component Architecture

### Single-Purpose Components

Each component follows the principle: **one thing == one component == one file**

- **One component per file**: Each file contains exactly one React component
- **Bite-sized components**: Components should be focused and single-purpose
- **Descriptive naming**: Use PascalCase with descriptive names indicating visual purpose
- **Component suffixes**: Use appropriate suffixes (e.g., `Container`, `Panel`, `Button`)

### Component Guidelines

- **TypeScript types**: Prefer `type` over `interface` for component props and data structures
- **Named exports**: Export components as named exports
- **Index files**: Create `index.ts` files for directory exports
- **Props interface**: Define clear, typed props with descriptive names
- **React.memo**: Use for performance-critical components
- **Avoid superfluous wrappers**: Don't create unnecessary wrapper divs that add DOM complexity
- **Use flex/gap spacing**: Prefer `flex flex-col gap-*` over `space-*` utilities to avoid margin-based spacing

## Recent Optimizations

### Spacing and Layout Improvements

The project has been optimized to use flexbox-based spacing instead of margin-based utilities:

- **Replaced `space-*` utilities**: All `space-x-*` and `space-y-*` utilities have been replaced with `flex flex-col gap-*` and `flex items-center gap-*`
- **Removed superfluous wrappers**: Unnecessary wrapper divs have been removed to simplify component structure
- **Maintained visual consistency**: All changes preserve the original visual appearance while improving performance

#### Examples of Optimizations

```tsx
// Before: Margin-based spacing
<div className='space-y-4'>
  <Component />
</div>

// After: Flexbox-based spacing
<div className='flex flex-col gap-4'>
  <Component />
</div>
```

```tsx
// Before: Superfluous wrapper
<div className='Container'>
  <div className='flex flex-col gap-4'>
    <Component />
  </div>
</div>

// After: Simplified structure
<div className='Container flex flex-col gap-4'>
  <Component />
</div>
```

## UI Components

### `/buttons`

Button components for user interactions and actions.

**Components:**

- `Button.tsx` - Base button component with variants (primary, secondary, success, danger, navigation)
- `ThemeToggle.tsx` - Toggle button for switching between light/dark themes

**Usage:**

```typescript
import { Button, ThemeToggle } from '@/components/ui/buttons';

// Button with variants
<Button color="primary" size="md" onClick={handleClick}>
  Submit
</Button>

// Theme toggle
<ThemeToggle />
```

### `/navigation`

Navigation and routing components for app navigation.

**Components:**

- `PhaseSwitcher.tsx` - Tab-like navigation for switching between application phases

**Usage:**

```typescript
import { PhaseSwitcher } from '@/components/ui/navigation';

<PhaseSwitcher />
```

### `/display`

Display and preview components for showing content and results.

**Components:**

- `MarkdownPreview.tsx` - Component for rendering markdown content
- `StyledMarkdownPreview.tsx` - Component for rendering markdown content with consistent heading hierarchy and PDF-compatible formatting
- `PreviewDisplay.tsx` - Component for displaying previews of content
- `ResultPanel.tsx` - Panel component for displaying results with metadata
- `SkillsDisplay.tsx` - Component for displaying skills

**Usage:**

```typescript
import { MarkdownPreview, StyledMarkdownPreview, PreviewDisplay, ResultPanel, SkillsDisplay } from '@/components/ui/display';

<MarkdownPreview content="# Hello World" />
<StyledMarkdownPreview
  content={documentContent}
  title="Resume"
  isCompact={true}
  isPrintDocument={true}
/>
<SkillsDisplay skills={skills} />
```

### `/input`

Input and form control components for user data entry.

**Components:**

- `MarkdownInput.tsx` - Textarea component with markdown support
- `SkillsRangeSlider.tsx` - Range slider for adjusting skills count

**Usage:**

```typescript
import { MarkdownInput, SkillsRangeSlider } from '@/components/ui/input';

<MarkdownInput
  value={content}
  onChange={setContent}
  placeholder="Enter markdown content…"
/>

<SkillsRangeSlider
  minSkills={5}
  maxSkills={10}
  onRangeChange={(min, max) => setSkillsRange(min, max)}
/>
```

### `/feedback`

Status and feedback components for user notifications.

**Components:**

- `Error.tsx` - Error message display component
- `Confirmation.tsx` - Confirmation dialog component
- `ConfirmationDialog.tsx` - Dialog wrapper for confirmations
- `LoadingState.tsx` - Loading indicator component

**Usage:**

```typescript
import { Error, Confirmation, LoadingState } from '@/components/ui/feedback';

{error && <Error>{error}</Error>}
{isLoading && <LoadingState />}
```

### `/debug`

Development debugging components.

**Components:**

- `HMRDebug.tsx` - Hot Module Replacement debug component

## Form Components

### `/core`

Core form components used throughout the application.

**Components:**

- `Form.tsx` - Base form container with consistent styling
- `FormField.tsx` - Form input field with validation support
- `FormSection.tsx` - Form section with checkbox support

**Usage:**

```typescript
import { Form, FormField, FormSection } from '@/components/forms/core';

<Form componentName="CandidateForm" onSubmit={handleSubmit}>
  <FormField
    id="email"
    type="email"
    label="Email Address"
    schema={candidateDetailsSchema}
    fieldName="email"
  />
</Form>
```

### `/candidate`

Candidate-specific form components.

**Components:**

- `CandidateForm.tsx` - Complete candidate information form

### `/job`

Job-specific form components.

**Components:**

- `JobForm.tsx` - Complete job information form

### `/skills`

Skills-specific form components with AI integration.

**Components:**

- `SkillsForm.tsx` - Skills selection and organization form
- `SkillsContent.tsx` - Skills content display
- `SkillsHeader.tsx` - Skills form header
- `SkillsSection.tsx` - Skills form section
- `SkillGroupName.tsx` - Skill group name input
- `SkillTags.tsx` - Skill tags display

**AI Integration:**
The skills form integrates with AI to intelligently select relevant skills based on job requirements.

### `/templates`

Template-specific form components.

**Components:**

- `TemplatesForm.tsx` - Template selection and customization form

## Layout Components

### `/layout`

Layout and structural components.

**Components:**

- `Header.tsx` - Main application header
- `Footer.tsx` - Main application footer
- `Body.tsx` - Main application body
- `ClientLayoutContent.tsx` - Client-side layout wrapper
- `BackButton.tsx` - Navigation back button
- `ForwardButton.tsx` - Navigation forward button
- `Title.tsx` - Page title component

## Feature Components

### `/features/document-generation`

Document generation feature components with AI integration.

**Components:**

- `DocumentGenerator.tsx` - Document generation logic with AI
- `ResultsGenerator.tsx` - Results generation logic

**AI Integration:**
These components orchestrate the three core AI features:

1. Skill selection based on job requirements
2. Cover letter generation using selected skills
3. Resume tailoring for specific positions

### `/features`

General feature components.

**Components:**

- `PreviewContent.tsx` - Content preview functionality

## Results Components

### `/results/actions`

Action buttons for results.

**Components:**

- `ActionButtons.tsx` - Container for action buttons
- `CopyButton.tsx` - Copy functionality button
- `DownloadButtonPDF.tsx` - PDF download button
- `DownloadButtonTXT.tsx` - TXT download button

### `/results/display`

Results display components.

**Components:**

- `ResultContent.tsx` - Main result content display
- `ResultsStateManager.tsx` - Results state management
- `DocumentSelectionControl.tsx` - Document selection control
- `DocumentSelectionControls.tsx` - Document selection controls container

### `/results/feedback`

Results feedback components.

**Components:**

- `LoadingState.tsx` - Loading state for results
- `NoResultsMessage.tsx` - Message when no results are available
- `MissingTemplatesMessage.tsx` - Message when templates are missing

### `/results/panels`

Results panel components.

**Components:**

- `DocumentContent.tsx` - Document content display and editing
- `DocumentHeader.tsx` - Document header display
- `DocumentPanel.tsx` - Document panel container

## Providers

### `/providers`

Context providers for the application.

**Components:**

- `ThemeProvider.tsx` - Theme context provider

## Utils

### `/utils`

Utility components.

**Components:**

- `Copyright.tsx` - Copyright information component

## AI Integration Components

### AI-Powered Features

The application includes several components that integrate with AI:

#### 1. Cover Letter Generation Components

```typescript
// DocumentGenerator.tsx - Integrates with AI for cover letter generation
import { generateCoverLetter } from '@/lib/openai';

const DocumentGenerator = () => {
  const handleGenerateCoverLetter = async () => {
    const coverLetter = await generateCoverLetter(
      jobDescription,
      companyDetails,
      userExperience
    );
    setCoverLetter(coverLetter);
  };

  return (
    <div>
      {/* Document generation content */}
      <Button onClick={handleGenerateCoverLetter}>
        Generate Cover Letter
      </Button>
    </div>
  );
};
```

#### 2. Template Enhancement Components

```typescript
// DocumentGenerator.tsx - Integrates with AI for template enhancement
import { callOpenAI } from '@/lib/openai';

const DocumentGenerator = () => {
  const handleEnhanceTemplate = async (template: string) => {
    // Process ERB instructions in templates
    const enhancedTemplate = await processERBInstructions(template);
    setEnhancedTemplate(enhancedTemplate);
  };

  return (
    <div>
      {/* Template enhancement content */}
      <Button onClick={() => handleEnhanceTemplate(template)}>
        Enhance Template
      </Button>
    </div>
  );
};
```

#### 3. Future AI Components

The following AI components are planned for future implementation:

```typescript
// Future: Skill Selection Components
// Future: Resume Tailoring Components
// Future: Job Description Analysis Components
// Future: Interview Preparation Components
```

### AI Loading States

Components that integrate with AI should include proper loading states:

```typescript
const AIIntegratedComponent = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIAction = async () => {
    setIsGenerating(true);
    try {
      const result = await callAI();
      setResult(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      {isGenerating ? (
        <LoadingState message="AI is generating content…" />
      ) : (
        <Button onClick={handleAIAction}>
          Generate with AI
        </Button>
      )}
    </div>
  );
};
```

## Component Best Practices

### Performance

- **React.memo**: Use for components with stable props
- **useMemo**: Use for expensive computations
- **useCallback**: Use for event handlers passed as props
- **Tree shaking**: Import only necessary components

### Accessibility

- **ARIA labels**: Include appropriate ARIA labels and roles
- **Keyboard navigation**: Support keyboard navigation
- **Focus management**: Implement proper focus management
- **Screen reader compatibility**: Ensure screen reader compatibility
- **Color contrast**: Maintain proper color contrast ratios
- **Semantic HTML**: Use semantic HTML structure

### Error Handling

- **Error boundaries**: Implement error boundaries for graceful error handling
- **Error message association**: Associate error messages with form fields
- **Loading state announcements**: Announce loading states to screen readers

## Component Testing

### Unit Testing

- **Component rendering**: Test component rendering with different props
- **User interactions**: Test user interactions and callbacks
- **Accessibility features**: Test accessibility features
- **Theme switching**: Test theme switching functionality

### Integration Testing

- **Form integration**: Test component integration with forms
- **Context behavior**: Test component behavior in different contexts
- **Responsive behavior**: Test responsive behavior across screen sizes
- **Feature flag functionality**: Test feature flag functionality

### AI Integration Testing

- **AI feature testing**: Test AI integration components
- **Mock AI responses**: Use mock AI responses for testing
- **Error handling**: Test AI error scenarios
- **Loading states**: Test AI loading states

## Component Development Workflow

1. **Create component**: Create new component file with proper structure
2. **Add types**: Define TypeScript types for props
3. **Implement logic**: Implement component logic and rendering
4. **Add styling**: Apply Tailwind CSS classes
5. **Add accessibility**: Include proper ARIA attributes
6. **Add tests**: Write unit and integration tests
7. **Add documentation**: Update this documentation
8. **Export**: Add to index file for easy importing

## Component Naming Conventions

- **PascalCase**: Use PascalCase for component names
- **Descriptive names**: Use descriptive names that indicate purpose
- **Suffixes**: Use appropriate suffixes (Button, Form, Panel, etc.)
- **Consistent naming**: Maintain consistent naming across similar components

## Markdown Parsing System

The application uses a unified markdown parsing system that ensures consistent heading hierarchy between the Results display and PDF generation.

### Key Components

- **`formatContentForPDF`** - Single function used for both Results display and PDF generation
- **`StyledMarkdownPreview`** - Component that renders markdown content with consistent formatting
- **Heading Hierarchy** - Maintains proper semantic structure: `#` → `h2`, `##` → `h3`, `###` → `h4`

### Implementation

```typescript
// Both Results and PDF use the same parsing function
import { formatContentForPDF } from '@/lib/utils';

// Results display
const processedContent = formatContentForPDF(content);
return <div dangerouslySetInnerHTML={{ __html: processedContent }} />;

// PDF generation
const htmlContent = formatContentForPDF(markdownContent);
// ... PDF generation logic
```

### Heading Mapping

| Markdown | HTML Output | Purpose                                                         |
| -------- | ----------- | --------------------------------------------------------------- |
| `#`      | `<h2>`      | Main document sections (Summary, Skills, Experience, Education) |
| `##`     | `<h3>`      | Sub-sections (Job titles, degree types)                         |
| `###`    | `<h4>`      | Sub-sub-sections (skill categories)                             |

### Benefits

- **Consistency**: Results and PDF output are identical
- **Simplicity**: Single parsing function eliminates complexity
- **Maintainability**: Changes to formatting affect both outputs
- **Semantic Structure**: Proper heading hierarchy for accessibility

## Component File Structure

```typescript
// Standard component file structure
'use client';

import { memo } from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';

type ComponentProps = {
  // Required props
  title: string;
  // Optional props with defaults
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  // Children
  children?: ReactNode;
};

function ComponentName({
  title,
  variant = 'primary',
  size = 'md',
  disabled = false,
  children
}: ComponentProps) {
  return (
    <div className={clsx(
      'ComponentName base-classes',
      variant === 'secondary' && 'secondary-classes',
      size === 'lg' && 'large-classes',
      disabled && 'disabled-classes'
    )}>
      {children}
    </div>
  );
}

export default memo(ComponentName);
```
