import {
  Avatar,
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Fragment, useContext } from "react";
import { ProfileWithPresence } from "../../../../../../models";
import { HomePageContext } from "../../../../context";
import { useStyles } from "./style";

const ProfileComponent = (props: { profile: ProfileWithPresence }) => {
  const context = useContext(HomePageContext);
  const { setSelectedProfile, selectedProfile } = context;
  const { profile } = props;
  const classes = useStyles({
    isSelected: profile?._id === selectedProfile?._id,
  });

  return (
    <Fragment>
      <ListItem
        className={classes.listItem}
        disablePadding
        alignItems="flex-start"
      >
        <ListItemButton onClick={() => setSelectedProfile!(profile)}>
          <ListItemAvatar>
            <Avatar
              className={classes.listItemAvatar}
              alt="Remy Sharp"
              src={profile.picture}
            />
          </ListItemAvatar>
          <ListItemText>
            <Box className={classes.listItemTextHeaderBox}>
              <Typography
                className={classes.listItemTextHeader}
                variant="body1"
              >
                {profile.name}
              </Typography>

              <Typography>
                {profile.status === "online"
                  ? profile.status
                  : profile.last_seen}
              </Typography>
            </Box>
            <Box className={classes.listItemTextBodyBox}>
              <Typography className={classes.listItemTextBody} variant="body2">
                ສະຖານະການສັ່ງຊື້ສິນຄ້າ ສະຖານະການສັ່ງຊື້ສິນຄ້າ
                ສະຖານະການສັ່ງຊື້ສິນຄ້າ
              </Typography>
            </Box>
          </ListItemText>
        </ListItemButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </Fragment>
  );
};

export default ProfileComponent;
