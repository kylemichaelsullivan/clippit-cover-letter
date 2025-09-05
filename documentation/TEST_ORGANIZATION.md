# Test Organization Guide

## Overview

This document describes the organized structure of tests in the Clippit Cover Letter project. Tests are organized into logical folders based on functionality and type.

## Directory Structure

```
src/__tests__/
├── components/                    # Component tests
│   ├── forms/                    # Form component tests
│   │   ├── candidate/           # Candidate form components
│   │   ├── job/                 # Job form components
│   │   ├── letter/              # Letter form components
│   │   ├── resume/              # Resume form components
│   │   ├── skills/              # Skills form components
│   │   └── welcome/             # Welcome form components
│   ├── ui/                      # Reusable UI components
│   │   ├── buttons/             # Button components
│   │   ├── inputs/              # Input components
│   │   ├── feedback/            # Feedback components (dialogs, errors)
│   │   └── navigation/          # Navigation components
│   ├── features/                # Feature-specific components
│   │   ├── document-generation/ # Document generation features
│   │   ├── preview/             # Preview features
│   │   └── results/             # Results display features
│   └── layout/                  # Layout components
├── services/                     # Service and utility tests
│   ├── api/                     # API integration tests
│   ├── utils/                   # Utility function tests
│   └── stores/                  # State management tests
├── fixtures/                     # Test data fixtures
│   ├── candidate-data.ts        # Candidate test data
│   ├── job-data.ts              # Job test data
│   ├── resume-data.ts           # Resume test data
│   └── api-responses.ts         # API response mocks
├── mocks/                        # Mock implementations
│   ├── stores.ts                # Store mocks
│   ├── components.ts            # Component mocks
│   └── external-deps.ts         # External dependency mocks
├── utils/                        # Test utilities
│   ├── test-helpers.ts          # Test helper functions
│   ├── render-helpers.ts        # Render utility functions
│   └── setup.ts                 # Test setup configuration
├── integration/                  # Integration tests
├── e2e/                         # End-to-end tests
└── index.ts                     # Test utilities re-exports
```

## Test Categories

### 1. Component Tests (`components/`)

Component tests are organized by functionality:

- **Forms**: All form-related components grouped by form type
- **UI**: Reusable UI components grouped by component type
- **Features**: Feature-specific components grouped by feature area
- **Layout**: Layout and navigation components

### 2. Service Tests (`services/`)

Service tests are organized by service type:

- **API**: External API integration tests
- **Utils**: Utility function tests
- **Stores**: State management tests

### 3. Test Data (`fixtures/`)

Test data is organized by data type:

- **candidate-data.ts**: Mock candidate information
- **job-data.ts**: Mock job details
- **resume-data.ts**: Mock resume data
- **api-responses.ts**: Mock API responses

### 4. Mock Implementations (`mocks/`)

Mock implementations are organized by type:

- **stores.ts**: Store mock implementations
- **components.ts**: Component mock implementations
- **external-deps.ts**: External dependency mocks

### 5. Test Utilities (`utils/`)

Test utilities provide helper functions:

- **test-helpers.ts**: General test helper functions
- **render-helpers.ts**: React Testing Library utilities
- **setup.ts**: Test environment setup

## File Naming Conventions

### Test Files

- Component tests: `ComponentName.test.tsx`
- Service tests: `serviceName.test.ts`
- Utility tests: `utilityName.test.ts`
- E2E tests: `feature.spec.ts`

### Fixture Files

- Data fixtures: `data-type.ts`
- Mock files: `mock-type.ts`
- Helper files: `helper-name.ts`

## Import Patterns

### From Test Files

```typescript
// Import test utilities
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Import test data and mocks
import { mockCandidateDetails, mockJobDetails } from '@/__tests__/fixtures';
import { mockAppStore, mockTemplatesStore } from '@/__tests__/mocks';
import { createMockForm, createMockHandler } from '@/__tests__/utils';

// Import component under test
import { ComponentName } from '@/components/path/ComponentName';
```

### From Organized Test Structure

```typescript
// Import directly from organized test utilities
import { mockCandidateDetails } from '@/__tests__/fixtures/candidate-data';
import { mockAppStore } from '@/__tests__/mocks/stores';
import { createMockForm } from '@/__tests__/utils/test-helpers';
import { renderWithProviders } from '@/__tests__/utils/render-helpers';
```

## Benefits of This Organization

### 1. **Logical Grouping**

- Tests are grouped by functionality, making them easy to find
- Related tests are co-located for better maintainability

### 2. **Reusable Test Data**

- Centralized test fixtures reduce duplication
- Consistent mock data across all tests

### 3. **Shared Utilities**

- Common test patterns are abstracted into utilities
- Consistent testing approaches across the codebase

### 4. **Easy Maintenance**

- Clear separation of concerns
- Easy to add new tests following established patterns

### 5. **Better Developer Experience**

- Intuitive file organization
- Clear import paths
- Consistent naming conventions

## Adding New Tests

### 1. Determine Test Category

- Component test → `components/` subfolder
- Service test → `services/` subfolder
- Utility test → `services/utils/`

### 2. Choose Appropriate Location

- Form component → `components/forms/[form-type]/`
- UI component → `components/ui/[component-type]/`
- Feature component → `components/features/[feature]/`

### 3. Follow Naming Convention

- Use descriptive test file names
- Follow established patterns

### 4. Use Shared Utilities

- Import from `@/lib/test-utils` for common utilities
- Use fixtures for test data
- Use mocks for external dependencies

## Migration Notes

The test organization was migrated from a flat structure to this organized structure. Key changes:

1. **Moved test files** to appropriate subdirectories
2. **Created shared fixtures** for test data
3. **Organized mocks** by type
4. **Updated import paths** in test files
5. **Created utility functions** for common patterns
6. **Updated vitest configuration** for new setup location

All existing tests continue to work with the new organization while benefiting from improved structure and reusability.
