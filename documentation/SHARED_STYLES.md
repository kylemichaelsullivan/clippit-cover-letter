# Shared Styles Architecture

## Overview

This project uses a shared styles architecture to avoid maintaining parallel styles in multiple files. The goal is to have a single source of truth for common styles that are used in both PDF generation and UI display.

## Architecture

### 1. Shared Styles Generator (`src/config/shared-styles.ts`)

This file contains functions that generate shared CSS styles using a modular approach:

- **Core Style Constants**: Reusable style fragments (e.g., `SHARED_PROSE_CORE`, `SHARED_HEADINGS`)
- **Generator Functions**: Functions that create complete CSS for specific class names
  - `generateProseStyles(className)` - Generates prose styles for any class name
  - `generatePageHeaderStyles(className, margin)` - Generates page header styles
- **Specific Generators**: Convenience functions for common use cases
  - `generateSharedProseStyles()` - For shared prose styles
  - `generateProseCompactStyles()` - For UI prose-compact styles
  - `generatePrintContentStyles()` - For PDF print-content styles
  - `generateUIPageHeaderStyles()` - For UI page header styles

### 2. PDF Styles (`src/config/styles.ts`)

The PDF styles import and use the shared styles:

```typescript
import {
  generateSharedProseStyles,
  generateSharedPageHeaderStyles,
  generatePrintContentStyles,
  generateUIPageHeaderStyles,
} from './shared-styles';

export const PDF_STYLES = `
  // PDF-specific setup...
  ${generateSharedProseStyles()}
  ${generateSharedPageHeaderStyles()}
  ${generatePrintContentStyles()}
  ${generateUIPageHeaderStyles()}
`;
```

### 3. UI Styles (`src/app/globals.css`)

The UI styles are manually maintained but follow the same structure as the shared styles. The key improvement is that all styles are now generated from the same core constants, ensuring consistency.

## Benefits

- **Single Source of Truth**: All styles are generated from core constants, eliminating redundancy
- **Consistency**: PDF and UI styles use identical base styles
- **Maintainability**: Changes to shared styles only need to be made in the core constants
- **Type Safety**: TypeScript ensures the generator functions are properly typed
- **Modularity**: Easy to generate styles for new class names using the same base styles

## Usage

### For PDF Generation

The PDF styles automatically include the shared styles through the generator functions.

### For UI Development

When adding new shared styles:

1. Add the style to the appropriate generator function in `shared-styles.ts`
2. Add the same style to `globals.css` for UI use
3. Update this documentation if needed

### For Print Styles

Print-specific styles (like `.print-document-content`) are maintained separately in `globals.css` since they have specific requirements for print-friendly colors and formatting.

## Future Improvements

Consider implementing:

1. **Automated Sync**: A build script that automatically syncs shared styles between files
2. **CSS-in-JS**: Moving to a CSS-in-JS solution for better style management
3. **Style Validation**: Automated tests to ensure PDF and UI styles remain in sync
