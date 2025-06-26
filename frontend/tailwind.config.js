module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{html,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['VKSansDisplay-Medium', 'sans-serif'],
      },
      animation: {
        pingSlow: "ping 5s cubic-bezier(0, 0, 0.2, 1) infinite",
        spinSlow: "spin 1.5s linear infinite",
        spinReverse: "spinReverse 1s linear infinite",
      },
      keyframes: {
        spinReverse: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
      },
    }    
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};

  