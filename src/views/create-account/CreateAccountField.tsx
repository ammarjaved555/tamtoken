import React, {useState, useEffect} from 'react'
import { Stack, Box, Typography,InputAdornment, IconButton, FormControl, FormLabel, FormControlLabel, Checkbox,  FormGroup, Button } from '@mui/material'
import CustomTextField from '../../components/text/TextField'
import CustomOutlinedInput from '../../components/text/CustomOutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createUser } from '../../store/auth';
import { getKeysWithTrueValues } from '../../utils/util';
import {
  selectErrorAuth,
  selectStatusAuth,
  selectUpdateResponseAuth,
} from "../../store/auth/selectors";
import { showAlert } from "../../store/alert";


const CreateAccountField = () => {
  const [userName, setUserName] = useState("")
  const [userNameErr, setUserNameErr] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordErr, setPasswordErr] = useState(false)
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const dispatch = useAppDispatch()
  const errorAuth = useAppSelector(selectErrorAuth);
  const updateResponse = useAppSelector(selectUpdateResponseAuth);
  const statusAuth = useAppSelector(selectStatusAuth);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const [state, setState] = React.useState({
    addBlog: false,
    myTickets: false,
    uploadData: false,
    uploadVideo: false,
    createNews: false,
    chatAdmin: false,
    chatClients: false,
    createChatClient: false,
  });

  const [allFields, setAllFields] = useState(false)
  const handleChangeAllFields = () => {
    if(allFields) {
      setState({
        addBlog: false,
        myTickets: false,
        uploadData: false,
        uploadVideo: false,
        createNews: false,
        chatAdmin: false,
        chatClients: false,
        createChatClient: false,
      })
    } else {
      setState({
        addBlog: true,
        myTickets: true,
        uploadData: true,
        uploadVideo: true,
        createNews: true,
        chatAdmin: true,
        chatClients: true,
        createChatClient: true,
      })
    }
    setAllFields(!allFields)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const handleCreateAccount = () => {
    let successData = true;
    if(!userName) {
      setUserNameErr(true);
      successData = false;
    }
    if(!password) {
      setPasswordErr(true);
      successData = false
    }
    if(successData) {
      const trueFields = getKeysWithTrueValues(state)
      dispatch(createUser({userName, password, fields: trueFields}))
    }
  }

  useEffect(() => {
    if(statusAuth && errorAuth === "") {
      dispatch(showAlert({ message: "Created new user successfully", severity: "success" }));
    }
    if (!statusAuth && errorAuth !== "") {
      dispatch(showAlert({ message: errorAuth, severity: "error" }));
    }
  }, [updateResponse]);

  const { addBlog, myTickets, uploadData, uploadVideo, createNews, chatAdmin, chatClients, createChatClient } = state;

  return (
    <>
      <Stack>
        <Box sx={{ textAlign: "left", display: "flex" }} mt={2} gap={5}>
          <Box sx={{
            textAlign: "left",
            flex: 1
          }}> 
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="username"
                mb="5px"
              >
                User Name:
                <span style={{ color: "#B94A48" }}>*</span>
              </Typography>
              <CustomTextField
                id="username"
                variant="outlined"
                fullWidth
                value={userName}
                onChange={(e: any) => setUserName(e.target.value)}
              />
              <Typography
                variant="subtitle1"
                component="label"
                htmlFor="username"
                color="error"
                display={userNameErr ? "block" : "none"}
              >
                Please add User Name
              </Typography>
            </Box>
            <Box mt={5}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="password"
                mb="5px"
              >
                Password:
                <span style={{ color: "#B94A48" }}>*</span>
              </Typography>
              <CustomOutlinedInput
                id="password"
                fullWidth
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
              <Typography
                variant="subtitle1"
                component="label"
                htmlFor="password"
                color="error"
                display={passwordErr ? "block" : "none"}
              >
                Please add Password
              </Typography>
            </Box>
          </Box>
          <Box sx={{
            textAlign: "left",
            flex: 1
          }}> 
            <Box sx={{textAlign: "left"}}> 
              <FormControl component="fieldset" variant="standard">
                <FormLabel component="legend">Accessable Fields</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox checked={addBlog} onChange={handleChange} name="addBlog" />
                    }
                    label="Add Blog"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={myTickets} onChange={handleChange} name="myTickets" />
                    }
                    label="My tickets"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={uploadData} onChange={handleChange} name="uploadData" />
                    }
                    label="Upload data"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={uploadVideo} onChange={handleChange} name="uploadVideo" />
                    }
                    label="Upload video"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={createNews} onChange={handleChange} name="createNews" />
                    }
                    label="Create news"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={chatAdmin} onChange={handleChange} name="chatAdmin" />
                    }
                    label="Chat with Admin"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={chatClients} onChange={handleChange} name="chatClients" />
                    }
                    label="Chat with clients"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={createChatClient} onChange={handleChange} name="createChatClient" />
                    }
                    label="Create chat with client"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={allFields} onChange={()=>handleChangeAllFields()} name="all" />
                    }
                    label="All"
                  />
                </FormGroup>
              </FormControl>
            </Box>
          </Box>
        </Box>
      </Stack>
      <Box mt="25px">
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={handleCreateAccount}
        >
          Create Account
        </Button>
      </Box>
    </>
  )
}

export default CreateAccountField;