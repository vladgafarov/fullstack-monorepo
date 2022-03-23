<script lang="ts">
   import { LogInDocument, type LogInMutation, type LogInMutationVariables } from '$api/generated'
   import { goto } from '$app/navigation'
   import { validateForm } from '$lib/utils'
   import { mutation, operationStore } from '@urql/svelte'
   import * as yup from 'yup'

   const schema = yup.object().shape({
      email: yup.string().required('Обязательно').email('Неверный email'),
      password: yup.string().required('Обязательно')
   })

   const login = mutation(operationStore<LogInMutation, LogInMutationVariables>(LogInDocument))

   let email: string = 'jhon@test.com'
   let password: string = '123456'

   let loginError: string = ''
   let formErrors: Record<string, unknown> | undefined
   let loading: boolean = false

   const handleSubmit = async () => {
      loginError = ''
      const values = { email, password }

      loading = true
      formErrors = await validateForm<{ email: string; password: string }>(schema, values)

      if (!formErrors) {
         login({
            email,
            password
         }).then((res) => {
            if (res.error) {
               loginError = res.error.graphQLErrors[0].message
            } else {
               loginError = ''
               goto('/')
            }
         })
      }

      loading = false
   }
</script>

<div class="max-w-md mx-auto my-6 bg-slate-200 p-4 lg:p-6 rounded-lg shadow-md">
   <h1 class="underline decoration-blue-500">Вход</h1>

   <form on:submit|preventDefault={handleSubmit} class="flex flex-col space-y-3">
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

      {#if loginError}
         <p class:error={loginError}>{loginError}</p>
      {/if}

      <button class="btn btn-primary" disabled={loading}>Войти</button>
   </form>

   <p class="text-center underline pt-3">
      <a href="/signup">Регистрация</a>
   </p>
   <p class="text-center underline pt-3">
      <a href="/reset-password">Сброс пароля</a>
   </p>
</div>
