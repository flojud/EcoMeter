import { AlertColor } from "@mui/material";
import { Dayjs } from "dayjs";
import { User } from "firebase/auth";
import { ReactNode } from "react";

export type Props = { children: ReactNode | any };

export interface IWindow extends Window {
  supportsPwa?: boolean;
  deferredPWA?: IBeforeInstallPromptEvent;
}

export interface INotificationContext {
  notification: INotification | null;
  addNotification: (message: string, severity: AlertColor) => void;
  removeNotification: () => void;
}

export interface INotification {
  message: string | null;
  severity: AlertColor | null;
}

export interface IUserContext {
  user: User | null;
  loggedIn: boolean | null;
  authMethods: IAuthMethods;
}

export interface IAuthMethods {
  logout: () => void;
  googleSignIn: () => void;
  deleteMyUser: () => void;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: IBeforeInstallPromptEvent;
  }
}

export interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export enum MeterType {
  GAS = "gas",
  ELECTRICITY = "electricity",
  WATER = "water",
}

export enum CurrencyUnit {
  EUR = "eur",
  KWH = "kwh",
  M3 = "m3",
  OTHER = "other",
}

export interface IMeter {
  meterType?: MeterType;
  meterValue: number;
  currencyUnit?: CurrencyUnit;
  timestamp: number;
}

export interface IConsumption {
  timestamp: number;
  meterValue: number;
  consumption?: number;
}

export interface IConsumptionStats {
  avgLast7Days: number;
  avgLast30Days: number;
  avgLast365Days: number;
  totalLast7Days: number;
  totalLast30Days: number;
  totalLast365Days: number;
}

export interface IGasSettingsState {
  consumptionType: string;
  consumption: number;
  workingPrice: number;
  basicPrice: number;
  contractDate: Dayjs | number | null;
  runtime: number;
  calorificValue: number;
  zNumber: number;
}

export interface IElectricitySettingsState {
  consumptionType: string;
  consumption: number;
  workingPrice: number;
  basicPrice: number;
  contractDate: Dayjs | number | null;
  runtime: number;
}

export interface IWaterSettingsState {
  squareMeters: number;
  consumption: number;
  basicMonthCharge: number;
  cubicMeterCharge: number;
  sewageCubicMeterCharge: number;
  rainwaterFee: number;
}

export interface ISettings {
  gas: IGasSettingsState;
  electricity: IElectricitySettingsState;
  water: IWaterSettingsState;
}

export interface IDataChartsRefences {
  red: number;
  orange: number;
  green: number;
}

export interface ICarousleSlideBox {
  title: string;
  totalConsumption: string;
  consumption: string;
  costs: string;
}

export interface IExpenseEstimate {
  last7Days: number;
  last30Days: number;
  last365Days: number;
}

export interface ILicense {
  name: string;
  licenses: string;
  repository?: string;
  publisher?: string;
  url?: string;
  path: string;
  licenseFile?: string;
  email?: string;
  noticeFile?: string;
  private?: boolean;
}
