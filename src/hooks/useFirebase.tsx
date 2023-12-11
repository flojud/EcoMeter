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
} from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";
import { NotificationContext } from "../contexts/NotificationContextProvider";
import { db } from "../firebase/Firebase";
import { IMeter, MeterType } from "../interfaces/Types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setLastUpdateTime, setMeters } from "../store/slices/meterSlice";
import {
  setBasicPrice as _gas_basicPrice,
  setConsumption as _gas_consumption,
  setConsumptionType as _gas_consumptionType,
  setContractDate as _gas_contractDate,
  setRuntime as _gas_runtime,
  setWorkingPrice as _gas_workingPrice,
} from "../store/slices/settings/gasSettingsSlice";

import {
  setBasicPrice as _electricy_basicPrice,
  setConsumption as _electricy_consumption,
  setConsumptionType as _electricy_consumptionType,
  setContractDate as _electricy_contractDate,
  setRuntime as _electricy_runtime,
  setWorkingPrice as _electricy_workingPrice,
} from "../store/slices/settings/electricySettingsSlice";
import {
  setConsumption as _water_Consumption,
  setCubicMeterCharge as _water_CubicMeterCharge,
  setRainwaterFee as _water_RainwaterFee,
  setSewageCubicMeterCharge as _water_SewageCubicMeterCharge,
  setBasicMonthCharge as _water_basicMonthCharge,
  setSquareMeters as _water_squareMeter,
} from "../store/slices/settings/waterSettingsSlice";
import { toDayjsObject } from "../utils/dateUtils";

function useFirebase() {
  const notifyContext = useContext(NotificationContext);
  const authContext = useContext(AuthContext);
  const dispatch = useAppDispatch();

  const user = authContext!.user as User;
  const { lastUpdateTime } = useAppSelector((state) => state.meter);

  const GetAllMeters = () => {
    const result: IMeter[] = [];
    const ref = collection(db, user.uid);
    const q = query(ref, orderBy("timestamp", "desc"));
    getDocs(q)
      .then((response) => {
        response.docs.forEach((item) => {
          result.push(item.data() as IMeter);
        });
      })
      .finally(() => {
        // Update the store
        dispatch(setMeters(result));

        // Update the last update time
        dispatch(setLastUpdateTime(Date.now()));
      });
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

        const electricy = data.electricity;
        dispatch(_electricy_basicPrice(electricy.basicPrice));
        dispatch(_electricy_consumption(electricy.consumption));
        dispatch(_electricy_consumptionType(electricy.consumptionType));
        dispatch(
          _electricy_contractDate(toDayjsObject(electricy.contractDate))
        );
        dispatch(_electricy_runtime(electricy.runtime));
        dispatch(_electricy_workingPrice(electricy.workingPrice));

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
    SaveSettings,
    GetSettings,
    UpdateMeter,
  };
}

export default useFirebase;