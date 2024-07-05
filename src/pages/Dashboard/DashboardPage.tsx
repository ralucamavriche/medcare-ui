import { OverviewTotalUsers } from "../../components/Overview/OverviewTotalUsers";
import { Box, Container, Grid } from "@mui/material";
import { Helmet } from "react-helmet";
import { TotalAcceptedAppointmentOverview } from "../../components/Overview/TotalAcceptedAppointmentOverview";
import { OverviewAppointments } from "../../components/Overview/OverviewAppointments";
import { OverviewUserTraffic } from "../../components/Overview/OverviewUserTraffic";
import { OverviewTotalRejectedAppointment } from "../../components/Overview/OverviewTotalRejectedAppointment";
import { useEffect, useState } from "react";
import { AppointmentService, UserService } from "../../services";
import { toast } from "react-toastify";

const DashboardPage = () => {
  // const [setUsers] = useState([[]]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [counts, setCounts] = useState({ acceptedCount: 0, rejectedCount: 0 });

  const getUsers = async () => {
    try {
      const users = await UserService.getUsers();
      // setUsers(users);
      setTotalUsers(users.length);
    } catch (error) {
      console.error(
        `Failed to userService.getUsers: ${(error as Error)?.message}`
      );
      toast.error(`Something went wrong:  ${(error as Error)?.message}`);
    }
  };

  const fetchAppoimentsCounts = async () => {
    try {
      const data = await AppointmentService.getAcceptedAndRejectedCounts();
      setCounts(data);
    } catch (error) {
      console.error(
        `Failed to userService.getAcceptedAndRejectedCounts: ${
          (error as Error)?.message
        }`
      );
      toast.error(`Something went wrong:  ${(error as Error)?.message}`);
    }
  };

  useEffect(() => {
    getUsers();
    fetchAppoimentsCounts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Overview</title>
      </Helmet>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
              <OverviewTotalUsers
                difference={totalUsers}
                positive
                sx={{ height: "100%" }}
                value={totalUsers | 0}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <TotalAcceptedAppointmentOverview
                sx={{ height: "100%" }}
                value={counts.acceptedCount | 0}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <OverviewTotalRejectedAppointment
                sx={{ height: "100%" }}
                value={counts.rejectedCount | 0}
              />
            </Grid>
            <Grid item xs={12} lg={8}>
              <OverviewAppointments
                chartSeries={[
                  {
                    name: "This year",
                    data: [2, 4, 5, 8, 3, 14, 14, 8, 9, 10, 5, 8],
                  },
                  {
                    name: "Last year",
                    data: [1, 4, 0, 6, 2, 7, 6, 7, 6, 12, 5, 4],
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OverviewUserTraffic
                chartSeries={[63, 25, 12]}
                labels={["Patient", "Doctor", "Admin"]}
                sx={{ height: "100%" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default DashboardPage;
