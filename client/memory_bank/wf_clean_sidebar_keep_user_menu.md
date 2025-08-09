# Clean Sidebar and Keep User Menu Workflow

## Current tasks from user prompt:

- Keep sidebar as before but remove logout button
- Remove title/icon from sidebar header since navbar already has it
- Keep user menu in navbar for logout functionality

## Changes made:

### 1. **Restored AppShell with sidebar:**

```tsx
export function AppShell({ children }: { children: React.ReactNode }) {
    const { sessionToken } = useAuthStore();
    const isAuthenticated = !!sessionToken;

    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-1' style={{ paddingTop: '64px' }}>
                {isAuthenticated && <Sidebar />}
                <main className={`flex-1 ${isAuthenticated ? 'lg:ml-64' : ''}`}>{children}</main>
            </div>
        </div>
    );
}
```

### 2. **Simplified Sidebar:**

- Removed logout button and handleLogout function
- Removed header/title section completely
- Removed unused imports (Button, LogOut, authRoutes)
- Clean navigation-only sidebar

### 3. **Layout structure:**

```tsx
<aside style={{ top: '64px', bottom: '0' }}>
    <nav className='space-y-2 p-4 overflow-y-auto h-full'>{/* Navigation items only */}</nav>
</aside>
```

### 4. **Responsive design:**

- Sidebar hidden on mobile (`-translate-x-full lg:translate-x-0`)
- Main content margin only on large screens (`lg:ml-64`)
- User menu available on all screen sizes

## Final result:

- Clean sidebar with only navigation items
- User menu in navbar with logout functionality
- No duplicate logout buttons
- No duplicate title/branding
- Responsive layout that works on all screen sizes
