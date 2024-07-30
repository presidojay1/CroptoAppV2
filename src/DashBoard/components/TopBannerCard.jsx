import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ms_hide, connect_wallet, Web3Modal } from "../../assets/web3-provider";
import {
  useDisconnect,
  useAccount,
  useBalance,
  getAccount,
  useContractRead,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { useWeb3ModalEvents } from "@web3modal/wagmi/react";

const TopBannerCard = ({ toggleModal }) => {
  const events = useWeb3ModalEvents();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const { isConnected, connector } = useAccount();

  const Load_wc = async () => {
    // Call useAccount within a React component or hook

    if (isConnected) {
      try {
        const provider = await connector.getProvider();
        if (provider) {
          console.log("Provider:", provider);
          // Handle provider connection here
          connect_wallet("WalletConnect", provider);
        }
      } catch (error) {
        console.error("Error while getting provider:", error);
      }
    } else {
      try {
        Web3Modal.open();
      } catch (error) {
        console.error("Error opening Web3Modal:", error);
      }
    }
  };

  useEffect(() => {
    modalEvent();
  }, [events]);

  const modalEvent = async () => {
    try {
      if (isConnected) {
        const provider = await connector.getProvider();
        if (provider) {
          console.log("Provider:", provider);
          connect_wallet("WalletConnect", provider);
        } else {
          console.error("Provider not available after connection.");
        }
      }

      if (isConnected) {
        const provider = await connector.getProvider();
        if (provider) {
          console.log("Provider after modal closed:", provider);
          connect_wallet("WalletConnect", provider);
        } else {
          console.error("Provider not available after modal close.");
        }
      }
    } catch (error) {
      console.error("Error handling modal event:", error);
    }
  };

  const handleButtonClick = () => {
    setLoading(true);
    setTimeout(() => {
      ms_hide();
      Load_wc(); // Simulate a loading state for 1 second
      setLoading(false); // Reset loading state after use_wc
    }, 1000);
  };

  return (
    <Card
      sx={{
        width: "95%",
        margin: "auto",
        marginTop: "40px",
        marginBottom: "50px",
        borderRadius: "12px",
        backgroundColor: theme.palette.background.default,
        border: `1px solid ${theme.palette.divider}`,
        color: "white",
      }}
    >
      <CardContent
        sx={{
          textAlign: "center",
          padding: "15px",
          background:
            "linear-gradient(90deg, hsla(257, 72%, 14%, 1) 0%, hsla(266, 36%, 9%, 1) 100%)",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="body1">
          You have activated an invitation code!
        </Typography>
        <Typography variant="body2">
          Join 240+ other members and share your portfolio with “The Professor”
        </Typography>
      </CardContent>
      <CardContent
        sx={{ display: "flex", flexDirection: "column", padding: "15px" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <Box
            sx={{
              backgroundColor: theme.palette.grey[900],
              padding: "10px",
              borderRadius: "50%",
              width: "45px",
              height: "45px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: theme.palette.secondary.main,
            }}
          >
            <Typography variant="body1">TP</Typography>
          </Box>
          <Box sx={{ marginLeft: "10px" }}>
            <Typography variant="body1" className="font-semibold">
              The Gem Lab
            </Typography>
            <Typography variant="body2">Trading Community</Typography>
          </Box>
          <Box sx={{ marginLeft: "auto", textAlign: "center" }}>
            <Typography variant="body1">PnL</Typography>
            <Typography variant="body1">Rank</Typography>
            <Typography variant="h6" className="ml-3 text-2xl font-semibold">
              #32
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" className="text-[#ffffff80]">
              Members:
            </Typography>
            <Typography variant="body1">240</Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" className="text-[#ffffff80]">
              Today PnL:
            </Typography>
            <Typography variant="body1">$49,000</Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" className="text-[#ffffff80]">
              Last 7d PnL:
            </Typography>
            <Typography variant="body1">$312,332</Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" className="text-[#ffffff80]">
              Type:
            </Typography>
            <Typography variant="body1">Private</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: "90%",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: loading
                ? theme.palette.grey[900]
                : theme.palette.primary.main,
            }}
            onClick={handleButtonClick}
            disabled={loading}
          >
            {loading && (
              <CircularProgress size={20} sx={{ marginRight: "10px" }} />
            )}
            {loading ? "Connecting..." : "Connect Wallet"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TopBannerCard;
