import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface WalletState {
  account: string | null;
  isMetaMaskInstalled: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: WalletState = {
  account: null,
  isMetaMaskInstalled: true,
  status: 'idle',
};

export const connectWallet = createAsyncThunk('wallet/connectWallet', async () => {
  if (window.ethereum) {
    const accounts: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return accounts[0];
  } else {
    throw new Error('MetaMask is not installed');
  }
});

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setAccount(state, action: PayloadAction<string | null>) {
      state.account = action.payload;
    },
    setMetaMaskInstalled(state, action: PayloadAction<boolean>) {
      state.isMetaMaskInstalled = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectWallet.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(connectWallet.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.account = action.payload;
      })
      .addCase(connectWallet.rejected, (state) => {
        state.status = 'failed';
        state.isMetaMaskInstalled = false;
      });
  },
});

export const { setAccount, setMetaMaskInstalled } = walletSlice.actions;

export default walletSlice.reducer;
