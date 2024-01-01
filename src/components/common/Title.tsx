import { Typography } from "@mui/material";

interface TitleProps {
  text: String;
}
const Title = ({ text }: TitleProps) => {
  return <Typography variant="h5">{text}</Typography>;
};
export default Title;
