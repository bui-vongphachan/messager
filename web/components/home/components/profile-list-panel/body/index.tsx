import { Box, List } from "@mui/material";
import dynamic from "next/dynamic";
import { useContext } from "react";
import { HomePageContext } from "../../../context";
import { useStyles } from "./style";

const ProfileComponent = dynamic(() => import("./profile"));

export default function ProfileListBody() {
  const context = useContext(HomePageContext);
  const { selectedProfile } = context;

  const classes = useStyles({
    selectedProfile: selectedProfile,
  });

  const profiles = context.dataSet?.getFacebookProfiles;

  return (
    <Box className={classes.box}>
      <Box className={classes.list}>
        <List className={classes.list}>
          {profiles?.map((profile, num) => {
            return <ProfileComponent key={num} profile={profile} />;
          })}
        </List>
      </Box>
    </Box>
  );
}
