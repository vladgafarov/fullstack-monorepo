module.exports = {
   content: [
      '../../packages/ui/**/*.{js,ts,jsx,tsx}',
      './src/**/*.{js,ts,jsx,tsx}',
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
   ],
   theme: {
      extend: {},
      fontFamily: {
         proxima: ['proxima', 'sans-serif'],
         'proxima-bold': ['proxima-bold', 'sans-serif'],
         'proxima-medium': ['proxima-medium', 'sans-serif'],
      },
   },
   plugins: [],
}
