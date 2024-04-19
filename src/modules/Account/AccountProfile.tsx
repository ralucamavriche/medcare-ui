import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { UserUpdate } from "../../models/User";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  country: "",
}


const calculateTimeZone: any = () => {
  const currentTime = new Date();
  const timezoneOffset = currentTime.getTimezoneOffset();

  // Convert timezone offset to hours and minutes
  const hoursOffset = Math.abs(Math.floor(timezoneOffset / 60));
  const minutesOffset = Math.abs(timezoneOffset % 60);
  const sign = timezoneOffset >= 0 ? '-' : '+';

  const formattedTimezone = `UTC ${sign}${hoursOffset}:${minutesOffset}`;
  return formattedTimezone;
};

const AccountProfile = (props: any) => {
  const { userDetails, onChange } = props

  const [values, setValues] = useState<UserUpdate>(INITIAL_STATE);

  useEffect(() => {
    setValues({
      ...values,
      ...userDetails
    })
  }, [userDetails])

  const handleChange = (event: any) => {
    setValues((prevState: any) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
    onChange(values);
  }

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
            <Typography gutterBottom variant="h5" onChange={handleChange}>
              {values.firstName}
            </Typography>
            <Typography color="text.secondary" variant="body2" onChange={handleChange}>
              {values.city} {values.country}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {
                calculateTimeZone()
              }
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button fullWidth variant="text">
            {/* Upload picture */}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default AccountProfile;
