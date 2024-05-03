import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchBar from "../../components/text/SearchText";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllBlogs } from "../../store/blogs";
import { selectBlogSearch } from "../../store/blogs/selectors";
import Text2 from "../../components/text/Text2";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

const Dashboard = () => {
  const [isPublished, setIsPublished] = useState(false);

  const dispatch = useAppDispatch();
  const searchText = useAppSelector(selectBlogSearch);

  const theme = useTheme();

  const [search, setSearch] = useState(searchText);

  const handleSearchChange = (str: string) => {
    setSearch(str);
  };

  const handleSearchSubmit = (evt: any) => {
    if (evt.key === "Enter") dispatch(getAllBlogs({ search: search, page: 1 }));
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <Box>
      <Box sx={{ background: "linear-gradient(to bottom, #173039, #00b4c9)" }}>
        <Box
          sx={{
            padding: "50px 80px",
            [theme.breakpoints.up("sm")]: { maxWidth: "1400px" },
            width: "calc(100vw - 6px)",
            margin: "auto",
            textAlign: "left"
          }}
        >
          <Typography
            sx={{
              fontSize: "45px",
              lineHeight: "60px",
              color: "#fff",
              fontWeight: 700,
              marginBottom: "20px"
            }}
          >
            Filters
          </Typography>
          <SearchBar
            search={search}
            handleSearch={handleSearchChange}
            handleKeyDown={handleSearchSubmit}
          />
          <Box
            sx={{ display: "flex", alignItems: "center", paddingLeft: "20px" }}
          >
            <Checkbox
              {...label}
              checked={isPublished}
              sx={{ "& .MuiSvgIcon-root": { fill: "#ffffff" } }}
              onClick={(e: any) => setIsPublished(!isPublished)}
            />
            <Typography
              sx={{
                fontSize: "18px",
                lineHeight: "60px",
                color: "#fff",
                fontWeight: 400
              }}
            >
              Show only whitelisted properties's offers
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          minHeight: "calc(100vh - 450px)",
          backgroundColor: "#fff",
          padding: "80px 24px",
          display: "flex",
          gap: "20px"
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#00dbe3",
              borderRadius: "6px",
              width: "352px",
              height: "64px",
              fontSize: "24px",
              lineHeight: "60px",
              textTransform: "uppercase",
              color: "#ffffff",
              fontWeight: 700
            }}
          >
            Sell
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#23a2bb",
              borderRadius: "6px",
              width: "352px",
              height: "64px",
              fontSize: "24px",
              lineHeight: "60px",
              textTransform: "uppercase",
              color: "#ffffff",
              fontWeight: 700
            }}
          >
            Buy
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#173039",
              borderRadius: "6px",
              width: "352px",
              height: "64px",
              fontSize: "24px",
              lineHeight: "60px",
              textTransform: "uppercase",
              color: "#ffffff",
              fontWeight: 700
            }}
          >
            Exchange
          </Button>
        </Box>
        <Box sx={{ overflow: "auto", width: { xs: "300px", sm: "auto" } }}>
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap",
              borderRadius: "8px",
              border: "2px solid #00dbe3",
              "& th, td": {
                borderRadius: "8px"
              }
            }}
          >
            <TableHead sx={{ background: "#f3f3f3" }}>
              <TableRow
                sx={{
                  "& th": {
                    padding: "0px 5px",
                    borderRight: "2px solid #00dbe3"
                  }
                }}
              >
                <TableCell align="center">
                  <Text2>Offer ID</Text2>
                </TableCell>
                <TableCell>
                  <Text2>Offer Token</Text2>
                </TableCell>
                <TableCell>
                  <Text2>Buyer token</Text2>
                </TableCell>
                <TableCell align="center">
                  <Text2>Rate of Return</Text2>
                </TableCell>
                <TableCell align="right">
                  <Text2>offer Yield</Text2>
                </TableCell>
                <TableCell align="center">
                  <Text2>% Difference</Text2>
                </TableCell>
                <TableCell align="center">
                  <Text2>Official price</Text2>
                </TableCell>
                <TableCell align="center">
                  <Text2>Asked Price</Text2>
                </TableCell>
                <TableCell align="center">
                  <Text2>% Difference</Text2>
                </TableCell>
                <TableCell align="center">
                  <Text2>Stock</Text2>
                </TableCell>
                <TableCell align="center">
                  <Text2>Card</Text2>
                </TableCell>
                <TableCell align="center">
                  <Text2>View</Text2>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                hover
                sx={{
                  cursor: "pointer",
                  "& td": {
                    padding: "0px 5px",
                    borderRight: "2px solid #00dbe3"
                  }
                }}
              >
                <TableCell align="center">
                  <Text2>371</Text2>
                </TableCell>
                <TableCell>
                  <Text2>Token 1</Text2>
                </TableCell>
                <TableCell>
                  <Text2>USDC</Text2>
                </TableCell>
                <TableCell align="center">
                  <Text2>10%</Text2>
                </TableCell>
                <TableCell align="center">
                  <Text2>12%</Text2>
                </TableCell>
                <TableCell align="center">
                  <Text2>20%</Text2>
                </TableCell>
                <TableCell align="center">
                  <Text2>$51.35</Text2>
                </TableCell>
                <TableCell align="center">
                  <Text2>$60.00</Text2>
                </TableCell>
                <TableCell align="center">
                  <Text2>$16.85%</Text2>
                </TableCell>
                <TableCell align="center">
                  <Text2>12.28838</Text2>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="delete"
                    onClick={(event: any) => {
                      event.stopPropagation();
                    }}
                  >
                    <ShoppingCartOutlinedIcon
                      sx={{ fontSize: "24px", color: "#00dbe3" }}
                    />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="delete"
                    onClick={(event: any) => {
                      event.stopPropagation();
                    }}
                  >
                    <RemoveRedEyeOutlinedIcon
                      sx={{ fontSize: "24px", color: "#00dbe3" }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow
                hover
                sx={{
                  cursor: "pointer",
                  "& td": {
                    padding: "0px 5px",
                    borderRight: "2px solid #00dbe3"
                  }
                }}
              >
                <TableCell align="center">
                  <Text2>371</Text2>
                </TableCell>
                <TableCell>
                  <Text2>Token 1</Text2>
                </TableCell>
                <TableCell>
                  <Text2>USDC</Text2>
                </TableCell>
                <TableCell align="center">
                  <Text2>10%</Text2>
                </TableCell>
                <TableCell align="center">
                  <Text2>12%</Text2>
                </TableCell>
                <TableCell align="center">
                  <Text2>20%</Text2>
                </TableCell>
                <TableCell align="center">
                  <Text2>$51.35</Text2>
                </TableCell>
                <TableCell align="center">
                  <Text2>$60.00</Text2>
                </TableCell>
                <TableCell align="center">
                  <Text2>$16.85%</Text2>
                </TableCell>
                <TableCell align="center">
                  <Text2>12.28838</Text2>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="delete"
                    onClick={(event: any) => {
                      event.stopPropagation();
                    }}
                  >
                    <ShoppingCartOutlinedIcon
                      sx={{ fontSize: "24px", color: "#00dbe3" }}
                    />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="delete"
                    onClick={(event: any) => {
                      event.stopPropagation();
                    }}
                  >
                    <RemoveRedEyeOutlinedIcon
                      sx={{ fontSize: "24px", color: "#00dbe3" }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
