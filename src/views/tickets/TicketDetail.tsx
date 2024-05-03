import React, { useEffect, useState } from "react";
import { Box, Chip, Stack, Button } from "@mui/material";
import Title from "../../components/text/Title";
import { useNavigate, useParams } from "react-router-dom";
import SubTitle from "../../components/text/SubTitle";
import { useTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import TicketDetailList from "../../components/ticketdetaillist/TicketDetailList";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getTicketDetail, replyTicket, closeTicket } from "../../store/tickets";
import { StatusTicket } from "../../components/chip/StatusTicket";
import CustomTextField from "../../components/text/TextField";
import ConfirmModal from "../../components/modal/ConfirmModal";
import {
  selectTicketDetail,
  selectErrorTicket,
  selectStatusTicket,
  selectUpdateResponseTicket,
} from "../../store/tickets/selectors";
import { showAlert } from "../../store/alert";

const TicketDetail = () => {
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState(2);
  const [email, setEmail] = useState("");
  const [message, setReplyMsg] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const { ticketID } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const ticketDetail = useAppSelector(selectTicketDetail);
  const statusTicket = useAppSelector(selectStatusTicket);
  const errorTicket = useAppSelector(selectErrorTicket);
  const updateResponseTicket = useAppSelector(selectUpdateResponseTicket);

  const handleReply = () => {
    dispatch(replyTicket({ message, ticketID }));
    setReplyMsg("");
  };

  const handleCloseTicket = (status: boolean) => {
    if (status) {
      dispatch(closeTicket({ ticketID }));
      dispatch(getTicketDetail({ ticketID }));
    }
    setOpenModal(false);
  };

  useEffect(() => {
    if (statusTicket && errorTicket === "") {
      dispatch(
        showAlert({
          message: "Your message was sent successfully.",
          severity: "success",
        })
      );
      dispatch(getTicketDetail({ ticketID }));
    } else if (!statusTicket && errorTicket !== "") {
      dispatch(showAlert({ message: errorTicket, severity: "error" }));
    }
  }, [updateResponseTicket]);

  useEffect(() => {
    if (ticketDetail?.length > 0) {
      const originTicket = ticketDetail?.find(
        (item: any) => item.ticketID.toString() === ticketID
      );
      setSubject(originTicket?.subject);
      setStatus(originTicket?.status);
      setEmail(originTicket?.email);
    }
  }, [ticketDetail]);

  useEffect(() => {
    dispatch(getTicketDetail({ ticketID }));
  }, []);

  return (
    <Box>
      <Title title="Ticket Detail"></Title>
      <Box
        sx={{
          minHeight: "calc(100vh - 450px)",
          backgroundColor: "#fff",
          borderRadius: "16px",
          textAlign: "left",
          padding: "50px 24px 80px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
            <Box color={"primary.main"}>
              <SubTitle text={`Ticket ${ticketID} ${subject}`}></SubTitle>
            </Box>
            <StatusTicket type={status} />
          </Box>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              color="error"
              onClick={() => setOpenModal(true)}
              disabled={status === 0}
            >
              Delete
            </Button>
          </Stack>
        </Box>
        <Box p={2}>
          {ticketDetail.map((ticket: any, index: number) => (
            <TicketDetailList
              item={ticket}
              creatorEmail={email}
              key={index}
            ></TicketDetailList>
          ))}
        </Box>
        {status !== 0 && (
          <Box mt={5}>
            <CustomTextField
              id="subject"
              variant="outlined"
              placeholder="Your Reply..."
              fullWidth
              multiline
              rows={5}
              value={message}
              onChange={(e: any) => setReplyMsg(e.target.value)}
            />
          </Box>
        )}
        <Box mt="25px" sx={{ textAlign: "right" }}>
          <Button
            color="warning"
            variant="contained"
            size="large"
            sx={{ width: "150px", marginRight: "20px" }}
            onClick={() => navigate("/tickets")}
          >
            Back
          </Button>
          {status !== 0 && (
            <Button
              color="primary"
              variant="contained"
              size="large"
              sx={{ width: "150px" }}
              onClick={() => handleReply()}
            >
              Reply
            </Button>
          )}
        </Box>
      </Box>
      <ConfirmModal
        text="Are you sure you want to delete post?"
        openModal={openModal}
        handleAction={handleCloseTicket}
      />
    </Box>
  );
};

export default TicketDetail;
