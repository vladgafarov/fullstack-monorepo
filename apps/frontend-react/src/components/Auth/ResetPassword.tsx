import { useResetPasswordMutation } from '@api/generated'
import { useForm } from '@mantine/hooks'
import { useNotifications } from '@mantine/notifications'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, DisplayError, PasswordInput } from 'ui'

const ResetPassword = () => {
   const { token } = useParams()

   const notifications = useNotifications()
   const navigate = useNavigate()

   const { mutate, isLoading, error } = useResetPasswordMutation()

   const form = useForm({
      initialValues: {
         password: '',
         repeatPassword: '',
      },

      validationRules: {
         password: password => password.trim().length >= 6,
         repeatPassword: (repeatPassword, values) =>
            repeatPassword === values.password,
      },
      errorMessages: {
         password: 'Не меньше 6 символов',
         repeatPassword: 'Пароли не совпадают',
      },
   })

   const handleSubmit = (values: {
      password: string
      repeatPassword: string
   }) => {
      mutate(
         {
            password: values.password,
            repeatPassword: values.repeatPassword,
            token,
         },
         {
            onSuccess: () => {
               notifications.showNotification({
                  message: 'Пароль успешно изменен',
                  color: 'green',
               })
               navigate('/login')
            },
         }
      )
   }

   return (
      <div className="max-w-md mx-auto my-6 bg-slate-200 p-4 lg:p-6 rounded-lg shadow-md">
         <h1 className="underline decoration-blue-500">Сброс пароля</h1>

         <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-3">
            <PasswordInput label="Пароль" {...form.getInputProps('password')} />
            <PasswordInput
               label="Повтор пароля"
               {...form.getInputProps('repeatPassword')}
            />

            {error && <DisplayError error={error} />}

            <Button type="submit" disabled={isLoading}>
               Сменить пароль
            </Button>
         </form>
      </div>
   )
}

export default ResetPassword
