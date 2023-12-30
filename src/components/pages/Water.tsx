import { Stack } from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import ConsumptionChart from "../charts/ConsumptionChart";
import MeterChart from "../charts/MeterChart";
import ExpensesFacts from "../common/ExpensesFacts";
import NoData from "../common/NoData";

const Water = () => {
  const { sampledMeters, stats, expenses } = useAppSelector(
    (state) => state.water
  );

  if (
    sampledMeters === null ||
    sampledMeters.length === 0 ||
    stats === null ||
    expenses === null
  ) {
    return <NoData />;
  }

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={4}
      overflow={"hidden"}
    >
      <ExpensesFacts
        title="Insights"
        stats={stats}
        expenses={expenses}
        unit={"m3"}
        currency={"€"}
      />
      <ConsumptionChart data={sampledMeters} />
      <MeterChart data={sampledMeters} />
    </Stack>
  );
};
export default Water;
