import {
  Avatar,
  Box,
  Button,
  Card,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { UserService } from "../../services";
import { toast } from "react-toastify";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { REQUEST_STATUSES } from "../../constants/common.constants";
import * as ReactRouter from "react-router-dom";


interface IDoctorsAssignmentTable {
  count: number;
  items: Array<object>;
  onPageChange: any;
  onRowsPerPageChange: any;
  page: number;
  rowsPerPage: number;
}

const DoctorsAssignmentTable = (props: IDoctorsAssignmentTable) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  const [isDisable, setIsDisabled] = useState(false);
  const { user, addUser } = useAuth();

  const handleOnRequest = async (doctorId: string) => {
    try {
      if (!user?.id || !doctorId) {
        return;
      }

      const userData = await UserService.updateUser(user?.id, {
        requestedDoctorStatus: REQUEST_STATUSES.SENT,
        doctorId,
      });

      addUser(userData);
      toast.success("Request successfully sent!");
      setIsDisabled(true);
    } catch (error) {
      console.error(
        `Failed to sent the request to the doctor: ${(error as Error)?.message}`
      );
      toast.error(
        `Failed to sent the request to the doctor: ${(error as Error)?.message}`
      );
    }
  };
  const isSent = user?.requestedDoctorStatus === REQUEST_STATUSES.SENT;

  return (
    <>
      <Card>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Medical License Number</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone number</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Request</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer: any) => {
                return (
                  <TableRow hover key={customer.id}>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                      <Link
                          component={ReactRouter.Link}
                          to={`/dashboard/user-account?id=${customer.id}`}
                          target="_blank"
                        >
                          <Avatar src="/assets/avatars/avatar-doctor.jpg">
                            {customer.firstName}
                          </Avatar>
                        </Link>
                        <Typography variant="subtitle2">
                          {customer.firstName}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{customer.lastName}</TableCell>
                    <TableCell>{customer.medicalLicenseNumber}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>
                      {customer.city}, {customer.address}
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2}>
                        {customer.id === user?.doctorId ? (
                          "Requested"
                        ) : (
                          <Button
                            variant="contained"
                            onClick={() => handleOnRequest(customer.id)}
                            disabled={isDisable || isSent || user?.role === "ADMIN" || user?.requestedDoctorStatus === "ACCEPTED"}
                          >
                            Send request
                          </Button>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
        <TablePagination
          component="div"
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </>
  );
};

export default DoctorsAssignmentTable;
