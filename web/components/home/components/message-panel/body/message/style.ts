import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { Message } from "../../../../../../models";

export const useStyles = makeStyles((theme: Theme) => ({
  box: (props: {
    user_id: string;
    currentMessage: Message;
    previousMessage: Message | null | undefined;
  }) => {
    const { user_id, currentMessage, previousMessage } = props;

    const currentDate = moment(currentMessage.createdAt);
    const previousDate = moment(previousMessage?.createdAt);

    const timeDiff = currentDate.diff(previousDate, "minutes");

    const isOwn = currentMessage.from._id === user_id;
    const haveTimeGap = timeDiff >= 5;

    return {
      display: "flex",
      flexDirection: "column",
      alignItems: isOwn ? "flex-end" : "flex-start",
      marginTop: haveTimeGap ? "1.5rem" : "0.1rem",
      marginBottom: "0.1rem",
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
  messageHeaderText: {
    cursor: "pointer",
    color: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.secondary.dark,
    },
    display: "none",
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
