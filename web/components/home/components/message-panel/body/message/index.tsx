import { Box, Paper, Typography } from "@mui/material";
import { Message } from "../../../../../../models";
import { useStyles } from "./style";
import Cookie from "universal-cookie";
import { Suspense } from "react";

export default function MessageComponent(props: { message: Message }) {
  const user_id = new Cookie().get("user_id");
  const { message } = props;
  const classes = useStyles({
    isOwn: message.from._id === user_id,
  });

  return (
    <div id={message._id} className={classes.box}>
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </div>
  );
}
