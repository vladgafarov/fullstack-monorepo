import { Modal } from '@mantine/core'
import { Button, ButtonAlert } from 'ui'

const Alert = ({ isOpen, cancelRef, onClose, onDelete }) => {
   return (
      <Modal opened={isOpen} onClose={onClose} title={<h2>Удаление</h2>}>
         <p>
            Вы дейстительно хотите удалить выбранное? Отменить действие будет
            невозможно
         </p>

         <Button ref={cancelRef} onClick={onClose}>
            Отмена
         </Button>
         <ButtonAlert className="ml-3" onClick={onDelete}>
            Удалить
         </ButtonAlert>
      </Modal>
   )
}

export default Alert
