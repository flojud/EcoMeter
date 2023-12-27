import { Stack } from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import ConsumptionChart from "../charts/ConsumptionChart";
import MeterChart from "../charts/MeterChart";
import ExpensesFacts from "../common/ExpensesFacts";

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
          overflow={"hidden"}
        >
          <ExpensesFacts
            title="Insights"
            stats={stats}
            expenses={expenses}
            unit={"kWh"}
            currency={"€"}
          />
          <ConsumptionChart data={sampledMeters} />
          <MeterChart data={sampledMeters} />
        </Stack>
      )}
    </>
  );
};
export default Gas;
