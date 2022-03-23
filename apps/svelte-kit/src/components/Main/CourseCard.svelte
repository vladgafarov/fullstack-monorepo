<script>
   import courseImg from '$static/course.jpg'
   export let data
</script>

<div
   class="group shadow-lg rounded-xl bg-slate-200 basis-1/3 overflow-hidden flex flex-col hover:shadow-xl transition"
>
   <div class="relative h-36">
      <div class="absolute inset-0 overflow-hidden">
         <img
            src={data.mainImage || courseImg}
            alt={data.title}
            class="
               object-cover
               w-full
               max-h-full
               group-hover:scale-[110%] transition duration-[2000ms]
            "
         />
      </div>
      <div class="absolute bottom-0 h-24 w-full bg-gradient-to-t from-slate-500 to-transparent" />
   </div>
   <div class="p-4 flex flex-col justify-between flex-grow">
      <div>
         <a href={`/course/${data.id}`}>
            <h2 class="underline hover:text-slate-600">
               {data.title}
            </h2>
         </a>
         <p>{data.description}</p>
      </div>
      <div>
         <p class="font-bold py-4 text-green-600">{data.price} ₽</p>
         <!-- {error && <DisplayError error={error.message} />}
         {data.currentUser ? (
            <Button theme="light" disabled>
               Вы записаны
            </Button>
         ) : (
            <Button disabled={isLoading} onClick={signUpForCourse}>
               Записаться
            </Button>
         )} -->
      </div>
   </div>
</div>
