import { ChangeEvent, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { Button, Container, DisplayError, Input } from 'ui'
import { useCreateCourseMutation } from '@api/generated'
import { useForm } from '@mantine/hooks'
import { useNotifications } from '@mantine/notifications'

const AddCourse = () => {
   const [image, setImage] = useState<string>()

   const navigate = useNavigate()

   const notifications = useNotifications()

   const { mutate, data, isLoading, error } = useCreateCourseMutation()

   const form = useForm({
      initialValues: {
         title: '',
         description: '',
         price: '',
      },
      validationRules: {
         title: value => value.trim().length > 2,
         description: value => value.trim().length > 2,
         price: value => +value >= 100,
      },
      errorMessages: {
         title: 'Не меньше 2 символов',
         description: 'Не меньше 2 символов',
         price: 'Не меньше 100',
      },
   })

   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files[0]) {
         setImage(URL.createObjectURL(e.target.files[0]))
      }
   }

   const handleSubmit = async values => {
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

      mutate(
         {
            title: values.title,
            description: values.description,
            price: +values.price,
            file,
         },
         {
            onSuccess: data => {
               navigate(`/course/${data.createCourse.id}`)
               notifications.showNotification({
                  message: 'Курс успешно создан',
                  color: 'green',
               })
            },
         }
      )
   }

   return (
      <Container>
         <h2 className="text-2xl">Добавить курс</h2>

         <form
            onSubmit={form.onSubmit(handleSubmit)}
            className="space-y-3 max-w-md"
         >
            <Input label="Название" {...form.getInputProps('title')} />
            <Input label="Описание" {...form.getInputProps('description')} />
            <Input
               label="Цена"
               type="number"
               min={100}
               {...form.getInputProps('price')}
            />

            <input
               type="file"
               className="border-none pl-0"
               accept="image/*"
               onChange={handleImageChange}
            />

            <br />

            {image && (
               <>
                  <h1>Обложка</h1>
                  <div className="relative aspect-video border-2 border-blue-500 rounded-md outline-none">
                     <img
                        src={image}
                        className="absolute inset-0 max-h-full w-full object-cover"
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

            <Button type="submit" className="mt-4" loading={isLoading}>
               Создать
            </Button>
         </form>
      </Container>
   )
}

export default AddCourse
