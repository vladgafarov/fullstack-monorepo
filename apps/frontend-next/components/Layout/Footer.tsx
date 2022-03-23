import Link from 'next/link'

const Footer = () => {
   return (
      <footer className="py-4 px-6 bg-slate-600 text-white">
         <div>
            <Link href="/">
               <a>
                  <h1 className="text-green-400 text-2xl">Courses</h1>
               </a>
            </Link>
         </div>
         <div>&copy; Copyright 2022</div>
      </footer>
   )
}

export default Footer
