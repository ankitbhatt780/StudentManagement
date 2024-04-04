import { Button } from "@mui/material";
import React from "react";

const ExamResult = (props) => {
  return (
    <div>
      <h1>Your Score:{props.score}</h1>
      <br />
      <h1> Total Score:{props.totalScore}</h1>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Button variant="outlined" id="next" value="next">
          Close
        </Button>
        <Button
          variant="outlined"
          id="next"
          value="next"
          onClick={props.tryAgain}
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default ExamResult;
