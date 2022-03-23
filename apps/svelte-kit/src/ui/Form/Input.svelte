<script lang="ts">
   // export let type: string = 'text'
   export let name: string
   export let value: string
</script>

<input
   bind:value
   {name}
   class="
      border-2 border-blue-500 rounded-md
      px-4 py-2
      focus:ring-2 focus:ring-blue-300
      outline-none
      w-full
   "
/>
