import { Box, Slider, Stack, Typography } from "@mui/material";
import { ChartsReferenceLine, LineChart, ShowMarkParams } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { IDataChartsRefences } from "../../interfaces/Types";
import Title from "../common/Title";

interface DataChartsProps {
  title: String;
  dates: Date[];
  data: number[];
  referenceLines?: IDataChartsRefences;
  caption: String;
}

const DataCharts = ({
  title,
  dates,
  data,
  referenceLines,
  caption,
}: DataChartsProps) => {
  const valueFormatter = (date: Date) =>
    date.toLocaleDateString("en-DE", {
      month: "2-digit",
      day: "2-digit",
    });

  // show mark every 10 days on the x-axis of the chart
  const showMark = (params: ShowMarkParams) => {
    const { position } = params as ShowMarkParams<Date>;

    const start = new Date(position.getFullYear(), 0, 0);
    const diff = position.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    return dayOfYear % 10 === 0;
  };

  // slider state for zooming in the chart
  const minDistance = 10;
  const [zoom, setZoom] = useState<number[]>([0, minDistance]);

  // set the zoom to the last 10 days
  useEffect(() => {
    const from = dates.length > minDistance ? dates.length - minDistance : 0;
    const to = dates.length > minDistance ? dates.length : minDistance;
    setZoom([from, to]);
  }, [dates]);

  // zoom in the chart by dragging the slider thumbs and prevent the thumbs from overlapping
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
    <Box sx={{ width: "100%" }}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <Title text={title} />
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
          series={[{ data: data, area: true, showMark }]}
          height={200}
          sx={{
            "& .MuiAreaElement-root": {
              fill: "url('#myGradient')",
            },
          }}
        >
          {referenceLines?.red && (
            <ChartsReferenceLine
              y={referenceLines.red || 0}
              lineStyle={{
                stroke: "red",
                strokeWidth: 0.5,
                strokeDasharray: 4,
              }}
            />
          )}
          {referenceLines?.orange && (
            <ChartsReferenceLine
              y={referenceLines.orange}
              lineStyle={{
                stroke: "orange",
                strokeWidth: 0.5,
                strokeDasharray: 4,
              }}
            />
          )}
          {referenceLines?.green && (
            <ChartsReferenceLine
              y={referenceLines.green}
              lineStyle={{
                stroke: "green",
                strokeWidth: 0.5,
                strokeDasharray: 4,
              }}
            />
          )}

          <defs>
            <linearGradient id="myGradient" gradientTransform="rotate(90)">
              <stop offset="5%" stopColor="hsla(189, 100%, 45%, 1)" />
              <stop offset="50%" stopColor="cubic-bezier(0.2, 0.02, 0, 1)" />
              <stop offset="95%" stopColor="hsla(210, 100%, 45%, 0)" />
            </linearGradient>
          </defs>
        </LineChart>
        <Slider
          size="small"
          value={zoom}
          onChange={handleZoom}
          valueLabelDisplay="auto"
          min={0}
          max={dates.length}
          sx={{ width: "75%" }}
        />
        <Typography variant="caption" sx={{ width: "100%", px: 2 }}>
          {caption}
        </Typography>
      </Stack>
    </Box>
  );
};
export default DataCharts;
