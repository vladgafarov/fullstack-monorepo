import { Modal } from '@mantine/core'

const ModalInfo = ({ isOpen, onClose, data }) => {
   return (
      <Modal
         opened={isOpen}
         onClose={onClose}
         overflow="inside"
         title={<h2>Полная информация</h2>}
      >
         <pre>
            <code>{JSON.stringify(data, null, 2)}</code>
         </pre>
      </Modal>
   )
}

export default ModalInfo
