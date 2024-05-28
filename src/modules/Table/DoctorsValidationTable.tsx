import { Avatar, Box, Button, Card, Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { UserService } from "../../services";
import { toast } from "react-toastify";

interface DoctorsValidationTable {
    count: number,
    items: Array<object>,
    onPageChange: Function,
    onRowsPerPageChange: Function,
    page: number,
    rowsPerPage: number
};


const onAcceptRequest = async (userId: string) => {
    try {
        if (!userId) {
            throw new Error('Doctor ID not found!')
        }

        await UserService.updateUser(userId, {
            status: 'ACCEPTED'
        });
        toast.success("Doctor request successfully accepted!");

    } catch (error) {
        console.error(`Failed to accept the request: ${(error as Error)?.message}`)
        toast.error(`Failed to accept the request: ${(error as Error)?.message}`);
    }

};

const onDeclineRequest = async (userId: string) => {
    try {
        if (!userId) {
            throw new Error('Doctor ID not found!')
        }

        await UserService.updateUser(userId, {
            status: 'REJECTED'
        });
        toast.success("Doctor request successfully rejected!");

    } catch (error) {
        console.error(`Failed to reject the request: ${(error as Error)?.message}`)
        toast.error(`Failed to reject the request: ${(error as Error)?.message}`);
    }

};
const DoctorsValidationTable = (props: any) => {
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
                                    Medical License Number
                                </TableCell>
                                <TableCell>
                                    Email
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
                                                <Avatar src="/assets/avatars/avatar-doctor.jpg">
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
                                            {customer.medicalLicenseNumber}
                                        </TableCell>
                                        <TableCell>
                                            {customer.email}
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

export default DoctorsValidationTable;