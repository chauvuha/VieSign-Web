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
import { Skeleton } from "primereact/skeleton";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import config from "../../../../config";

const Understand = ({ topic, nameTopic, setPart, part }) => {
  // Dialog
  const [displayBasic, setDisplayBasic] = useState(true);
  const [displayNextPart, setDisplayNextPart] = useState(false);
  const [visible, setVisible] = useState(false);
  const [videos, setVideos] = useState([]);
  const [questionStatus, setQuestionStatus] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(`${config.APP_API}/video/list-video`, {
        params: {
          numberTopic: topic,
          numberPart: part,
        },
      })
      .then((res) => {
        setVideos(res.data.listVideo);
        let arr = res.data.listVideo.map((item) => true);
        arr[0] = false;
        setQuestionStatus(arr);
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

  const basicItems = videos.map((_, i) => `Câu ${i + 1}`);

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
        disabled={questionStatus[options.index]}
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
            label="Đồng ý"
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
      questionStatus.length === videos.length &&
      questionStatus[questionStatus.length - 1] !== false
    ) {
      arr = [...questionStatus];
      arr[currentQuestion] = false;
      setQuestionStatus(arr);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const info = {
        _id: JSON.parse(window.localStorage.getItem("id")),
        topic: topic,
        part: user.part <= part ? part + 1: user.part,
      };
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
        label={"Đã hiểu"}
        onClick={handleUnderstand}
      />
    </span>
  );

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
        <p>Trong phần ôn tập này, các bạn sẽ ôn lại những phần sau:</p>
        <p>1. 8 từ vựng thể hiện cảm xúc</p>
        <p>2. Bài tập đan xen ôn tập 8 từ vựng</p>
      </Dialog>
      {visible && (
        <div className="tracnghiem-body p-grid">
          <div className="p-col-0 p-sm-2"></div>
          <div className="learn-card p-col-12 p-sm-6">
            <Card footer={footer}>
              <video
                className="question-video"
                muted
                autoPlay
                loop
                disablePictureInPicture
                playsInline
                key={videos[currentQuestion - 1].url}
              >
                <source
                  src={`https://drive.google.com/uc?export=download&id=${
                    videos[currentQuestion - 1].url
                  }`}
                  type="video/mp4"
                />
              </video>
              <h2
                className="answer-understand cl-darkgreen"
                style={{ lineHeight: "" }}
              >
                {videos[currentQuestion - 1].content}
              </h2>
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
      <Dialog className="dialog-complete"
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

export default Understand;
