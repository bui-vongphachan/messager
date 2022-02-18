import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  box: {
    height: "100%",
    overflowX: "hidden",
    backgroundColor: theme.palette.grey[100],
  },
  virtualizedList: {
    paddingRight: "1rem",
  },
  spinner: {
    margin: "1rem auto",
  },
}));
