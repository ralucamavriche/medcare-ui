import { Box, Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import DoctorPatients from "../../modules/Doctor/DoctorPatients";

const MyPatientsPage = () => {
  return (
    <>
      <Helmet>
        <title>My Patients</title>
      </Helmet>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">My Patients</Typography>
              </Stack>
            </Stack>
            <DoctorPatients />
          </Stack>
        </Container>
      </Box>
    </>
  );
};
export default MyPatientsPage;
