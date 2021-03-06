module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        antonio: ['Antonio', 'sans-serif'],
        bowlbyOne: ['Bowlby One', 'cursive'],
        bowlbyOneSC: ['Bowlby One SC', 'cursive'],
        monda: ['Monda', 'sans-serif'],
        oxygenMono: ['Oxygen Mono', 'monospace'],
        
      },
      colors: {
        white: "rgba(255,255,255)",
        spotifyGreen: 'rgb(30,215,96)',
        spotifyBlack: 'rgb(25,20,20)',
        spotifyColor: '#191414',
        vert59: "rgb(66,143,112)",
        orangeVif: "rgb(196,94,58)",
        ombreNaturelle31: "rgb(90,85,80)",
        vertAnglaisPale: "rgb(190,203,183)",
        outremerGris: "rgb(217,225,221)",
        vertOliveVif: "rgb(184,161,54)",
        roseClair: "rgb(214,175,166)",
        bleuCeruleen31: "rgb(62,110,144)"
      },
      container: {
        center: true,
      },
      boxShadow: {
        'sharp': '-4px 5px 0px rgba(90,85,80,.2);',
        'spread': '-4px 5px 10px rgba(90,85,80);',
        'smallSpread': '-4px 5px 10px rgba(90,85,80,.2);',
        'insetSmallSpread': 'inset -4px 5px 10px rgba(90,85,80,.2);',
        'sharpHover': '0px 6px 0px rgba(64,60,58,.4);',
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
