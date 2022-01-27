import { Avatar, Box, ListItemAvatar, TextField, Toolbar } from "@mui/material";
import { useContext } from "react";
import { HomePageContext } from "../../../context";
import { useStyles } from "./style";

export default function MessagePanelHeader() {
  const { selectedProfile } = useContext(HomePageContext);
  const classes = useStyles();

  if (!selectedProfile) {
    return <Toolbar className={classes.toolbar}>MessagePanelFooter</Toolbar>;
  }

  return (
    <Toolbar className={classes.toolbar}>
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
