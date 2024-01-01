import { CurrencyUnit, MeterType } from "../interfaces/Types";

export const isMeterType = (value: string): value is MeterType => {
  return (Object as any).values(MeterType).includes(value);
};

export const isCurrencyUnit = (value: string): value is CurrencyUnit => {
  return (Object as any).values(CurrencyUnit).includes(value);
};
