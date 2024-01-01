import { User } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";
import { NotificationContext } from "../contexts/NotificationContextProvider";
import { db } from "../firebase/Firebase";
import { IMeter, MeterType } from "../interfaces/Types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setLastUpdateTime } from "../store/slices/appSlice";
import {
  setBasicPrice as _gas_basicPrice,
  setCalorificValue as _gas_calorificValue,
  setConsumption as _gas_consumption,
  setConsumptionType as _gas_consumptionType,
  setContractDate as _gas_contractDate,
  setRuntime as _gas_runtime,
  setWorkingPrice as _gas_workingPrice,
  setZNumber as _gas_zNumber,
} from "../store/slices/settings/gasSettingsSlice";

import dayjs from "dayjs";
import {
  setElectricityExpenses,
  setElectricityMeters,
  setElectricitySampledMeters,
  setElectricityStats,
} from "../store/slices/electricitySlice";
import {
  setGasExpenses,
  setGasMeters,
  setGasMetersKWh,
  setGasSampledMeters,
  setGasStats,
} from "../store/slices/gasSlice";
import {
  setBasicPrice as _Electricity_basicPrice,
  setConsumption as _Electricity_consumption,
  setConsumptionType as _Electricity_consumptionType,
  setContractDate as _Electricity_contractDate,
  setRuntime as _Electricity_runtime,
  setWorkingPrice as _Electricity_workingPrice,
} from "../store/slices/settings/electricitySettingsSlice";
import {
  setConsumption as _water_Consumption,
  setCubicMeterCharge as _water_CubicMeterCharge,
  setRainwaterFee as _water_RainwaterFee,
  setSewageCubicMeterCharge as _water_SewageCubicMeterCharge,
  setBasicMonthCharge as _water_basicMonthCharge,
  setSquareMeters as _water_squareMeter,
} from "../store/slices/settings/waterSettingsSlice";
import {
  setWaterExpenses,
  setWaterMeters,
  setWaterSampledMeters,
  setWaterStats,
} from "../store/slices/waterSlice";
import {
  calculateConsumptionStats,
  calculateElectricityExpenses,
  calculateGasExpenses,
  calculateWaterExpenses,
  converGasMetertM3ToKWh,
} from "../utils/calculateConsumptionStats";
import { toDayjsObject } from "../utils/dateUtils";
import { interpolateMissingDays } from "../utils/interpolateMissingDays";

