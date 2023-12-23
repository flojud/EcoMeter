import { Box, Stack, Typography } from "@mui/material";
import {
  CurrencyUnit,
  IConsumptionAvg,
  IExpenseEstimate,
} from "../../interfaces/Types";
import Title from "./Title";
import Carousel from "./carousel/Carousel";

interface ExpensesFactsProps {
  title: String;
  stats: IConsumptionAvg;
  expenses: IExpenseEstimate;
  unit: string;
}
const ExpensesFacts = ({
  title,
  stats,
  expenses,
  unit,
}: ExpensesFactsProps) => {
  const slides = [
    {
      title: "Last 7 days",
      consumption: `${stats.avgLast7Days} ${unit}`,
      costs: `${expenses.last7Days} ${CurrencyUnit.EUR}`,
    },
    {
      title: "Last 30 days",
      consumption: `${stats.avgLast30Days} ${unit}`,
      costs: `${expenses.last30Days} ${CurrencyUnit.EUR}`,
    },
    {
      title: "Last 365 days",
      consumption: `${stats.avgLast365Days} ${unit}`,
      costs: `${expenses.last365Days} ${CurrencyUnit.EUR}`,
    },
  ];

  return (
    <Box width="100%" p={2}>
      {stats && slides && (
        <>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Title text={title} />
            <Carousel slides={slides} />
            <Typography variant="caption">
              Welcome! Let's take a look at how your consumption has been
              behaving. These insights help you understand your usage patterns.
            </Typography>
          </Stack>
        </>
      )}
    </Box>
  );
};
export default ExpensesFacts;
