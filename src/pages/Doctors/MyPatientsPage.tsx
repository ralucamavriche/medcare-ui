import { Box, Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import { useCallback, useEffect, useMemo, useState } from "react";
import { applyPagination } from "../../utils/pagination";
import { UserService } from "../../services";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import PatientTable from "../../modules/Table/PatientTable";

const MyPatientsPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [patients, setPatients] = useState([]);
  const { user } = useAuth();
  const userId = user?.id;
  
  const customers = useMemo(
    () => applyPagination(patients, page, rowsPerPage),
    [page, rowsPerPage, patients]
  );

  useEffect(() => {
    const fetchPatientsList = async (doctorId: string) => {
      try {
        const patients = await UserService.getPatientsByDoctorId(doctorId);
        setPatients(patients);
      } catch (error) {
        console.error(
          `Failed to UserService.getPatientsByDoctorId: ${
            (error as Error)?.message
          }`
        );
        toast.error(`Something went wrong:  ${(error as Error)?.message}`);
      }
    };

    userId && fetchPatientsList(userId);
  }, []);

  const handlePageChange = useCallback((_event: any, value: any) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event: any) => {
    setRowsPerPage(event.target.value);
  }, []);

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
                <Typography variant="h4">Doctor requests</Typography>
              </Stack>
            </Stack>
            <PatientTable
              count={patients.length}
              items={customers}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};
export default MyPatientsPage;
