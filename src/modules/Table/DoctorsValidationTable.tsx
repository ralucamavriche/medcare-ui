import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
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
import * as ReactRouter from "react-router-dom";
import moment from "moment";

interface IDoctorsValidationTable {
  count: number;
  items: Array<object>;
  onPageChange: any;
  onRowsPerPageChange: any;
  page: number;
  rowsPerPage: number;
  onAcceptRequest: (userId: string) => void;
  onDeclineRequest: (userId: string) => void;
}

const DoctorsValidationTable = (props: IDoctorsValidationTable) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    onAcceptRequest,
    onDeclineRequest,
  } = props;

  if (!Array.isArray(items) || !items.length) {
    return (
      <Box
        sx={{
          backgroundColor: "background.paper",
          flexGrow: 1,
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            px: 5,
            py: 14,
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              "& img": {
                maxWidth: "100%",
              },
            }}
          >
            <img src="/assets/errors/error-404.svg" alt="error" />
          </Box>
          <Typography align="center" sx={{ my: 2 }} variant="h3">
            Nothing here!
          </Typography>
          <Typography align="center" color="text.secondary" variant="body2">
            The table is empty!
          </Typography>
        </Container>
      </Box>
    );
  }

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
                <TableCell>Created At</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer: any) => {
                const createdAt = moment(customer.createdAt).format(
                  "MMMM Do, YYYY h:mm:ss A"
                );
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
                    <TableCell>{createdAt}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2}>
                        <Button
                          variant="contained"
                          sx={{ background: "green" }}
                          onClick={() => onAcceptRequest(customer.id)}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="contained"
                          sx={{ background: "red" }}
                          onClick={() => onDeclineRequest(customer.id)}
                        >
                          Decline
                        </Button>
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

export default DoctorsValidationTable;
