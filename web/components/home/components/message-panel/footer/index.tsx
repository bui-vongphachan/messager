import { Box } from "@mui/material";
import { useCallback, useContext } from "react";
import { useSendMessage } from "../../../../../hooks";
import { HomePageContext } from "../../../context";
import MessageField from "./MessageField";
import { useStyles } from "./style";

let num = 1;

export default function MessagePanelFooter() {
  const { selectedProfile } = useContext(HomePageContext);
  const [sendMessage] = useSendMessage()
  const classes = useStyles();

  const handleFormSubmit = useCallback(
    async (text: string) => {
      if (selectedProfile) {
        await sendMessage({
          receiverId: selectedProfile._id,
          text,
        });
      }
    },
    [sendMessage, selectedProfile]
  );

  return (
    <Box className={classes.box}>
      <form onSubmit={(event) => event.preventDefault()}>
        <MessageField
          handleFormSubmit={handleFormSubmit}
          selectedProfile={selectedProfile!}
        />
      </form>
    </Box>
  );
}
