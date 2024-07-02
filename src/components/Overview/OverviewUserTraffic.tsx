import { LocalHospital, Person, AdminPanelSettings } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  SvgIcon,
  Typography,
  useTheme,
} from "@mui/material";
import Chart from "./Chart";

interface IOverviewUserTraffic {
  chartSeries: number[];
  labels: ("Patient" | "Doctor" | "Admin")[];
  sx?: object;
}

type IconMapKey = "Patient" | "Doctor" | "Admin";

const UseChartOptions = (labels: any) => {
  const theme = useTheme();

  return {
    chart: {
      background: "transparent",
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
    ],
    dataLabels: {
      enabled: false,
    },
    labels,
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    states: {
      active: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      fillSeriesColor: false,
    },
  };
};

const iconMap: Record<IconMapKey, JSX.Element> = {
  Patient: (
    <SvgIcon>
      <Person />
    </SvgIcon>
  ),
  Doctor: (
    <SvgIcon>
      <LocalHospital />
    </SvgIcon>
  ),
  Admin: (
    <SvgIcon>
      <AdminPanelSettings />
    </SvgIcon>
  ),
};

export const OverviewUserTraffic = (props: IOverviewUserTraffic) => {
  const { chartSeries, labels, sx } = props;
  const chartOptions = UseChartOptions(labels);

  return (
    <Card sx={sx}>
      <CardHeader title="Traffic Source" />
      <CardContent>
        <Chart
          height={300}
          options={chartOptions}
          series={chartSeries}
          type="donut"
          width="100%"
        />
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ mt: 2 }}
        >
          {chartSeries.map((item: any, index: number) => {
            const label = labels[index];

            return (
              <Box
                key={label}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {iconMap[label]}
                <Typography sx={{ my: 1 }} variant="h6">
                  {label}
                </Typography>
                <Typography color="text.secondary" variant="subtitle2">
                  {item}%
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
};
