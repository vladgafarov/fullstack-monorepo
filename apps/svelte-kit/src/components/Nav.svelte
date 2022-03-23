<script>
   import { goto } from '$app/navigation'
</script>

<nav class="flex items-center space-x-6">
   <div class="flex items-center">
      <a href="#">Курсы</a>
   </div>
   <div class="flex items-center space-x-3">
      <button on:click={() => goto('/login')} class="btn btn-primary">Вход</button>
      <button on:click={() => goto('/signup')} class="btn btn-outline">Регистрация</button>
   </div>
</nav>
