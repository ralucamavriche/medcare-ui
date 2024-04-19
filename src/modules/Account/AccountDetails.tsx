import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { UserUpdate } from "../../models/User";

const cities = [
  {
    value: "Bacau",
    label: "Bacau",
  },
  {
    value: "Iasi",
    label: "Iasi",
  },
  {
    value: "Bucuresti",
    label: "Bucuresti",
  },
  {
    value: "Suceava",
    label: "Suceava",
  },
];

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  country: "",
}

export const AccountDetails = (props: any) => {
  const { userDetails, onChange } = props
  
  const [values, setValues] = useState<UserUpdate>(
    INITIAL_STATE
  );

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
  }


  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    onChange(values);
  }

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  value={values.phone}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  onChange={handleChange}
                  required
                  value={values.country}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Select City"
                  name="city"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.city}
                >
                  {cities.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Please specify your address"
                  label="Address"
                  name="address"
                  onChange={handleChange}
                  required
                  value={values.address}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit">Save details</Button>
        </CardActions>
      </Card>
    </form>
  );
};
