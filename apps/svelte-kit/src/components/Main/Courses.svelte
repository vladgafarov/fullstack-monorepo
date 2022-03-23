<script lang="ts">
   import Container from '$ui/Container.svelte'
   import { operationStore, query } from '@urql/svelte'
   import CourseCard from './CourseCard.svelte'
   import {
      GetCoursesDocument,
      type GetCoursesQuery,
      type GetCoursesQueryVariables
   } from '$api/generated'

   const courses = operationStore<GetCoursesQuery, GetCoursesQueryVariables>(GetCoursesDocument, {
      take: 3
   })

   query(courses)
</script>

<Container id="courses">
   <h1 class="text-2xl">Последние курсы</h1>

   {#if $courses.fetching}
      <p>Загрузка...</p>
   {:else if $courses.error}
      <p>{$courses.error.message}</p>
   {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
         {#each $courses.data.courses as course}
            <CourseCard data={course} />
         {/each}
      </div>
   {/if}
</Container>
