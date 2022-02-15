import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  box: (props: { isOwn: boolean }) => {
    return {
      display: "flex",
      flexDirection: "column",
      alignItems: props.isOwn ? "flex-end" : "flex-start",
    };
  },
  contentBox: () => {
    return { maxWidth: "75%" };
  },
  paper: {
    padding: ".5rem 1rem",
  },
  messageHeader: {},
  messageHeaderText: {
    cursor: "pointer",
    color: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.secondary.dark,
    },
    display: "none",
  },
  messageBody: {},
}));
