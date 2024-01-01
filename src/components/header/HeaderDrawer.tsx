import { Box, Drawer } from "@mui/material";
import { useState } from "react";
import Menu from "./Menu";
import LicenseList from "./license/LicenseList";

interface HeaderDrawerProps {
  open: boolean;
  toggleDrawer: () => void;
}

const HeaderDrawer = ({ open, toggleDrawer }: HeaderDrawerProps) => {
  const [activeMenuitem, setActiveMenuitem] = useState<string | null>(null);
  const handleOpenMenuitem = (item: string) => setActiveMenuitem(item);

  const handleDraerOnClose = () => {
    setActiveMenuitem(null);
    toggleDrawer();
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleDraerOnClose}>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          right: 0,
          zIndex: 9999,
          height: "100%",
          width: "75%",
          background: "rgba(0, 0, 0, 0.01)",
          backdropFilter: "blur(32px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            height: "100%",
            overflow: "auto",
            m: 2,
          }}
        >
          {activeMenuitem === null && (
            <Menu openMenuitem={handleOpenMenuitem} />
          )}
          {activeMenuitem === "licenses" && <LicenseList />}
        </Box>
      </Box>
    </Drawer>
  );
};
export default HeaderDrawer;
