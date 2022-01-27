import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: "auto",
    marginTop: "5rem",
    height: "80vh",
  },
  profileGrid: {},
  messageGrid: {
    height: "80vh",
  },
}));
