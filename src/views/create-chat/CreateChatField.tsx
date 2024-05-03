import React, {useState, useEffect} from 'react'
import { Stack, Box, Button, InputLabel, MenuItem, FormControl, Typography } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select';
import CustomUserSelect from '../../components/select/CustomUserSelect';
import CustomTextField from '../../components/text/TextField';
import { getAllUsers, createChatWithClients } from '../../api';
import { useAppDispatch } from '../../store/hooks';
import { showAlert } from '../../store/alert';

const CreateChatField = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedUserErr, setSelectedUserErr] = useState(false);
  const [userLists, setUserLists] = useState<any>([]);
  const [clientaddress, setClientaddress] = useState("");
  const [clientaddressErr, setClientaddressErr] = useState(false);

  const dispatch = useAppDispatch()

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedUser(event.target.value as string);
  };

  const getUserLists = async() => {
    const users = await getAllUsers()
    setUserLists(users)
  }

  const createChat = async () => {
    let successData = true;
    if(selectedUser === "") {
      setSelectedUserErr(true);
      successData = false;
    }
    if(!clientaddress) {
      setClientaddressErr(true);
      successData = false;
    }
    if(successData) {
      const res:any = await createChatWithClients({username: selectedUser, clientaddress})
      if(res.success) {
        setSelectedUserErr(false);
        setClientaddressErr(false);
        dispatch(showAlert(({ message: "Created Chat successfully", severity: "success" })))
      } else {
        setSelectedUserErr(false);
        setClientaddressErr(false);
        dispatch(showAlert(({ message: res.error, severity: "error" })))
      }
    }
  }

  useEffect(()=>{
    getUserLists()
  },[])

  return (
    <>
      <Stack>
        <Box sx={{ textAlign: "left", display: "flex" }} mt={2} gap={5}>
          <Box sx={{textAlign: "left", flex: 1}}>
            <FormControl fullWidth>
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
              <CustomUserSelect
                value={selectedUser}
                displayEmpty
                variant='outlined'
                onChange={handleChange}
              >
                <MenuItem value="">
                  None
                </MenuItem>
                {
                  userLists.map((item:any, index:number)=>(
                    <MenuItem value={item} key={index}>{item}</MenuItem>
                  ))
                }
              </CustomUserSelect>
              <Typography
                variant="subtitle1"
                component="label"
                htmlFor="selectedUser"
                color="error"
                display={selectedUserErr ? "block" : "none"}
              >
                Please add User Name
              </Typography>
            </FormControl>
          </Box>
          <Box sx={{textAlign: "left", flex: 1}}>
            <FormControl fullWidth>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="clientaddress"
                mb="5px"
              >
                Client IP Address:
                <span style={{ color: "#B94A48" }}>*</span>
              </Typography>
              <CustomTextField
                id="userip"
                variant="outlined"
                fullWidth
                value={clientaddress}
                onChange={(e: any) => setClientaddress(e.target.value)}
              />
              <Typography
                variant="subtitle1"
                component="label"
                htmlFor="clientaddress"
                color="error"
                display={clientaddressErr ? "block" : "none"}
              >
                Please add Client IP address
              </Typography>
            </FormControl>
          </Box>
        </Box>
      </Stack>
      <Box mt="25px">
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={()=>createChat()}
        >
          Create Chat with Clients
        </Button>
      </Box>
    </>
  )
}

export default CreateChatField;