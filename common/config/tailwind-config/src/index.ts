import { fontFamily } from 'tailwindcss/defaultTheme';
import { PresetsConfig } from 'tailwindcss/types/config';
import CatppuccinPlugin from '@catppuccin/tailwindcss';

const config: PresetsConfig = {
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: [...fontFamily.sans],
      },
      // keyframes: {
      //   'preserved-bounce': {
      //     '0%, 100%': {
      //       transform:
      //         'translate(var(--tw-translate-x), calc(var(--tw-translate-y) - 25%) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))',
      //       'animation-timing-function': 'cubic-bezier(0.8,0,1,1)',
      //     },
      //     '50%': {
      //       transform:
      //         'translate(var(--tw-translate-x), var(--tw-translate-y), rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))',
      //       'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
      //     },
      //   },
      // },
      // animation: {
      //   'preserved-bounce': 'preserved-bounce 1s infinite',
      // },

      keyframes: {
        'preserved-bounce': {
          '0%, 100%': {
            transform:
              'translate(var(--tw-translate-x), calc(var(--tw-translate-y) - 25%))',
            'animation-timing-function': 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': {
            transform:
              'translate(var(--tw-translate-x), var(--tw-translate-y))',
            'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
          },
        },
      },
      animation: {
        'preserved-bounce': 'preserved-bounce 1s ease-in-out infinite',
      },
    },
  },
  plugins: [CatppuccinPlugin],
};

export default config;
