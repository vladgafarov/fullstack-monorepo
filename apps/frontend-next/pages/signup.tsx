import Layout from '@components/Layout/Layout'
import Signup from '@components/Signup'
import Head from 'next/head'

const SignUpPage = () => {
   return (
      <>
         <Head>
            <title>Регистрация</title>
         </Head>
         <Signup />
      </>
   )
}
SignUpPage.getLayout = function getLayout(page) {
   return <Layout>{page}</Layout>
}

export default SignUpPage
