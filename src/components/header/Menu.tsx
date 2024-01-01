import {
  Divider,
  Link,
  ListItemText,
  MenuItem,
  MenuList,
  Stack,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import packageJson from "../../../package.json";
import { AuthContext } from "../../contexts/AuthContextProvider";

interface MenuProps {
  openMenuitem: (item: string) => void;
}

const Menu = ({ openMenuitem }: MenuProps) => {
  const authContext = useContext(AuthContext);

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      alignItems="flex-start"
      spacing={2}
      sx={{ height: "100%" }}
    >
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
      <Typography variant="caption">Version v{packageJson.version}</Typography>
    </Stack>
  );
};
export default Menu;