function useFirebase() {
  const notifyContext = useContext(NotificationContext);
  const authContext = useContext(AuthContext);
  const dispatch = useAppDispatch();

  const user = authContext!.user as User;
  const { lastUpdateTime } = useAppSelector((state) => state.app);
  const settings = useAppSelector((state) => state.settings);

  const getMeters = async (type: MeterType) => {
    const fromUnixTS = dayjs().subtract(365, "day").unix();

    const ref = collection(db, user.uid);
    const q = query(
      ref,
      where("timestamp", ">=", fromUnixTS),
      where("meterType", "==", type),
      orderBy("timestamp", "desc")
    );
    return getDocs(q);
  };

  const GetWaterMeters = () => {
    const result: IMeter[] = [];
    getMeters(MeterType.WATER)
      .then((response) => {
        response.docs.forEach((item) => {
          result.push(item.data() as IMeter);
        });
      })
      .finally(() => {
        dispatch(setWaterMeters(result));

        const sampledWaterMeters = interpolateMissingDays(result);
        dispatch(setWaterSampledMeters(sampledWaterMeters));

        const waterStats = calculateConsumptionStats(sampledWaterMeters);
        dispatch(setWaterStats(waterStats));

        const waterExpenses = calculateWaterExpenses(
          waterStats,
          settings.water.squareMeters,
          settings.water.basicMonthCharge,
          settings.water.cubicMeterCharge,
          settings.water.sewageCubicMeterCharge,
          settings.water.rainwaterFee
        );
        dispatch(setWaterExpenses(waterExpenses));
      });
  };

  const GetElectricityMeters = () => {
    const result: IMeter[] = [];
    getMeters(MeterType.ELECTRICITY)
      .then((response) => {
        response.docs.forEach((item) => {
          result.push(item.data() as IMeter);
        });
      })
      .finally(() => {
        dispatch(setElectricityMeters(result));

        const sampledElectricityMeters = interpolateMissingDays(result);
        dispatch(setElectricitySampledMeters(sampledElectricityMeters));

        const ElectricityStats = calculateConsumptionStats(
          sampledElectricityMeters
        );
        dispatch(setElectricityStats(ElectricityStats));

        const ElectricityExpenses = calculateElectricityExpenses(
          ElectricityStats,
          settings.electricity.basicPrice,
          settings.electricity.workingPrice
        );
        dispatch(setElectricityExpenses(ElectricityExpenses));
      });
  };

  const GetGasMeters = () => {
    const result: IMeter[] = [];
    getMeters(MeterType.GAS)
      .then((response) => {
        response.docs.forEach((item) => {
          result.push(item.data() as IMeter);
        });
      })
      .finally(() => {
        dispatch(setGasMeters(result));

        const metersKWh = converGasMetertM3ToKWh(
          result,
          settings.gas.calorificValue,
          settings.gas.zNumber
        );
        dispatch(setGasMetersKWh(metersKWh));

        const sampledGasMeters = interpolateMissingDays(metersKWh);
        dispatch(setGasSampledMeters(sampledGasMeters));

        const gasStats = calculateConsumptionStats(sampledGasMeters);
        dispatch(setGasStats(gasStats));

        const gasExpenses = calculateGasExpenses(
          gasStats,
          settings.gas.basicPrice,
          settings.gas.workingPrice
        );
        dispatch(setGasExpenses(gasExpenses));
      });
  };

  const GetAllMeters = () => {
    GetGasMeters();
    GetWaterMeters();
    GetElectricityMeters();

    // Update the last update time
    dispatch(setLastUpdateTime(Date.now()));
  };

  // Function to update the data
  const UpdateDataIfOlderThan5Minutes = () => {
    const currentTime = Date.now();
    const elapsed = currentTime - lastUpdateTime;

    // 5 minutes in milliseconds
    if (elapsed > 5 * 60 * 1000 || lastUpdateTime === 0) {
      // Perform data update
      GetAllMeters();

      // Get user settings
      GetSettings();
    }
  };

  // Function to save new meter
  const SaveMeter = async (meter: IMeter) => {
    await setDoc(doc(db, `${user.uid}`, `${meter.timestamp}`), meter)
      .then(() => {
        notifyContext.addNotification("Saved meter", "success");
        GetAllMeters();
      })
      .catch(() => {
        notifyContext.addNotification("Failed to save meter", "error");
      });
  };

  // Function to delete meter
  const DeleteMeter = async (meter: IMeter) => {
    await deleteDoc(doc(db, `${user.uid}`, `${meter.timestamp}`))
      .then(() => {
        notifyContext.addNotification("Deleted meter", "success");
        GetAllMeters();
      })
      .catch(() => {
        notifyContext.addNotification("Failed to delete meter", "error");
      });
  };

  // Function to save settings
  const SaveSettings = async (settings: any) => {
    // Save the meter to the database
    await setDoc(doc(db, "settings", `${user.uid}`), settings)
      .then(() => {
        notifyContext.addNotification("Saved settings", "success");
      })
      .catch(() => {
        notifyContext.addNotification("Failed to save settings", "error");
      });
  };

  // Function to get settings
  const GetSettings = async () => {
    const ref = doc(db, "settings", `${user.uid}`);
    getDoc(ref)
      .then((response: any) => {
        const data = response.data();

        const gas = data.gas;
        dispatch(_gas_basicPrice(gas.basicPrice));
        dispatch(_gas_consumption(gas.consumption));
        dispatch(_gas_consumptionType(gas.consumptionType));
        dispatch(_gas_contractDate(toDayjsObject(gas.contractDate)));
        dispatch(_gas_runtime(gas.runtime));
        dispatch(_gas_workingPrice(gas.workingPrice));
        dispatch(_gas_calorificValue(gas.calorificValue));
        dispatch(_gas_zNumber(gas.zNumber));

        const Electricity = data.electricity;
        dispatch(_Electricity_basicPrice(Electricity.basicPrice));
        dispatch(_Electricity_consumption(Electricity.consumption));
        dispatch(_Electricity_consumptionType(Electricity.consumptionType));
        dispatch(
          _Electricity_contractDate(toDayjsObject(Electricity.contractDate))
        );
        dispatch(_Electricity_runtime(Electricity.runtime));
        dispatch(_Electricity_workingPrice(Electricity.workingPrice));

        const water = data.water;
        dispatch(_water_basicMonthCharge(water.basicMonthCharge));
        dispatch(_water_Consumption(water.consumption));
        dispatch(_water_CubicMeterCharge(water.cubicMeterCharge));
        dispatch(_water_RainwaterFee(water.rainwaterFee));
        dispatch(_water_SewageCubicMeterCharge(water.sewageCubicMeterCharge));
        dispatch(_water_squareMeter(water.squareMeters));
      })
      .catch((error: any) => {
        notifyContext.addNotification(
          "Failed to load settings: " + error.message,
          "error"
        );
      });
  };

  const UpdateMeter = async (
    timestamp: number,
    meterValue: number,
    meterType: string
  ) => {
    // Delete the old meter
    deleteDoc(doc(db, `${user.uid}`, `${timestamp}`)).then(() => {
      notifyContext.addNotification("Deleted old meter", "success");
      // create the new meter
      SaveMeter({
        timestamp: timestamp,
        meterValue: meterValue,
        meterType: meterType as MeterType,
      });
    });
  };

  return {
    GetAllMeters,
    UpdateDataIfOlderThan5Minutes,
    SaveMeter,
    DeleteMeter,
    SaveSettings,
    GetSettings,
    UpdateMeter,
  };
}

export default useFirebase;
