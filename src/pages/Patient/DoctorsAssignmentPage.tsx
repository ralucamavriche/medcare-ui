import { Box, Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import DoctorsAssignment from "../../modules/Patient/DoctorsAssignment";

const DoctorsAssignmentPage = () => {
  return (
    <>
      <Helmet>
        <title>Available Doctors</title>
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
                <Typography variant="h4">Available doctors list</Typography>
              </Stack>
            </Stack>
            <DoctorsAssignment />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default DoctorsAssignmentPage;
