import React, { useState } from 'react';
import { Button, Text } from '@chakra-ui/react';
import ConnectWalletModal from './components/ConnectWalletModal';
import LogoutModal from './components/LogoutModal';
import TransferToken from './components/TransferToken';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('');
  const [currentBalance, setCurrentBalance] = useState(0);
  const [isConnectWalletModalOpened, setIsConnectWalletModalOpened] = useState(
    false
  );
  const [isLogoutModalOpened, setIsLogoutModalOpened] = useState(false);
  const [web3, setWeb3] = useState(null);

  const onConnectWalletModalOpen = () => {
    setIsConnectWalletModalOpened(true);
  };

  const onConnectWalletModalClose = () => {
    setIsConnectWalletModalOpened(false);
  };

  const onLogoutModalOpen = () => {
    setIsLogoutModalOpened(true);
  };

  const onLogoutModalClose = () => {
    setIsLogoutModalOpened(false);
  };

  const onConnectWallet = async (_web3) => {
    setWeb3(_web3);
    if (_web3) {
      setIsConnected(true);

      const addresses = await _web3.eth.getAccounts();
      setCurrentAddress(addresses[0]);

      const balance = await _web3.eth.getBalance(addresses[0]);
      setCurrentBalance(_web3.utils.fromWei(balance));
    }
  };

  return (
    <div>
      <Text fontSize="3xl">Metamask Demo</Text>
      {!isConnected && (
        <Button onClick={onConnectWalletModalOpen}>Connect Wallet</Button>
      )}
      {isConnected && (
        <>
          <Button onClick={onLogoutModalOpen}>
            {currentAddress} - {currentBalance} BNB
          </Button>
          <TransferToken web3={web3}></TransferToken>
        </>
      )}

      <ConnectWalletModal
        isOpenTriggered={isConnectWalletModalOpened}
        handleCloseEvent={onConnectWalletModalClose}
        onConnectWallet={onConnectWallet}
      ></ConnectWalletModal>

      <LogoutModal
        isOpenTriggered={isLogoutModalOpened}
        handleCloseEvent={onLogoutModalClose}
      ></LogoutModal>
    </div>
  );
}

export default App;
