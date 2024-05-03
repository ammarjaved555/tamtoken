import React from 'react'
import { Box } from '@mui/material'
import Title from '../../components/text/Title'
import CreateAccountField from './CreateAccountField'

const CreateAccount = () => {
  return (
    <Box>
      <Title title="Create Account"></Title>
     <Box
        sx={{
          minHeight: "calc(100vh - 450px)",
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "50px 24px 80px",
        }}
      >
        <CreateAccountField />
      </Box>
    </Box>
  )
}

export default CreateAccount