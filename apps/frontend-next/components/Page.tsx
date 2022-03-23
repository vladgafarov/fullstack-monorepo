import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
   @font-face {
      font-family: 'proxima';
      src: url('/static/fonts/proxima/ProximaNova-Regular.woff') format('woff');
      font-weight: normal;
      font-style: normal;
   }
   @font-face {
      font-family: 'proxima-medium';
      src: url('/static/fonts/proxima/ProximaNova-Semibold.woff') format('woff');
      font-weight: medium;
      font-style: normal;
   }
   @font-face {
      font-family: 'proxima-bold';
      src: url('/static/fonts/proxima/ProximaNova-Bold.woff') format('woff');
      font-weight: bold;
      font-style: normal;
   }

   * {
      font-family: 'proxima', Arial
   }
`

const Page = ({ children }) => {
   return (
      <div>
         <GlobalStyles />
         {children}
      </div>
   )
}

export default Page
