import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  backIcon: {
    marginRight: "1rem",
  },
  toolbar: {
    border: "1px solid #e0e0e0",
    borderRadius: "0.5rem",
  },
}));
