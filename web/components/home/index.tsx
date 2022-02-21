import React, { useContext, useMemo } from "react";
import dynamic from "next/dynamic";
import { Box, Container, Grid, Hidden } from "@mui/material";
import HomePageContextProvider, { HomePageContext } from "./context";
import { useStyles } from "./style";
import ProfileListPanel from "./components/profile-list-panel";

const MessagePanel = dynamic(() => import("./components/message-panel"));

export default function RootHomePageComponent() {
  return (
    <HomePageContextProvider>
      <Layout />
    </HomePageContextProvider>
  );
}

const Layout = () => {
  const { selectedProfile } = useContext(HomePageContext);
  const classes = useStyles();

  const getCondition = useMemo(() => {
    return !selectedProfile;
  }, [selectedProfile]);

  return (
    <Container>
      <Box className={classes.root}>
        <Grid container spacing={2}>
          <Hidden mdDown={getCondition}>
            <Grid className={classes.messageGrid} item md={8} sm={12} xs={12}>
              <MessagePanel />
            </Grid>
          </Hidden>
          <Hidden mdDown={!!selectedProfile}>
            <Grid className={classes.messageGrid} item md={4} sm={12} xs={12}>
              <ProfileListPanel />
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </Container>
  );
};
