import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";
import HeaderDrawer from "./HeaderDrawer";

const Header = () => {
  const authContext = useContext(AuthContext);

  const [open, setOpen] = useState<boolean>(false);
  const toggleDrawer = () => setOpen(!open);

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ py: 0.5 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            E C O M E T E R
          </Typography>

          <Button color="inherit" onClick={toggleDrawer}>
            {authContext && authContext.user ? (
              <Avatar
                alt={authContext.user.displayName || ""}
                src={authContext.user.photoURL || ""}
              />
            ) : (
              "Login"
            )}
          </Button>
        </Toolbar>
      </AppBar>
      <HeaderDrawer open={open} toggleDrawer={toggleDrawer} />
    </>
  );
};
export default Header;
