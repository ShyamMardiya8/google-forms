import { FormControlLabel } from "@mui/material";
import React from "react";
import IOSSwitch from "../../component/RadioButton";

const Configure = () => {
  return (
    <FormControlLabel control={<IOSSwitch sx={{ m: 1 }} defaultChecked />} />
  );
};

export default Configure;
