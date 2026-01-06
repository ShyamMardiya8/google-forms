import { TextField } from "@mui/material";
import React from "react";

const AnswerBox = ({ defaultAnswerValue, setDefaultAnswerValue }) => {
  return (
    <>
      {defaultAnswerValue.map((item, index) => (
        <TextField variant="outlined" value={item.value} />
      ))}
    </>
  );
};

export default AnswerBox;
