# Fix Navbar Height Issue Workflow

## Current tasks from user prompt:

- Fix height issue where pages are 100% + header height due to fixed navbar
- Ensure consistent spacing across all pages

## Plan (simple):

- Analyze current navbar and layout structure
- Create consistent solution for fixed navbar spacing
- Apply padding-top to main content container
- Remove individual page padding-top adjustments

## Steps:

1. Review current navbar implementation (fixed positioning)
2. Check current pages for different padding solutions
3. Update AppShell to handle fixed navbar spacing
4. Standardize spacing across all pages
5. Test layout consistency

## Things done:

- Analyzed navbar structure (fixed top-0, h-16)
- Identified inconsistent padding-top solutions across pages
- Found root cause: fixed navbar without proper content spacing

## Things done:

- Added CSS variable --navbar-height (4rem)
- Updated AppShell to use navbar height variable for padding-top
- Updated Sidebar to position correctly under navbar
- Removed duplicate header from sidebar
- Created utility classes (.min-h-screen-minus-navbar, .h-screen-minus-navbar)
- Updated homepage to use utility class instead of inline styles
- Removed main padding from AppShell to give pages full control

## Additional fixes:

- Fixed login and register pages to use .min-h-screen-minus-navbar
- Changed from CSS variables to hardcoded 4rem values for better compatibility
- Updated all components to use 4rem consistently
- Added debug class for testing

## Final solution implemented:

- Made AppShell responsive to auth status - sidebar only shows when authenticated
- Global override of min-h-screen and h-screen classes to account for navbar
- All pages can use standard Tailwind classes without modification
- Created fallback classes (min-h-screen-full) for special cases

## Things not done yet:

- Test layout in browser to verify fixes work
- Clean up unused utility classes

## Key improvements:

- Consistent navbar height handling via CSS variable
- Pages now properly fill viewport minus navbar height
- No more overlapping content under fixed navbar
- Reusable utility classes for future pages
