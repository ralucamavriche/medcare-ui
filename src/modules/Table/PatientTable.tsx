import { Avatar, Box, Button, Card, Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { UserService } from "../../services";
import { toast } from "react-toastify";

interface IPatientTable {
    count: number,
    items: Array<object>,
    onPageChange: any,
    onRowsPerPageChange: any,
    page: number,
    rowsPerPage: number
};


const onAcceptRequest = async (patientId: string) => {
    try {
        if (!patientId) {
            throw new Error('Patient ID not found!')
        }

        await UserService.updateUser(patientId, {
            requestedDoctorStatus: 'ACCEPTED'
        });
        toast.success("Patient Request Successfully Accepted!");

    } catch (error) {
        console.error(`Failed to update the status of the request: ${(error as Error)?.message}`)
        toast.error(`Failed to update the status of the request: ${(error as Error)?.message}`);
    }

};

const onDeclineRequest = async (patientId: string) => {
    try {
        if (!patientId) {
            throw new Error('Patient ID not found!')
        }

        await UserService.updateUser(patientId, {
            requestedDoctorStatus: 'REJECTED'
        });
        toast.success("Patient Request Successfully Rejected!");

    } catch (error) {
        console.error(`Failed to update the status of the request: ${(error as Error)?.message}`)
        toast.error(`Failed to update the status of the request: ${(error as Error)?.message}`);
    }

};
const PatientTable = (props: IPatientTable) => {
    const {
        count = 0,
        items = [],
        onPageChange = () => { },
        onRowsPerPageChange,
        page = 0,
        rowsPerPage = 0
    } = props;

    return (
        <>
            <Card>
                <Box sx={{ minWidth: 800 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    First Name
                                </TableCell>
                                <TableCell>
                                    Last Name
                                </TableCell>
                                <TableCell>
                                    Email
                                </TableCell>
                                <TableCell>
                                    Phone number
                                </TableCell>
                                <TableCell>
                                    Created At
                                </TableCell>
                                <TableCell>
                                    Status
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((customer: any) => {

                                return (
                                    <TableRow
                                        hover
                                        key={customer.id}
                                    >
                                        <TableCell>
                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                spacing={2}
                                            >
                                                <Avatar src="/assets/avatars/avatar-anika-visser.png">
                                                    {customer.firstName}
                                                </Avatar>
                                                <Typography variant="subtitle2">
                                                    {customer.firstName}
                                                </Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            {customer.lastName}
                                        </TableCell>
                                        <TableCell>
                                            {customer.email}
                                        </TableCell>
                                            <TableCell>
                                                {customer.phone}
                                            </TableCell>
                                        <TableCell>
                                            {customer.createdAt}
                                        </TableCell>
                                        <TableCell>
                                            <Stack direction="row" spacing={2}>
                                                <Button variant="contained" sx={{ background: 'green' }} onClick={() => onAcceptRequest(customer.id)}>
                                                    Accept
                                                </Button>
                                                <Button variant="contained" sx={{ background: 'red' }} onClick={() => onDeclineRequest(customer.id)}>
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
    )
};

export default PatientTable;