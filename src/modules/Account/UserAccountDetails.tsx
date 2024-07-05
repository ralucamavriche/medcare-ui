import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { IUser } from "../../types/dto/user";
import Spinner from "../../components/Spinner/Spinner";

const INITIAL_STATE: IUser = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  country: "",
  medicalLicenseNumber: "",
};

interface IUserAccountDetails {
  userDetails?: IUser | null;
  isLoading: boolean;
}

export const UserAccountDetails = (props: IUserAccountDetails) => {
  const { userDetails, isLoading } = props;

  const [values, setValues] = useState<IUser>(INITIAL_STATE);

  useEffect(() => {
    setValues({
      ...values,
      ...userDetails,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails]);
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <form autoComplete="off">
      <Card>
        <CardHeader
          subheader="The information about user account"
          title="Profile"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="First name"
                  name="firstName"
                  value={values.firstName}
                  disabled
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  value={values.lastName}
                  disabled
                />
              </Grid>
              {userDetails?.role === "DOCTOR" ? (
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Medical License Number"
                    name="medicalLicenseNumber"
                    disabled
                    value={values.medicalLicenseNumber}
                  />
                </Grid>
              ) : (
                ""
              )}
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  disabled
                  value={values.email}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  disabled
                  value={values.phone}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  disabled
                  value={values.country}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  disabled
                  value={values.city}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  disabled
                  value={values.address}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
      </Card>
    </form>
  );
};
