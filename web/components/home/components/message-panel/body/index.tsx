import { Box } from "@mui/material";
import { Fragment, Suspense, useEffect, useRef } from "react";
import { useGetMessages } from "../../../../../hooks";
import { useStyles } from "./style";
import { ProfileWithPresence } from "../../../../../models";

import CircularProgress from "@mui/material/CircularProgress";
import dynamic from "next/dynamic";
const MessageComponent = dynamic(() => import("./message"));

export default function MessagePanelBody(props: {
  selectedProfile: ProfileWithPresence | null | undefined;
}) {
  const { selectedProfile } = props;
  const bottomRef = useRef<HTMLDivElement>(null);
  const classes = useStyles();
  const [GetMessagesResult] = useGetMessages({
    profile: selectedProfile,
  });

  if (GetMessagesResult.loading) {
    return (
      <Box sx={{ display: "flex" }} className={classes.box}>
        <CircularProgress className={classes.spinner} />
      </Box>
    );
  }

  return (
    <Fragment>
      <Box className={classes.box}>
        <Suspense fallback={<div>Loading...</div>}>
          {GetMessagesResult.data?.getMessages?.map((message, num) => {
            return <MessageComponent key={num} message={message} />;
          })}
          <div ref={bottomRef} />
        </Suspense>
      </Box>
    </Fragment>
  );
}

export const MessagePanelBodyDummy = () => {
  const classes = useStyles();
  return <Box className={classes.box} />;
};
