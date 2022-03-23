import ConfirmUser from '@components/ConfirmUser'
import Layout from '@components/Layout/Layout'
import Head from 'next/head'

const ConfirmUserPage = () => {
   return (
      <>
         <Head>
            <title>Подтверждение регистрации</title>
         </Head>
         <ConfirmUser />
      </>
   )
}
ConfirmUserPage.getLayout = function getLayout(page) {
   return <Layout>{page}</Layout>
}

export default ConfirmUserPage
