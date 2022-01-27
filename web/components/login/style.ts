import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: "auto",
    marginTop: "5rem",
    backgroundColor: "white",
    padding: "3rem 2rem",
    maxWidth: "400px",
  },
  headerBox: {
    marginBottom: "2rem",
    textAlign: "center",
  },
  headerTypography: { color: theme.palette.primary.main },
  socialBox: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    marginBottom: "2rem",
  },
  socialButtons: {
    width: "100%",
  },
  dividerText: {
    color: theme.palette.text.secondary,
  },
  footerBox: {
    marginTop: "2rem",
  },
  loginButton: {
    width: "100%",
  },
}));
