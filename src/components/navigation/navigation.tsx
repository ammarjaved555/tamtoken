import React, { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { navigations } from "./navigation.data";
import { Link } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setlogout } from "../../store/auth";
import { selectLoginUser } from "../../store/auth/selectors";
import { getFields } from "../../api";

type NavigationData = {
  path: string;
  label: string;
};

const Navigation: FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const loggedinUser = useAppSelector(selectLoginUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [fields, setFields] = useState<string[]>([]);

  const handleLogout = () => {
    dispatch(setlogout());
    navigate("/");
  };

  const handleGetFileds = async () => {
    if (loggedinUser) {
      const res_fields = await getFields({ username: loggedinUser });
      setFields(res_fields);
    }
  };

  useEffect(
    () => {
      handleGetFileds();
    },
    [loggedinUser]
  );

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
        onClick={() => handleLogout()}
      >
        Connect Wallet
      </Box>
    </Box>
  );
};

export default Navigation;
