import { Add, Edit, FileUpload } from "@mui/icons-material";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setOpenElectricityTableForm,
  setOpenGasTableForm,
  setOpenImportMeterForm,
  setOpenMeterForm,
} from "../../store/slices/dialogSlice";
import { ZINDEX_ACTION_DIAL } from "../../utils/zIndexes";

const ActionDial = () => {
  const { item } = useAppSelector((state) => state.menu);
  const dispatch = useAppDispatch();

  const handleEditClick = () => {
    switch (item) {
      case 0:
        return dispatch(setOpenGasTableForm(true));
      case 1:
        return dispatch(setOpenElectricityTableForm(true));
      case 2:
        return dispatch(setOpenMeterForm(true));
    }
  };

  return item === 0 || item === 1 || item === 2 ? (
    <SpeedDial
      sx={{
        position: "fixed",
        right: "10%",
        bottom: "10%",
        zIndex: ZINDEX_ACTION_DIAL,
      }}
      icon={<SpeedDialIcon />}
      ariaLabel="Action Dial"
    >
      <SpeedDialAction
        icon={<Add />}
        tooltipTitle="Add"
        onClick={() => dispatch(setOpenMeterForm(true))}
      />
      <SpeedDialAction
        icon={<Edit />}
        tooltipTitle="Edit"
        onClick={handleEditClick}
      />
      <SpeedDialAction
        icon={<FileUpload />}
        tooltipTitle="Import"
        onClick={() => dispatch(setOpenImportMeterForm(true))}
      />
    </SpeedDial>
  ) : (
    <></>
  );
};
export default ActionDial;
