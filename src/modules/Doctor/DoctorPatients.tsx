import { useCallback, useEffect, useMemo, useState } from "react";
import { applyPagination } from "../../utils/pagination";
import { UserService } from "../../services";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import DoctorPatientsTable from "./DoctorPatientsTable";

const DoctorPatients = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [patients, setPatients] = useState([]);
  const { user } = useAuth();
  const userId = user?.id;

  const customers = useMemo(
    () => applyPagination(patients, page, rowsPerPage),
    [page, rowsPerPage, patients]
  );

  useEffect(() => {
    const fetchPatientsList = async (doctorId: string) => {
      try {
        const patients = await UserService.getPatientsByDoctorId(doctorId);
        setPatients(patients);
      } catch (error) {
        console.error(
          `Failed to UserService.getPatientsByDoctorId: ${
            (error as Error)?.message
          }`
        );
        toast.error(`Something went wrong:  ${(error as Error)?.message}`);
      }
    };

    userId && fetchPatientsList(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = useCallback((_event: any, value: any) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event: any) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <DoctorPatientsTable
      count={patients.length}
      items={customers}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      page={page}
      rowsPerPage={rowsPerPage}
    />
  );
};
export default DoctorPatients;
