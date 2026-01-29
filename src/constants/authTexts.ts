// src/constants/authTexts.ts

export const authTexts = {
  // Common
  appName: "GVTracker",
  copyright: (year: number) => `© ${year} GVTracker • All rights reserved`,
  
  // Login page
  login: {
    title: "Welcome back",
    subtitle: "Log in to continue tracking",
    emailLabel: "Email address",
    emailPlaceholder: "name@example.com",
    passwordLabel: "Password",
    forgotPassword: "Forgot password?",
    rememberMe: "Remember me",
    submitButton: "Sign In",
    loadingText: "Signing in...",
    noAccount: "Don't have an account?",
    createAccountLink: "Create account",
    passwordPlaceholder: "••••••••",
  },

  // Register page
  register: {
    title: "Create account",
    subtitle: "Join GVTracker and start tracking",
    fullNameLabel: "Full name",
    fullNamePlaceholder: "John Doe",
    emailLabel: "Email address",
    emailPlaceholder: "name@example.com",
    passwordLabel: "Password",
    confirmPasswordLabel: "Confirm password",
    confirmPasswordPlaceholder: "••••••••",
    passwordPlaceholder: "••••••••",
    submitButton: "Create Account",
    loadingText: "Creating account...",
    alreadyHaveAccount: "Already have an account?",
    signInLink: "Sign in",
    errorDefault: "Registration failed. Please try again.",
    passwordsDontMatch: "Passwords do not match",

  },

  // Shared error messages
  errors: {
    passwordsDontMatch: "Passwords do not match",
    invalidCredentials: "Invalid credentials. Please try again.",
    registrationFailed: "Registration failed. Please try again.",
  },
} as const;