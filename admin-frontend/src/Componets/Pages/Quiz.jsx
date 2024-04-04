import { Button } from "@mui/material";
import React, { useState } from "react";
import { ExamData } from "./ExamData";
import ExamResult from "./ExamResult";
import { BarChart } from "@mui/x-charts/BarChart";
const Quiz = () => {
  const [currentQustion, setcurrentQustion] = useState(0);
  const [score, setScore] = useState(0);
  const [select, setSelect] = useState(0);
  const [showResult, setshowResult] = useState(false);
  const [sec, setSec] = useState(30);

  const nextQustion = () => {
    updateScore();
    if (currentQustion < ExamData.length - 1) {
      setcurrentQustion(currentQustion + 1);
      setSelect(0);
    } else {
      setshowResult(true);
    }
  };

  const privQustion = () => {
    updateScore();
    if (currentQustion > ExamData.length - 1) {
      console.log(currentQustion);
      // setcurrentQustion(currentQustion);
    }
  };

  const updateScore = () => {
    if (select === ExamData[currentQustion].answer) {
      setScore(score + 1);
    }
  };
  const resetAll = () => {
    setshowResult(false);
    setcurrentQustion(0);
    setSelect(0);
    setScore(0);
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ height: "100px", width: "50px" }}>
          <BarChart
            xAxis={[
              { scaleType: "band", data: ["group A", "group B", "group C"] },
            ]}
            series={[
              { data: [4, 3, 1] },
              { data: [1, 6, 3] },
              { data: [2, 5, 6] },
            ]}
            width={300}
            height={400}
          />
        </div>
        <center>
          <div className="Container">
            <div></div>
            {showResult ? (
              <ExamResult
                score={score}
                totalScore={ExamData.length}
                tryAgain={resetAll}
              />
            ) : (
              <>
                <div className="qustion">
                  <span id="qustion-number">{currentQustion + 1}.</span>

                  <span id="qustion-text" style={{ margin: "5px" }}>
                    {ExamData[currentQustion].qustion}
                  </span>
                </div>
                <div className="option">
                  {ExamData[currentQustion].option.map((option, i) => {
                    return (
                      <button
                        className={`answer ${
                          select == i + 1 ? "ceecked" : null
                        }`}
                        key={i}
                        onClick={() => setSelect(i + 1)}
                      >
                        {String.fromCharCode("A".charCodeAt() + 1)} {option}
                      </button>
                    );
                  })}
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <Button
                    variant="outlined"
                    id="next"
                    value="next"
                    onClick={privQustion}
                  >
                    Priv
                  </Button>
                  <Button variant="outlined" id="next" value="next">
                    <div
                      className="timer"
                      onClick={(e) => {
                        setInterval(() => {
                          let n = parseInt(e.target.innerText);
                          if (n > 0) {
                            e.target.innerText = n - 1;
                          } else {
                            setshowResult(true);
                          }
                        }, 1000);
                      }}
                    >
                      30
                      <br />
                      start
                    </div>
                  </Button>
                  <Button
                    variant="outlined"
                    id="next"
                    value="next"
                    onClick={nextQustion}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
          </div>
        </center>
      </div>
    </>
  );
};

export default Quiz;
