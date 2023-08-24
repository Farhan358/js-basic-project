/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      colors:{
        primary: '#111111',
        secondary:{
          regular: '#585858',
          medium : '#FFF',
          arrowColor: '#EB5757'
        },
      },
      backgroundColor:{
        btnBg: '#EB5757',
      },
      fontFamily:{
        work:['Work Sans'],
        },
    },
  },
  plugins: [require("daisyui")],
}

