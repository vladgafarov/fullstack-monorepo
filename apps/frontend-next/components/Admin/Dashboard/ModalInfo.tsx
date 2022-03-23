import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
} from '@chakra-ui/react'

const ModalInfo = ({ isOpen, onClose, data }) => {
   return (
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>Полная информация</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
               <pre>
                  <code>{JSON.stringify(data, null, 2)}</code>
               </pre>
            </ModalBody>

            <ModalFooter></ModalFooter>
         </ModalContent>
      </Modal>
   )
}

export default ModalInfo
