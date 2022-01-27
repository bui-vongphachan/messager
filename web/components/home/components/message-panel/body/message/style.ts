import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  box: (props: { isOwn: boolean }) => {
    return {
      margin: "1rem",
      display: "flex",
      flexDirection: "column",
      alignItems: props.isOwn ? "flex-end" : "flex-start",
    };
  },
  paper: {
    maxWidth: "75%",
    padding: ".5rem 1rem",
  },
  messageHeader: {},
  messageHeaderText: {
    cursor: "pointer",
    color: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.secondary.dark,
    },
  },
  messageBody: {},
}));
