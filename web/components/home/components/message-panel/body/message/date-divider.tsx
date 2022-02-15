import { Divider } from "@mui/material";
import moment from "moment";
import { Message } from "../../../../../../models";

const DateDivider = (props: {
  currentMessage: Message;
  previousMessage: Message | null | undefined;
}) => {
  const { currentMessage, previousMessage } = props;

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
