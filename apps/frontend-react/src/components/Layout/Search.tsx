import { resetIdCounter, useCombobox } from 'downshift'
import { useEffect, useMemo, useRef } from 'react'
import { debounce } from 'lodash'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { useGetCoursesQuery } from '@api/generated'
import { DisplayError, Input } from 'ui'

const Search = ({ onClose }) => {
   const navigate = useNavigate()

   const input = useRef(null)
   const {
      data,
      isLoading,
      error,
      refetch: findItems,
   } = useGetCoursesQuery(
      {
         take: 4,
         title: input.current?.value,
      },
      {
         enabled: false,
      }
   )

   useEffect(() => {
      const timeout = setTimeout(() => {
         input.current.focus()
      }, 0)

      return () => {
         clearTimeout(timeout)
      }
   }, [])

   const items = data?.courses || []
   const findItemsButChill = useMemo(() => debounce(findItems, 250), [])
   resetIdCounter()
   const {
      isOpen,
      inputValue,
      getMenuProps,
      getInputProps,
      getComboboxProps,
      getItemProps,
      highlightedIndex,
   } = useCombobox({
      items,
      onInputValueChange() {
         findItemsButChill()
      },

      onSelectedItemChange({ selectedItem }) {
         navigate(`/course/${selectedItem.id}`)
         onClose()
      },
      itemToString: item => item?.title || '',
   })

   return (
      <div>
         <div {...getComboboxProps()}>
            <input
               {...getInputProps({
                  type: 'search',
                  id: 'search',
                  ref: input,
                  placeholder: 'Введите заголовок курса...',
               })}
               className="w-full border-2 border-blue-500 rounded-md
               px-4 py-2
               focus:ring-2 focus:ring-blue-300 outline-none"
            />
         </div>
         <div {...getMenuProps()} className="mt-3">
            {error && <DisplayError error={error} />}
            {items.map((item, index) => (
               <div
                  {...getItemProps({ item, index })}
                  key={item.id}
                  className={classNames(
                     { 'bg-blue-200': index === highlightedIndex },
                     'px-3 py-2 transition rounded-lg cursor-pointer'
                  )}
               >
                  {item.title}
               </div>
            ))}
            {!items.length && !isLoading && inputValue && (
               <p>Нет результатов</p>
            )}
         </div>
      </div>
   )
}

export default Search
