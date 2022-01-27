import { Box } from "@mui/material";
import { useContext } from "react";
import dynamic from "next/dynamic";
import { HomePageContext } from "../../context";
import { MessagePanelBodyDummy } from "./body";
import MessagePanelFooter from "./footer";
import { MessagePanelHeaderDummy } from "./header";
import { useStyles } from "./style";
import { NextComponentType } from "next";

const MessagePanelBody = dynamic(() => import("./body"));
const MessagePanelHeader = dynamic(() => import("./header"));

const MessagePanel: NextComponentType = () => {
  const { selectedProfile } = useContext(HomePageContext);
  const classes = useStyles();

  if (!selectedProfile) {
    return (
      <Box className={classes.box}>
        <MessagePanelHeaderDummy />
        <MessagePanelBodyDummy />
      </Box>
    );
  }

  return (
    <Box className={classes.box}>
      <MessagePanelHeader />
      <MessagePanelBody selectedProfile={selectedProfile} />
      <MessagePanelFooter />
    </Box>
  );
};

export default MessagePanel;
