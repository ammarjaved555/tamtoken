// ConnectWallet.tsx
import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { connectWallet, setAccount } from '../../store/wallet-slice/walletSlice';

const ConnectWallet: FC = () => {
  const dispatch = useDispatch();
  const { account, isMetaMaskInstalled } = useSelector((state: RootState) => state.wallet);
  const [displayAccount, setDisplayAccount] = useState<string | null>(null);

  const handleConnectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const selectedAccount = accounts[0];
      setDisplayAccount(selectedAccount);
      dispatch(setAccount(selectedAccount));
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setDisplayAccount(accounts[0] || null);
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px',
      }}
    >
      {isMetaMaskInstalled ? (
        <>
          <Button
            onClick={handleConnectWallet}
            variant="contained"
            color="primary"
            sx={{
              marginBottom: '20px',
              backgroundColor: '#00dbe3',
              '&:hover': {
                backgroundColor: '#00c3c9',
              },
            }}
          >
            Connect Wallet
          </Button>
          {displayAccount && (
            <Typography variant="h6" sx={{ color: 'text.primary' }}>
              Connected Account: {displayAccount}
            </Typography>
          )}
        </>
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary' }}>
          MetaMask is not installed. Please install it from{' '}
          <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer" style={{ color: '#00dbe3' }}>
            MetaMask Official Website
          </a>.
        </Typography>
      )}
    </Box>
  );
};

export default ConnectWallet;
