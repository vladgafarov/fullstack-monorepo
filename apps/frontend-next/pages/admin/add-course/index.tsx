import AddCourse from '@components/Admin/AddCourse'
import Layout from '@components/Layout/Layout'
import Head from 'next/head'

const AddCoursePage = () => {
   return (
      <>
         <Head>
            <title>Добавить курс</title>
         </Head>
         <AddCourse />
      </>
   )
}
AddCoursePage.getLayout = function getLayout(page) {
   return <Layout>{page}</Layout>
}

export default AddCoursePage
