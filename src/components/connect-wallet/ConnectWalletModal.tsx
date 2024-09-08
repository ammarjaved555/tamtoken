// ConnectWalletModal.tsx
import React, { FC, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface ConnectWalletModalProps {
  open: boolean;
  onClose: () => void;
  onConnect: (account: string) => void;
}

const ConnectWalletModal: FC<ConnectWalletModalProps> = ({ open, onClose, onConnect }) => {
  const [account, setAccount] = useState('');

  const handleConnect = () => {
    onConnect(account);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Connect to MetaMask Wallet</DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ marginBottom: '20px' }}>
          Please enter your MetaMask wallet address.
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Wallet Address"
          type="text"
          fullWidth
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleConnect} color="primary">
          Connect
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConnectWalletModal;
