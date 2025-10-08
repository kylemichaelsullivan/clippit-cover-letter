# Testing Documentation

## Overview

This document outlines the testing standards, patterns, and best practices used in the Clippit Cover Letter project. Our testing strategy focuses on comprehensive coverage, maintainability, and reliability.

## Testing Stack

- **Test Runner**: Vitest
- **Testing Library**: React Testing Library
- **E2E Testing**: Playwright
- **Mocking**: Vitest mocks
- **Assertions**: Jest DOM matchers

## Test Organization

### Directory Structure

```
src/__tests__/
├── components/           # Component tests
│   ├── forms/           # Form component tests
│   ├── ui/              # UI component tests
│   └── features/        # Feature component tests
├── services/            # Service and utility tests
├── stores/              # Store tests
├── utils/               # Utility function tests
└── e2e/                 # End-to-end tests
```

### File Naming Conventions

- Component tests: `ComponentName.test.tsx`
- Service tests: `serviceName.test.ts`
- Utility tests: `utilityName.test.ts`
- E2E tests: `feature.spec.ts`

## Testing Patterns

### 1. Component Testing

#### Basic Component Test Structure

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock external dependencies
vi.mock('@/lib/stores', () => ({
  useAppStore: () => mockAppStore,
}));

import { ComponentName } from '@/components/path/ComponentName';

describe('ComponentName', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with correct structure', () => {
    render(<ComponentName />);
    expect(screen.getByTestId('component-container')).toBeInTheDocument();
  });
});
```

#### Testing User Interactions

```typescript
it('handles click events correctly', () => {
  const mockHandler = vi.fn();
  render(<ComponentName onClick={mockHandler} />);

  fireEvent.click(screen.getByRole('button'));
  expect(mockHandler).toHaveBeenCalledTimes(1);
});
```

#### Testing Props and State

```typescript
it('passes props correctly to child components', () => {
  render(<ComponentName showActions={false} />);
  expect(screen.getByTestId('child')).toHaveAttribute('data-show-actions', 'false');
});
```

### 2. Form Testing

#### Form Field Testing

```typescript
it('calls onChange when input value changes', () => {
  const mockOnChange = vi.fn();
  render(<FormField onChange={mockOnChange} />);

  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'new value' } });

  expect(mockOnChange).toHaveBeenCalledWith('new value');
});
```

#### Form Validation Testing

```typescript
it('shows validation errors for required fields', () => {
  render(<Form />);

  fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(screen.getByText(/required/i)).toBeInTheDocument();
});
```

### 3. Store Testing

#### Zustand Store Testing

```typescript
describe('useStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useStore.getState().clearData();
  });

  it('updates state correctly', () => {
    const { updateField } = useStore.getState();
    updateField('test', 'value');

    expect(useStore.getState().data.test).toBe('value');
  });
});
```

### 4. Service Testing

#### API Integration Testing

```typescript
describe('API Service', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it('makes successful API call', async () => {
    const mockResponse = { data: 'success' };
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await apiCall();
    expect(result).toEqual(mockResponse);
  });
});
```

### 5. Utility Function Testing

#### Pure Function Testing

```typescript
describe('utilityFunction', () => {
  it('processes data correctly', () => {
    const input = 'test input';
    const result = utilityFunction(input);

    expect(result).toBe('expected output');
  });
});
```

## Mocking Strategies

### 1. External Dependencies

```typescript
// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));

// Mock FontAwesome
vi.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }: any) => (
    <span data-testid='font-awesome-icon'>{icon?.iconName || 'icon'}</span>
  ),
}));
```

### 2. Store Mocks

```typescript
export const mockAppStore = {
  includeCoverLetter: true,
  includeResume: true,
  setCoverLetterFontSize: vi.fn(),
  setResumeFontSize: vi.fn(),
};
```

### 3. Component Mocks

```typescript
vi.mock('@/components/ui/buttons', () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));
```

## Test Utilities

### Shared Test Utilities

```typescript
// test-utils.ts
export function createMockForm() {
  return {
    getFieldValue: vi.fn(),
    setFieldValue: vi.fn(),
    handleSubmit: vi.fn(),
  };
}

export function createMockField(value: any = '') {
  return {
    state: { value },
    handleChange: vi.fn(),
  };
}
```

## Accessibility Testing

### ARIA Attributes

```typescript
it('has correct accessibility attributes', () => {
  render(<Component />);
  const button = screen.getByRole('button');
  expect(button).toHaveAttribute('aria-label', 'Expected Label');
  expect(button).toHaveAttribute('title', 'Expected Title');
});
```

### Keyboard Navigation

```typescript
it('handles keyboard events', () => {
  render(<Component />);
  const input = screen.getByRole('textbox');

  fireEvent.keyDown(input, { key: 'Enter' });
  expect(mockHandler).toHaveBeenCalled();
});
```

## Error Handling Testing

### Error States

```typescript
it('displays error message when error occurs', () => {
  render(<Component error="Test error" />);
  expect(screen.getByTestId('error')).toBeInTheDocument();
  expect(screen.getByText('Test error')).toBeInTheDocument();
});
```

### Empty States

```typescript
it('handles empty data gracefully', () => {
  render(<Component data={[]} />);
  expect(screen.getByTestId('empty-state')).toBeInTheDocument();
});
```

## E2E Testing with Playwright

### Basic E2E Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Flow', () => {
  test('should complete user workflow', async ({ page }) => {
    await page.goto('/');

    // Fill form
    await page.fill('[data-testid="name-input"]', 'John Doe');
    await page.click('[data-testid="next-button"]');

    // Verify navigation
    await expect(page.getByRole('heading', { name: /job/i })).toBeVisible();
  });
});
```

## Best Practices

### 1. Test Organization

- Group related tests in `describe` blocks
- Use descriptive test names
- Keep tests focused and atomic
- Test one behavior per test case

### 2. Mock Management

- Mock external dependencies consistently
- Use shared mock utilities
- Reset mocks between tests
- Mock at the appropriate level

### 3. Assertions

- Use specific assertions (`toBeInTheDocument()`, `toHaveClass()`)
- Test both positive and negative cases
- Verify callback functions are called correctly
- Test accessibility features

### 4. Test Data

- Use realistic test data
- Create reusable mock data
- Keep test data minimal and focused
- Use factories for complex data

### 5. Performance

- Keep tests fast and isolated
- Avoid unnecessary async operations
- Use appropriate test utilities
- Mock expensive operations

## Running Tests

### Unit Tests

#### Run Once (Recommended)

```bash
pnpm test:run
```

Runs all tests once and exits. This is the recommended approach for most development scenarios as it's faster and less resource-intensive.

#### Watch Mode

```bash
pnpm test
```

Runs tests in watch mode, automatically re-running tests when files change. This can be resource-intensive and is optional.

#### Interactive UI

```bash
pnpm test:ui
```

Opens an interactive test UI for debugging and exploring test results.

### E2E Tests

```bash
pnpm test:e2e
```

### Test Coverage

```bash
pnpm test:coverage
```

## Continuous Integration

Tests are automatically run on:

- Pull request creation
- Push to main branch
- Scheduled nightly runs

## Troubleshooting

### Common Issues

1. **Mock not working**: Ensure mocks are defined before imports
2. **Async test failures**: Use `await` for async operations
3. **Component not rendering**: Check mock implementations
4. **Test isolation**: Use `beforeEach` to reset state

### Debug Tips

- Use `screen.debug()` to inspect rendered output
- Add `console.log` statements for debugging
- Use `--reporter=verbose` for detailed output
- Check test utilities for common patterns
