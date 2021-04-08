import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import Web3 from 'web3';

const WalletSelector = styled('div')`
  cursor: pointer;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  display: flex;
`;

function ConnectWalletModal({
  isOpenTriggered,
  handleCloseEvent,
  onConnectWallet,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isOpenTriggered) onOpen();
  }, [isOpenTriggered, onOpen]);

  const _onClose = () => {
    handleCloseEvent();
    onClose();
  };

  const connectWallet = () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      window.ethereum
        .enable()
        .then(async (result) => {
          onConnectWallet(web3);
        })
        .catch((error) => {
          onConnectWallet(null);
        });
    }

    _onClose();
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
        <ModalHeader>Connect to wallet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <WalletSelector onClick={connectWallet}>
            <Image
              alt="Metamask Logo"
              src={process.env.PUBLIC_URL + '/images/metamask.svg'}
              boxSize="30px"
            />
            <div>Metamask - Desktop</div>
          </WalletSelector>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ConnectWalletModal;
