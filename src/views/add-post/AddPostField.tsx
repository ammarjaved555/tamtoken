import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Stack, Checkbox } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CustomTextField from "../../components/text/TextField";
import { dayjsToString } from "../../utils/util";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addBlog, formatBlogStatus } from "../../store/blogs";
import {
  selectErrorBlogs,
  selectStatusBlogs,
  selectUpdateResponseBlogs,
} from "../../store/blogs/selectors";
import { showAlert } from "../../store/alert";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddPostField = () => {
  const [txtCompanyDomain, setTxtCompanyDomain] = useState("");
  const [txtCompanyDomainErr, setTxtCompanyDomainErr] = useState(false);
  const [txtUploadedDate, setTxtUploadedDate] = useState("");
  const [txtUploadedDateErr, setTxtUploadedDateErr] = useState(false);
  const [txtUpdatedDate, setTxtUpdatedDate] = useState("");
  const [txtUpdatedDateErr, setTxtUpdatedDateErr] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [txtDeadlineDate, setTxtDeadlineDate] = useState("");
  const [txtDeadlineDateErr, setTxtDeadlineDateErr] = useState(false);
  const [txtCompanyUrl, setTxtCompanyUrl] = useState("");
  const [txtCompanyUrlErr, setTxtCompanyUrlErr] = useState(false);
  const [fileCompanyLogo, setFileCompanyLogo] = useState<any>();
  const [txtCompanyBriefDesc, setTxtCompanyBriefDesc] = useState("");
  const [txtCompanyBriefDescErr, setTxtCompanyBriefDescErr] = useState(false);
  const [txtCompanyDesc, setTxtCompanyDesc] = useState("");
  const [txtCompanyDescErr, setTxtCompanyDescErr] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const statusAddBlog = useAppSelector(selectStatusBlogs);
  const errorAddBlog = useAppSelector(selectErrorBlogs);
  const updateResponseBlog = useAppSelector(selectUpdateResponseBlogs);

  const handleDateChange = (date: any, type: string) => {
    const strDate = dayjsToString(date);
    if (type === "upload") {
      setTxtUploadedDate(strDate);
    } else if (type === "update") {
      setTxtUpdatedDate(strDate);
    } else if (type === "deadline") {
      setTxtDeadlineDate(strDate);
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file ? file.name : "");
    setFileCompanyLogo(file);
  };

  const handleAddPost = () => {
    let successData = true;
    const formData = new FormData();
    formData.append("txtCompanyDomain", txtCompanyDomain);
    if (!txtCompanyDomain) {
      setTxtCompanyDomainErr(true);
      successData = false;
    }
    formData.append("txtUploadedDate", txtUploadedDate);
    if (!txtUploadedDate) {
      setTxtUploadedDateErr(true);
      successData = false;
    }
    formData.append("txtUpdatedDate", txtUpdatedDate);
    if (!txtUpdatedDate) {
      setTxtUpdatedDateErr(true);
      successData = false;
    }

    if (isPublished) {
      formData.append("isPublished", "on");
      setTxtDeadlineDateErr(false);
    } else {
      if (!txtDeadlineDate) {
        setTxtDeadlineDateErr(true);
        successData = false;
      }
      formData.append("txtDeadlineDate", txtDeadlineDate);
    }

    formData.append("txtCompanyUrl", txtCompanyUrl);
    if (!txtCompanyUrl) {
      setTxtCompanyUrlErr(true);
      successData = false;
    }

    formData.append("fileCompanyLogo", fileCompanyLogo);
    formData.append("txtCompanyBriefDesc", txtCompanyBriefDesc);
    if (!txtCompanyBriefDesc) {
      setTxtCompanyBriefDescErr(true);
      successData = false;
    }
    formData.append("txtCompanyDesc", txtCompanyDesc);
    if (!txtCompanyDesc) {
      setTxtCompanyDescErr(true);
      successData = false;
    }
    if (successData) {
      dispatch(addBlog(formData));
      setTxtCompanyDomainErr(false);
      setTxtUploadedDateErr(false);
      setTxtUpdatedDateErr(false);
      setTxtDeadlineDateErr(false);
      setTxtCompanyUrlErr(false);
      setTxtCompanyBriefDescErr(false);
      setTxtCompanyDescErr(false);
    }
  };

  useEffect(() => {
    if (statusAddBlog && errorAddBlog === "") {
      dispatch(
        showAlert({
          message: "Your post was added successfully.",
          severity: "success",
        })
      );
      navigate("/dashboard");
    } else if (!statusAddBlog && errorAddBlog !== "") {
      dispatch(showAlert({ message: errorAddBlog, severity: "error" }));
    }
  }, [updateResponseBlog]);

  return (
    <>
      <Stack>
      </Stack>
      <Box mt="25px">
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={() => handleAddPost()}
        >
          Add Blog
        </Button>
      </Box>
    </>
  );
};

export default AddPostField;
