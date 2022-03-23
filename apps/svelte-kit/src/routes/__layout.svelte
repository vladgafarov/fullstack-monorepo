<script lang="ts">
   import Nav from '$components/Nav.svelte'

   import '../app.css'

   import { initClient, makeOperation } from '@urql/svelte'
   // import { authExchange } from '@urql/exchange-auth'
   // import { RefreshTokensDocument } from '$api/generated'
   // import { onMount } from 'svelte'

   // let getCookies
   // onMount(() => {
   //    getCookies = () => {
   //       return Object.fromEntries(
   //          document.cookie.split('; ').map((c) => {
   //             const [key, ...v] = c.split('=')
   //             return [key, v.join('=')]
   //          })
   //       )
   //    }
   // })

   // const addAuthToOperation = ({ authState, operation }) => {
   //    if (!authState || !authState.token) {
   //       return operation
   //    }

   //    const fetchOptions =
   //       typeof operation.context.fetchOptions === 'function'
   //          ? operation.context.fetchOptions()
   //          : operation.context.fetchOptions || {}

   //    return makeOperation(operation.kind, operation, {
   //       ...operation.context,
   //       fetchOptions: {
   //          ...fetchOptions,
   //          headers: {
   //             ...fetchOptions.headers,
   //             Authorization: `Bearer ${authState.token}`
   //          }
   //       }
   //    })
   // }

   // const getAuth = async ({ authState, mutate }) => {
   //    if (!authState) {
   //       const tokens = getCookies()
   //       const token = tokens['access-token']
   //       const refreshToken = tokens['refresh-token']
   //       if (token && refreshToken) {
   //          return { token, refreshToken }
   //       }
   //       return null
   //    }

   //    const result = await mutate(RefreshTokensDocument)

   //    if (result.data?.refreshTokens) {
   //       return {
   //          token: result.data.refreshTokens['access_token'],
   //          refreshToken: result.data.refreshTokens['refresh_token']
   //       }
   //    }

   //    return null
   // }

   // const didAuthError = ({ error }) => {
   //    return error.graphQLErrors.some((e) => e.response.status === 401)
   // }

   initClient({
      url: String(import.meta.env.VITE_BACKEND_URL)
      // exchanges: [
      //    authExchange({
      //       getAuth,
      //       addAuthToOperation,
      //       didAuthError
      //    })
      // ]
   })
</script>

<div class="flex flex-col min-h-screen">
   <header
      class="fixed w-full bg-white h-16 z-50 flex flex-row justify-between items-center border-b-2 border-green-400 px-6"
   >
      <div>
         <a href="/" class="font-proxima-bold text-2xl">Courses</a>
      </div>

      <Nav />
   </header>

   <main class="flex-grow mt-16"><slot /></main>

   <footer class="py-4 px-6 bg-slate-600 text-white">
      <div>
         <a href="/" class="text-green-400 font-proxima-bold text-2xl"> Courses </a>
      </div>
      <div>&copy; Copyright 2022</div>
   </footer>
</div>
