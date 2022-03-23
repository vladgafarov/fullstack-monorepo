import {
   AlertDialog,
   AlertDialogBody,
   AlertDialogContent,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogOverlay,
} from '@chakra-ui/react'
import Button from '@components/utils/Button'

const Alert = ({ isOpen, cancelRef, onClose, onDelete }) => {
   return (
      <AlertDialog
         isOpen={isOpen}
         leastDestructiveRef={cancelRef}
         onClose={onClose}
      >
         <AlertDialogOverlay>
            <AlertDialogContent>
               <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Удаление
               </AlertDialogHeader>

               <AlertDialogBody>
                  Вы дейстительно хотите удалить выбранное? Отменить действие
                  будет невозможно
               </AlertDialogBody>

               <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                     Отмена
                  </Button>
                  <Button className="ml-3" theme="red" onClick={onDelete}>
                     Удалить
                  </Button>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialogOverlay>
      </AlertDialog>
   )
}

export default Alert
