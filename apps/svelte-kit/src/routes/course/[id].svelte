<script lang="ts">
   import courseImg from '$static/course.jpg'

   import {
      GetCourseDocument,
      type GetCourseQuery,
      type GetCourseQueryVariables
   } from '$api/generated'

   import { page } from '$app/stores'
   import { operationStore, query } from '@urql/svelte'
   import Container from '$ui/Container.svelte'

   const { id } = $page.params

   const courseQuery = operationStore<GetCourseQuery, GetCourseQueryVariables>(GetCourseDocument, {
      id: +id
   })
   query(courseQuery)

   let course
   $: {
      course = $courseQuery?.data?.course
   }
</script>

<svelte:head>
   <title>Course {course?.title}</title>
</svelte:head>

<Container>
   <div class="bg-slate-200 rounded-2xl p-4 lg:p-10">
      {#if $courseQuery.fetching}
         <p>Загрузка...</p>
      {:else if $courseQuery.error}
         <p>{$courseQuery.error.message}</p>
      {:else}
         <div class="flex items-center space-x-3">
            <div class="basis-full md:basis-2/3">
               <h1 class="text-3xl underline decoration-blue-500">
                  {course.title}
               </h1>
               <p class="py-2 text-slate-700">
                  <strong>Описание: </strong>
                  {course.description}
               </p>

               <!-- <div>
                 <InfoPoint
            text={'Пользователей'}
            data={data.course.userCount}
            icon={<FaUserFriends />}
            />
            <InfoPoint
            text={'Отзывов'}
            data={data.course._count.reviews}
            icon={<MdOutlineChat />}
         /> -->
               <!-- {data.course.rating && (
            <InfoPoint
               text={'Рейтинг'}
               data={data.course.rating.toFixed(2)}
               icon={
                  <AiFillStar class="fill-orange-400" />
               }
            />
            )}
         {data.course.currentUser ? (
            <>
               <p class="font-proxima-medium">
                  Вы записаны
               </p>
               <Button
               disabled={isSignOutLoading}
                  onClick={signOutFromCourse}
               >
               Выйти из курса
            </Button>
            </>
            ) : (
               <Button
               disabled={isSignUpLoading}
               onClick={signUpForCourse}
               class="mt-6"
               >
               Записаться
            </Button>
            )} 
               </div>-->
            </div>
            <div class="rounded-xl overflow-hidden basis-1/3 relative h-48 hidden md:block">
               <img
                  src={course.mainImage || courseImg}
                  alt="Courses"
                  class="absolute inset-0 object-cover max-h-full w-full"
               />
            </div>
         </div>
      {/if}
   </div>
</Container>
