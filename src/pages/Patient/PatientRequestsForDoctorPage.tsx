import { Box, Container, Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { applyPagination } from '../../utils/pagination';
import { userService } from '../../services';
import { toast } from 'react-toastify';
import PatientTable from '../../modules/Patient/PatientTable';


const PatientRequestsForDoctorPage = () => {

  const useCustomers = (page: number, rowsPerPage: any) => {
    return useMemo(
      () => {
        return applyPagination(patients, page, rowsPerPage);
      },
      [page, rowsPerPage, patients]
    );
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [patients, setPatients] = useState([]);
  const customers = useCustomers(page, rowsPerPage);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patients = await userService.getPatientWithSentRequest();
        setPatients(patients);
      } catch (error) {
        console.error(`Failed to userService.getPatientWithSentRequest: ${(error as Error)?.message}`);
        toast.error(`Something went wrong:  ${(error as Error)?.message}`);
      }
    };

    fetchPatients();
  }, []);

  const handlePageChange = useCallback(
    (_event: any, value: any) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event: any) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
    <>
      <Helmet>
        <title>Patient Requests</title>
      </Helmet>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                 Patient requests
                </Typography>

              </Stack>
            </Stack>
            <PatientTable
              count={patients.length}
              items={customers}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};
export default PatientRequestsForDoctorPage;