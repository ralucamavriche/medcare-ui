import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";

import { Helmet } from "react-helmet";

import { toast } from "react-toastify";
import AccountProfile from "../../modules/Account/AccountProfile";
import { AccountDetails } from "../../modules/Account/AccountDetails";
import { updateUser } from "../../services/user.service";
import useAuth from "../../hooks/useAuth";
import { IUser } from "../../types/dto/user";
import { useState } from "react";

const AccountPage = () => {
  const { user, addUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmitChanges = async (payload: Partial<IUser>) => {
    const { id } = user || {};

    try {
      if (!id) {
        throw new Error("Failed to submit changes. Id not defined");
      }
      setIsLoading(true);
      const user = await updateUser(id, payload);
      toast.success("User Successfully Updated!");
      addUser(user);
    } catch (error) {
      toast.error("Failed to update user!");
    } finally {
      setIsLoading(false);
    }
  };

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
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  <AccountDetails
                    userDetails={user}
                    isLoading={isLoading}
                    onSubmit={handleOnSubmitChanges}
                    isReadonly={false}
                  />
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
