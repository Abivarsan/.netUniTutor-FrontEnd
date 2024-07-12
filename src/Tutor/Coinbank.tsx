import React from 'react';
import { Box } from '@mui/material';
import CoinWallet from './Coinwallet';
import BuyCoins from './Buycoins';

const CoinBank: React.FC = () => {
  return (
    <Box p={2}>
      <CoinWallet />
      <BuyCoins />
    </Box>
  );
};

export default CoinBank;
