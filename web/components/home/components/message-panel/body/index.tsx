import { Box } from "@mui/material";
import { Fragment, useEffect, useMemo, useRef } from "react";
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
  const listRef = useRef<List | null>(null);
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

  const messages = useMemo(() => {
    if (GetMessagesResult.data) {
      if (GetMessagesResult.data.getMessages) {
        return GetMessagesResult.data.getMessages;
      }
    }
    return [];
  }, [GetMessagesResult]);

  useEffect(() => {
    if (messages.length > 0) {
      listRef.current?.scrollToRow(messages.length - 1);
    }
  }, [messages]);

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
              className={classes.virtualizedList}
              ref={listRef}
              height={height}
              width={width}
              rowCount={messages.length || 0}
              rowHeight={cache.current.rowHeight}
              deferredMeasurementCache={cache.current}
              scrollToIndex={messages.length || 0}
              rowRenderer={({ key, parent, index, style }) => {
                return (
                  <CellMeasurer
                    key={key}
                    cache={cache.current}
                    columnIndex={0}
                    rowIndex={index}
                    parent={parent}
                  >
                    <div style={{ ...style }}>
                      <MessageComponent
                        current_index={index}
                        messages={messages}
                      />
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
