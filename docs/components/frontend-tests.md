# Frontend Component Test Coverage

This document summarizes the automated tests implemented for the main frontend components.

## ModernContactSection
- Renders all input fields and submit button
- Shows validation errors for empty fields
- Shows validation errors for:
  - Name too long (>50 chars)
  - Email invalid format
  - Email too long (>100 chars)
  - Phone too short (<7 digits)
  - Phone too long (>15 digits)
- Disables submit button while loading
- Shows success message on successful submission
- Shows error message if submission fails
- Honeypot anti-spam logic (skips API call, resets fields, shows success)
- Snackbar appears after success/error and can be closed
- Inputs are trimmed before submission
- Email is lowercased before submission
- Phone is sanitized to digits only before submission

## Home Page (index.js)
- WhatsApp button renders with correct link and aria-label

## How to Run Tests
Run all tests with:

```
npm run test
```

## Location
- All component tests are located in `src/components/home/*.test.js`
- Home page tests are in `pages/index.test.js`
