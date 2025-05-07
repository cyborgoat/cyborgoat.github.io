// tailwind.config.ts (example)
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // ... your theme ...
  },
  plugins: [
    require('@tailwindcss/typography'), // Add this line
    // ... other plugins ...
  ],
}
export default config