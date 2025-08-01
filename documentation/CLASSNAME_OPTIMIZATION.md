# ClassName Optimization Guide

This guide covers best practices for using className utilities in the project.

## Spacing Guidelines

### Avoid `space-` Utilities

**❌ Don't use `space-` utilities** - they rely on margin-based spacing which violates our layout principles:

```tsx
// ❌ Avoid - uses margins
className='space-y-4'
className='space-x-2'
```

**✅ Use flex/gap instead** - provides the same visual spacing without margins:

```tsx
// ✅ Good - uses flexbox gap
className='flex flex-col gap-4'
className='flex items-center gap-2'
```

### Spacing Patterns

```tsx
// Vertical spacing
className='flex flex-col gap-2'    // Small gaps
className='flex flex-col gap-4'    // Medium gaps
className='flex flex-col gap-6'    // Large gaps

// Horizontal spacing
className='flex items-center gap-2'
className='flex justify-between'

// Responsive spacing
className='flex flex-col gap-3 sm:gap-4'
className='flex items-center gap-1.5 sm:gap-2'
```

## Available Utilities

### `clsx` - For Conditional Classes

Use `clsx` when you need conditional class logic:

```tsx
import clsx from 'clsx';

// Simple conditional
className={clsx(
  'base-class',
  isActive && 'active',
  isDisabled && 'disabled'
)}

// Complex conditional
className={clsx(
  'button rounded-lg border p-2',
  variant === 'primary' && 'bg-blue text-white',
  variant === 'secondary' && 'bg-gray text-black',
  size === 'lg' && 'px-6 py-3',
  size === 'sm' && 'px-3 py-1'
)}
```

## Best Practices

### 1. **Use Direct Strings for Simple Cases**

For static classes without conditionals:

```tsx
// ✅ Good
className='rounded-lg border p-4 bg-white'

// ❌ Unnecessary
className={clsx('rounded-lg', 'border', 'p-4', 'bg-white')}
```

### 2. **Use `clsx` for Conditionals**

When you have conditional logic:

```tsx
// ✅ Good
className={clsx(
  'button rounded-lg border p-2',
  isActive && 'bg-blue text-white',
  isDisabled && 'opacity-50 cursor-not-allowed'
)}

// ❌ Avoid template literals
className={`button rounded-lg border p-2 ${isActive ? 'bg-blue text-white' : ''}`}
```

### 3. **Use `clsx` for Component Props**

When combining with className props:

```tsx
// ✅ Good
className={clsx('base-classes', className)}

// ❌ Avoid template literals
className={`base-classes ${className}`}
```

### 4. **Leverage Prettier Auto-Sorting**

The prettier-plugin-tailwindcss will automatically sort classes:

```tsx
// Write classes in any order
className='hover:bg-blue p-4 text-red sm:text-lg'

// Prettier will sort them automatically
className='p-4 text-red sm:text-lg hover:bg-blue'
```

## Common Patterns

### Component with Props

```tsx
type ButtonProps = {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
};

export function Button({ variant = 'primary', size = 'md', disabled, className }: ButtonProps) {
  return (
    <button
      className={clsx(
        'rounded-lg border p-2 transition-colors',
        variant === 'primary' && 'bg-blue text-white hover:bg-blue-dark',
        variant === 'secondary' && 'bg-gray text-black hover:bg-gray-dark',
        size === 'sm' && 'px-3 py-1 text-sm',
        size === 'lg' && 'px-6 py-3 text-lg',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

### Form Components

```tsx
export function Input({ error, className, ...props }: InputProps) {
  return (
    <input
      className={clsx(
        'w-full rounded-lg border px-3 py-2',
        error ? 'border-red' : 'border-gray',
        'focus:border-blue focus:ring-2 focus:ring-blue',
        className
      )}
      {...props}
    />
  );
}
```

## Component Structure Guidelines

### Avoid Superfluous Wrappers

**❌ Don't create unnecessary wrapper divs** - they add DOM complexity without benefit:

```tsx
// ❌ Avoid - redundant wrapper
<div className='flex flex-col gap-6'>
  <div className='flex flex-col gap-6'>
    <Component />
  </div>
</div>
```

**✅ Simplify component structure** - remove unnecessary nesting:

```tsx
// ✅ Good - direct structure
<div className='flex flex-col gap-6'>
  <Component />
</div>
```

### Wrapper Removal Patterns

```tsx
// Before: Nested wrappers
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

### When to Keep Wrappers

Keep wrappers when they serve a specific purpose:

- **Styling containers**: When the wrapper provides essential styling
- **Semantic structure**: When the wrapper provides meaningful HTML structure
- **Component organization**: When the wrapper groups related components logically

## Performance Considerations

### 1. **Memoize Complex Class Logic**

For expensive conditional logic:

```tsx
const buttonClasses = useMemo(() =>
  clsx(
    'base-classes',
    variant === 'primary' && 'primary-classes',
    size === 'lg' && 'large-classes'
  ), [variant, size]
);
```

### 2. **Extract Common Patterns**

Create utility functions for repeated patterns:

```tsx
const getButtonClasses = (variant: string, size: string) =>
  clsx(
    'button-base',
    variant === 'primary' && 'primary-variant',
    size === 'lg' && 'large-size'
  );
```

## Migration Guide

### From Template Literals

```tsx
// Before
className={`base-class ${isActive ? 'active' : ''} ${className}`}

// After
className={clsx('base-class', isActive && 'active', className)}
```

### From String Concatenation

```tsx
// Before
className={'base-class ' + (isActive ? 'active' : '')}

// After
className={clsx('base-class', isActive && 'active')}
```

## Tools and Configuration

- **Prettier**: Automatically sorts Tailwind classes
- **clsx**: Handles conditional classes
- **ESLint**: Can enforce consistent patterns

## Benefits

1. **Automatic Sorting**: Prettier handles class ordering
2. **Type Safety**: Better IntelliSense and error catching
3. **Readability**: Clear conditional logic
4. **Performance**: Optimized class combination
5. **Consistency**: Standardized patterns across the project
