import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  /* box: {
    flex: "1 1 0",
    height: "100%",
    display: "flex",
    flexDirection: "column-reverse",
    overflowX: "hidden",
    overflowY: "scroll",
    margin: "0.5rem 0",
    backgroundColor: theme.palette.grey[100],
  }, */
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
