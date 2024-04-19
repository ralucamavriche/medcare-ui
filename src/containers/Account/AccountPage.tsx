import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";

import { Helmet } from "react-helmet";

import AccountProfile from "../../modules/Account/AccountProfile";
import { AccountDetails } from "../../modules/Account/AccountDetails";
import { getUserById, updateUser } from "../../services/user.service";

const AccountPage = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const user = await getUserById("6622860fb86904e3655abcf2");
        setUser(user);
      } catch (error: any) {
        alert(error?.message)
        console.log(error)
      }
    };

    fetchUserById();
  }, []);

  const handleOnUserDetailsChange = async (newUserDetails: any) => {
    const { id, firstName, lastName, email, phone, address, city, country } = newUserDetails;

    try {
      const user = await updateUser(id, { firstName, lastName, email, phone, address, city, country });
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Helmet>
        <title>Account</title>
      </Helmet>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">Account</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={4}>
                  <AccountProfile userDetails={user} onChange={handleOnUserDetailsChange} />
                  {JSON.stringify(user)}
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  <AccountDetails userDetails={user} onChange={handleOnUserDetailsChange} />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default AccountPage;
