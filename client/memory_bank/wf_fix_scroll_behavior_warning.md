# Fix Scroll Behavior Warning Workflow

## Current tasks from user prompt:

- Fix Next.js warning about `scroll-behavior: smooth` on HTML element
- Add `data-scroll-behavior="smooth"` attribute to html element

## Plan (simple):

Fix the Next.js warning by adding the required data attribute to the html element in the root layout file while preserving existing scroll behavior styling.

## Steps:

1. Identify where the scroll-behavior: smooth is set (globals.css line 7)
2. Add data-scroll-behavior="smooth" attribute to html element in layout.tsx
3. Verify the fix resolves the warning

## Things done:

- Read current layout.tsx and globals.css files
- Identified scroll-behavior: smooth in globals.css line 7
- Found html element in src/app/layout.tsx line 26
- Added data-scroll-behavior="smooth" attribute to html element
- Verified no linting errors introduced

## Things aren't done yet:

- None - task completed
