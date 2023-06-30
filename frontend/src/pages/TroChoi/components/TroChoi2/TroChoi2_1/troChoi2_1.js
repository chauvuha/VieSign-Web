import "./troChoi2_1.css";
import React, { useRef, useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import FlipGameContainers from "../components/FlipGameContainer";
import axios from "axios";
import config from "../../../../../config";
import useWindowDimensions from "./useWindowDimensions";

const RenderTime = ({ remainingTime }) => {
  const currentTime = useRef(remainingTime);
  const prevTime = useRef(null);
  const isNewTimeFirstTick = useRef(false);
  const [, setOneLastRerender] = useState(0);

  if (currentTime.current !== remainingTime) {
    isNewTimeFirstTick.current = true;
    prevTime.current = currentTime.current;
    currentTime.current = remainingTime;
  } else {
    isNewTimeFirstTick.current = false;
  }

  // force one last re-render when the time is over to tirgger the last animation
  if (remainingTime === 0) {
    setTimeout(() => {
      setOneLastRerender((val) => val + 1);
    }, 20);
  }

  const isTimeUp = isNewTimeFirstTick.current;

  return (
    <div className="time-wrapper">
      <div key={remainingTime} className={`time ${isTimeUp ? "up" : ""}`}>
        {remainingTime}
      </div>
      {prevTime.current !== null && (
        <div
          key={prevTime.current}
          className={`time ${!isTimeUp ? "down" : ""}`}
        >
          {prevTime.current}
        </div>
      )}
    </div>
  );
};

function TroChoi2_1({ topic, amount }) {
  const [countdownProps, setCountdownProps] = useState(false);
  const [visible, setVisible] = useState(false);
  const [displayBasic, setDisplayBasic] = useState(true);
  const [score, setScore] = useState(0);
  const [timesUp, setTimesUp] = useState(false);
  const [reload, setReload] = useState(false);
  const [cardList, setCardList] = useState([]);

  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  useEffect(() => {
    axios
      .get(`${config.APP_API}/video/get-list-video-by-topic`, {
        params: {
          numberTopic: topic !== undefined ? topic : 3,
        },
      })
      .then((res) => {
        const temp = res.data.listVideo.map((item) => {
          return {
            url: item.url,
            content: item.content,
          };
        });

        let arr = [];
        for (let i = 0; i < amount; i++) {
          arr.push(temp[i]);
        }
        setCardList(arr);
      });
  }, []);

  useEffect(() => {
    window.onbeforeunload = function () {
      if (!reload) {
        let message = "Bạn có chắc muốn thoát trò chơi?";
        if (window.confirm(message)) return true;
        else return false;
      }
    };
  }, [reload]);

  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
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
            setCountdownProps(true);
            onHide(name);
            setVisible(true);
          }}
          autoFocus
          id="yes-play-game"
        />
      </div>
    );
  };

  const temp = cardList.map((item) => {
    return { content: item.content };
  });

  const data = temp.concat(cardList);
  return (
    <div className="p-grid flexcard" id="game2">
      <Dialog
        header="Nhiệm vụ:"
        visible={displayBasic}
        style={{ width: "50vw" }}
        footer={renderFooter("displayBasic")}
        onHide={() => {
          navigate("/trochoi");
          onHide("displayBasic");
        }}
      >
        <p>
          Hãy tìm ra đúng {amount} cặp thẻ có cùng ý nghĩa ký hiệu trong chỉ{" "}
          {amount * 0.5} phút. Nếu hoàn thành thử thách này, bạn sẽ được thưởng{" "}
          {amount}0 điểm!
        </p>
      </Dialog>

      <div
        className={
          width >= 1536 || width <= 1155
            ? "p-col-12 p-sm-10"
            : "p-col-12 p-sm-10"
        }
      >
        <div className="p-grid" id="content-game2">
          <div className="p-col-7">
            <div className="p-grid point-game2">
              <div className="p-col-8 ">Điểm số hiện tại</div>
              <div className="p-col-4  p-text-right">{score}</div>
            </div>
          </div>
          <div className="p-col-5 p-text-right time-game2">
            <div className="timer-wrapper">
              <CountdownCircleTimer
                // isPlaying
                duration={amount * 30}
                colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                size={80}
                isPlaying={countdownProps}
                onComplete={() => setTimesUp(true)}
              >
                <RenderTime />
              </CountdownCircleTimer>
            </div>
          </div>
        </div>
        {visible && (
          <div id="cards">
            <FlipGameContainers
              cards={data}
              setScore={setScore}
              timesUp={timesUp}
              score={score}
              setReload={setReload}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default TroChoi2_1;
