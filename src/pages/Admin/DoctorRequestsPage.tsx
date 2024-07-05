import { Box, Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import { useCallback, useEffect, useMemo, useState } from "react";
import { applyPagination } from "../../utils/pagination";
import { UserService } from "../../services";
import { toast } from "react-toastify";
import DoctorsValidationTable from "../../modules/Table/DoctorsValidationTable";
import { REQUEST_STATUSES } from "../../constants/common.constants";

const DoctorRequestsPage = () => {
  const useCustomers = (page: number, rowsPerPage: any) => {
    return useMemo(
      () => {
        return applyPagination(doctors, page, rowsPerPage);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
        const status = REQUEST_STATUSES.PENDING;
        const doctors = await UserService.getDoctorAccountsBasedOnStatus(
          status
        );
        setDoctors(doctors);
      } catch (error) {
        console.error(
          `Failed to userService.getDoctorAccountsBasedOnStatus: ${
            (error as Error)?.message
          }`
        );
        toast.error(`Something went wrong:  ${(error as Error)?.message}`);
      }
    };

    fetchDoctors();
  }, []);

  const handlePageChange = useCallback((_event: any, value: any) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event: any) => {
    setRowsPerPage(event.target.value);
  }, []);

  const onAcceptRequest = async (userId: string) => {
    try {
      if (!userId) {
        throw new Error("Doctor ID not found!");
      }
  
      await UserService.updateUser(userId, {
        status: REQUEST_STATUSES.ACCEPTED,
      });

        const doctors = await UserService.getDoctorAccountsBasedOnStatus(
          REQUEST_STATUSES.PENDING
        );
        setDoctors(doctors);
      toast.success("Doctor request successfully accepted!");
    } catch (error) {
      console.error(`Failed to accept the request: ${(error as Error)?.message}`);
      toast.error(`Failed to accept the request: ${(error as Error)?.message}`);
    }
  };

  const onDeclineRequest = async (userId: string) => {
    try {
      if (!userId) {
        throw new Error("Doctor ID not found!");
      }
  
      await UserService.updateUser(userId, {
        status: REQUEST_STATUSES.REJECTED,
      });
      toast.success("Doctor request successfully rejected!");
    } catch (error) {
      console.error(`Failed to reject the request: ${(error as Error)?.message}`);
      toast.error(`Failed to reject the request: ${(error as Error)?.message}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>Doctor requests</title>
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
            <DoctorsValidationTable
              count={doctors.length}
              items={customers}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              onAcceptRequest={onAcceptRequest}
              onDeclineRequest={onDeclineRequest}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};
export default DoctorRequestsPage;
