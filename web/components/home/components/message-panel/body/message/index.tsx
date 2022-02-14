import { Box, Paper, Typography } from "@mui/material";
import { Message } from "../../../../../../models";
import { useStyles } from "./style";
import Cookie from "universal-cookie";
import { memo } from "react";

const MessageComponent = (props: { message: Message }) => {
  const user_id = new Cookie().get("user_id");
  const { message } = props;
  const classes = useStyles({
    isOwn: message.from._id === user_id,
  });

  return (
    <div id={message._id} className={classes.box}>
      <div style={{ maxWidth: "75%" }}>
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
  );
};

export default memo(MessageComponent);
