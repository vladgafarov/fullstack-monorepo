import Link from 'next/link'
import Nav from './Nav'

const Header = () => {
   return (
      <header className="fixed w-full bg-white h-16 z-50 flex flex-row justify-between items-center border-b-2 border-green-400 px-6">
         <div className="logo">
            <Link href="/">
               <a>
                  <h1 className="text-2xl">Courses</h1>
               </a>
            </Link>
         </div>
         <Nav />
      </header>
   )
}

export default Header
