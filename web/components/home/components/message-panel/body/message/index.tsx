import { Box, Paper, Typography } from "@mui/material";
import { Message } from "../../../../../../models";
import { useStyles } from "./style";
import Cookie from "universal-cookie";
import { Fragment, memo, useMemo } from "react";
import DateDivider from "./date-divider";
import moment from "moment";

const MessageComponent = (props: {
  current_index: number;
  messages: Message[];
}) => {
  const { current_index, messages } = props;
  const user_id = new Cookie().get("user_id");

  const classes = useStyles({ user_id, current_index, messages });

  const currentMessage = useMemo(() => {
    return messages[current_index];
  }, [messages, current_index]);

  const currentTime = useMemo(() => {
    return moment(currentMessage.createdAt).format("HH:mm");
  }, [currentMessage]);

  return (
    <Fragment>
      <DateDivider current_index={current_index} messages={messages} />
      <div id={currentMessage._id} className={classes.box}>
        <div className={classes.contentBox}>
          <Paper className={classes.paper}>
            <Box className={classes.messageHeader}>
              <Typography
                className={classes.messageHeaderText}
                variant="subtitle2"
              >
                {currentMessage.from.name}
              </Typography>
            </Box>
            <Box className={classes.messageBody}>
              <Typography variant="body1"> {currentMessage.text}</Typography>
              <div className={classes.messageTimeSent}>{currentTime}</div>
            </Box>
          </Paper>
        </div>
      </div>
    </Fragment>
  );
};

export default memo(MessageComponent);
