import { Box, Paper, Typography } from "@mui/material";
import { Message } from "../../../../../../models";
import { useStyles } from "./style";
import Cookie from "universal-cookie";
import { Fragment, memo } from "react";
import DateDivider from "./date-divider";
import moment from "moment";

const MessageComponent = (props: {
  currentMessage: Message;
  previousMessage: Message | null | undefined;
}) => {
  const { currentMessage, previousMessage } = props;
  const user_id = new Cookie().get("user_id");

  const classes = useStyles({
    user_id,
    currentMessage,
    previousMessage,
  });

  const currentTime = moment(currentMessage.createdAt).format("HH:mm");

  return (
    <Fragment>
      <DateDivider
        currentMessage={props.currentMessage}
        previousMessage={props.previousMessage}
      />
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
