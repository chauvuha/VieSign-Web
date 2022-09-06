import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import { Button } from "primereact/button";
import "../../tracNghiem.css";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { VirtualScroller } from "primereact/virtualscroller";
import { classNames } from "primereact/utils";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import TextVideo from "../TextVideo/textVideo";
import VideoText from "../VideoText/videoText";
import VideoVideo from "../VideoVideo/videoVideo";
import { topic1 } from "../../../../constants/constants";
import { getShuffledArr } from "../../../../helper/getSuffledArr";
import config from "../../../../config";

// const getShuffledArr = (arr) => {
//   const newArr = arr.slice();
//   for (let i = newArr.length - 1; i > 0; i--) {
//     const rand = Math.floor(Math.random() * (i + 1));
//     [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
//   }
//   return newArr;
// };

const Revision = ({ topic, nameTopic, setPart, part, amount }) => {
  // Dialog
  const [displayBasic, setDisplayBasic] = useState(true);
  const [displayNextPart, setDisplayNextPart] = useState(false);
  const [visible, setVisible] = useState(false);
  const [videos, setVideos] = useState([]);
  const [questionStatus, setQuestionStatus] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questionVid, setQuestionVid] = useState([]);
  const [user, setUser] = useState({});

  const listQuestion = topic1.map((item) => item.question);

  useEffect(() => {
    axios
      .get(`${config.APP_API}/video/all-video`, {
        params: {
          numberTopic: topic,
        },
      })
      .then((res) => {
        setVideos(res.data.allVideo);
        const listVid = res.data.allVideo.slice(0, amount);

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
            disabled: true,
            url: item.url,
            content: item.content,
            type: Math.floor(Math.random() * 3),
            answer: suffledArr,
          };
        });

        arr[0].disabled = false;
        console.log(arr);
        setQuestionStatus(arr);

        const arr2 = listVid.map((item) => {
          let listContent = [];
          let wrongContent = "";
          for (let value of topic1) {
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

    axios
      .get(`${config.APP_API}/user/get-user-id`, {
        params: { id: JSON.parse(window.localStorage.getItem("id")) },
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Thanh scroll on the right
  const handleClickQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const basicItems = questionStatus.map((_, i) => `Câu ${i + 1}`);

  const basicItemTemplate = (item, options) => {
    const className = classNames(
      `scroll-item-learn p-p-2 ${
        currentQuestion === options.index + 1 ? "current" : ""
      }`,
      {
        odd: options.odd,
      }
    );
    const style =
      options.props.orientation === "horizontal"
        ? { width: "50px" }
        : { height: "50px" };

    return (
      <Button
        className={className}
        style={style}
        disabled={questionStatus[options.index].disabled}
        onClick={() => handleClickQuestion(options.index + 1)}
      >
        {item}
      </Button>
    );
  };

  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
    displayNextPart: setDisplayNextPart,
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

  const renderFooter = (name) => {
    return (
      <div>
        {name === "displayBasic" ? (
          <Button
            label="OK"
            icon="pi pi-check"
            onClick={() => {
              onHide(name);
              setVisible(true);
            }}
            autoFocus
            id="yes-play-game"
          />
        ) : (
          <Button
            label="Trở lại"
            icon="pi pi-check"
            onClick={() => {
              onHide(name);
              setPart(-1);
            }}
            autoFocus
            id="yes-play-game"
          />
        )}
      </div>
    );
  };

  const handleUnderstand = () => {
    let arr;
    if (
      questionStatus.length === amount &&
      questionStatus.filter((item) => item.disabled === true).length > 0
    ) {
      arr = [...questionStatus];
      arr[currentQuestion].disabled = false;
      setQuestionStatus(arr);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      let info;
      if (part === 4) {
        info = {
          _id: JSON.parse(window.localStorage.getItem("id")),
          topic: topic,
          part: user.part <= part ? part + 1 : user.part,
        };
      }
      if(part === 5) {
        info = {
          _id: JSON.parse(window.localStorage.getItem("id")),
          topic: topic + 1,
          part: 1,
        };
      }
      axios
        .post(
          `${config.APP_API}/user/update-user`,
          JSON.stringify(info),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
        });
      setDisplayNextPart(true);
    }
  };

  const footer = (
    <span>
      <Button
        className="understand-btn"
        label={currentQuestion !== amount ? "Câu kế tiếp" : "Hoàn thành"}
        onClick={handleUnderstand}
        disabled={
          questionStatus[currentQuestion - 1]?.answer[0].isCorrect === -1 &&
          questionStatus[currentQuestion - 1]?.answer[1].isCorrect === -1 &&
          questionVid[currentQuestion - 1]?.answer[0].isCorrect === -1 &&
          questionVid[currentQuestion - 1]?.answer[1].isCorrect === -1
            ? true
            : false
        }
      />
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
        isCorrect: 0,
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
    <>
      <Button
        label="Quay lại"
        icon="pi pi-arrow-left"
        onClick={() => {
          setPart(-1);
        }}
        className="p-button-text"
        id="no-play-game"
      />
      <Dialog
        header="Chào hỏi"
        visible={displayBasic}
        style={{ width: "50vw" }}
        footer={renderFooter("displayBasic")}
        onHide={() => onHide("displayBasic")}
      >
        <p>Trong phần ôn tập này, các bạn sẽ làm những câu hỏi dạng sau:</p>
        <p>1. Chọn từ đúng cho video</p>
        <p>2. Chọn video đúng với từ vựng</p>
        <p>3. Chọn video đúng với video</p>
      </Dialog>
      {visible && (
        <div className="tracnghiem-body p-grid">
          <div className="p-col-0 p-sm-2"></div>
          <div className="learn-card p-col-12 p-sm-6">
            <Card footer={footer}>
              {questionStatus[currentQuestion - 1].type === 0 && (
                <TextVideo
                  answer={questionStatus[currentQuestion - 1].answer}
                  setAnswerLeft={setAnswerLeft}
                  setAnswerRight={setAnswerRight}
                  content={videos[currentQuestion - 1].content}
                />
              )}
              {questionStatus[currentQuestion - 1].type === 1 && (
                <VideoText
                  answer={questionStatus[currentQuestion - 1].answer}
                  setAnswerLeft={setAnswerLeft}
                  setAnswerRight={setAnswerRight}
                  url={videos[currentQuestion - 1].url}
                />
              )}
              {questionStatus[currentQuestion - 1].type === 2 &&
                listQuestion.includes(videos[currentQuestion - 1].content) && (
                  <VideoVideo
                    answer={questionVid[currentQuestion - 1].answer}
                    setAnswerLeft={setAnswerLeftVideo}
                    setAnswerRight={setAnswerRightVideo}
                    url={videos[currentQuestion - 1].url}
                    videos={videos}
                  />
                )}
              {questionStatus[currentQuestion - 1].type === 2 &&
                !listQuestion.includes(videos[currentQuestion - 1].content) && (
                  <VideoText
                    answer={questionStatus[currentQuestion - 1].answer}
                    setAnswerLeft={setAnswerLeft}
                    setAnswerRight={setAnswerRight}
                    url={videos[currentQuestion - 1].url}
                  />
                )}
            </Card>
          </div>
          <div className="learn-card-sidebar p-col-12 p-sm-3">
            <Card>
              <div className="learn-card-sidebar-header">
                <h2>Chủ đề {topic}</h2>
                <h3>{nameTopic}</h3>
              </div>
              <VirtualScroller
                items={basicItems}
                itemSize={50}
                itemTemplate={basicItemTemplate}
              />
            </Card>
          </div>
          <div className="p-col-0 p-sm-1"></div>
        </div>
      )}
      <Dialog
        header="Thông báo"
        visible={displayNextPart}
        style={{ width: "50vw" }}
        footer={renderFooter("displayNextPart")}
        onHide={() => onHide("displayNextPart")}
      >
        <p>Chúc mừng bạn đã hoàn thành phần {part}</p>
      </Dialog>
    </>
  );
};

export default Revision;
