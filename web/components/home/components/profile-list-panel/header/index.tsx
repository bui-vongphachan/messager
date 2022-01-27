import { Avatar, ListItemAvatar, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { HomePageContext } from "../../../context";
import { useStyles } from "./style";

export default function ProfileListHeader() {
  const context = useContext(HomePageContext);
  const classes = useStyles();

  const profile = context.dataSet?.getMyFacebookProfile;

  return (
    <Toolbar className={classes.toolbar}>
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={profile?.picture} />
      </ListItemAvatar>
      {profile?.name}
    </Toolbar>
  );
}
