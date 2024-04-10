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
import { getUsers, getUserById } from "../../services/user.service";

const AccountPage = () => {
  // const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setUser(users);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchUserById = async () => {
      try {
        const user = await getUserById("65df2d289a8b913dd6489891");
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
    fetchUserById();
  }, []);

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
                  <AccountProfile />
                  {JSON.stringify(user)}
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  <AccountDetails />
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
