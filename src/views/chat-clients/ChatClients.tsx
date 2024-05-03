import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Pagination,
  TableBody
} from "@mui/material";
import Title from "../../components/text/Title";
import { Nodata } from "../../components/errorboundary/Nodata";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectChannels } from "../../store/chat/selectors";
import { getChannels } from "../../store/chat";
import { useNavigate } from "react-router-dom";

const ChatClients = () => {
  const dispatch = useAppDispatch();
  const channels = useAppSelector(selectChannels);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const totalCount = channels.length;
  const indexOfLastTicket = currentPage * 10;
  const indexOfFirstTicket = indexOfLastTicket - 10;
  const currentChannels = channels.slice(indexOfFirstTicket, indexOfLastTicket);
  const handleChangePage = (evt: any, num: number) => {
    setCurrentPage(num);
  };

  const navigateChat = (link: string) => {
    navigate("/chats/" + link);
  };

  useEffect(() => {
    dispatch(getChannels());
  }, []);

  return (
    <Box>
      <Title title="Chat Linkes" />
      <Box
        sx={{
          minHeight: "calc(100vh - 450px)",
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "0px 0px 80px"
        }}
      >
        <Box sx={{ overflow: "auto", width: { xs: "300px", sm: "auto" } }}>
          <Table aria-label="simple table" sx={{ whiteSpace: "nowrap", mt: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell align="left" width="150">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Chat Link
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentChannels.map((item: any, index: number) =>
                <TableRow
                  hover
                  sx={{ cursor: "pointer" }}
                  key={index}
                  onClick={() => navigateChat(item)}
                >
                  <TableCell align="left">
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500"
                      }}
                    >
                      /chats/{item}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {currentChannels.length === 0 &&
                <TableRow>
                  <TableCell>
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
    </Box>
  );
};

export default ChatClients;
