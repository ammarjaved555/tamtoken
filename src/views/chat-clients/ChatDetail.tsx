import React, { useState, useEffect } from "react";
import { Box, Avatar, Typography, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import CustomTextField from "../../components/text/TextField";
import io from "socket.io-client";
import { selectLoginUser } from "../../store/auth/selectors";
import { useAppSelector } from "../../store/hooks";
import { getChatsByLink, getIPByLink } from "../../api";
import axios from "axios";
import { Nodata } from "../../components/errorboundary/Nodata";
import { SOCKET_URL } from "../../config/config";
import { extractIPsFromString } from "../../utils/util";

const socket = io(SOCKET_URL);

const ChatDetail = () => {
  const { chatlink } = useParams();
  const [msg, setMsg] = useState("");
  const [admincmsg, setAdmincmsg] = useState("");
  const theme = useTheme();
  const [messages, setMessages] = useState<any>([]);
  const [admincmessages, setAdmincmessage] = useState<any>([]);
  const [allowIP, setAllowIP] = useState<any>();
  const [accessIP, setAccessIP] = useState("");
  const username = useAppSelector(selectLoginUser);
  const [allowance, setAllowance] = useState(false);

  const getIPData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    setAccessIP(res.data.ip);
  };

  const fetchChats = async () => {
    const res = await getChatsByLink(chatlink, username);
    if(username === "admin") {
      const clientAdminMsg = res.chats.filter((chat:any) => chat.username === 'user' || chat.username === 'client-admin')
      setAdmincmessage(clientAdminMsg);

      const userAdminMsg = res.chats.filter((chat:any) => chat.username === 'user-admin' || chat.username === 'client')
      setMessages(userAdminMsg);
    } else {
      const updatedChatData = res.chats.map((chat:any) => {
        if (chat.username === 'client-admin') {
            chat.username = 'client';
        } else if (chat.username === 'user-admin') {
            chat.username = 'user';
        }
        return chat;
      });
      setMessages(updatedChatData);
    }
  };

  const fetchIP = async () => {
    const res = await getIPByLink(chatlink);
    const ipList = extractIPsFromString(res)
    setAllowIP(ipList);
  };

  const handleSendMessage = (input: string) => {
    setMsg(input);
  };

  const handleAdminClientSendMessage = (input: string) => {
    setAdmincmsg(input);
  }

  const handleKeyPress = (event: any) => {
    let user = "";
    if (event.key === "Enter" && msg.trim() !== "") {
      if (username === "") {
        user = "client";
      } else if (username === "admin") {
        user = "user-admin";
      } else {
        user = "user";
      }
      socket.emit("chat message", { chatlink, msg, user });
      setMsg("");
    }
  };

  const handleKeyPressAdminClient = (event: any) => {
    let user = "client-admin";
    if (event.key === "Enter" && admincmsg.trim() !== "") {
      socket.emit("chat message", { chatlink, msg: admincmsg, user });
      setAdmincmsg("");
    }
  }

  useEffect(
    () => {
      if (allowIP?.includes(accessIP)) {
        setAllowance(true);
      } else {
        setAllowance(false);
      }
    },
    [allowIP, accessIP]
  );

  useEffect(() => {
    socket.on(`${chatlink}`, message => {
      if(username === "admin") {
        if (message.username === "client-admin" || message.username === "user") {
          if(message.username === "client-admin") {
            message.username = "client";
          }
          setAdmincmessage((prevMessages: any) => [...prevMessages, message]);
        } else if (message.username === "user-admin" || message.username === "client") {
          if (message.username === "user-admin"){
            message.username = "user";
          }
          setMessages((prevMessages: any) => [...prevMessages, message]);
        }
      } else if (username && (message.username === "client-admin" || message.username === "user")) {
        if(message.username === "client-admin") {
          message.username = "client";
        }
        setAdmincmessage((prevMessages: any) => [...prevMessages, message]);
        setMessages((prevMessages: any) => [...prevMessages, message]);
      } else if ( !username && (message.username === "user-admin" || message.username === "client")) {
        if(message.username === "user-admin") {
          message.username = "user";
        }
        setMessages((prevMessages: any) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.off(`${chatlink}`);
    };
  }, []);

  useEffect(() => {
    fetchChats();
    fetchIP();
    getIPData();
  }, []);

  messages.sort((a: any, b: any) => {
    const timeA = new Date(a.createdTime).getTime();
    const timeB = new Date(b.createdTime).getTime();
    return timeB - timeA;
  }).map((chat:any) => {
    if (chat.username === 'user-admin') {
        chat.username = 'user';
    }
    return chat;
  });

  admincmessages.sort((a: any, b: any) => {
    const timeA = new Date(a.createdTime).getTime();
    const timeB = new Date(b.createdTime).getTime();
    return timeB - timeA;
  }).map((chat:any) => {
    if (chat.username === 'client-admin') {
        chat.username = 'client';
    }
    return chat;
  });

  return (
    <Box sx={{display: "flex", gap: "5px"}}>
      <Box
        sx={{
          minHeight: "calc(100vh - 390px)",
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "50px 24px 80px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          flex: 1
        }}
      >
        {
          username || allowance ?
          (
            <>
              <Box
                sx={{
                  height: "500px",
                  overflow: "auto",
                  display: "flex",
                  flexDirection: "column-reverse"
                }}
              >
                {messages.map((item: any, index: number) =>
                  <Box
                    sx={{ display: "flex", gap: "10px", marginBottom: "15px" }}
                    key={index}
                  >
                    <Avatar
                      sx={{
                        bgcolor:
                          item.username === "client"
                            ? theme.palette.secondary.main
                            : theme.palette.primary.main
                      }}
                    >
                      {item.username === "client" ? "C" : "U"}
                    </Avatar>
                    <Box sx={{ textAlign: "left" }}>
                      <Typography variant="h6" fontWeight={700}>
                        {item.username} &nbsp;
                        <span
                          style={{
                            fontSize: "12px",
                            color: theme.palette.text.secondary,
                            fontWeight: 500
                          }}
                        >
                          {item.createdTime}
                        </span>
                      </Typography>
                      <Typography color="textSecondary">
                        {item.message}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
              <CustomTextField
                variant="outlined"
                placeholder={username ? "Message to @Client" : "Message to @User"}
                fullWidth
                value={msg}
                onChange={(e: any) => handleSendMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                sx={{ marginTop: "10px" }}
              />
            </>
          )
          :
          (
            <Nodata />
          )
        }
      </Box>
      <Box
        sx={{
          minHeight: "calc(100vh - 390px)",
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "50px 24px 80px",
          flexDirection: "column",
          overflow: "hidden",
          flex: 1,
          display: username === "admin" ? "flex" : "none"
        }}
      >
        <Box
          sx={{
            height: "500px",
            overflow: "auto",
            display: "flex",
            flexDirection: "column-reverse"
          }}
        >
          {admincmessages.map((item: any, index: number) =>
            <Box
              sx={{ display: "flex", gap: "10px", marginBottom: "15px" }}
              key={index}
            >
              <Avatar
                sx={{
                  bgcolor:
                    item.username === "client"
                      ? theme.palette.secondary.main
                      : theme.palette.primary.main
                }}
              >
                {item.username === "client" ? "C" : "U"}
              </Avatar>
              <Box sx={{ textAlign: "left" }}>
                <Typography variant="h6" fontWeight={700}>
                  {item.username} &nbsp;
                  <span
                    style={{
                      fontSize: "12px",
                      color: theme.palette.text.secondary,
                      fontWeight: 500
                    }}
                  >
                    {item.createdTime}
                  </span>
                </Typography>
                <Typography color="textSecondary">
                  {item.message}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
        <CustomTextField
          variant="outlined"
          placeholder="Message to @User"
          fullWidth
          value={admincmsg}
          onChange={(e: any) => handleAdminClientSendMessage(e.target.value)}
          onKeyPress={handleKeyPressAdminClient}
          sx={{ marginTop: "10px" }}
        />
      </Box>
    </Box>
  );
};

export default ChatDetail;
