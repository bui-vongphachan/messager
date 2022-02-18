import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  dateDividerText: {
    color: theme.palette.text.secondary,
  },
}));
