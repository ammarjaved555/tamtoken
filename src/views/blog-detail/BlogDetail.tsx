import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { CloudDownload } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getBlog } from "../../store/blogs";
import { selectBlogDetail } from "../../store/blogs/selectors";
import { padZero, isImageData } from "../../utils/util";
import { BASE_URL } from "../../config/config";

const BlogDetail = () => {
  const { blogId } = useParams();
  const dispatch = useAppDispatch();
  const blogdetail = useAppSelector(selectBlogDetail);

  const [timer, setTimer] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  function startCountdown(distance: any) {
    const interval = setInterval(() => {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance <= 0) {
        clearInterval(interval);
      }

      setTimer({ days, hours, minutes, seconds });

      distance -= 1000;
    }, 1000);
  }

  const handleDownload = () => {
    window.open(blogdetail?.download_link, "_blank");
  };

  useEffect(() => {
    dispatch(getBlog({ id: blogId }));
  }, []);

  useEffect(() => {
    if (blogdetail?.distance !== undefined) {
      startCountdown(blogdetail?.distance);
    }
  }, [blogdetail]);

  return (
    <Box>
      <Box
        sx={{
          minHeight: "calc(100vh - 450px)",
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "50px 24px 80px",
        }}
      >
        {blogdetail?.is_published ? (
          <Typography
            component="h2"
            variant="h2"
            sx={{
              maxWidth: "300px",
              margin: "0px auto 30px",
              color: "white",
              background: "#127c71",
              padding: "10px",
              borderRadius: "10px",
              boxShadow: 3,
            }}
          >
            Published
          </Typography>
        ) : (
          <Typography
            component="h2"
            variant="h2"
            sx={{
              maxWidth: "300px",
              margin: "0px auto 30px",
              color: "white",
              background: "#d32f2f",
              padding: "10px",
              borderRadius: "10px",
              boxShadow: 3,
            }}
          >
            {padZero(timer.days)}d {padZero(timer.hours)}h{" "}
            {padZero(timer.minutes)}m {padZero(timer.seconds)}s
          </Typography>
        )}
        <Box sx={{ display: "flex", gap: "20px" }}>
          <img
            src={
              isImageData(blogdetail?.company_logo)
                ? `${blogdetail?.company_logo}`
                : `${BASE_URL}${blogdetail?.company_logo}`
            }
            alt="company"
            style={{ maxWidth: "200px", height: "fit-content" }}
          ></img>
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography component="h2" variant="h1" sx={{ mb: 2 }} align="left">
              {blogdetail?.company_name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="left"
              sx={{ minHeight: "150px" }}
            >
              {blogdetail?.description}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              {blogdetail?.is_published ? (
                <>
                  <Typography
                    color="textSecondary"
                    sx={{
                      fontSize: "13px",
                    }}
                  >
                    {"Uploaded at: "}
                    {blogdetail?.uploaded_date}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    sx={{
                      fontSize: "13px",
                    }}
                  >
                    {"Updated at: "}
                    {blogdetail?.updated_date}
                  </Typography>
                </>
              ) : (
                <Typography
                  color="textSecondary"
                  sx={{
                    fontSize: "13px",
                  }}
                >
                  {"Deadline: "}
                  {blogdetail?.deadline}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
        <Box mt={7}>
          {!blogdetail?.is_published && (
            <Typography
              color="error"
              sx={{
                fontSize: "13px",
              }}
            >
              {"Until the files will be available left: "}
              {blogdetail?.deadline}
            </Typography>
          )}
          <Button
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudDownload />}
            disabled={blogdetail?.is_published ? false : true}
            onClick={handleDownload}
          >
            Download file
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BlogDetail;
