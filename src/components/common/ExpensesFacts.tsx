import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  CurrencyUnit,
  ICarousleSlideBox,
  IConsumption,
  IConsumptionAvg,
  IExpenseEstimate,
  MeterType,
} from "../../interfaces/Types";
import { useAppSelector } from "../../store/hooks";
import {
  calculateConsumptionStats,
  calculateGasExpenses,
} from "../../utils/calculateConsumptionStats";
import Title from "./Title";
import Carousel from "./carousel/Carousel";

interface ExpensesFactsProps {
  title: String;
  data: IConsumption[];
  type: string;
  unit: string;
}
const ExpensesFacts = ({ title, data, type, unit }: ExpensesFactsProps) => {
  const [stats, setStats] = useState<IConsumptionAvg | null>(null);
  const [slides, setSlides] = useState<ICarousleSlideBox[] | null>(null);
  const [expenses, setExpenses] = useState<IExpenseEstimate | null>(null);

  const settings = useAppSelector((state) => state.settings);

  // calculate the stats for the carousel
  useEffect(() => {
    setStats(calculateConsumptionStats(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // calculate the expenses for the carousel
  useEffect(() => {
    if (stats) {
      if (type === MeterType.GAS) {
        setExpenses(
          calculateGasExpenses(
            stats,
            settings.gas.basicPrice,
            settings.gas.workingPrice
          )
        );
      }
      // TODO add electricity and water
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats]);

  // set the slides for the carousel based on the stats
  useEffect(() => {
    if (stats && expenses) {
      // TODO remove console.log
      console.log(stats);
      console.log(expenses);
      // TODO  format the numbers and beautify the CurrencyUnit
      setSlides([
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
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenses, stats]);

  return (
    <Box width="100%" p={2}>
      {stats && slides && (
        <>
          <Title text={title} />
          <Carousel slides={slides} />
          <Typography variant="caption">
            Welcome! Let's take a look at how your consumption has been
            behaving. These insights help you understand your usage patterns.
          </Typography>
        </>
      )}
    </Box>
  );
};
export default ExpensesFacts;
