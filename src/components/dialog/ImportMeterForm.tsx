import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setOpenImportMeterForm } from "../../store/slices/dialogSlice";
import SlideUpFrame from "./SlideUpFrame";

const ImportMeterForm = () => {
  const { openImportMeterForm } = useAppSelector((state) => state.dialog);
  const dispatch = useAppDispatch();

  const onClose = () => dispatch(setOpenImportMeterForm(false));
  return (
    <SlideUpFrame
      title="Import Meters"
      open={openImportMeterForm}
      onClose={onClose}
    >
      TODO ImportMeterForm implementation
    </SlideUpFrame>
  );
};
export default ImportMeterForm;
