import Container from '@components/utils/Container'
import { ErrorMessage, Formik } from 'formik'
import * as Yup from 'yup'
import {
   FormStyles,
   LabelStyles,
   FieldStyles,
   InputStyles,
} from '@components/utils/Form'
import DisplayError from '@components/utils/DisplayError'
import Button from '@components/utils/Button'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { useCreateCourseMutation } from '@api/generated'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

const AddCourseSchema = Yup.object().shape({
   title: Yup.string().min(2, 'Минимум 2 символа').required('Обязательно'),
   description: Yup.string()
      .min(2, 'Минимум 2 символа')
      .required('Обязательно'),
   price: Yup.number().min(100, 'Минимум 100').required('Обязательно'),
})

const AddCourse = () => {
   const [image, setImage] = useState<string>()

   const router = useRouter()

   const [createCourse, { data, isLoading, error }] = useCreateCourseMutation()

   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files[0]) {
         setImage(URL.createObjectURL(e.target.files[0]))
      }
   }

   return (
      <Container>
         <h2 className="text-2xl">Добавить курс</h2>

         <Formik
            initialValues={{
               title: '',
               description: '',
               price: '',
            }}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={AddCourseSchema}
            onSubmit={async ({ title, description, price }, actions) => {
               let file
               if (image) {
                  file = await fetch(image)
                     .then(r => r.blob())
                     .then(
                        blobFile =>
                           new File([blobFile], `${Date.now()}`, {
                              type: 'image/jpg',
                           })
                     )
               }
               createCourse({
                  title,
                  description,
                  price: +price,
                  file,
               })
                  .unwrap()
                  .then(res => {
                     toast.success('Пост создан')
                     router.push(`/course/${res.createCourse.id}`)
                  })
                  .catch(() => {})
            }}
         >
            {() => (
               <FormStyles className="lg:max-w-[50%] mt-6">
                  <fieldset disabled={isLoading}>
                     <LabelStyles>
                        Название:
                        <FieldStyles name="title" type="text" />
                        <ErrorMessage
                           name="title"
                           render={msg => <DisplayError error={msg} />}
                        />
                     </LabelStyles>
                     <LabelStyles>
                        Описание:
                        <FieldStyles
                           name="description"
                           type="text"
                           as="textarea"
                           min={100}
                        />
                        <ErrorMessage
                           name="description"
                           render={msg => <DisplayError error={msg} />}
                        />
                     </LabelStyles>
                     <LabelStyles>
                        Цена:
                        <FieldStyles name="price" type="number" />
                        <ErrorMessage
                           name="price"
                           render={msg => <DisplayError error={msg} />}
                        />
                     </LabelStyles>
                     <label className="block">
                        <InputStyles
                           type="file"
                           className="border-none pl-0"
                           accept="image/*"
                           onChange={handleImageChange}
                        />
                     </label>

                     {image && (
                        <>
                           <h1>Обложка</h1>
                           <div className="relative aspect-video border-2 border-blue-500 rounded-md outline-none">
                              <Image
                                 src={image}
                                 layout="fill"
                                 objectFit="contain"
                                 alt="create course"
                              />
                              <button
                                 className="absolute top-0 right-0 w-6 h-6 rounded-full flex items-center justify-center bg-white border-2 border-blue-300 text-blue-400 transform -translate-y-1/2 translate-x-1/2"
                                 onClick={() => setImage(undefined)}
                              >
                                 <IoClose />
                              </button>
                           </div>
                        </>
                     )}

                     {error && <DisplayError error={error} />}

                     <Button type="submit" className="mt-4">
                        Создать
                     </Button>
                  </fieldset>
               </FormStyles>
            )}
         </Formik>
      </Container>
   )
}

export default AddCourse
