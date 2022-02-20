import React from "react";
import dynamic from "next/dynamic";
import { Box, Container, Grid, Hidden } from "@mui/material";
import HomePageContextProvider from "./context";
import { useStyles } from "./style";
import ProfileListPanel from "./components/profile-list-panel";

const MessagePanel = dynamic(() => import("./components/message-panel"));

export default function RootHomePageComponent() {
  const classes = useStyles();
  return (
    <HomePageContextProvider>
      <Container>
        <Box className={classes.root}>
          <Grid container spacing={2}>
            <Grid className={classes.messageGrid} item md={8} sm={12} xs={12}>
              <MessagePanel />
            </Grid>
            <Hidden mdDown>
              <Grid className={classes.messageGrid} item xs={4}>
                <ProfileListPanel />
              </Grid>
            </Hidden>
          </Grid>
        </Box>
      </Container>
    </HomePageContextProvider>
  );
}
