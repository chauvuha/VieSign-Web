import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "../../tracNghiem.css";
import { useState, useEffect } from "react";

const VideoVideo = ({
  answer,
  setAnswerLeft,
  setAnswerRight,
  currentQuestion,
  url,
  videos,
}) => {
  const [listUrl, setListUrl] = useState([]);

  useEffect(() => {
    let arr = [];
    for (let item of videos) {
      if (item.content === answer[0].content) {
        arr.push(item.url);
        break;
      }
    }

    for (let item of videos) {
      if (item.content === answer[1].content) {
        arr.push(item.url);
        break;
      }
    }
    setListUrl(arr);
  }, []);

  return (
    <>
      <h3 className="card-question-title cl-darkgreen">
        Chọn video phù hợp với video dưới đây
      </h3>
      <video
        className="question-video"
        muted
        autoPlay
        loop
        disablePictureInPicture
        playsInline
        key={url}
      >
        <source
          src={`https://drive.google.com/uc?export=download&id=${url}`}
          type="video/mp4"
        />
      </video>
      <div
        className={
          answer[0].isCorrect === -1
            ? "answer"
            : answer[0].isCorrect === 1
            ? "answer-correct"
            : "answer-incorrect"
        }
      >
        <button
          onClick={setAnswerLeft}
          disabled={
            answer[0].isCorrect === -1 && answer[1].isCorrect === -1
              ? false
              : true
          }
        >
          <video
            className="answer-video"
            muted
            autoPlay
            loop
            disablePictureInPicture
            playsInline
            key={listUrl[0]}
          >
            <source
              src={`https://drive.google.com/uc?export=download&id=${listUrl[0]}`}
              type="video/mp4"
            />
          </video>
        </button>
      </div>
      <div
        className={
          answer[1].isCorrect === -1
            ? "answer"
            : answer[1].isCorrect === 1
            ? "answer-correct"
            : "answer-incorrect"
        }
      >
        <button
          onClick={setAnswerRight}
          disabled={
            answer[0].isCorrect === -1 && answer[1].isCorrect === -1
              ? false
              : true
          }
        >
          <video
            className="answer-video"
            muted
            autoPlay
            loop
            disablePictureInPicture
            playsInline
            key={listUrl[1]}
          >
            <source
              src={`https://drive.google.com/uc?export=download&id=${listUrl[1]}`}
              type="video/mp4"
            />
          </video>
        </button>
      </div>
    </>
  );
};

export default VideoVideo;
