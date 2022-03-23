import classNames from 'classnames'

interface IContainer {
   children
   id?: string
   className?: string
}

export const Container = ({ children, className, ...props }: IContainer) => {
   const containerClass = classNames(
      className,
      'px-3 md:px-6 lg:px-12 xl:px-24 py-8 lg:py-12'
   )
   return (
      <div className={containerClass} {...props}>
         {children}
      </div>
   )
}
