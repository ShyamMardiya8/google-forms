import { Start } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Plus } from "lucide-react";
import AnswerBox from "../../component/AnswerBox";
import { useState } from "react";

const Configure = ({ initData }) => {
  console.log(initData, "121");
  const [defaultAnswerValue, setDefaultAnswerValue] = useState(
    initData.defaultAnswerValue
  );
  return (
    <div className="mt-2">
      <Button variant="outlined" startIcon={<Plus />} size="small">
        Add Question
      </Button>
      <AnswerBox
        defaultAnswerValue={defaultAnswerValue}
        setDefaultAnswerValue={setDefaultAnswerValue}
      />
    </div>
  );
};

export default Configure;
