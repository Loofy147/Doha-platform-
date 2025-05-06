import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        serif: ["var(--font-merriweather)", "Georgia", "serif"],
        arabic: ["var(--font-noto-sans-arabic)", "Arial", "sans-serif"],
      },
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))', // Warm Pink #EAA4C6
  				foreground: 'hsl(var(--primary-foreground))' // White
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))', // Light Purple #BFA2DB
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: { // General accent - Warm Yellow
  				DEFAULT: 'hsl(var(--accent))', // Warm Yellow #FFD966
  				foreground: 'hsl(var(--accent-foreground))'
  			},
        'accent-pink': { // Specific accent pink
          DEFAULT: 'hsl(var(--accent-pink))', // Warm Pink #EAA4C6
          foreground: 'hsl(var(--accent-pink-foreground))'
        },
        'accent-purple': { // Specific accent purple
          DEFAULT: 'hsl(var(--accent-purple))', // Light Purple #BFA2DB (or a brighter variant)
          foreground: 'hsl(var(--accent-purple-foreground))'
        },
        'accent-yellow': { // Specific accent yellow
          DEFAULT: 'hsl(var(--accent-yellow))', // Warm Yellow #FFD966
          foreground: 'hsl(var(--accent-yellow-foreground))'
        },
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          'muted-foreground': 'hsl(var(--sidebar-muted-foreground))',
          primary: {
            DEFAULT: 'hsl(var(--sidebar-primary))',
            foreground: 'hsl(var(--sidebar-primary-foreground))',
          },
          accent: {
            DEFAULT: 'hsl(var(--sidebar-accent))',
            foreground: 'hsl(var(--sidebar-accent-foreground))',
          },
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
      aspectRatio: {
        '4/3': '4 / 3',
        '3/4': '3 / 4',
        '16/9': '16 / 9',
        '9/16': '9 / 16',
        '21/9': '21 / 9',
        '1/1': '1 / 1',
        'video': '16 / 9', // Common aspect ratio for video
        'square': '1 / 1',
      },
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/aspect-ratio'),
  ],
} satisfies Config;
