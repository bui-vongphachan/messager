import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  box: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: "0.5rem",
    borderRadius: "0.5rem",
  },
}));
