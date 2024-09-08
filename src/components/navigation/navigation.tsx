import React, { FC, useState } from "react";
import Box from "@mui/material/Box";
import { navigations } from "./navigation.data";
import { Link } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { connectWallet } from '../../store/wallet-slice/walletSlice';
import { AppDispatch, RootState } from '../../store/store';
import ConnectWalletModal from "../connect-wallet/ConnectWalletModal";

type NavigationData = {
  path: string;
  label: string;
};

const Navigation: FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { account, isMetaMaskInstalled } = useSelector((state: RootState) => state.wallet);

  const [modalOpen, setModalOpen] = useState(false);

  const handleConnectWallet = () => {
    setModalOpen(true);
  };
   const handleConnect = (account: string) => {
    dispatch(connectWallet());
    navigate('/connectwallet');
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "wrap",
        justifyContent: "end",
        flexDirection: { xs: "column", lg: "row" }
      }}
    >
      {navigations.map(({ path: destination, label }: NavigationData) =>
        <Box
          key={label}
          component={Link}
          href={destination}
          sx={{
            display: "inline-flex",
            position: "relative",
            color: currentPath === destination ? "" : "white",
            lineHeight: "30px",
            letterSpacing: "3px",
            cursor: "pointer",
            textDecoration: "none",
            textTransform: "uppercase",
            fontWeight: 700,
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 0, lg: 3 },
            mb: { xs: 3, lg: 0 },
            fontSize: "20px",
            ...destination === "/" && { color: "primary.main" },
            "& > div": { display: "none" },
            "&.current>div": { display: "block" },
            "&:hover": {
              color: "text.disabled"
            }
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 12,
              transform: "rotate(3deg)",
              "& img": { width: 44, height: "auto" }
            }}
          >
            {/* eslint-disable-next-line */}
            <img src="/images/headline-curve.svg" alt="Headline curve" />
          </Box>
          {label}
        </Box>
      )}
      <Box
       onClick={handleConnectWallet}
        sx={{
          position: "relative",
          color: "white",
          cursor: "pointer",
          textDecoration: "none",
          textTransform: "uppercase",
          fontWeight: 600,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 0, lg: 3 },
          mb: { xs: 3, lg: 0 },
          fontSize: "24px",
          lineHeight: "6px",
          width: "324px",
          height: "45px",
          borderRadius: "6px",
          backgroundColor: "#00dbe3"
        }}
       
      >
       {account? "Connected": "Connect Wallet"}
      </Box>
      <ConnectWalletModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConnect={handleConnect}
      />
    </Box>
  );
};

export default Navigation;
