/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        light: {
          DEFAULT: 'rgb(var(--backgroundColor-light) / <alpha-value>)'
        },
        dark: {
          DEFAULT: 'rgb(var(--backgroundColor-dark) / <alpha-value>)'
        }
      },
      colors: {
        primary: {
          100: 'rgb(var(--color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--color-primary-400) / <alpha-value>)',
          500: 'rgb(var(--color-primary-500) / <alpha-value>)',
          600: 'rgb(var(--color-primary-600) / <alpha-value>)',
          700: 'rgb(var(--color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--color-primary-900) / <alpha-value>)'
        },
        secondary: {
          100: 'rgb(var(--color-secondary-100) / <alpha-value>)',
          200: 'rgb(var(--color-secondary-200) / <alpha-value>)',
          300: 'rgb(var(--color-secondary-300) / <alpha-value>)',
          400: 'rgb(var(--color-secondary-400) / <alpha-value>)',
          500: 'rgb(var(--color-secondary-500) / <alpha-value>)',
          600: 'rgb(var(--color-secondary-600) / <alpha-value>)',
          700: 'rgb(var(--color-secondary-700) / <alpha-value>)',
          800: 'rgb(var(--color-secondary-800) / <alpha-value>)',
          900: 'rgb(var(--color-secondary-900) / <alpha-value>)'
        },
        error: {
          100: 'rgb(var(--color-error-100) / <alpha-value>)',
          200: 'rgb(var(--color-error-200) / <alpha-value>)',
          300: 'rgb(var(--color-error-300) / <alpha-value>)',
          400: 'rgb(var(--color-error-400) / <alpha-value>)',
          500: 'rgb(var(--color-error-500) / <alpha-value>)',
          600: 'rgb(var(--color-error-600) / <alpha-value>)',
          700: 'rgb(var(--color-error-700) / <alpha-value>)',
          800: 'rgb(var(--color-error-800) / <alpha-value>)',
          900: 'rgb(var(--color-error-900) / <alpha-value>)'
        },
        warning: {
          100: 'rgb(var(--color-warning-100) / <alpha-value>)',
          200: 'rgb(var(--color-warning-200) / <alpha-value>)',
          300: 'rgb(var(--color-warning-300) / <alpha-value>)',
          400: 'rgb(var(--color-warning-400) / <alpha-value>)',
          500: 'rgb(var(--color-warning-500) / <alpha-value>)',
          600: 'rgb(var(--color-warning-600) / <alpha-value>)',
          700: 'rgb(var(--color-warning-700) / <alpha-value>)',
          800: 'rgb(var(--color-warning-800) / <alpha-value>)',
          900: 'rgb(var(--color-warning-900) / <alpha-value>)'
        },
        success: {
          100: 'rgb(var(--color-success-100) / <alpha-value>)',
          200: 'rgb(var(--color-success-200) / <alpha-value>)',
          300: 'rgb(var(--color-success-300) / <alpha-value>)',
          400: 'rgb(var(--color-success-400) / <alpha-value>)',
          500: 'rgb(var(--color-success-500) / <alpha-value>)',
          600: 'rgb(var(--color-success-600) / <alpha-value>)',
          700: 'rgb(var(--color-success-700) / <alpha-value>)',
          800: 'rgb(var(--color-success-800) / <alpha-value>)',
          900: 'rgb(var(--color-success-900) / <alpha-value>)'
        },
      },
      textColor: {
        primary: {
          100: 'rgb(var(--textColor-primary-100) / <alpha-value>)',
          200: 'rgb(var(--textColor-primary-200) / <alpha-value>)',
          300: 'rgb(var(--textColor-primary-300) / <alpha-value>)',
          400: 'rgb(var(--textColor-primary-400) / <alpha-value>)',
          500: 'rgb(var(--textColor-primary-500) / <alpha-value>)',
          600: 'rgb(var(--textColor-primary-600) / <alpha-value>)',
          700: 'rgb(var(--textColor-primary-700) / <alpha-value>)',
          800: 'rgb(var(--textColor-primary-800) / <alpha-value>)',
          900: 'rgb(var(--textColor-primary-900) / <alpha-value>)'
        },
        secondary: {
          100: 'rgb(var(--textColor-secondary-100) / <alpha-value>)',
          200: 'rgb(var(--textColor-secondary-200) / <alpha-value>)',
          300: 'rgb(var(--textColor-secondary-300) / <alpha-value>)',
          400: 'rgb(var(--textColor-secondary-400) / <alpha-value>)',
          500: 'rgb(var(--textColor-secondary-500) / <alpha-value>)',
          600: 'rgb(var(--textColor-secondary-600) / <alpha-value>)',
          700: 'rgb(var(--textColor-secondary-700) / <alpha-value>)',
          800: 'rgb(var(--textColor-secondary-800) / <alpha-value>)',
          900: 'rgb(var(--textColor-secondary-900) / <alpha-value>)'
        },
        error: {
          100: 'rgb(var(--textColor-error-100) / <alpha-value>)',
          200: 'rgb(var(--textColor-error-200) / <alpha-value>)',
          300: 'rgb(var(--textColor-error-300) / <alpha-value>)',
          400: 'rgb(var(--textColor-error-400) / <alpha-value>)',
          500: 'rgb(var(--textColor-error-500) / <alpha-value>)',
          600: 'rgb(var(--textColor-error-600) / <alpha-value>)',
          700: 'rgb(var(--textColor-error-700) / <alpha-value>)',
          800: 'rgb(var(--textColor-error-800) / <alpha-value>)',
          900: 'rgb(var(--textColor-error-900) / <alpha-value>)'
        },
        warning: {
          100: 'rgb(var(--textColor-warning-100) / <alpha-value>)',
          200: 'rgb(var(--textColor-warning-200) / <alpha-value>)',
          300: 'rgb(var(--textColor-warning-300) / <alpha-value>)',
          400: 'rgb(var(--textColor-warning-400) / <alpha-value>)',
          500: 'rgb(var(--textColor-warning-500) / <alpha-value>)',
          600: 'rgb(var(--textColor-warning-600) / <alpha-value>)',
          700: 'rgb(var(--textColor-warning-700) / <alpha-value>)',
          800: 'rgb(var(--textColor-warning-800) / <alpha-value>)',
          900: 'rgb(var(--textColor-warning-900) / <alpha-value>)'
        },
        success: {
          100: 'rgb(var(--textColor-success-100) / <alpha-value>)',
          200: 'rgb(var(--textColor-success-200) / <alpha-value>)',
          300: 'rgb(var(--textColor-success-300) / <alpha-value>)',
          400: 'rgb(var(--textColor-success-400) / <alpha-value>)',
          500: 'rgb(var(--textColor-success-500) / <alpha-value>)',
          600: 'rgb(var(--textColor-success-600) / <alpha-value>)',
          700: 'rgb(var(--textColor-success-700) / <alpha-value>)',
          800: 'rgb(var(--textColor-success-800) / <alpha-value>)',
          900: 'rgb(var(--textColor-success-900) / <alpha-value>)'
        },
        light: {
          DEFAULT: 'rgb(var(--textColor-light) / <alpha-value>)',
        },
        dark: {
          DEFAULT: 'rgb(var(--textColor-dark) / <alpha-value>)',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}