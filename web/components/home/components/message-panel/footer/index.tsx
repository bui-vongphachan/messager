import { Box, TextField } from "@mui/material";
import { useFormik } from "formik";
import { KeyboardEvent, useContext, useRef } from "react";
import { useSendMessage } from "../../../../../hooks";
import { HomePageContext } from "../../../context";
import { useStyles } from "./style";

export default function MessagePanelFooter() {
  const textInputRef = useRef<HTMLInputElement>(null);
  const { selectedProfile } = useContext(HomePageContext);
  const [sendMessage] = useSendMessage();
  const classes = useStyles();

  const formik = useFormik({
    initialValues: { text: "" },
    onSubmit: async (values) => {
      if (values.text.length > 0) {
        await sendMessage({
          receiverId: selectedProfile!._id,
          text: values.text,
        });
        formik.setFieldValue("text", "");
        textInputRef?.current?.focus();
      }
    },
  });

  return (
    <Box className={classes.box}>
      <form onSubmit={(event) => event.preventDefault()}>
        <TextField
          autoFocus
          ref={textInputRef}
          className={classes.textField}
          id="text"
          name="text"
          label="ພິມຂໍ້ຄວາມ"
          variant="filled"
          disabled={!selectedProfile}
          value={formik.values.text}
          onChange={formik.handleChange}
          onKeyDown={async (e: KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Enter") {
              await formik.submitForm();
            }
          }}
        />
      </form>
    </Box>
  );
}
