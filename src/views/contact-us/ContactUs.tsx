import React from "react";
import Title from "../../components/text/Title";
import { Grid, Box, Card, Stack, Typography } from "@mui/material";
import ContactUsField from "./ContactUsField";

const ContactUS = () => {
  return (
    <Box sx={{ paddingBottom: "80px" }}>
      <Title title="Contact Us"></Title>
      <Box>
        <Grid container spacing={0} justifyContent="center">
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "800px" }}
            >
              <ContactUsField />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ContactUS;
