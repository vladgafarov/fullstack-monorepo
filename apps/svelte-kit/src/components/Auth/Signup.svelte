<script lang="ts">
   import {
      SignUpDocument,
      type SignUpMutation,
      type SignUpMutationVariables
   } from '$api/generated'
   import { goto } from '$app/navigation'
   import { validateForm } from '$lib/utils'
   import { mutation, operationStore } from '@urql/svelte'
   import * as yup from 'yup'

   const schema = yup.object().shape({
      name: yup.string().required('Обязательно'),
      lastName: yup.string().required('Обязательно'),
      email: yup.string().required('Обязательно').email('Неверный email'),
      password: yup.string().required('Обязательно')
   })

   const signup = mutation(operationStore<SignUpMutation, SignUpMutationVariables>(SignUpDocument))

   let name: string = ''
   let lastName: string = ''
   let email: string = ''
   let password: string = ''

   let signupError: string = ''
   let formErrors: Record<string, unknown> | undefined
   let loading: boolean = false

   const handleSubmit = async () => {
      signupError = ''
      loading = true
      const values = { name, lastName, email, password }

      formErrors = await validateForm(schema, values)

      if (!formErrors) {
         signup({
            name,
            lastName,
            email,
            password
         }).then((res) => {
            if (res.error) {
               signupError = res.error.graphQLErrors[0].message
            } else {
               signupError = ''
               goto('/')
            }
         })
      }

      loading = false
   }
</script>

<div class="max-w-md mx-auto my-6 bg-slate-200 p-4 lg:p-6 rounded-lg shadow-md">
   <h1 class="underline decoration-blue-500">Регистрация</h1>

   <form on:submit|preventDefault={handleSubmit} class="flex flex-col space-y-3">
      <label>
         <span>Имя</span>
         <input name="name" bind:value={name} />
         {#if formErrors?.name}
            <p class="error">{formErrors.name}</p>
         {/if}
      </label>
      <label>
         <span>Фамилия</span>
         <input name="lastName" bind:value={lastName} />
         {#if formErrors?.lastName}
            <p class="error">{formErrors.lastName}</p>
         {/if}
      </label>
      <label>
         <span>Почта</span>
         <input name="email" type="email" bind:value={email} />
         {#if formErrors?.email}
            <p class="error">{formErrors.email}</p>
         {/if}
      </label>
      <label>
         <span>Пароль</span>
         <input name="password" type="password" bind:value={password} />
         {#if formErrors?.password}
            <p class="error">{formErrors.password}</p>
         {/if}
      </label>

      {#if signupError}
         <p class:error={signupError}>{signupError}</p>
      {/if}

      <button class="btn btn-primary" disabled={loading}>Зарегистрироваться</button>
   </form>

   <p class="text-center underline pt-3">
      <a href="/login">Вход</a>
   </p>
</div>
