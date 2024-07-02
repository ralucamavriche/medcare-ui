import {
  Box,
  Button,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import * as ReactRouter from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import { AuthService } from "../../../services";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCallback, useState } from "react";
import { ROLES } from "../../../permissions";

const RegisterPage = () => {
  const { addUser } = useAuth();
  const navigate = useNavigate();
  const [method, setMethod] = useState("user");

  const formik = useFormik({
    initialValues: {
      email: "doctor@yahoo.com",
      firstName: "doctor",
      lastName: "doctor",
      password: "Password23.23",
      medicalLicenseNumber: "",
      isDoctor: false,
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      firstName: Yup.string().max(255).required("First Name is required"),
      lastName: Yup.string().max(255).required("Last Name is required"),
      password: Yup.string().max(255).required("Password is required"),
      medicalLicenseNumber: Yup.string()
        .optional()
        .when("isDoctor", {
          is: true,
          then(schema) {
            return schema.required("Must entermedicalLicenseNumber");
          },
        }),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const { firstName, lastName, email, password, medicalLicenseNumber } =
          values;
        const role = medicalLicenseNumber ? ROLES.DOCTOR : ROLES.PATIENT;

        const user = await AuthService.register(
          firstName,
          lastName,
          email,
          password,
          medicalLicenseNumber,
          role
        );
        if (!user) {
          throw new Error(
            "Failed to register. The data are incorrect. Password must be at least 8 characters!"
          );
        }
        addUser(user);
        navigate("/dashboard");
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        } else {
          toast.error("An unknown error occurred.");
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: "An unknown error occurred." });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  const handleMethodChange = useCallback(
    (_event: any, value: any) => {
      setMethod(value);
      formik.setFieldValue("isDoctor", value === "doctor");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <Box
        sx={{
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            height: "600px",
            px: 3,
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Register</Typography>
              <Typography color="text.secondary" variant="body2">
                Already have an account? &nbsp;
                <Link
                  component={ReactRouter.Link}
                  to="/auth/login"
                  underline="hover"
                  variant="subtitle2"
                >
                  Log in
                </Link>
              </Typography>
            </Stack>
            <Tabs onChange={handleMethodChange} sx={{ mb: 3 }} value={method}>
              <Tab label="User" value="user" />
              <Tab label="Doctor" value="doctor" />
            </Tabs>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                {method === "doctor" && (
                  <TextField
                    error={
                      !!(
                        formik.touched.medicalLicenseNumber &&
                        formik.errors.medicalLicenseNumber
                      )
                    }
                    fullWidth
                    helperText={
                      formik.touched.medicalLicenseNumber &&
                      formik.errors.medicalLicenseNumber
                    }
                    label="Medical License Number"
                    name="medicalLicenseNumber"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.medicalLicenseNumber}
                  />
                )}

                <TextField
                  error={
                    !!(formik.touched.firstName && formik.errors.firstName)
                  }
                  fullWidth
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                  label="First Name"
                  name="firstName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                />
                <TextField
                  error={!!(formik.touched.lastName && formik.errors.lastName)}
                  fullWidth
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  label="Last Name"
                  name="lastName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                />
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
              </Stack>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Continue
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default RegisterPage;
