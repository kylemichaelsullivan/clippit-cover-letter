# Hydration Error Handling Guide

This guide explains how to properly handle hydration errors in Next.js applications and provides best practices for preventing them.

## What are Hydration Errors?

Hydration errors occur when the server-rendered HTML doesn't match what React expects to render on the client side. This typically happens when:

1. **Client-side state differs from server state** (e.g., theme preferences, localStorage values)
2. **Browser-only APIs are accessed during SSR** (e.g., `window`, `localStorage`, `navigator`)
3. **Dynamic content renders differently** between server and client
4. **Date/time values** that change between server render and client hydration
5. **Browser extensions** inject elements or attributes after server render but before client hydration

## Solutions Implemented in This Project

### 1. Theme Provider with Hydration Safety

The `ThemeProvider` component now includes:

- Consistent initial state (`'light'`) for both server and client
- `suppressHydrationWarning` on theme-dependent elements
- Proper mounting detection before applying theme changes

### 2. Client-Only Hooks

Created utility hooks in `src/lib/hooks.ts`:

#### `useIsClient()`

```typescript
const isClient = useIsClient();
// Returns true only after component mounts on client
```

#### `useBrowserAPI<T>(getValue)`

```typescript
const clipboard = useBrowserAPI(() => navigator.clipboard);
// Safely access browser APIs, returns null during SSR
```

#### `useLocalStorage<T>(key, initialValue)`

```typescript
const [theme, setTheme] = useLocalStorage('theme', 'light');
// SSR-safe localStorage with consistent initial values
```

### 5. Consistent Component Rendering

Components now:

- Always render the same structure on server and client initially
- Use `disabled` states instead of conditional rendering for client-only features
- Apply `suppressHydrationWarning` where appropriate

## Best Practices

### ✅ Do This

1. **Use consistent initial state**

```typescript
// Always start with the same value on server and client
const [theme, setTheme] = useState<'light' | 'dark'>('light');
```

2. **Check if mounted before using browser APIs**

```typescript
const isClient = useIsClient();
if (isClient && navigator.clipboard) {
	// Safe to use browser API
}
```

3. **Use suppressHydrationWarning sparingly**

```typescript
<div suppressHydrationWarning>
  {/* Only for content that legitimately differs between server/client */}
</div>
```

4. **Disable interactive elements until mounted**

```typescript
<button
  onClick={isMounted ? handleClick : undefined}
  disabled={!isMounted}
>
  Action
</button>
```

### ❌ Don't Do This

1. **Access browser APIs during render**

```typescript
// ❌ This will cause hydration errors
const theme = localStorage.getItem('theme') || 'light';
```

2. **Conditionally render based on client state**

```typescript
// ❌ Different structure on server vs client
if (isClient) {
  return <ClientComponent />;
}
return <ServerComponent />;
```

3. **Use dynamic values that change between server and client**

```typescript
// ❌ Date will be different on server vs client
const now = new Date().toLocaleString();
```

## Common Patterns

### For Theme/Dark Mode

```typescript
// 1. Start with consistent state
const [theme, setTheme] = useState<'light' | 'dark'>('light');

// 2. Initialize from storage after mount
useEffect(() => {
	const saved = localStorage.getItem('theme');
	if (saved) setTheme(saved);
}, []);

// 3. Apply theme changes only after mount
useEffect(() => {
	if (isMounted) {
		document.documentElement.classList.toggle('dark', theme === 'dark');
	}
}, [theme, isMounted]);
```

### For Client-Only Components

```typescript
// Use the ClientOnly wrapper
<ClientOnly fallback={<LoadingSpinner />}>
  <ClientOnlyComponent />
</ClientOnly>
```

### For Browser API Access

```typescript
// Use the useBrowserAPI hook
const clipboard = useBrowserAPI(() => navigator.clipboard);

const handleCopy = () => {
	if (clipboard) {
		clipboard.writeText(text);
	}
};
```

## Debugging Hydration Errors

1. **Check the console** for specific error messages
2. **Look for mismatched HTML structure** between server and client
3. **Identify components using browser APIs** or dynamic content
4. **Check for browser extension interference** (e.g., password managers, color pickers)
5. **Use React DevTools** to inspect component state
6. **Add console.logs** in useEffect to track mounting
7. **Test with browser extensions disabled** to isolate issues

## Testing Hydration

1. **Build and start production server**

```bash
npm run build
npm start
```

2. **Disable JavaScript** and compare with enabled JavaScript
3. **Check for visual differences** between server and client renders
4. **Test with browser extensions disabled** to isolate issues
5. **Use Lighthouse** to audit for hydration issues
6. **Check browser console** for hydration warnings

## Performance Considerations

## Additional Resources

- [Next.js Hydration Documentation](https://nextjs.org/docs/messages/react-hydration-error)
- [React Hydration Guide](https://react.dev/reference/react-dom/hydrate)
- [Next.js App Router Best Practices](https://nextjs.org/docs/app/building-your-application)
- [Browser Extension Interference](https://developer.mozilla.org/en-US/docs/Web/API/Element/suppressHydrationWarning)

- [AI Configuration Documentation](./AI_CONFIGURATION.md)
