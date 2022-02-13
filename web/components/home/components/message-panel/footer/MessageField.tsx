import { TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useRef, KeyboardEvent, useState } from "react";
import { SendMessageVariables } from "../../../../../hooks";
import { ProfileWithPresence } from "../../../../../models";
import { useStyles } from "./style";

const MessageField = (props: {
  handleFormSubmit: (text: string) => void;
  selectedProfile: ProfileWithPresence;
}) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const classes = useStyles();
  const [message, setMessage] = useState("");

  return (
    <TextField
      autoFocus
      ref={textInputRef}
      className={classes.textField}
      id="text"
      name="text"
      label="ພິມຂໍ້ຄວາມ"
      variant="filled"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={async (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
          props.handleFormSubmit(message);
          setMessage("");
          textInputRef.current?.focus();
        }
      }}
    />
  );
};

export default React.memo(MessageField);
