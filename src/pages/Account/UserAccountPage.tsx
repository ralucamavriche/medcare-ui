import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Helmet } from "react-helmet";
import AccountProfile from "../../modules/Account/AccountProfile";
import { useEffect, useState } from "react";
import { IUser } from "../../types/dto/user";
import Spinner from "../../components/Spinner/Spinner";
import { useSearchParams } from "react-router-dom";
import { UserService } from "../../services";
import { toast } from "react-toastify";
import { UserAccountDetails } from "../../modules/Account/UserAccountDetails";

const UserAccountPage = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const userId = searchParams.get("id");

  useEffect(() => {
    const fetchUser = async (userId: string) => {
      try {
        if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error("User id must me a valid ID!");
        }

        setIsLoading(true);
        const user = await UserService.getUserById(userId);
        setUser(user);
      } catch (error) {
        console.error(
          `Failed to get user account details${(error as Error)?.message}`
        );
        toast.error(`${(error as Error)?.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    userId && fetchUser(userId);
  }, [userId]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>User Account</title>
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
              <Typography variant="h4">User Account</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={4}>
                  {user && <AccountProfile userDetails={user} />}
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  <UserAccountDetails
                    userDetails={user}
                    isLoading={isLoading}
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

export default UserAccountPage;
