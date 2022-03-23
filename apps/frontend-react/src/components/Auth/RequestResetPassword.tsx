import { useRequestPasswordResetMutation } from '@api/generated'
import { useForm } from '@mantine/hooks'
import { useNotifications } from '@mantine/notifications'
import { Link } from 'react-router-dom'
import { Button, DisplayError, Input } from 'ui'

const RequestResetPassword = () => {
   const { mutate, isLoading, error } = useRequestPasswordResetMutation()
   const notifications = useNotifications()

   const form = useForm({
      initialValues: {
         email: '',
      },
      validationRules: {
         email: (value: string) => /^\S+@\S+$/.test(value),
      },
      errorMessages: {
         email: 'Неверный email',
      },
   })

   const handleSubmit = value => {
      mutate(value, {
         onSuccess: () => {
            notifications.showNotification({
               title: 'Запрос успешно отправлен',
               message: 'Проверьте свою почту',
               color: 'green',
            })
            form.reset()
         },
      })
   }

   return (
      <div className="max-w-md mx-auto my-6 bg-slate-200 p-4 lg:p-6 rounded-lg shadow-md">
         <h1 className="underline decoration-blue-500">Сброс пароля</h1>
         <p>После запроса вы получите письмо для сброса пароля</p>

         <form
            onSubmit={form.onSubmit(handleSubmit)}
            className="space-y-3 mt-4"
         >
            <Input
               label="Почта"
               type="email"
               {...form.getInputProps('email')}
            />

            {error && <DisplayError error={error} />}

            <Button type="submit" fullWidth disabled={isLoading}>
               Отправить запрос
            </Button>
         </form>

         <p className="text-center underline pt-3">
            <Link to="/login">Вход</Link>
         </p>
      </div>
   )
}

export default RequestResetPassword
