<script>
   import { goto } from '$app/navigation'

   import Button from '$ui/Buttons/Button.svelte'
   import Container from '$ui/Container.svelte'
</script>

<Container
   customClass="min-h-screen flex flex-col justify-around items-center text-center text-white bg-gradient-to-b from-green-500 to-blue-400"
>
   <div>
      <h1 class="text-4xl mt-6 underline underline-offset-2 decoration-blue-500">
         Лучшие курсы собраны здесь
      </h1>

      <p class="text-2xl">Исследуйте безграничный мир знаний</p>
   </div>

   <Button on:click={() => goto('#courses')}>Вперед!</Button>
</Container>
