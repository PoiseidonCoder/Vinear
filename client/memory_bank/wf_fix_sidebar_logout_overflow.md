# Fix Sidebar Logout Button Overflow Workflow

## Current tasks from user prompt:

- Fix logout button overflowing from sidebar when authenticated

## Final approach implemented:

Use top/bottom positioning instead of height calculation for more reliable layout

## Key changes:

1. **Sidebar positioning:**

    ```tsx
    style={{
      top: '64px',
      bottom: '0',
      display: 'flex',
      flexDirection: 'column'
    }}
    ```

2. **Layout structure:**
    - Navigation: `flex-1` to take remaining space with `overflow-y-auto`
    - Logout section: fixed at bottom with `border-t p-4`
    - No absolute positioning needed

3. **Consistency across components:**
    - AppShell: `paddingTop: '64px'`
    - CSS global overrides: `calc(100vh - 64px)`
    - All using exact px values instead of rem

## Why this approach works better:

- `top/bottom` positioning is more reliable than height calculations
- Flexbox with `flex-1` automatically distributes space correctly
- No conflicts with padding/borders affecting height
- Logout button naturally stays at bottom without absolute positioning

## Things done:

- Changed from height calculation to top/bottom positioning
- Updated all components to use consistent 64px navbar height
- Simplified layout structure with reliable flexbox
- Removed complex absolute positioning approaches
