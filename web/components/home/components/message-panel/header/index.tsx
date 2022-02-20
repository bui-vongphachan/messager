import {
  Avatar,
  Box,
  IconButton,
  ListItemAvatar,
  Toolbar,
} from "@mui/material";
import { useCallback, useContext } from "react";
import { HomePageContext } from "../../../context";
import { useStyles } from "./style";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function MessagePanelHeader() {
  const { selectedProfile, setSelectedProfile } = useContext(HomePageContext);
  const classes = useStyles();

  const clearSelectedProfile = useCallback(() => {
    if (setSelectedProfile) {
      setSelectedProfile(null);
    }
  }, [setSelectedProfile]);

  if (!selectedProfile) {
    return <Toolbar className={classes.toolbar}>MessagePanelFooter</Toolbar>;
  }

  return (
    <Toolbar className={classes.toolbar}>
      <Box className={classes.backIcon}>
        <IconButton aria-label="delete" onClick={clearSelectedProfile}>
          <ArrowBackIcon />
        </IconButton>
      </Box>

      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={selectedProfile?.picture} />
      </ListItemAvatar>
      {selectedProfile?.name}
    </Toolbar>
  );
}

export const MessagePanelHeaderDummy = () => {
  const classes = useStyles();
  return <Toolbar className={classes.toolbar} />;
};
