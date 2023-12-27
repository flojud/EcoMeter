import dayjs from "dayjs";
import { IConsumption } from "../../interfaces/Types";
import * as References from "../../utils/consumptionReferences";
import DataCharts from "./DataChart";

interface ConsumptionChartProps {
  data: IConsumption[];
}
const ConsumptionChart = ({ data }: ConsumptionChartProps) => {
  const consumption = data.map((item) => item.consumption || 0);
  const dates = data.map((item) => dayjs(item.timestamp * 1000).toDate());

  return (
    <DataCharts
      title="Consumption"
      dates={dates}
      data={consumption}
      referenceLines={References.GAS_CONSUMPTION_REF}
      caption="Your m3 consumption expenses are converted into kWh and displayed in the chart. The daily consumption is interpolated. The reference lines are guidelines only."
    />
  );
};
export default ConsumptionChart;
