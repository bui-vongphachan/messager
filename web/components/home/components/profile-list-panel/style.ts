import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  box: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    borderRadius: "0.5rem",
    backgroundColor: "white",
    padding: "0.5rem",
  },
  bodyHeader: {
    paddingTop: "0.5rem",
  },
}));
