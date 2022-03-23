const InfoPoint = ({ text, data, icon }) => {
   return (
      <div className="flex items-center space-x-1 my-2">
         {icon}
         <div>
            {text}: <strong>{data}</strong>
         </div>
      </div>
   )
}

export default InfoPoint
