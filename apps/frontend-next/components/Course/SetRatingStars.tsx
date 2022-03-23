import Star from './Star'

const SetRatingStars = ({ star, hoverStar, setStar, setHoverStar }) => {
   return (
      <div className="flex items-center space-x-1 my-3">
         {Array.from({ length: 5 }, (_, i) => (
            <Star
               key={i}
               className={
                  i <= hoverStar || (i <= star && isNaN(hoverStar))
                     ? 'fill-orange-400'
                     : ''
               }
               onClick={() => {
                  setStar(i)
               }}
               onMouseEnter={() => {
                  setHoverStar(i)
               }}
               onMouseLeave={() => {
                  setHoverStar(undefined)
               }}
            />
         ))}
         {!isNaN(star) && <strong className="pl-3">{star + 1}/5</strong>}
      </div>
   )
}

export default SetRatingStars
