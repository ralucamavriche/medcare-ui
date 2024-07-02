// // import dynamic from 'next/dynamic';
// import { styled } from '@mui/material/styles';

// const ApexChart = () => import('react-apexcharts'), {
//   ssr: false,
//   loading: () => null
// });

// export const Chart = styled(ApexChart)``;

import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartProps {
  options: any;
  series: any;
  type: any;
  width?: string | number;
  height?: string | number;
}

const Chart: React.FC<ChartProps> = ({ options, series, type, width, height }) => {
  return (
    <ReactApexChart
      options={options}
      series={series}
      type={type}
      width={width}
      height={height}
    />
  );
};

export default Chart;
