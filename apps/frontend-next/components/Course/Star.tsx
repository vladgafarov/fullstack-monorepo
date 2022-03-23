import classNames from 'classnames'
import { AiFillStar } from 'react-icons/ai'

const Star = ({
   className,
   onClick,
   onMouseEnter,
   onMouseLeave,
   isActive = true,
}: {
   className?: string
   onClick?
   onMouseEnter?
   onMouseLeave?
   isActive?: boolean
}) => {
   const starClass = classNames(className, 'text-base', {
      'fill-slate-400': !className,
      'hover:fill-orange-400 hover:scale-125': isActive,
   })

   return (
      <AiFillStar
         className={starClass}
         onClick={onClick}
         onMouseEnter={onMouseEnter}
         onMouseLeave={onMouseLeave}
      />
   )
}

export default Star
