import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";

interface IPatientTable {
  count: number;
  items: Record<string, any>[],
  onPageChange: any;
  onRowsPerPageChange: any;
  page: number;
  rowsPerPage: number;
  onAcceptRequest: (patientId: string) =>  void,
  onDeclineRequest: (patientId: string) =>  void
}

const PatientTable = (props: IPatientTable) => {
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

  if(!Array.isArray(items) || !items.length) {
    return  <Box
    sx={{
      backgroundColor: 'background.paper',
      flexGrow: 1
    }}
  >
    <Container
      maxWidth="md"
      sx={{
        px: 5,
        py: 14,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{
          '& img': {
            maxWidth: '100%'
          }
        }}
      >
        <img src="/assets/errors/error-404.svg" alt="error" />
      </Box>
      <Typography
        align="center"
        sx={{ my: 2 }}
        variant="h3"
      >
        Nothing here!
      </Typography>
      <Typography
        align="center"
        color="text.secondary"
        variant="body2"
      >
        The table is empty!
      </Typography>
    </Container>
  </Box>
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
                <TableCell>Email</TableCell>
                <TableCell>Phone number</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer: any) => {
                const createdAt = moment(customer.createdAt).format('MMMM Do, YYYY h:mm:ss A');
                return (
                  <TableRow hover key={customer.id}>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src="/assets/avatars/avatar-anika-visser.png">
                          {customer.firstName}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {customer.firstName}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{customer.lastName}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
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

export default PatientTable;
