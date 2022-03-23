import { resetIdCounter, useCombobox } from 'downshift'
import { InputStyles } from '@components/utils/Form'
import { useEffect, useMemo, useRef } from 'react'
import { debounce } from 'lodash'
import { useLazyGetCoursesQuery } from '@api/enhanceApi'
import DisplayError from '@components/utils/DisplayError'
import { useRouter } from 'next/router'
import classNames from 'classnames'

const Search = ({ onClose }) => {
   const router = useRouter()

   const [findItems, { data, isLoading, error }] = useLazyGetCoursesQuery()

   const input = useRef(null)

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
         findItemsButChill({
            take: 4,
            title: input.current.value,
         })
      },

      onSelectedItemChange({ selectedItem }) {
         router.push(`/course/${selectedItem.id}`)
         onClose()
      },
      itemToString: item => item?.title || '',
   })

   return (
      <div>
         <div {...getComboboxProps()}>
            <InputStyles
               {...getInputProps({
                  type: 'search',
                  id: 'search',
                  ref: input,
                  placeholder: 'Введите заголовок курса...',
               })}
               className="w-full"
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
