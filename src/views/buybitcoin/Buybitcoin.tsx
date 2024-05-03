import React from "react";
import { Box, Typography } from "@mui/material";
import Title from "../../components/text/Title";
import BitcoinSlider from "../../components/bitcoin-carousel/bitcoin-slider";
import "../../assets/css/react-slick.css";
import "slick-carousel/slick/slick.css";

const Buybitcoin = () => {
  return (
    <Box>
      <Title title="How To Buy Bitcoin"></Title>
      <Box
        sx={{
          minHeight: "calc(100vh - 450px)",
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "50px 24px 80px",
        }}
      >
        <Typography
          component="h4"
          sx={{
            position: "relative",
            fontSize: { xs: 24, md: 32 },
            mt: { xs: 0, md: 5 },
            mb: 2,
            lineHeight: 1,
            fontWeight: "bold",
          }}
        >
          Ways To Buy{" "}
          <Typography
            component="mark"
            sx={{
              position: "relative",
              color: "primary.main",
              fontSize: "inherit",
              fontWeight: "inherit",
              backgroundColor: "unset",
            }}
          >
            Bitcoin{" "}
            <Box
              sx={{
                position: "absolute",
                top: { xs: 20, md: 28 },
                left: 2,
                "& img": { width: { xs: 130, md: 175 }, height: "auto" },
              }}
            >
              <img src="/images/headline-curve.svg" alt="Headline curve" />
            </Box>
          </Typography>
        </Typography>
        <BitcoinSlider />
      </Box>
    </Box>
  );
};

export default Buybitcoin;
