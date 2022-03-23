import { Link } from 'react-router-dom'

const Footer = () => {
   return (
      <footer className="py-4 px-6 bg-slate-600 text-white">
         <div>
            <Link to="/">
               <h1 className="text-green-400">Courses</h1>
            </Link>
         </div>
         <div>&copy; Copyright 2022</div>
      </footer>
   )
}

export default Footer
