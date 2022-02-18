import { Divider } from "@mui/material";
import moment from "moment";
import { useMemo } from "react";
import { Message } from "../../../../../../models";

const DateDivider = (props: { current_index: number; messages: Message[] }) => {
  const { current_index, messages } = props;

  const { currentMessage, previousMessage } = useMemo(() => {
    return {
      currentMessage: messages[current_index],
      previousMessage: messages[current_index - 1],
    };
  }, [messages, current_index]);

  if (!previousMessage) {
    return null;
  }

  const currentDate = moment(currentMessage.createdAt).format("YYYY-MM-DD");
  const previousDate = moment(previousMessage.createdAt).format("YYYY-MM-DD");

  const result = moment(currentDate).isSame(previousDate, "day");

  if (result) {
    return null;
  }

  const today = moment(currentMessage.createdAt).format("DD - MM - YYYY");

  return (
    <Divider
      style={{
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      {today}
    </Divider>
  );
};

export default DateDivider;
