import { Box, Paper, Typography } from "@mui/material";
import { Message } from "../../../../../../models";
import { useStyles } from "./style";
import Cookie from "universal-cookie";
import { Fragment, memo } from "react";
import DateDivider from "./date-divider";

const MessageComponent = (props: {
  currentMessage: Message;
  previousMessage: Message | null | undefined;
}) => {
  const user_id = new Cookie().get("user_id");
  const message = props.currentMessage;
  const classes = useStyles({
    isOwn: message.from._id === user_id,
  });

  return (
    <Fragment>
      <DateDivider
        currentMessage={props.currentMessage}
        previousMessage={props.previousMessage}
      />
      <div id={message._id} className={classes.box}>
        <div className={classes.contentBox}>
          <Paper className={classes.paper}>
            <Box className={classes.messageHeader}>
              <Typography
                className={classes.messageHeaderText}
                variant="subtitle2"
              >
                {message.from.name}
              </Typography>
            </Box>
            <Box className={classes.messageBody}>
              <Typography variant="body1"> {message.text}</Typography>
            </Box>
          </Paper>
        </div>
      </div>
    </Fragment>
  );
};

export default memo(MessageComponent);
