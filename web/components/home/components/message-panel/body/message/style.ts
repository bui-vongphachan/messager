import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { Message } from "../../../../../../models";

export const useStyles = makeStyles((theme: Theme) => ({
  box: (props: {
    user_id: string;
    current_index: number;
    messages: Message[];
  }) => {
    const { user_id, current_index, messages } = props;

    const currentMessage = messages[current_index];
    const previousMessage = messages[current_index - 1];
    const nextMessage = messages[current_index + 1];

    const currentDate = moment(currentMessage.createdAt);
    const previousDate = moment(previousMessage?.createdAt);

    const timeDiff = currentDate.diff(previousDate, "minutes");

    const isOwn = currentMessage.from._id === user_id;
    const haveTimeGap = timeDiff >= 5;
    const newSender = currentMessage.from._id !== previousMessage?.from._id;

    return {
      display: "flex",
      flexDirection: "column",
      alignItems: isOwn ? "flex-end" : "flex-start",
      marginTop:
        haveTimeGap || !previousMessage || newSender ? "1.5rem" : "0.1rem",
      marginBottom: nextMessage ? ".1rem" : "2rem",
      marginLeft: "1rem",
    };
  },
  contentBox: () => {
    return { maxWidth: "75%" };
  },
  paper: {
    padding: ".3rem .7rem",
  },
  messageHeader: {},
  messageHeaderText: (props: {
    user_id: string;
    current_index: number;
    messages: Message[];
  }) => {
    const { user_id, current_index, messages } = props;

    const currentMessage = messages[current_index];
    const previousMessage = messages[current_index - 1];

    const newSender = currentMessage.from._id !== previousMessage?.from._id;

    return {
      cursor: "pointer",
      color: theme.palette.secondary.main,
      "&:hover": {
        color: theme.palette.secondary.dark,
      },
      display: newSender ? "block" : "none",
    };
  },
  messageBody: {
    minWidth: "70px",
  },
  messageTimeSent: {
    color: theme.palette.text.secondary,
    textAlign: "right",
    fontSize: "12px",
  },
}));
