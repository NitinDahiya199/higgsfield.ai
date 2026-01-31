# Phase 2: Authentication & User Management - UI Implementation Guide

This document tracks the UI implementation for Phase 2. Backend/API implementation is handled separately.

## Theme Reference

- **Background**: Dark layered (#0B0D0F → #111418 → #151A20)
- **Text**: #EDEDED (primary), #9AA0A6 (secondary), #6F7681 (muted)
- **Accent**: #B8FF00 (acid green), #7C8BFF (purple/blue)
- **Border**: #1F2329
- **Design**: Typography-first, editorial layouts, cinematic darkness

## Implementation Checklist

### ✅ Completed

- [x] Phase 2 UI implementation guide created
- [x] Auth context/provider (`contexts/auth-context.tsx`)
- [x] Login page UI (`app/(auth)/login/page.tsx`)
- [x] Signup page UI (`app/(auth)/signup/page.tsx`)
- [x] Email verification page (`app/(auth)/verify-email/page.tsx`)
- [x] Password reset pages (`app/(auth)/forgot-password/page.tsx`, `app/(auth)/reset-password/page.tsx`)
- [x] OAuth callback pages (`app/api/auth/[provider]/callback/page.tsx`)
- [x] Protected routes wrapper (`components/auth/protected-route.tsx`)
- [x] User profile UI (`app/(dashboard)/profile/page.tsx`)
- [x] Profile update UI (`components/profile/profile-form.tsx`)
- [x] Avatar upload UI (`components/profile/avatar-upload.tsx`)
- [x] Login form component (`components/auth/login-form.tsx`)
- [x] Signup form component (`components/auth/signup-form.tsx`)
- [x] OAuth buttons component (`components/auth/oauth-buttons.tsx`)
- [x] Root layout updated with AuthProvider

### 🔄 In Progress

- [ ] Backend API integration (handled separately)

### 📝 Notes

- All UI components should match the Higgsfield.ai theme
- Use the theme tokens from `lib/theme.ts`
- Components should be responsive and accessible
- API endpoints will be integrated later

## File Structure

```
apps/web/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   ├── verify-email/
│   │   │   └── page.tsx
│   │   ├── reset-password/
│   │   │   └── page.tsx
│   │   └── forgot-password/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   └── settings/
│   │       └── page.tsx
│   └── api/
│       └── auth/
│           └── [provider]/
│               └── callback/
│                   └── page.tsx
├── components/
│   ├── auth/
│   │   ├── login-form.tsx
│   │   ├── signup-form.tsx
│   │   ├── oauth-buttons.tsx
│   │   └── protected-route.tsx
│   └── profile/
│       ├── profile-header.tsx
│       ├── profile-form.tsx
│       └── avatar-upload.tsx
└── contexts/
    └── auth-context.tsx
```

## Component Specifications

### 1. Login Page

- **Route**: `/login`
- **Features**: Email/password form, OAuth buttons, "Forgot password" link
- **Design**: Centered form on dark background, acid green accent for CTA

### 2. Signup Page

- **Route**: `/signup`
- **Features**: Registration form, OAuth buttons, terms acceptance
- **Design**: Similar to login, with additional fields

### 3. Email Verification Page

- **Route**: `/verify-email`
- **Features**: Verification status, resend email button
- **Design**: Minimal, focused on verification message

### 4. Password Reset Pages

- **Routes**: `/forgot-password`, `/reset-password`
- **Features**: Email input, token verification, new password form
- **Design**: Clean, step-by-step flow

### 5. OAuth Callbacks

- **Routes**: `/api/auth/google/callback`, `/api/auth/github/callback`
- **Features**: Loading state, error handling, redirect
- **Design**: Minimal loading screen

### 6. Protected Routes

- **Component**: Wrapper for authenticated pages
- **Features**: Auth check, redirect to login, loading state
- **Design**: Transparent wrapper

### 7. Auth Context/Provider

- **File**: `contexts/auth-context.tsx`
- **Features**: User state, login/logout, token management
- **Design**: React Context API

### 8. User Profile UI

- **Route**: `/profile`
- **Features**: Profile display, edit button, avatar
- **Design**: Clean profile layout matching theme

### 9. Profile Update UI

- **Route**: `/settings` or modal
- **Features**: Form fields, save button, validation
- **Design**: Form matching theme

### 10. Avatar Upload

- **Component**: Reusable upload component
- **Features**: Image preview, crop, upload progress
- **Design**: Circular avatar with upload overlay

## API Integration Points

These endpoints need to be implemented in the backend:

- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/verify-email`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /api/auth/me`
- `PATCH /api/auth/profile`
- `POST /api/auth/avatar`
- `GET /api/auth/google`
- `GET /api/auth/github`
- `GET /api/auth/google/callback`
- `GET /api/auth/github/callback`

## Next Steps

1. Create auth context/provider
2. Create login page
3. Create signup page
4. Create password reset flow
5. Create email verification
6. Create OAuth integration
7. Create protected routes
8. Create profile pages
9. Create avatar upload
10. Test all flows
