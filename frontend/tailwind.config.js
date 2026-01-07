/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0a0a0b",
                card: "#121214",
                accent: {
                    DEFAULT: "#00d1ff",
                    glow: "rgba(0, 209, 255, 0.3)",
                },
                slate: {
                    950: "#020617",
                }
            },
            fontFamily: {
                sans: ["Outfit", "Inter", "sans-serif"],
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        },
    },
    plugins: [],
}
