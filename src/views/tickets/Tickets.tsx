import React, { useEffect, useState } from "react";
import Title from "../../components/text/Title";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Pagination
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getAllTickets,
  closeTicket,
  formatTicketStatus
} from "../../store/tickets";
import { selectAllTickets } from "../../store/tickets/selectors";
import { StatusTicket } from "../../components/chip/StatusTicket";
import ConfirmModal from "../../components/modal/ConfirmModal";
import { Nodata } from "../../components/errorboundary/Nodata";

const Tickets = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tickets = useAppSelector(selectAllTickets);

  const [openModal, setOpenModal] = useState(false);
  const [closeTicketID, setCloseTicketID] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const existingListString = localStorage.getItem("ticket");
  const existingList = existingListString ? JSON.parse(existingListString) : [];
  const totalCount = tickets.length;
  const indexOfLastTicket = currentPage * 10;
  const indexOfFirstTicket = indexOfLastTicket - 10;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const enterTicket = (ticket: number) => {
    navigate(`/tickets/${ticket}`);
  };

  const handleCloseTicket = (status: boolean) => {
    if (status) {
      dispatch(closeTicket({ ticketID: closeTicketID }));
      dispatch(getAllTickets({ ticket: existingList }));
    }
    setOpenModal(false);
  };

  const handleChangePage = (evt: any, num: number) => {
    setCurrentPage(num);
  };

  useEffect(() => {
    dispatch(formatTicketStatus());
    dispatch(getAllTickets({ ticket: existingList }));
  }, []);

  return (
    <Box>
      <Title title="Tickets" />
      <Box
        sx={{
          minHeight: "calc(100vh - 450px)",
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "0px 0px 80px"
        }}
      >
        <Box sx={{ overflow: "auto", width: { xs: "300px", sm: "auto" } }}>
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap",
              mt: 2
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell align="left" width="150">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Ticket Number
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Creator
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Ticket Name
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Status
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Date
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight={600}>
                    action
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentTickets.map((ticket: any, index: number) =>
                <TableRow
                  key={index}
                  hover
                  onClick={() => {
                    enterTicket(ticket.ticketID);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell align="left">
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                        paddingLeft: "20px"
                      }}
                    >
                      {ticket.ticketID}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <Box>
                        <Typography variant="h5" fontWeight={600}>
                          {ticket.name}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          sx={{
                            fontSize: "13px"
                          }}
                        >
                          {ticket.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight={600}>
                      {ticket.subject}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <StatusTicket type={ticket.status} />
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px"
                      }}
                    >
                      {ticket.creationTime}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      aria-label="delete"
                      onClick={(event: any) => {
                        event.stopPropagation();
                        setCloseTicketID(ticket.ticketID);
                        setOpenModal(true);
                      }}
                      disabled={ticket.status === 0}
                    >
                      <DeleteIcon
                        sx={{
                          fontSize: "24px",
                          color:
                            ticket.status === 0
                              ? "#b9b9b9"
                              : theme.palette.error.main
                        }}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )}
              {currentTickets.length === 0 &&
                <TableRow>
                  <TableCell colSpan={6}>
                    <Nodata />
                  </TableCell>
                </TableRow>}
            </TableBody>
          </Table>
        </Box>
        <Pagination
          count={Math.ceil(totalCount / 10)}
          color="primary"
          sx={{ mt: 5, "& ul": { justifyContent: "center" } }}
          page={currentPage}
          onChange={handleChangePage}
        />
      </Box>
      <ConfirmModal
        text="Are you sure you want to delete post?"
        openModal={openModal}
        handleAction={handleCloseTicket}
      />
    </Box>
  );
};

export default Tickets;
