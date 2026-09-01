// tailwind.config.ts (example)
import type {Config} from 'tailwindcss'
import typography from '@tailwindcss/typography'

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
        typography,
        // ... other plugins ...
    ],
}
export default config