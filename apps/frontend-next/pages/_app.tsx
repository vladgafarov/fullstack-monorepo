import '../styles/globals.css'
import Page from '../components/Page'
import { Toaster } from 'react-hot-toast'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from '@redux/store'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import { AppProps } from 'next/app'

type NextPageWithLayout = NextPage & {
   getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
   Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
   const getLayout = Component.getLayout ?? (page => page)

   return getLayout(
      <Page>
         <Component {...pageProps} />
         <Toaster position="bottom-right" />
      </Page>
   )
}

export default MyApp
