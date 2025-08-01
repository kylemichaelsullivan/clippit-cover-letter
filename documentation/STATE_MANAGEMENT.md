# State Management Documentation

This document outlines the state management architecture using Zustand stores in the Clippit Cover Letter project.

## Overview

The application uses Zustand for state management with persistence middleware to maintain user data across sessions. Each feature has its own focused store, following the principle of separation of concerns.

## Store Architecture

### Store Organization

```
src/lib/stores/
├── index.ts              # Main store exports
├── useAppStore.ts        # Global app state
├── useCandidateStore.ts  # Candidate information
├── useJobStore.ts        # Job details
├── useSkillsStore.ts     # Skills and skill groups
├── useTemplatesStore.ts  # Document templates
├── usePhaseStore.ts      # Application phase navigation
└── clearAllData.ts       # Data clearing utilities
```

### Store Structure Pattern

Each store follows this consistent structure:

```typescript
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type StoreState = {
  // State properties
  data: DataType;

  // Setters
  setData: (data: DataType) => void;

  // Actions
  asyncAction: () => Promise<void>;
};

export const useStoreName = create<StoreState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        data: initialState,

        // Setters
        setData: (data) => set({ data }),

        // Actions
        asyncAction: async () => {
          const state = get();
          // Action logic
          set({ data: newData });
        },
      }),
      {
        name: 'store-name',
      },
    ),
    {
      name: 'store-name',
    },
  ),
);
```

## Individual Stores

### App Store (`useAppStore.ts`)

Global application state and settings.

```typescript
type AppState = {
  includeCoverLetter: boolean;
  setIncludeCoverLetter: (include: boolean) => void;
  includeResume: boolean;
  setIncludeResume: (include: boolean) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
};
```

**Usage:**

```typescript
import { useAppStore } from '@/lib/stores';

const { includeCoverLetter, setIncludeCoverLetter, isGenerating } = useAppStore();
```

### Candidate Store (`useCandidateStore.ts`)

Candidate information and details.

```typescript
type CandidateState = {
  candidate: CandidateDetailsForm;
  setCandidate: (candidate: CandidateDetailsForm) => void;
  updateCandidate: (updates: Partial<CandidateDetailsForm>) => void;
  clearCandidate: () => void;
};
```

**Usage:**

```typescript
import { useCandidateStore } from '@/lib/stores';

const { candidate, setCandidate, updateCandidate } = useCandidateStore();
```

### Job Store (`useJobStore.ts`)

Job details and requirements.

```typescript
type JobState = {
  job: JobDetailsForm;
  setJob: (job: JobDetailsForm) => void;
  updateJob: (updates: Partial<JobDetailsForm>) => void;
  clearJob: () => void;
};
```

**Usage:**

```typescript
import { useJobStore } from '@/lib/stores';

const { job, setJob, updateJob } = useJobStore();
```

### Skills Store (`useSkillsStore.ts`)

Skills management and organization.

```typescript
type SkillsState = {
  skills: SkillsForm;
  setSkills: (skills: SkillsForm) => void;
  addSkillGroup: (group: SkillGroup) => void;
  removeSkillGroup: (groupId: string) => void;
  updateSkillGroup: (groupId: string, updates: Partial<SkillGroup>) => void;
  clearSkills: () => void;
};
```

**Usage:**

```typescript
import { useSkillsStore } from '@/lib/stores';

const { skills, addSkillGroup, removeSkillGroup } = useSkillsStore();
```

### Templates Store (`useTemplatesStore.ts`)

Document templates and content.

```typescript
type TemplatesState = {
  templates: TemplatesForm;
  setTemplates: (templates: TemplatesForm) => void;
  updateTemplates: (updates: Partial<TemplatesForm>) => void;
  clearTemplates: () => void;
};
```

**Usage:**

```typescript
import { useTemplatesStore } from '@/lib/stores';

const { templates, setTemplates, updateTemplates } = useTemplatesStore();
```

### Phase Store (`usePhaseStore.ts`)

Application phase navigation.

```typescript
type PhaseState = {
  currentPhase: number;
  setCurrentPhase: (phase: number) => void;
  nextPhase: () => void;
  previousPhase: () => void;
  resetPhases: () => void;
};
```

**Usage:**

```typescript
import { usePhaseStore } from '@/lib/stores';

const { currentPhase, nextPhase, previousPhase } = usePhaseStore();
```

## Store Integration

### Form Integration

Stores integrate seamlessly with TanStack Form:

```typescript
import { useForm } from '@tanstack/react-form';
import { useCandidateStore } from '@/lib/stores';

function CandidateForm() {
  const { candidate, setCandidate } = useCandidateStore();

  const form = useForm({
    defaultValues: candidate,
    onSubmit: ({ value }) => {
      setCandidate(value);
      // Navigate to next phase
    },
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      form.handleSubmit();
    }}>
      {/* Form fields */}
    </form>
  );
}
```

