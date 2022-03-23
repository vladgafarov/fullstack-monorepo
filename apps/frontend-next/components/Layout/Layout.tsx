import Footer from './Footer'
import Header from './Header'
import { Provider } from 'react-redux'
import { store } from '@redux/store'
import { ChakraProvider } from '@chakra-ui/react'

const Layout = ({ children }) => {
   return (
      <Provider store={store}>
         <ChakraProvider>
            <div className="flex flex-col min-h-screen">
               <Header />
               <main className="flex-grow mt-16">{children}</main>
               <Footer />
            </div>
         </ChakraProvider>
      </Provider>
   )
}

export default Layout
