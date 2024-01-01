import dayjs from "dayjs";
import {
  CurrencyUnit,
  IConsumption,
  IConsumptionStats,
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
): IConsumptionStats => {
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

  // Caclulate the total consumption for the last 7, 30 and 365 days
  const totalLast7Days = Math.round(avgLast7Days * 7 * 1000) / 1000;
  const totalLast30Days = Math.round(avgLast30Days * 20 * 1000) / 1000;
  const totalLast365Days = Math.round(avgLast365Days * 365 * 1000) / 1000;

  return {
    avgLast7Days,
    avgLast30Days,
    avgLast365Days,
    totalLast7Days,
    totalLast30Days,
    totalLast365Days,
  };
};

export const calculateGasExpenses = (
  data: IConsumptionStats,
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
  data: IConsumptionStats,
  squareMeters: number,
  basicMonthCharge: number,
  cubicMeterCharge: number,
  sewageCubicMeterCharge: number,
  rainwaterFee: number
): IExpenseEstimate => {
  const waterTax = 1.07; // 7% water tax in Germany, but not for sewage and rainwater

  // 7 days
  const workingCosts7d = data.avgLast7Days * 7 * cubicMeterCharge;
  const basicCosts7d = (basicMonthCharge * 12) / 53;
  const waterSum7d = (workingCosts7d + basicCosts7d) * waterTax;
  const sewageWorkingCosts7d = data.avgLast7Days * 7 * sewageCubicMeterCharge;
  const rainwaterCosts7d = ((rainwaterFee * squareMeters) / 356) * 7;

  const totalCosts7d =
    Math.round((waterSum7d + sewageWorkingCosts7d + rainwaterCosts7d) * 100) /
    100;

  // 30 days
  const workingCosts30d = data.avgLast30Days * 30 * cubicMeterCharge;
  const basicCosts30d = basicMonthCharge;
  const waterSum30d = (workingCosts30d + basicCosts30d) * waterTax;
  const sewageWorkingCosts30d =
    data.avgLast30Days * 30 * sewageCubicMeterCharge;
  const rainwaterCosts30d = (rainwaterFee * squareMeters) / 12;

  const totalCosts30d =
    Math.round(
      (waterSum30d + sewageWorkingCosts30d + rainwaterCosts30d) * 100
    ) / 100;

  // 365 days
  const workingCosts365d = data.avgLast365Days * 365 * cubicMeterCharge;
  const basicCosts365d = basicMonthCharge * 12;
  const waterSum365d = (workingCosts365d + basicCosts365d) * waterTax;
  const sewageWorkingCosts365d =
    data.avgLast365Days * 365 * sewageCubicMeterCharge;
  const rainwaterCosts365d = rainwaterFee * squareMeters;

  const totalCosts365d =
    Math.round(
      (waterSum365d + sewageWorkingCosts365d + rainwaterCosts365d) * 100
    ) / 100;

  return {
    last7Days: totalCosts7d,
    last30Days: totalCosts30d,
    last365Days: totalCosts365d,
  };
};

export const calculateElectricityExpenses = (
  data: IConsumptionStats,
  workingPrice: number,
  basicPrice: number
) => {
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
