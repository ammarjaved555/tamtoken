import React from "react";
import { Box } from "@mui/material";
import Title from "../../components/text/Title";
import CreateChatField from "./CreateChatField";

const CreateChat = () => {
  return (
    <Box>
      <Title title="Create Chat with Clients" />
      <Box
        sx={{
          minHeight: "calc(100vh - 450px)",
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "50px 24px 80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around"
        }}
      >
        <CreateChatField />
      </Box>
    </Box>
  );
};

export default CreateChat;
