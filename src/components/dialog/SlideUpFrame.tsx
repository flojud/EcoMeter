import { CloseOutlined } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Paper,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";

interface SlideUpFrameProps {
  children: ReactNode | any;
  title: string;
  open: boolean;
  onClose: () => void;
}

const SlideUpFrame = ({
  children,
  title,
  open,
  onClose,
}: SlideUpFrameProps) => {
  return (
    <Slide
      direction="up"
      in={open}
      onExited={onClose}
      unmountOnExit
      mountOnEnter
    >
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          height: "100%",
          width: "100%",
          background: "rgba(0, 0, 0, 0.37)",
          backdropFilter: "blur(5px)",
        }}
      >
        <Paper
          sx={(theme) => ({
            paddingTop: 3,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            maxHeight: "80%",
            width: "100%",
            position: "absolute",
            bottom: 0,
            paddingBottom: "env(safe-area-inset-bottom)",
            transitionProperty: "bottom",
            transitionDuration:
              theme.transitions.duration.enteringScreen + "ms",
            transitionTimingFunction: theme.transitions.easing.easeOut,
          })}
        >
          <Box
            sx={{
              height: "100%",
              width: "100%",
              padding: 2,
            }}
          >
            <Stack
              spacing={1}
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h5">{title}</Typography>
              <IconButton
                size="small"
                sx={(theme) => ({
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.secondary.contrastText,
                  },
                })}
                onClick={onClose}
              >
                <CloseOutlined fontSize="small" sx={{ color: "inherit" }} />
              </IconButton>
            </Stack>
            {children}
          </Box>
        </Paper>
      </Box>
    </Slide>
  );
};
export default SlideUpFrame;
