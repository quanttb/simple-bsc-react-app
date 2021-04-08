import React, { useEffect } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

function LogoutModal({ isOpenTriggered, handleCloseEvent }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isOpenTriggered) onOpen();
  }, [isOpenTriggered, onOpen]);

  const _onClose = () => {
    handleCloseEvent();
    onClose();
  };

  const _onLogout = () => {
    _onClose();
    window.location.reload();
  };

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={_onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Your wallet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Button colorScheme="orange" mr={3} onClick={_onLogout}>
            Logout
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default LogoutModal;
