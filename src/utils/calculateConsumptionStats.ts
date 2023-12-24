import dayjs from "dayjs";
import {
  CurrencyUnit,
  IConsumption,
  IConsumptionAvg,
  IExpenseEstimate,
  IMeter,
} from "../interfaces/Types";

const daysBetween = (data: IConsumption[]) => {
  // Calculate the number of days between the first and last entry in the data array
  return data.length > 0
    ? dayjs(data[data.length - 1].timestamp * 1000).diff(
        data[0].timestamp * 1000,
        "day"
      ) + 1
    : 1;
};

const calculateAverageConsumption = (data: IConsumption[]): number => {
  // Calculate average consumption per day based on the data array passed in as argument
  const totalConsumption = data.reduce(
    (sum, entry) => sum + (entry.consumption || 0),
    0
  );

  const days = daysBetween(data);

  // Return the average consumption per day rounded to 2 decimals
  //round to 3 decimals and return
  return Math.round((totalConsumption / days) * 1000) / 1000;
};

export const converGasMetertM3ToKWh = (
  meterArray: IMeter[],
  calorificValue: number,
  zNumber: number
) => {
  return meterArray.map((entry) => {
    const convertedValue = entry.meterValue * calorificValue * zNumber;
    return {
      meterValue: convertedValue,
      meterType: entry.meterType,
      timestamp: entry.timestamp,
      currencyUnit: CurrencyUnit.KWH,
    };
  });
};

export const calculateConsumptionStats = (
  data: IConsumption[]
): IConsumptionAvg => {
  const today = dayjs();
  const last7Days = today.subtract(7, "day");
  const last30Days = today.subtract(30, "day");
  const last365Days = today.subtract(365, "day");

  const filteredDataLast7Days = data.filter((entry) =>
    dayjs(entry.timestamp * 1000).isAfter(last7Days)
  );
  const filteredDataLast30Days = data.filter((entry) =>
    dayjs(entry.timestamp * 1000).isAfter(last30Days)
  );
  const filteredDataLast365Days = data.filter((entry) =>
    dayjs(entry.timestamp * 1000).isAfter(last365Days)
  );

  // Calculate average consumption per day for the last 7, 30 and 365 days
  const avgLast7Days = calculateAverageConsumption(filteredDataLast7Days);
  const avgLast30Days = calculateAverageConsumption(filteredDataLast30Days);
  const avgLast365Days = calculateAverageConsumption(filteredDataLast365Days);

  return {
    avgLast7Days,
    avgLast30Days,
    avgLast365Days,
  };
};

export const calculateGasExpenses = (
  data: IConsumptionAvg,
  basicPrice: number,
  workingPrice: number
): IExpenseEstimate => {
  // 7 days
  const workingCosts7d = (data.avgLast7Days * 7 * workingPrice) / 100;
  const basicCosts7d = (basicPrice * 12) / 53;
  const totalCosts7d = Math.round((workingCosts7d + basicCosts7d) * 100) / 100;

  // 30 days
  const workingCosts30d = (data.avgLast30Days * 30 * workingPrice) / 100;
  const basicCosts30d = basicPrice;
  const totalCosts30d =
    Math.round((workingCosts30d + basicCosts30d) * 100) / 100;

  // 365 days
  const workingCosts365d = (data.avgLast365Days * 365 * workingPrice) / 100;
  const basicCosts365d = basicPrice * 12;
  const totalCosts365d =
    Math.round((workingCosts365d + basicCosts365d) * 100) / 100;

  return {
    last7Days: totalCosts7d,
    last30Days: totalCosts30d,
    last365Days: totalCosts365d,
  };
};

export const calculateWaterExpenses = (
  data: IConsumptionAvg,
  squareMeters: number,
  basicMonthCharge: number,
  cubicMeterCharge: number,
  sewageCubicMeterCharge: number,
  rainwaterFee: number
): IExpenseEstimate => {
  // TODO water expenses calculation

  return {
    last7Days: 5,
    last30Days: 10,
    last365Days: 15,
  };
};

export const calculateElectricityExpenses = (
  data: IConsumptionAvg,
  workingPrice: number,
  basicPrice: number
) => {
  // TODO electricity expenses calculation
  return {
    last7Days: 5,
    last30Days: 10,
    last365Days: 15,
  };
};
