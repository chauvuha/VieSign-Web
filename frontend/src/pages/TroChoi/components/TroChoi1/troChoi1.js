import "./troChoi1.css";
import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { getShuffledArr } from "../../../../helper/getSuffledArr";
import axios from "axios";
import { allTopic } from "../../../../constants/constants";
import TextVideo from "../../../Hoc/components/TextVideo/textVideo";
import VideoText from "../../../Hoc/components/VideoText/videoText";
import VideoVideo from "../../../Hoc/components/VideoVideo/videoVideo";
import config from "../../../../config";

function TroChoi1({ topic, timeLeft }) {
  const [countdownProps, setCountdownProps] = useState({});
  const [displayBasic, setDisplayBasic] = useState(true);
  const [visible, setVisible] = useState(false);
  const [timesUp, setTimesUp] = useState(false);
  const [displayBasicPU, setdisplayBasicPU] = useState(false);
  const [videos, setVideos] = useState([]);
  const [questionStatus, setQuestionStatus] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questionVid, setQuestionVid] = useState([]);
  const [score, setScore] = useState(0);
  const [reload, setReload] = useState(false);

  const navigate = useNavigate();
  const listQuestion = allTopic.map((item) => item.question);
  useEffect(() => {
    axios
      .get(`${config.APP_API}/video/get-list-video-by-topic`, {
        params: {
          numberTopic: topic !== undefined ? topic : 3,
        },
      })
      .then((res) => {
        setVideos(res.data.listVideo);
        const listVid = res.data.listVideo;

        let arr = listVid.map((item, index) => {
          const arrAnswer = [
            {
              url: item.url,
              content: item.content,
              isCorrect: -1,
            },
            {
              url: listVid[index === listVid.length - 1 ? 0 : index + 1].url,
              content:
                listVid[index === listVid.length - 1 ? 0 : index + 1].content,
              isCorrect: -1,
            },
          ];

          const suffledArr = getShuffledArr(arrAnswer);

          return {
            url: item.url,
            type: Math.floor(Math.random() * 3),
            answer: suffledArr,
          };
        });

        setQuestionStatus(arr);

        const arr2 = listVid.map((item) => {
          let listContent = [];
          let wrongContent = "";
          for (let value of allTopic) {
            if (value.question === item.content) {
              listContent = value.answer;
            } else {
              wrongContent = value.answer[0];
            }
          }

          const arrAnswer2 = [
            {
              content:
                listContent[Math.floor(Math.random() * listContent.length)],
              isCorrect: -1,
            },
            {
              content: wrongContent,
              isCorrect: -1,
            },
          ];

          const suffledArr2 = getShuffledArr(arrAnswer2);

          return {
            url: item.url,
            content: item.content,
            answer: suffledArr2,
          };
        });

        setQuestionVid(arr2);
      });
  }, []);

  useEffect(() => {
    if (timesUp) {
      dialogFuncMap.displayBasicPU(true);
    }

    let s = 0;
    let amountCompleted = 0;
    for (let item of questionStatus) {
      for (let answer of item.answer) {
        if (answer.isCorrect === 1) {
          s += 10;
        }
        if (answer.isCorrect !== -1) {
          amountCompleted += 1;
        }
      }
    }

    for (let item of questionVid) {
      for (let answer of item.answer) {
        if (answer.isCorrect === 1) {
          s += 10;
        }
        if (answer.isCorrect !== -1) {
          amountCompleted += 1;
        }
      }
    }

    if (amountCompleted === 10) {
      dialogFuncMap.displayBasicPU(true);
    }

    setScore(s);
    window.onbeforeunload = function () {
      if (!reload && amountCompleted < 10) {
        let message = "Bạn có chắc muốn thoát trò chơi?";
        if (window.confirm(message)) return true;
        else return false;
      }
    };
  }, [timesUp, questionStatus, questionVid, reload]);

  const Completionist = () => <span>Hết giờ!</span>;

  const renderer = ({ hours, minutes, seconds, completed, api }) => {
    setCountdownProps(api);
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
    displayBasicPU: setdisplayBasicPU,
  };
  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="Quay lại"
          icon="pi pi-arrow-left"
          onClick={() => {
            navigate("/trochoi");
            onHide(name);
          }}
          className="p-button-text"
          id="no-play-game"
        />
        <Button
          label="Đồng ý"
          icon="pi pi-check"
          onClick={() => {
            countdownProps.start();
            onHide(name);
            setVisible(true);
          }}
          autoFocus
          id="yes-play-game"
        />
      </div>
    );
  };

  //POP-UP
  const renderFooter1 = (name) => {
    return (
      <div>
        <Button
          label="Chơi lại"
          icon="pi pi-replay"
          onClick={() => {
            onHide(name);
            navigate(0);
          }}
          className="p-button-text"
          id="no-play-game"
        />
        <Button
          label="Quay lại"
          icon="pi pi-arrow-left"
          onClick={() => {
            onHide(name);
            navigate("/trochoi");
          }}
          autoFocus
          id="yes-play-game"
        />
      </div>
    );
  };

  //Thanh scroll on the right
  const handleClickQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const handleUnderstand = () => {
    let arr;
    if (questionStatus.length === videos.length) {
      arr = [...questionStatus];

      setQuestionStatus(arr);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const footer = (
    <span>
      {currentQuestion < 10 && (
        <Button
          className="understand-btn"
          label={"Câu kế tiếp"}
          onClick={handleUnderstand}
        />
      )}
    </span>
  );
  //set câu trả lời cho dạng text video và video text
  const setAnswerLeft = () => {
    let arr = [...questionStatus];
    if (
      arr[currentQuestion - 1].url === arr[currentQuestion - 1].answer[0].url
    ) {
      arr[currentQuestion - 1].answer[0] = {
        ...arr[currentQuestion - 1].answer[0],
        isCorrect: 1,
      };
    } else {
      arr[currentQuestion - 1].answer[0] = {
        ...arr[currentQuestion - 1].answer[0],
        isCorrect: 0,
      };
    }
    setQuestionStatus(arr);
  };

  const setAnswerRight = () => {
    let arr = [...questionStatus];
    if (
      arr[currentQuestion - 1].url === arr[currentQuestion - 1].answer[0].url
    ) {
      arr[currentQuestion - 1].answer[1] = {
        ...arr[currentQuestion - 1].answer[1],
        isCorrect: 1,
      };
    } else {
      arr[currentQuestion - 1].answer[1] = {
        ...arr[currentQuestion - 1].answer[1],
        isCorrect: 1,
      };
    }
    setQuestionStatus(arr);
  };

  //set câu trả lời cho dạng video video
  const setAnswerLeftVideo = () => {
    let arr = [...questionVid];
    if (
      arr[currentQuestion - 1].content ===
      arr[currentQuestion - 1].answer[0].content
    ) {
      arr[currentQuestion - 1].answer[0] = {
        ...arr[currentQuestion - 1].answer[0],
        isCorrect: 1,
      };
    } else {
      arr[currentQuestion - 1].answer[0] = {
        ...arr[currentQuestion - 1].answer[0],
        isCorrect: 0,
      };
    }
    setQuestionVid(arr);
  };

  const setAnswerRightVideo = () => {
    let arr = [...questionVid];
    if (
      arr[currentQuestion - 1].content ===
      arr[currentQuestion - 1].answer[1].content
    ) {
      arr[currentQuestion - 1].answer[1] = {
        ...arr[currentQuestion - 1].answer[1],
        isCorrect: 1,
      };
    } else {
      arr[currentQuestion - 1].answer[1] = {
        ...arr[currentQuestion - 1].answer[1],
        isCorrect: 1,
      };
    }
    setQuestionVid(arr);
  };

  return (
    <div className="p-grid flexcard" id="game1">
      <Dialog
        header="Nhiệm vụ:"
        visible={displayBasic}
        style={{ width: "50vw" }}
        footer={renderFooter("displayBasic")}
        onHide={() => onHide("displayBasic")}
      >
        <div>
          <p>
            Hãy hoàn thành tất cả các câu hỏi trong chỉ 3 phút. Nếu hoàn thành
            thử thách này, bạn sẽ được thưởng x điểm!
          </p>
        </div>
      </Dialog>

      <div className="p-col-0 p-sm-2">
      </div>

      {visible && (
        <div className="tracnghiem-body game-tracnghiem p-col-12 p-sm-6">
          <div className="p-grid point-game2">
            <div className="p-col-8">Điểm số hiện tại</div>
            <div className="p-col-4 p-text-right">{score}</div>
          </div>
          <div className="learn-card">
            <Card footer={footer} className="card-game1" >
              {questionStatus[currentQuestion - 1]?.type === 0 && (
                <TextVideo
                  answer={questionStatus[currentQuestion - 1].answer}
                  setAnswerLeft={setAnswerLeft}
                  setAnswerRight={setAnswerRight}
                  content={videos[currentQuestion - 1].content}
                />
              )}
              {questionStatus[currentQuestion - 1]?.type === 1 && (
                <VideoText
                  answer={questionStatus[currentQuestion - 1].answer}
                  setAnswerLeft={setAnswerLeft}
                  setAnswerRight={setAnswerRight}
                  url={videos[currentQuestion - 1].url}
                />
              )}
              {questionStatus[currentQuestion - 1]?.type === 2 &&
                listQuestion.includes(videos[currentQuestion - 1]?.content) && (
                  <VideoVideo
                    answer={questionVid[currentQuestion - 1].answer}
                    setAnswerLeft={setAnswerLeftVideo}
                    setAnswerRight={setAnswerRightVideo}
                    url={videos[currentQuestion - 1].url}
                    videos={videos}
                  />
                )}
              {questionStatus[currentQuestion - 1]?.type === 2 &&
                !listQuestion.includes(
                  videos[currentQuestion - 1]?.content
                ) && (
                  <VideoText
                    answer={questionStatus[currentQuestion - 1].answer}
                    setAnswerLeft={setAnswerLeft}
                    setAnswerRight={setAnswerRight}
                    url={videos[currentQuestion - 1].url}
                  />
                )}
            </Card>
          </div>

        </div>

      )}
      <div className=" p-col-12 p-sm-2">
        <div className="col-time-question">
          <div className="p-grid" id="time-game">
            <div className="p-col-8">Thời gian còn lại</div>
            <div className="p-col-4">
              <Countdown
                date={timeLeft} //1800000
                renderer={renderer}
                autoStart={false}
                onComplete={() => {
                  setTimesUp(true);
                  setReload(true);
                }}
              />
            </div>
          </div>

          <div>
            {questionStatus
              .filter((_, index) => index < 10)
              .map((_, index) => (
                <>
                  <Button
                    className="btn-question"
                    onClick={() => handleClickQuestion(index + 1)}
                  >
                    <span
                      className={`question-game ${currentQuestion === index + 1 ? "current" : ""
                        }`}
                    >
                      Câu {index + 1}
                    </span>
                    <span className="point-game"> 10 điểm</span>
                  </Button>
                </>
              ))}

            <div>
              <Button className="btn-done-game">
                <div
                  className="p-button-label"
                  style={{ textAlign: "center" }}
                  onClick={() => navigate(0)}
                >
                  Chơi lại
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>


      <>
        <Dialog
          visible={displayBasicPU}
          style={{ width: "50vw" }}
          footer={renderFooter1("displayBasicPU")}
          onHide={() => onHide("displayBasicPU")}
        >
          <div className="congra-img">
            <img
              src={
                require("../../../../assets/images/congratulations.png").default
              }
            />
          </div>
          <div className="congra-txt">
            <p style={{ color: "#026670" }}>
              Chúc mừng bạn đã hoàn thành với điểm số là:
            </p>
            <p className="congra-score">{score}</p>
          </div>
        </Dialog>
      </>
      <div className="p-col-0 p-sm-2"></div>
    </div>
  );
}

export default TroChoi1;
