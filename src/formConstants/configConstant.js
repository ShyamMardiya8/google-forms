import ConfigureInputField from "../defaultElements/InputField/Configure";
import PreviewInputField from "../defaultElements/InputField/Preview";
import ConfigureRadio from "../defaultElements/Radio/Configure";
import PreviewRadio from "../defaultElements/InputField/Preview";
import ConfigureSelect from "../defaultElements/Select/Configure";
import PreviewSelect from "../defaultElements/Select/Preview";

export const defaultFormConfigs = [
  {
    id: "inputField",
    label: "inputField",
    ConfigureComponent: ConfigureInputField,
    PreviewComponent: PreviewInputField,
  },
  {
    id: "radio",
    label: "Radio",
    ConfigureComponent: ConfigureRadio,
    PreviewComponent: PreviewRadio,
  },
  {
    id: "select",
    label: "Select",
    ConfigureComponent: ConfigureSelect,
    PreviewComponent: PreviewSelect,
  },
];
