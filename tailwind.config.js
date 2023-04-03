/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontSize: {
            xs: "1.2rem",
            sm: "1.3rem",
            md: "1.4em",
            lg: "1.7rem",
            xl: "2.5rem",
            xxl: "3rem",
            subtitle: "2.5rem",
        },

        extend: {
            fontFamily: {
                neon: ["marquee", "sans-serif"],
                candy: ["smile", "sans-serif"],
            },
            colors: {
                /* Content */
                primary: "#4700d8",
                secondary: "#FF0D66",
                tertiary: "#00BCD4",
                background: "#000212",
                container: "rgba(255,255,255,0.1)",
                "border-color": "rgba(255,255,255,0.1)",
                hover: "rgba(255,255,255,0.05)",

                /* Text colors */
                "text-light": "rgba(255,255,255,0.5)",
                "text-base": "rgba(255,255,255,0.8)",
                logo: "#c724b1",
                "logo-secondary": "#5ee6eb",

                /* Buttons */
                button: "#000D00",
                "primary-light": "rgba(71, 0, 216, 0.1)",
                "primary-border": "rgba(71, 0, 216, 0.4)",
                "primary-icon": "rgba(71, 0, 216, 0.7)",
                "primary-hover": "rgba(50, 0, 255, 0.1)",
                "secondary-light": "rgba(255, 13, 102, 0.1)",
                "tertiary-light": "rgba(0, 188, 212, 0.1)",
            },

            backgroundImage: {
                "border-gradient":
                    "linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",

                "filter-gradient": "linear-gradient(45deg, #4700d8, #a500bb, #d4009c, #f0007e, #ff0d66)",
            },

            boxShadow: {
                "container-shadow": "rgb(50 63 100 / 50%) 0px 1px 20px",
                "filter-shadow": "rgb(50 63 100 / 50%) 0px 1px 40px",
                "product-shadow": "rgb(50 63 100 / 50%) 0px 1px 5px",
            },

            keyframes: {
                flicker: {
                    "0%, 18%, 22%, 25%, 53%, 57%, 100%": {
                        textShadow:
                            "0 0 4px #4700d8, 0 0 11px #4700d8, 0 0 19px #4700d8, 0 0 40px #4700d8, 0 0 80px #4700d8, 0 0 90px #4700d8, 0 0 100px #4700d8, 0 0 150px #4700d8;",
                    },

                    "20%, 55%": { textShadow: "none" },
                },
            },

            animation: {
                flicker: "flicker 10s infinite",
            },
        },
    },
    plugins: [require("prettier-plugin-tailwindcss")],
};
