import { Avatar, Box, Button, Card, Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { UserService } from "../../services";
import { toast } from "react-toastify";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

interface IDoctorsAssignmentTable {
    count: number,
    items: Array<object>,
    onPageChange: any,
    onRowsPerPageChange: any,
    page: number,
    rowsPerPage: number
};

const DoctorsAssignmentTable = (props: IDoctorsAssignmentTable) => {
    const {
        count = 0,
        items = [],
        onPageChange = () => { },
        onRowsPerPageChange,
        page = 0,
        rowsPerPage = 0,
    } = props;

    const [isDisable, setIsDisabled] = useState(false);
    const { user, addUser } = useAuth();

    const { id: userId, requestedDoctorStatus, doctorId } = user || {}

    if (!userId) {
        throw new Error('User is not defined')
    }

    const handleOnRequest = async (doctorId: string) => {
        try {
            if (!userId || !doctorId) {
                throw new Error('User or doctor IDs not found!')
            }
            const userData = await UserService.updateUser(userId, {
                requestedDoctorStatus: 'SENT',
                doctorId

            });

            addUser(userData);
            toast.success("Request successfully sent!");
            setIsDisabled(true);

        } catch (error) {
            console.error(`Failed to sent the request to the doctor: ${(error as Error)?.message}`)
            toast.error(`Failed to sent the request to the doctor: ${(error as Error)?.message}`);
        }

    }
    const isSent = requestedDoctorStatus === 'SENT';

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
                                    Phone number
                                </TableCell>
                                <TableCell>
                                    Request
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
                                            {customer.medicalLicenseNumber}
                                        </TableCell>
                                        <TableCell>
                                            {customer.email}
                                        </TableCell>
                                        <TableCell>
                                            {customer.phone}
                                        </TableCell>
                                        <TableCell>
                                            <Stack direction="row" spacing={2}>
                                                {
                                                    customer.id === doctorId ? (
                                                        'Requested'
                                                    ) : (
                                                        <Button variant="contained" onClick={() => handleOnRequest(customer.id)} disabled={isDisable || isSent}>
                                                            Send request
                                                        </Button>
                                                    )
                                                }
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

export default DoctorsAssignmentTable;
