import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Stack, Checkbox } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CustomTextField from "../../components/text/TextField";
import { dayjsToString, formatDate, isImageData } from "../../utils/util";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { editBlog, formatBlogStatus, getBlogByID } from "../../store/blogs";
import {
  selectBlogDetail,
  selectErrorBlogs,
  selectStatusBlogs,
  selectUpdateResponseBlogs,
} from "../../store/blogs/selectors";
import { useParams } from "react-router-dom";
import { showAlert } from "../../store/alert";
import { BASE_URL } from "../../config/config"

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

const EditPostField = () => {
  const [txtCompanyDomain, setTxtCompanyDomain] = useState("");
  const [txtCompanyDomainErr, setTxtCompanyDomainErr] = useState(false);
  const [txtUploadedDate, setTxtUploadedDate] = useState<any>(null);
  const [txtUploadedDateErr, setTxtUploadedDateErr] = useState(false);
  const [txtUpdatedDate, setTxtUpdatedDate] = useState<any>(null);
  const [txtUpdatedDateErr, setTxtUpdatedDateErr] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [txtDeadlineDate, setTxtDeadlineDate] = useState<any>(null);
  const [txtDeadlineDateErr, setTxtDeadlineDateErr] = useState(false);
  const [txtCompanyUrl, setTxtCompanyUrl] = useState("");
  const [txtCompanyUrlErr, setTxtCompanyUrlErr] = useState(false);
  const [fileCompanyLogo, setFileCompanyLogo] = useState<any>();
  const [txtCompanyBriefDesc, setTxtCompanyBriefDesc] = useState("");
  const [txtCompanyBriefDescErr, setTxtCompanyBriefDescErr] = useState(false);
  const [txtCompanyDesc, setTxtCompanyDesc] = useState("");
  const [txtCompanyDescErr, setTxtCompanyDescErr] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSrc, setPreviewSrc] = useState(null);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const statusAddBlog = useAppSelector(selectStatusBlogs);
  const errorEditBlog = useAppSelector(selectErrorBlogs);
  const updateResponseBlog = useAppSelector(selectUpdateResponseBlogs);
  const blogDetail = useAppSelector(selectBlogDetail)

  const { blogId } = useParams();

  const handleDateChange = (date: any, type: string) => {
    // const strDate = dayjsToString(date);
    if (type === "upload") {
      setTxtUploadedDate(date);
    } else if (type === "update") {
      setTxtUpdatedDate(date);
    } else if (type === "deadline") {
      setTxtDeadlineDate(date);
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file ? file.name : "");
    setFileCompanyLogo(file);

    if (file) {
      const reader:any = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader?.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewSrc(null);
    }
  };

  const handleEditPost = () => {
    let successData = true;
    const formData = new FormData();
    formData.append("txtCompanyDomain", txtCompanyDomain);
    if (!txtCompanyDomain) {
      setTxtCompanyDomainErr(true);
      successData = false;
    }
    formData.append("txtUploadedDate", dayjsToString(txtUploadedDate));
    if (!txtUploadedDate) {
      setTxtUploadedDateErr(true);
      successData = false;
    }
    formData.append("txtUpdatedDate", dayjsToString(txtUpdatedDate));
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
      formData.append("txtDeadlineDate", dayjsToString(txtDeadlineDate));
    }

    formData.append("txtCompanyUrl", txtCompanyUrl);
    if (!txtCompanyUrl) {
      setTxtCompanyUrlErr(true);
      successData = false;
    }
    if(fileCompanyLogo === undefined) {
      formData.append("fileCompanyLogo", blogDetail.company_logo);
    } else {
      formData.append("fileCompanyLogo", fileCompanyLogo);
    }
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
      dispatch(editBlog({blogId, formData}));
      // setTxtCompanyDomainErr(false);
      // setTxtUploadedDateErr(false);
      // setTxtUpdatedDateErr(false);
      // setTxtDeadlineDateErr(false);
      // setTxtCompanyUrlErr(false);
      // setTxtCompanyBriefDescErr(false);
      // setTxtCompanyDescErr(false);
    }
  };

  useEffect(()=>{
    if(Object.keys(blogDetail).length === 0) {
      // navigate("/auth/404");
    } else {
      setTxtCompanyDomain(blogDetail.company_name);
      setTxtUploadedDate(formatDate(blogDetail.uploaded_date));
      setTxtUpdatedDate(formatDate(blogDetail.updated_date));
      setIsPublished(!!blogDetail.is_published);
      setTxtDeadlineDate(formatDate(blogDetail.deadline));
      setTxtCompanyUrl(blogDetail.download_link);
      setPreviewSrc(blogDetail.company_logo);
      setTxtCompanyBriefDesc(blogDetail.brief_description);
      setTxtCompanyDesc(blogDetail.description);
    }
  },[blogDetail])

  useEffect(() => {
    if (statusAddBlog && errorEditBlog === "") {
      dispatch(
        showAlert({
          message: "Your post was updated successfully.",
          severity: "success",
        })
      );
      navigate("/dashboard");
    } else if (!statusAddBlog && errorEditBlog !== "") {
      dispatch(showAlert({ message: errorEditBlog, severity: "error" }));
    }
  }, [updateResponseBlog]);

  useEffect(()=>{
    dispatch(getBlogByID({blogId}))
  },[])

  console.log({fileCompanyLogo})
  return (
    <>
      <Stack>
      </Stack>
      <Box mt="25px">
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={() => handleEditPost()}
        >
          Edit Blog
        </Button>
      </Box>
    </>
  );
};

export default EditPostField;
