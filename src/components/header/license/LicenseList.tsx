import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { ILicense } from "../../../interfaces/Types";
import inputJson from "../../../utils/licenses.json";

const LicenseList = () => {
  const convertedData: ILicense[] = Object.keys(inputJson).map((key) => {
    const item = inputJson[key as keyof typeof inputJson] as ILicense;
    return {
      name: key,
      licenses: item.licenses,
      repository: item.repository,
      publisher: item.publisher,
      url: item.url,
      path: item.path,
      licenseFile: item.licenseFile,
      email: item.email,
    };
  });

  console.log(convertedData);

  return (
    <Box height="100%" overflow="auto">
      {convertedData.map((data, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="caption">{data.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack>
              {data.publisher && (
                <Typography variant="caption">
                  Publisher: {data.publisher}
                </Typography>
              )}

              {data.licenses && (
                <Typography variant="caption">
                  License: {data.licenses}
                </Typography>
              )}

              {data.repository && (
                <Link href={data.repository} variant="caption">
                  Repository
                </Link>
              )}

              {data.url && (
                <Link href={data.url} variant="caption">
                  Website
                </Link>
              )}
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default LicenseList;