### Component Integration

Components can access store state directly:

```typescript
import { useAppStore, useCandidateStore } from '@/lib/stores';

function ResultsDisplay() {
  const { isGenerating } = useAppStore();
  const { candidate } = useCandidateStore();

  if (isGenerating) {
    return <LoadingState />;
  }

  return (
    <div>
      <h1>Results for {candidate.fullName}</h1>
      {/* Results content */}
    </div>
  );
}
```

## Data Persistence

### Persistence Configuration

All stores use Zustand's persist middleware with localStorage:

```typescript
persist(
  (set, get) => ({
    // Store implementation
  }),
  {
    name: 'store-name', // localStorage key
  },
)
```

### Storage Keys

- `app-store`: Global application state
- `candidate-store`: Candidate information
- `job-store`: Job details
- `skills-store`: Skills and skill groups
- `templates-store`: Document templates
- `phase-store`: Application phase navigation

### Data Clearing

Use the `clearAllData` utility to clear all persisted data:

```typescript
import { clearAllData } from '@/lib/stores/clearAllData';

// Clear all data
clearAllData();
```

## Development Tools

### Redux DevTools Integration

All stores include Redux DevTools integration for debugging:

```typescript
devtools(
  persist(
    (set, get) => ({
      // Store implementation
    }),
    { name: 'store-name' },
  ),
  {
    name: 'store-name',
  },
)
```

### Store Debugging

Access store state in browser console:

```javascript
// Access store state
window.useAppStore.getState();

// Subscribe to state changes
window.useAppStore.subscribe((state) => {
	console.log('App store changed:', state);
});
```

## Best Practices

### Store Design

1. **Single Responsibility**: Each store handles one domain
2. **Immutable Updates**: Use setter functions for state updates
3. **Type Safety**: Define proper TypeScript types
4. **DevTools**: Include Redux DevTools for debugging
5. **Persistence**: Use persist middleware for data persistence

### Performance

1. **Selective Subscriptions**: Subscribe only to needed state
2. **Memoization**: Use React.memo for components that depend on store state
3. **Batch Updates**: Group related state updates
4. **Optimized Re-renders**: Avoid unnecessary re-renders

### Error Handling

1. **Validation**: Validate data before storing
2. **Fallbacks**: Provide fallback values for missing data
3. **Error Recovery**: Handle persistence errors gracefully
4. **Data Migration**: Handle schema changes in persisted data

## Testing

### Store Testing

```typescript
import { describe, it, expect } from 'vitest';
import { useCandidateStore } from '@/lib/stores/useCandidateStore';

describe('Candidate Store', () => {
  it('updates candidate data', () => {
    const store = useCandidateStore.getState();
    const candidate = { fullName: 'John Doe', email: 'john@example.com' };

    store.setCandidate(candidate);

    expect(store.candidate.fullName).toBe('John Doe');
  });

  it('updates partial candidate data', () => {
    const store = useCandidateStore.getState();

    store.updateCandidate({ fullName: 'Jane Doe' });

    expect(store.candidate.fullName).toBe('Jane Doe');
  });
});
```

### Integration Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CandidateForm } from '@/components/forms/candidate';

describe('Candidate Form Integration', () => {
  it('saves candidate data to store', () => {
    render(<CandidateForm />);

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: 'John Doe' },
    });

    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    const store = useCandidateStore.getState();
    expect(store.candidate.fullName).toBe('John Doe');
  });
});
```

## Migration and Maintenance

### Schema Changes

When updating store schemas:

1. **Version Migration**: Implement migration logic for persisted data
2. **Backward Compatibility**: Maintain compatibility with old data
3. **Data Validation**: Validate migrated data
4. **User Communication**: Inform users of data changes

### Store Refactoring

When refactoring stores:

1. **Gradual Migration**: Migrate stores incrementally
2. **Data Preservation**: Preserve user data during migration
3. **Testing**: Test all store interactions
4. **Documentation**: Update documentation for changes

## Future Enhancements

### Planned Improvements

1. **Store Composition**: Implement store composition patterns
2. **Middleware Extensions**: Add custom middleware for specific needs
3. **Optimistic Updates**: Implement optimistic updates for better UX
4. **Real-time Sync**: Add real-time synchronization capabilities
5. **Advanced Persistence**: Implement more sophisticated persistence strategies

### Performance Optimizations

1. **Selective Persistence**: Only persist necessary data
2. **Compression**: Compress persisted data
3. **Lazy Loading**: Load store data on demand
4. **Memory Management**: Implement proper memory cleanup
