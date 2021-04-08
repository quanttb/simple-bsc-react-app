import React, { useState } from 'react';
import {
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Text,
} from '@chakra-ui/react';

function TransferToken({ web3 }) {
  const [statusText, setStatusText] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');

  const onSend = async () => {
    if (web3 && toAddress !== '' && amount > 0) {
      setStatusText(`Transferring ${amount} BNB to ${toAddress}...`);
      const accounts = await web3.eth.getAccounts();
      await web3.eth
        .sendTransaction({
          from: accounts[0],
          to: toAddress,
          value: web3.utils.toWei(amount.toString()),
        })
        .on('transactionHash', function (hash) {})
        .on('receipt', function (receipt) {
          setStatusText(`Hash TX: ${receipt.transactionHash}`);
          console.log();
        })
        .on('confirmation', function (confirmationNumber, receipt) {})
        .on('error', console.error);
    }
  };

  const handleToAddressChange = (e) => {
    setToAddress(e.target.value);
  };

  const handleAmountChange = (num) => {
    setAmount(num);
  };

  return (
    <>
      <Text>SEND BNB:</Text>
      <Input
        placeholder="To Address"
        onChange={(e) => handleToAddressChange(e)}
      ></Input>
      <NumberInput
        defaultValue={0}
        min={0}
        onChange={(str, num) => handleAmountChange(num)}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Button onClick={onSend}>SEND</Button>
      <Text>{statusText}</Text>
    </>
  );
}

export default TransferToken;
