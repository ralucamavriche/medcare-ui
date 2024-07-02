import { OverviewTotalUsers } from "../../components/Overview/OverviewTotalUsers";
import { Box, Container, Grid } from "@mui/material";
import { Helmet } from "react-helmet";
import { TotalAcceptedAppointmentOverview } from "../../components/Overview/TotalAcceptedAppointmentOverview";
import { OverviewAppointments } from "../../components/Overview/OverviewAppointments";
import { OverviewUserTraffic } from "../../components/Overview/OverviewUserTraffic";
import { OverviewTotalRejectedAppointment } from "../../components/Overview/OverviewTotalRejectedAppointment";

const DashboardPage = () => {
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
                difference={16}
                positive
                sx={{ height: "100%" }}
                value="31"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <TotalAcceptedAppointmentOverview
                sx={{ height: "100%" }}
                value="30"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <OverviewTotalRejectedAppointment
                sx={{ height: "100%" }}
                value="12"
              />
            </Grid>
            <Grid item xs={12} lg={8}>
              <OverviewAppointments
                chartSeries={[
                  {
                    name: "This year",
                    data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                  },
                  {
                    name: "Last year",
                    data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
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
