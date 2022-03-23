import { useForm } from '@mantine/hooks'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, Input, PasswordInput } from 'ui'
import { useLogInMutation } from '@api/generated'
import { useQueryClient } from 'react-query'
import { DisplayError } from 'ui'

const Login = () => {
   const queryClient = useQueryClient()

   const { mutate, data, error, isLoading } = useLogInMutation({
      onSuccess: () => {
         queryClient.invalidateQueries('CurrentUser')
      },
   })
   const location = useLocation()
   const navigate = useNavigate()

   //@ts-ignore
   const from = location.state?.from?.pathname || '/'

   const form = useForm({
      initialValues: {
         email: 'rico@test.com',
         password: '123456',
      },
      validationRules: {
         email: (value: string) => /^\S+@\S+$/.test(value),
         password: value => value.trim().length >= 6,
      },
      errorMessages: {
         email: 'Неверный email',
         password: 'Не меньше 6 символов',
      },
   })

   const handleSubmit = (values: { email: string; password: string }) => {
      mutate(values, {
         onSuccess: data => {
            navigate(from, { replace: true })
         },
         onError: err => {
            console.log(err)
         },
      })
   }

   return (
      <div className="max-w-md mx-auto my-6 bg-slate-200 p-4 lg:p-6 rounded-lg shadow-md">
         <h1 className="underline decoration-blue-500">Вход</h1>

         <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-3">
            <Input
               label="Почта"
               type="email"
               {...form.getInputProps('email')}
            />
            <PasswordInput label="Пароль" {...form.getInputProps('password')} />

            {error && <DisplayError error={error} />}

            <Button type="submit" fullWidth loading={isLoading}>
               Войти
            </Button>
         </form>

         <p className="text-center underline pt-3">
            <Link to="/signup">Регистрация</Link>
         </p>
         <p className="text-center underline pt-3">
            <Link to="/reset-password">Сброс пароля</Link>
         </p>
      </div>
   )
}

export default Login
