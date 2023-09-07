/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontSize: {
            xxs: "1rem",
            xs: "1.2rem",
            sm: "1.3rem",
            md: "1.4rem",
            lg: "1.7rem",
            xl: "2.5rem",
            xxl: "3rem",
            subtitle: ["2.5rem", "1"],
            title: ["3.4rem", "1.5"],
        },
        extend: {
            fontFamily: {
                neon: ["marquee", "sans-serif"],
                candy: ["smile", "sans-serif"],
            },
            colors: {
                /* Content */
                primary: {
                    100: "#0D0028",
                    200: "#100030",
                    300: "#1F005E",
                    500: "#4700d8",
                    700: "#4D00EC",
                    900: "#5400FF",
                    DEFAULT: "#4700d8",
                },

                secondary: "#FF0D66",
                tertiary: "#00BCD4",
                background: {
                    light: "#020416",
                    DEFAULT: "#000212",
                    border: "hsla(233,30%,15%,0.5)",
                },

                neutral: {
                    50: "hsla(233,24%,14%,1)",
                    100: "hsla(233,27%,12%,1)",
                    300: "hsla(233,30%,10%,1)",
                    400: "hsla(233,33%,9%,1)",
                    500: "hsla(233,36%,8%,1)",
                    600: "hsla(233,40%,7%,1)",
                    700: "hsla(233,43%,7%,1)",
                    900: "hsla(233,53%,6%,1)",
                    1000: "hsla(233,60%,5%,1)",
                },

                success: {
                    background: "transparent",
                    text: "#0e6766",
                },

                container: "hsla(233, 20%, 13%, 1)",
                "container-light": "rgba(255,255,255,0.07)",
                "container-extra-light": "rgba(255,255,255,0.04)",
                "border-color": "rgba(255,255,255,0.1)",
                hover: "rgba(255,255,255,0.05)",

                /* Text colors */
                "text-light": "rgba(255,255,255,0.5)",
                "text-extra-light": "rgba(255,255,255,0.3)",
                "text-xx-light": "rgba(255,255,255,0.1)",
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

                "input-shadow": "0 0 0 3px hsla(233,33%,9%,0.7)",
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
};
