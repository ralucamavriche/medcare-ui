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
import { updateUser } from "../../services/user.service";
import useAuth from "../../hooks/useAuth";
import { User } from "../../models/User";

const AccountPage = () => {
  const { user, addUser } = useAuth()

  const handleOnSubmitChanges = async (payload: Partial<User>) => {
    const { id } = user || {}

    try {
      if(!id) {
        throw new Error('Failed to submit changes. Id not defined')
      }
      
      const user = await updateUser(id, payload);
      addUser(user);
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
                  <AccountProfile userDetails={user} />
                  {JSON.stringify(user)}
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  <AccountDetails userDetails={user} onSubmit={handleOnSubmitChanges} />
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
