import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Title from "../../components/text/Title";
import EditPostField from "./EditPostField";
import { selectLoginUser } from "../../store/auth/selectors";
import { useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";

const EditPost = () => {
  const navigate = useNavigate();
  const loggedin = useAppSelector(selectLoginUser);

  useEffect(() => {
    if (!loggedin) {
      navigate("/");
    }
  }, []);

  return (
    <Box>
      <Title title="Edit Post" />
      <Box
        sx={{
          minHeight: "calc(100vh - 450px)",
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "50px 24px 80px"
        }}
      >
        <EditPostField />
      </Box>
    </Box>
  );
};

export default EditPost;
