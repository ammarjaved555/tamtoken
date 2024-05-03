import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";

import CustomTextField from "../../components/text/TextField";
import SubTitle from "../../components/text/SubTitle";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addTicket } from "../../store/tickets";
import { useNavigate } from "react-router-dom";
import {
  selectErrorTicket,
  selectStatusTicket,
  selectUpdateResponseTicket,
} from "../../store/tickets/selectors";
import { showAlert } from "../../store/alert";

const ContactUsField = () => {
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [subject, setSubject] = useState("");
  const [subjectErr, setSubjectErr] = useState(false);
  const [message, setMessage] = useState("");
  const [messageErr, setMessageErr] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const statusTicket = useAppSelector(selectStatusTicket);
  const errorTicket = useAppSelector(selectErrorTicket);
  const updateResponseTicket = useAppSelector(selectUpdateResponseTicket);

  const handleSendMsg = () => {
    let successData = true;
    if (!name) {
      setNameErr(true);
      successData = false;
    }
    if (!email) {
      setEmailErr(true);
      successData = false;
    }
    if (!subject) {
      setSubjectErr(true);
      successData = false;
    }
    if (!message) {
      setMessageErr(true);
      successData = false;
    }
    if (successData) {
      setNameErr(false);
      setEmailErr(false);
      setSubjectErr(false);
      setMessageErr(false);
      dispatch(addTicket({ name, email, subject, message }));
    }
  };

  useEffect(() => {
    if (statusTicket && errorTicket === "") {
      dispatch(
        showAlert({
          message: "Your ticket was created successfully.",
          severity: "success",
        })
      );
      navigate("/tickets");
    } else if (!statusTicket && errorTicket !== "") {
      dispatch(showAlert({ message: errorTicket, severity: "error" }));
    }
  }, [updateResponseTicket]);

  return (
    <>
      <Stack>
        <SubTitle text="Get In Touch" />
        <Box sx={{ display: "flex" }} gap={5}>
          <Box sx={{ textAlign: "left" }} flex={1}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="username"
              mb="5px"
            >
              Username
              <span style={{ color: "#B94A48" }}> *</span>
            </Typography>
            <CustomTextField
              id="username"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            />
            <Typography
              variant="subtitle1"
              component="label"
              htmlFor="username"
              color="error"
              display={nameErr ? "block" : "none"}
            >
              Please add User Name
            </Typography>
          </Box>
          <Box sx={{ textAlign: "left" }} flex={1}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="password"
              mb="5px"
            >
              Email
              <span style={{ color: "#B94A48" }}> *</span>
            </Typography>
            <CustomTextField
              id="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
            <Typography
              variant="subtitle1"
              component="label"
              htmlFor="username"
              color="error"
              display={emailErr ? "block" : "none"}
            >
              Please add User Email
            </Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign: "left" }} mt={2} flex={1}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Subject
            <span style={{ color: "#B94A48" }}> *</span>
          </Typography>
          <CustomTextField
            id="subject"
            variant="outlined"
            fullWidth
            value={subject}
            onChange={(e: any) => setSubject(e.target.value)}
          />
          <Typography
            variant="subtitle1"
            component="label"
            htmlFor="username"
            color="error"
            display={subjectErr ? "block" : "none"}
          >
            Please add Subject
          </Typography>
        </Box>
        <Box sx={{ textAlign: "left" }} mt={2} flex={1}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Message
            <span style={{ color: "#B94A48" }}> *</span>
          </Typography>
          <CustomTextField
            id="subject"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={message}
            onChange={(e: any) => setMessage(e.target.value)}
          />
          <Typography
            variant="subtitle1"
            component="label"
            htmlFor="username"
            color="error"
            display={messageErr ? "block" : "none"}
          >
            Please add Message
          </Typography>
        </Box>
      </Stack>
      <Box mt="25px">
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={() => handleSendMsg()}
        >
          Send Message
        </Button>
      </Box>
    </>
  );
};

export default ContactUsField;
