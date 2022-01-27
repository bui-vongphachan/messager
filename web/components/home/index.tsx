import React from "react";
import dynamic from "next/dynamic";
import { Box, Container, Grid } from "@mui/material";
import HomePageContextProvider from "./context";
import { useStyles } from "./style";
import ProfileListPanel from "./components/profile-list-panel";
import { GetHomePageQueryResponse } from "../../hooks";
const MessagePanel = dynamic(() => import("./components/message-panel"));

export default function RootHomePageComponent(props: {
  dataSet: GetHomePageQueryResponse;
}) {
  const classes = useStyles();
  return (
    <HomePageContextProvider dataSet={props.dataSet}>
      <Container>
        <Box className={classes.root}>
          <Grid container spacing={2}>
            <Grid className={classes.messageGrid} item xs={8}>
              <MessagePanel />
            </Grid>
            <Grid className={classes.messageGrid} item xs={4}>
              <ProfileListPanel />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </HomePageContextProvider>
  );
}
