<script lang="ts">
   export let customClass: string = undefined
   export let id: string = undefined
</script>

<div class={'px-3 md:px-6 lg:px-12 xl:px-24 py-8 lg:py-12 ' + customClass} {id}>
   <slot />
</div>
