import { Stack } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { IConsumption } from "../../interfaces/Types";
import { useAppSelector } from "../../store/hooks";
import { interpolateMissingDays } from "../../utils/interpolateMissingDays";
import DataCharts from "../common/DataChart";

const Gas = () => {
  const { meters } = useAppSelector((state) => state.meter);

  // states for the charts
  const [data, setData] = useState<IConsumption[] | null>(null);
  const [meterValue, setMeterValue] = useState<number[]>([]);
  const [consumption, setConsumption] = useState<number[]>([]);
  const [dates, setDates] = useState<Date[]>([]);

  // data is loaded from the database and hold in redux store, the interpolation is done here
  useEffect(() => {
    if (meters) setData(interpolateMissingDays(meters));
    console.debug("meters", meters);
  }, [meters]);

  // as soon as the data is interpolated, set the meter value and consumption for the chart
  useEffect(() => {
    if (data) {
      setConsumption(data.map((item) => item.consumption || 0));
      setMeterValue(data.map((item) => item.meterValue));
      setDates(data.map((item) => dayjs(item.timestamp * 1000).toDate()));
    }
    console.debug("data", data);
  }, [data]);

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
    >
      {meterValue && (
        <DataCharts title="Meter reading" dates={dates} data={meterValue} />
      )}
      {consumption && (
        <DataCharts title="Consumption" dates={dates} data={consumption} />
      )}
    </Stack>
  );
};
export default Gas;
