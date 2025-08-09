# Replace Sidebar with User Menu Workflow

## Current tasks from user prompt:

- Revert complex sidebar layout solutions
- Replace sidebar with user menu dropdown next to language switcher
- Show user name and avatar when logged in
- Include profile, settings, logout options in dropdown

## Plan (simple):

- Simplify AppShell back to basic layout
- Create UserMenu dropdown component
- Add UserMenu to navbar next to LanguageSwitcher
- Add appropriate translations

## Steps:

1. Revert AppShell to simple layout without sidebar
2. Create UserMenu component with Avatar and dropdown
3. Integrate UserMenu into navbar
4. Add translations for user menu items
5. Test auth flow and dropdown functionality

## Things done:

- Reverted AppShell to simple layout (just navbar + main with padding-top)
- Created UserMenu component with:
    - Avatar showing first letter of username
    - Dropdown with profile, settings, logout options
    - Proper logout functionality
- Integrated UserMenu into navbar next to LanguageSwitcher
- Added conditional rendering based on auth status
- Added translations for vi.json and en.json

## Key improvements:

- Much simpler layout without complex sidebar positioning issues
- Better UX with user menu in familiar location (top right)
- No more overflow or layout problems
- Responsive by default
- Cleaner code structure
