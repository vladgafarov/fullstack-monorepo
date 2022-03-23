import {
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
} from '@chakra-ui/react'
import Search from './Search'

const SearchModal = ({ isOpen, onClose }) => {
   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>
               <h1 className="text-2xl">Поиск курсов</h1>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
               <Search onClose={onClose} />
            </ModalBody>
            <ModalFooter></ModalFooter>
         </ModalContent>
      </Modal>
   )
}

export default SearchModal
