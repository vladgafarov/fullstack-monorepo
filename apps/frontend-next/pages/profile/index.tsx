import Layout from '@components/Layout/Layout'
import Profile from '@components/Profile/Profile'
import Head from 'next/head'

const ProfilePage = () => {
   return (
      <>
         <Head>
            <title>Профиль</title>
         </Head>
         <Profile />
      </>
   )
}
ProfilePage.getLayout = function getLayout(page) {
   return <Layout>{page}</Layout>
}

export default ProfilePage
