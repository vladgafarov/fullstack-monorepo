import { useSignUpMutation } from '@api/generated'
import { useForm } from '@mantine/hooks'
import React from 'react'
import { useQueryClient } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { Button, DisplayError, Input, PasswordInput } from 'ui'

const SingUp = () => {
   const { mutate, isLoading, error } = useSignUpMutation()

   const navigate = useNavigate()
   const queryClient = useQueryClient()

   const form = useForm({
      initialValues: {
         email: '',
         name: '',
         lastName: '',
         password: '',
      },
      validationRules: {
         email: (value: string) => /^\S+@\S+$/.test(value),
         name: value => value.trim().length >= 2,
         lastName: value => value.trim().length >= 2,
         password: value => value.trim().length >= 6,
      },
      errorMessages: {
         email: 'Неверный email',
         name: 'Не меньше 2 символов',
         lastName: 'Не меньше 2 символов',
         password: 'Не меньше 6 символов',
      },
   })

   const handleSubmit = value => {
      mutate(value, {
         onSuccess: () => {
            queryClient.invalidateQueries('CurrentUser')
            navigate('/')
         },
      })
   }

   return (
      <div className="max-w-md mx-auto my-6 bg-slate-200 p-4 lg:p-6 rounded-lg shadow-md">
         <h1 className="underline decoration-blue-500">Регистрация</h1>

         <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-3">
            <Input label="Имя" {...form.getInputProps('name')} />
            <Input label="Фамилия" {...form.getInputProps('lastName')} />
            <Input
               label="Почта"
               type="email"
               {...form.getInputProps('email')}
            />
            <PasswordInput label="Пароль" {...form.getInputProps('password')} />

            {error && <DisplayError error={error} />}

            <Button type="submit" fullWidth disabled={isLoading}>
               Зарегистрироваться
            </Button>
         </form>

         <p className="text-center underline pt-3">
            <Link to="/login">Вход</Link>
         </p>
      </div>
   )
}

export default SingUp
