/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(210, 30%, 8%)',
        foreground: 'hsl(210, 10%, 95%)',
        muted: 'hsl(210, 10%, 70%)',
        accent: 'hsl(135, 70%, 50%)',
        primary: 'hsl(210, 70%, 50%)',
        surface: 'hsl(210, 30%, 12%)',
        danger: 'hsl(0, 70%, 50%)',
        warning: 'hsl(45, 90%, 60%)',
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '4px',
      },
      spacing: {
        lg: '24px',
        md: '16px',
        sm: '8px',
      },
      boxShadow: {
        card: '0 4px 12px hsla(210, 30%, 20%, 0.3)',
        focus: '0 0 0 3px hsla(135, 70%, 50%, 0.6)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
