import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { IUser } from "../../types/dto/user";
import moment from "moment";

interface IAccountProfile {
  userDetails: IUser | null
}

const AccountProfile = (props: IAccountProfile) => {
  const { userDetails } = props
  const { firstName, country, city } = userDetails || {}
  const [time, setTime] = useState(new Date().toISOString())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toISOString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const formatTime = moment(time).format('MMMM Do, YYYY h:mm:ss A');

  return (
    <>
      <Card>
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar
              src="/assets/avatars/avatar-anika-visser.png"
              sx={{
                height: 80,
                mb: 2,
                width: 80,
              }}
            />
            <Typography gutterBottom variant="h5">
              {firstName}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {city} {country}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {formatTime}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
      </Card>
    </>
  );
};

export default AccountProfile;
