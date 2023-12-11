import { Slider, Stack, Typography } from "@mui/material";
import { ChartsReferenceLine, LineChart, ShowMarkParams } from "@mui/x-charts";
import { useEffect, useState } from "react";

interface DataChartsProps {
  title: String;
  dates: Date[];
  data: number[];
}

const DataCharts = ({ title, dates, data }: DataChartsProps) => {
  const valueFormatter = (date: Date) =>
    date.toLocaleDateString("en-DE", {
      month: "2-digit",
      day: "2-digit",
    });

  const showMark = (params: ShowMarkParams) => {
    const { position } = params as ShowMarkParams<Date>;

    const start = new Date(position.getFullYear(), 0, 0);
    const diff = position.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // show mark every 10 days
    return dayOfYear % 10 === 0;
  };

  // slider state for zooming in the chart
  const minDistance = 10;
  const [zoom, setZoom] = useState<number[]>([0, minDistance]);

  useEffect(() => {
    setZoom([0, dates.length]);
  }, [dates]);

  const handleZoom = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setZoom([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setZoom([clamped - minDistance, clamped]);
      }
    } else {
      setZoom(newValue as number[]);
    }
  };
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      width="100%"
    >
      <Typography variant="h4">{title}</Typography>
      <LineChart
        xAxis={[
          {
            data: dates,
            scaleType: "time",
            valueFormatter,
            min: dates[zoom[0]],
            max: dates[zoom[1]],
          },
        ]}
        series={[{ data: data, showMark }]}
        height={200}
      >
        <ChartsReferenceLine
          y={2000}
          lineStyle={{ stroke: "red", strokeWidth: 0.5, strokeDasharray: 4 }}
        />
        <ChartsReferenceLine
          y={1000}
          lineStyle={{ stroke: "orange", strokeWidth: 0.5, strokeDasharray: 4 }}
        />
        <ChartsReferenceLine
          y={500}
          lineStyle={{ stroke: "green", strokeWidth: 0.5, strokeDasharray: 4 }}
        />
      </LineChart>
      <Slider
        size="small"
        value={zoom}
        onChange={handleZoom}
        valueLabelDisplay="auto"
        min={0}
        max={dates.length}
        sx={{ px: 4 }}
      />
    </Stack>
  );
};
export default DataCharts;
