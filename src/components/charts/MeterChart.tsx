import dayjs from "dayjs";
import { IConsumption } from "../../interfaces/Types";
import DataCharts from "./DataChart";

interface MeterChartProps {
  data: IConsumption[];
}

const MeterChart = ({ data }: MeterChartProps) => {
  const meterValue = data.map((item) => item.meterValue);
  const dates = data.map((item) => dayjs(item.timestamp * 1000).toDate());

  return (
    <DataCharts
      title="Meter reading"
      dates={dates}
      data={meterValue}
      caption="In comparison to daily consumption, this graphic shows the meter reading in kWh."
    />
  );
};

export default MeterChart;
