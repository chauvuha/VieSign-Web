import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import { Button } from "primereact/button";
import "../../tracNghiem.css";
import { useEffect, useState, Suspense } from "react";
import { classNames } from "primereact/utils";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { getShuffledArr } from "../../../../helper/getSuffledArr";
import config from "../../../../config";
import Question from "./Question";

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
  const [allTopic, setAllTopic] = useState([]);
  const [listQuestion, setListQuestion] = useState([]);

  useEffect(() => {
    if (allTopic?.length > 0) {
      axios
        .get(`${config.APP_API}/video/all-video`, {
          params: {
            numberTopic: topic,
          },
        })
        .then((res) => {
          setVideos(res.data.allVideo);
          const listVid = res.data.allVideo.slice(0, amount);
          if (allTopic?.find((item) => item.topic === topic) !== undefined) {
            let arr = listVid.map((item, index) => {
              const arrAnswer = [
                {
                  url: item.url,
                  content: item.content,
                  isCorrect: -1,
                },
                {
                  url: listVid[index === listVid.length - 1 ? 0 : index + 1]
                    .url,
                  content:
                    listVid[index === listVid.length - 1 ? 0 : index + 1]
                      .content,
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
            setQuestionStatus(arr);

            const arr2 = listVid.map((item) => {
              let listContent = [];
              let wrongContent = "";
              for (let value of allTopic.find((item) => item.topic === topic)
                .listQuestion) {
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
          }
        });
    }

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
  }, [allTopic, amount, topic]);

  // Thanh scroll on the right
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
      let score = 0;
      for (let item of questionStatus) {
        if (
          !item.disabled &&
          (item.answer[0].isCorrect === 1 || item.answer[1].isCorrect === 1)
        ) {
          score += 10;
        }
      }
      let userScore = [...user.score];

      if (part === 4) {
        if (userScore.filter((item) => item.topic === topic).length === 0) {
          userScore.push({ topic: topic, score: score });
        } else {
          let index = 0;
          for (let i = 0; i < userScore.length; i++) {
            if (userScore[i].topic === topic) {
              index = i;
            }
          }
          userScore[index].score = score;
        }
        info = {
          _id: JSON.parse(window.localStorage.getItem("id")),
          topic: topic,
          part: user.part <= part ? part + 1 : user.part,
          score: userScore,
        };
      }
      if (part === 5) {
        let index = 0;
        for (let i = 0; i < userScore.length; i++) {
          if (userScore[i].topic === topic) {
            index = i;
          }
        }
        userScore[index].score += score;
        info = {
          _id: JSON.parse(window.localStorage.getItem("id")),
          topic: topic + 1,
          part: 1,
          score: userScore,
        };
      }
      axios
        .post(`${config.APP_API}/user/update-user`, JSON.stringify(info), {
          headers: {
            "Content-Type": "application/json",
          },
        })
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
      <Suspense fallback={<div>Loading ...</div>}>
        <Question
          topic={topic}
          footer={footer}
          questionStatus={questionStatus}
          currentQuestion={currentQuestion}
          setAnswerLeft={setAnswerLeft}
          setAnswerRight={setAnswerRight}
          videos={videos}
          basicItems={basicItems}
          basicItemTemplate={basicItemTemplate}
          visible={visible}
          nameTopic={nameTopic}
          questionVid={questionVid}
          setAnswerLeftVideo={setAnswerLeftVideo}
          setAnswerRightVideo={setAnswerRightVideo}
          allTopic={allTopic}
          setAllTopic={setAllTopic}
          listQuestion={listQuestion}
          setListQuestion={setListQuestion}
        />
      </Suspense>

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
