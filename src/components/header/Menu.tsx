import { Divider, Link, ListItemText, MenuItem, MenuList } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";

interface MenuProps {
  openMenuitem: (item: string) => void;
}

const Menu = ({ openMenuitem }: MenuProps) => {
  const authContext = useContext(AuthContext);

  return (
    <MenuList>
      <MenuItem href="https://github.com/flojud" component={Link}>
        <ListItemText>Contact</ListItemText>
      </MenuItem>
      <MenuItem href="https://github.com/flojud/EcoMeter" component={Link}>
        <ListItemText>GitHub Repo</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => openMenuitem("licenses")}>
        <ListItemText>3rd Party Licenses</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={authContext?.authMethods.logout}>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </MenuList>
  );
};
export default Menu;
