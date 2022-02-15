import { Box } from "@mui/material";
import { Fragment, useRef } from "react";
import { useGetMessages } from "../../../../../hooks";
import { useStyles } from "./style";
import { ProfileWithPresence } from "../../../../../models";
import CircularProgress from "@mui/material/CircularProgress";
import MessageComponent from "./message";
import {
  List,
  AutoSizer,
  CellMeasurerCache,
  CellMeasurer,
} from "react-virtualized";

export default function MessagePanelBody(props: {
  selectedProfile: ProfileWithPresence | null | undefined;
}) {
  const cache = useRef(
    new CellMeasurerCache({
      defaultHeight: 50,
      fixedWidth: true,
    })
  );
  const classes = useStyles();
  const [GetMessagesResult] = useGetMessages({
    profile: props.selectedProfile,
  });

  if (GetMessagesResult.loading && !GetMessagesResult.data) {
    return (
      <Box sx={{ display: "flex" }} className={classes.box}>
        <CircularProgress className={classes.spinner} />
      </Box>
    );
  }

  if (GetMessagesResult.error || !GetMessagesResult.data) {
    return (
      <Box sx={{ display: "flex" }} className={classes.box}>
        <Box sx={{ color: "red" }}>
          Error:{" "}
          {GetMessagesResult.error ? GetMessagesResult.error.message : ""}
        </Box>
      </Box>
    );
  }

  return (
    <Fragment>
      <Box className={classes.box}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              rowCount={GetMessagesResult.data?.getMessages.length || 0}
              rowHeight={cache.current.rowHeight}
              deferredMeasurementCache={cache.current}
              scrollToIndex={GetMessagesResult.data?.getMessages.length || 0}
              rowRenderer={({ key, parent, index, style }) => {
                const message = GetMessagesResult.data?.getMessages[index];
                return (
                  <CellMeasurer
                    key={key}
                    cache={cache.current}
                    columnIndex={0}
                    rowIndex={index}
                    parent={parent}
                  >
                    <div style={{ ...style }}>
                      <MessageComponent message={message!} />
                    </div>
                  </CellMeasurer>
                );
              }}
            />
          )}
        </AutoSizer>
      </Box>
    </Fragment>
  );
}

export const MessagePanelBodyDummy = () => {
  const classes = useStyles();
  return <Box className={classes.box} />;
};
