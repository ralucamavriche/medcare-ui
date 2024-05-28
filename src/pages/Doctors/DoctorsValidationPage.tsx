import { Box, Container, Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { applyPagination } from '../../utils/pagination';
import { userService } from '../../services';
import { toast } from 'react-toastify';
import DoctorsValidationTable from '../../modules/Doctor/DoctorsValidationTable';


const DoctorValidationPage = () => {

  const useCustomers = (page: number, rowsPerPage: any) => {
    return useMemo(
      () => {
        return applyPagination(doctors, page, rowsPerPage);
      },
      [page, rowsPerPage, doctors]
    );
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [doctors, setDoctors] = useState([]);
  const customers = useCustomers(page, rowsPerPage);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const status = 'PENDING';
        const doctors = await userService.getDoctorAccountsWithSpecificStatus(status);
        setDoctors(doctors);
      } catch (error) {
        console.error(`Failed to userService.getDoctorAccountsWithSpecificStatus: ${(error as Error)?.message}`);
        toast.error(`Something went wrong:  ${(error as Error)?.message}`);
      }
    };

    fetchDoctors();
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
        <title>Doctor Requests</title>
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
                 Doctor requests
                </Typography>

              </Stack>
            </Stack>
            <DoctorsValidationTable
              count={doctors.length}
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
export default DoctorValidationPage;