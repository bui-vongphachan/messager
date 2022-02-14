import { Box } from "@mui/material";
import { useContext } from "react";
import { HomePageContext } from "../../context";
import MessagePanelBody, { MessagePanelBodyDummy } from "./body";
import MessagePanelFooter from "./footer";
import MessagePanelHeader, { MessagePanelHeaderDummy } from "./header";
import { useStyles } from "./style";
import { NextComponentType } from "next";

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
