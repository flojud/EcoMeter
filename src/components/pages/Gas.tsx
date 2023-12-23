import { Stack } from "@mui/material";
import { CurrencyUnit } from "../../interfaces/Types";
import { useAppSelector } from "../../store/hooks";
import ExpensesFacts from "../common/ExpensesFacts";
import ConsumptionChart from "../common/charts/ConsumptionChart";
import MeterChart from "../common/charts/MeterChart";

const Gas = () => {
  const { sampledMeters, stats, expenses } = useAppSelector(
    (state) => state.gas
  );

  return (
    <>
      {sampledMeters && stats && expenses && (
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={4}
        >
          <ExpensesFacts
            title="Insights"
            stats={stats}
            expenses={expenses}
            unit={CurrencyUnit.KWH}
          />
          <ConsumptionChart data={sampledMeters} />
          <MeterChart data={sampledMeters} />
        </Stack>
      )}
    </>
  );
};
export default Gas;
