import { Button, Container } from 'ui'

const Hero = () => {
   return (
      <Container className="min-h-screen flex flex-col justify-around items-center text-center text-white bg-gradient-to-b from-green-500 to-blue-400">
         <div>
            <h1 className="text-4xl mt-6 underline underline-offset-2 decoration-blue-500">
               Лучшие курсы собраны здесь
            </h1>

            <p className="text-2xl">Исследуйте безграничный мир знаний</p>
         </div>

         <Button onClick={() => {}}>Вперед!</Button>
      </Container>
   )
}

export default Hero
