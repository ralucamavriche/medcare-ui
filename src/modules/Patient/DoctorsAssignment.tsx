import { useCallback, useEffect, useMemo, useState } from "react";
import { applyPagination } from "../../utils/pagination";
import { UserService } from "../../services";
import { toast } from "react-toastify";
import DoctorsAssignmentTable from "./DoctorsAssignmentTable";

const DoctorsAssignment = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const status = "ACCEPTED"; // TODO: Add as constant status
        const doctors = await UserService.getDoctorAccountsBasedOnStatus(
          status
        );
        setDoctors(doctors);
      } catch (error) {
        console.error(
          `Failed to UserService.getDoctorAccountsBasedOnStatus: ${
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

  const customers = useMemo(() => {
    return applyPagination(doctors, page, rowsPerPage);
  }, [page, rowsPerPage, doctors]);

  return (
    <DoctorsAssignmentTable
      count={doctors.length}
      items={customers}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      page={page}
      rowsPerPage={rowsPerPage}
    />
  );
};
export default DoctorsAssignment;
