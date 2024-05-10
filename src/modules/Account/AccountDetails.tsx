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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { IUser } from "../../types/dto/user";

const CITIES = [
  {
    value: '',
    label: 'Select City'
  },
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

const INITIAL_STATE: IUser = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  country: "",
}

interface IAccountDetails {
  userDetails: IUser | null,
  onSubmit: any,
  isLoading: boolean
}

export const AccountDetails = (props: IAccountDetails) => {
  const { userDetails, onSubmit, isLoading } = props

  const [values, setValues] = useState<IUser>(
    INITIAL_STATE
  );

  const [changedFields, setChangedFields] = useState<Partial<IUser>>({})

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
    setChangedFields((prevState: any) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }


  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    onSubmit(changedFields);
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
                  value={values.country}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="city">City</InputLabel>
                  <Select
                    labelId="city"
                    id="city2"
                    name="city"
                    value={values.city}
                    label="Select City"
                    onChange={handleChange}
                  >
                    {CITIES.map(({ value, label }) => <MenuItem key={value} value={value}>{label}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  onChange={handleChange}
                  value={values.address}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button disabled={isLoading} variant="contained" type="submit">
            {isLoading ? 'Loading...' : 'Save details'}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
