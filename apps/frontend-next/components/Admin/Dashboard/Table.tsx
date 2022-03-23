//@ts-nocheck
import {
   Tbody,
   Td,
   Th,
   Thead,
   Tr,
   Table as TableStyles,
   Menu,
   MenuButton,
   MenuList,
   MenuItem,
   IconButton,
   useDisclosure,
} from '@chakra-ui/react'
import Button from '@components/utils/Button'
import { getSortBy } from '@lib/getSortBy'
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { FiMoreVertical } from 'react-icons/fi'
import { IoCloseSharp } from 'react-icons/io5'
import { MdDelete, MdOutlineOpenInNew } from 'react-icons/md'
import { useTable, usePagination, useSortBy, useRowSelect } from 'react-table'
import Alert from './Alert'
import AlertDeleteMany from './AlertDeleteMany'
import ModalInfo from './ModalInfo'
import TablePagination from './TablePagination'

//eslint-disable-next-line
const Checkbox = forwardRef(({ indeterminate, ...rest }, ref) => {
   const defaultRef = useRef()
   const resolvedRef = ref || defaultRef

   useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
   }, [resolvedRef, indeterminate])

   return (
      <div className="flex items-center justify-center">
         <input type="checkbox" ref={resolvedRef} {...rest} />
      </div>
   )
})

const Table = ({
   columns,
   data,
   fetchData,
   loading,
   pageCount: controlledPageCount,
   deleteFunc,
   id,
   setId,
   info,
   length,
}) => {
   const {
      isOpen: isModalOpen,
      onOpen: onModalOpen,
      onClose: onModalClose,
   } = useDisclosure()

   const [isAlertOpen, setIsAlertOpen] = useState(false)
   const [isDeleteManyOpen, setIsDeleteManyOpen] = useState(false)
   const cancelRef = useRef()

   const onDelete = async () => {
      try {
         await deleteFunc({ id }).unwrap()
         toast.success('Успешно')
      } catch (error) {
         toast.error('Ошибка')
      } finally {
         setIsAlertOpen(false)
      }
   }

   const tableHooks = hooks => {
      hooks.visibleColumns.push(columns => {
         return [
            {
               id: 'selection',
               //eslint-disable-next-line
               Header: ({ getToggleAllRowsSelectedProps }) => (
                  <div>
                     <Checkbox {...getToggleAllRowsSelectedProps()} />
                  </div>
               ),
               //eslint-disable-next-line
               Cell: ({ row }) => (
                  <div>
                     <Checkbox {...row.getToggleRowSelectedProps()} />
                  </div>
               ),
            },
            ...columns,
            {
               id: 'menu',
               Cell: ({
                  row: {
                     original: { id },
                  },
               }) => (
                  <Menu>
                     <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<FiMoreVertical />}
                        variant="outline"
                     />
                     <MenuList>
                        <MenuItem
                           icon={<MdOutlineOpenInNew />}
                           onClick={() => {
                              onModalOpen()
                              setId(id)
                           }}
                        >
                           Подробнее
                        </MenuItem>
                        <MenuItem
                           icon={<MdDelete />}
                           onClick={() => {
                              setIsAlertOpen(true)
                              setId(id)
                           }}
                        >
                           Удалить
                        </MenuItem>
                     </MenuList>
                  </Menu>
               ),
            },
         ]
      })
   }

   const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      toggleAllRowsSelected,
      state: { pageIndex, pageSize, sortBy, selectedRowIds },
   } = useTable(
      {
         columns,
         data,
         initialState: { pageIndex: 0, hiddenColumns: ['id'] },
         manualPagination: true,
         pageCount: controlledPageCount,
         manualSortBy: true,
         disableMultiSort: true,
      },
      tableHooks,
      useSortBy,
      usePagination,
      useRowSelect
   )

   const selectedRowIdsLength = useMemo(
      () => Object.keys(selectedRowIds).length,
      [selectedRowIds]
   )

   const deleteMany = async () => {
      const ids = Object.keys(selectedRowIds).reduce((acc, key) => {
         return [...acc, data[key].id]
      }, [])

      const deletePromise = ids.map(id => deleteFunc({ id }).unwrap())

      try {
         const res = await Promise.allSettled(deletePromise)
         toast.success('Успешно')
      } catch (error) {
         toast.error('Ошибка')
         console.log(error)
      } finally {
         setIsDeleteManyOpen(false)
      }
   }

   useEffect(() => {
      const orderBy = getSortBy(sortBy[0]?.id)

      fetchData({
         skip: pageSize * pageIndex,
         take: pageSize,
         orderBy,
         sortOrder: sortBy[0]?.desc ? 'desc' : 'asc',
      })
      //eslint-disable-next-line
   }, [fetchData, pageIndex, pageSize, sortBy[0]?.id, sortBy[0]?.desc])

   return (
      <>
         {selectedRowIdsLength > 0 && (
            <div className="sticky w-full top-16 bg-blue-200 z-50 flex py-2 px-4 items-center rounded-md">
               <h2>Выбрано: {selectedRowIdsLength}</h2>
               <div className="ml-auto space-x-2">
                  <Button
                     onClick={() => toggleAllRowsSelected(false)}
                     disabled={selectedRowIdsLength === 0}
                  >
                     <IoCloseSharp />
                  </Button>
                  <Button
                     onClick={() => setIsDeleteManyOpen(true)}
                     disabled={selectedRowIdsLength === 0}
                  >
                     <MdDelete />
                  </Button>
               </div>
            </div>
         )}
         <TableStyles {...getTableProps()} className="">
            <Thead>
               {headerGroups.map((headerGroup, i) => (
                  <Tr {...headerGroup.getHeaderGroupProps()} key={i}>
                     {headerGroup.headers.map((column, i) => (
                        <Th
                           {...column.getHeaderProps(
                              column.getSortByToggleProps()
                           )}
                           key={i}
                        >
                           {column.render('Header')}
                           <span>
                              {column.isSorted
                                 ? column.isSortedDesc
                                    ? ' 🔽'
                                    : ' 🔼'
                                 : ''}
                           </span>
                        </Th>
                     ))}
                  </Tr>
               ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
               {page.map((row, i) => {
                  prepareRow(row)
                  return (
                     <Tr
                        key={i}
                        {...row.getRowProps()}
                        className="even:bg-blue-50"
                     >
                        {row.cells.map((cell, i) => {
                           return (
                              <Td key={i} {...cell.getCellProps()}>
                                 {cell.render('Cell')}
                              </Td>
                           )
                        })}
                     </Tr>
                  )
               })}
               <Tr>
                  {loading ? (
                     <Td colSpan={10000}>Loading...</Td>
                  ) : (
                     <Td colSpan={10000}>
                        Показано {page.length} результатов из {length}
                     </Td>
                  )}
               </Tr>
            </Tbody>
         </TableStyles>
         <TablePagination
            canNextPage={canNextPage}
            canPreviousPage={canPreviousPage}
            gotoPage={gotoPage}
            pages={pageOptions.length}
            page={pageIndex + 1}
            nextPage={nextPage}
            previousPage={previousPage}
         />
         <Alert
            cancelRef={cancelRef}
            isOpen={isAlertOpen}
            onClose={() => setIsAlertOpen(false)}
            onDelete={onDelete}
         />
         <AlertDeleteMany
            cancelRef={cancelRef}
            isOpen={isDeleteManyOpen}
            onClose={() => setIsDeleteManyOpen(false)}
            onDelete={deleteMany}
         />
         <ModalInfo data={info} isOpen={isModalOpen} onClose={onModalClose} />
      </>
   )
}

export default Table
