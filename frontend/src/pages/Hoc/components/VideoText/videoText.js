import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "../../tracNghiem.css";

const VideoText = ({ answer, setAnswerLeft, setAnswerRight, url }) => {
  return (
    <>
      <h3 className="card-question-title cl-darkgreen">
        Chọn câu phù hợp cho kí hiệu dưới đây
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
          <h2 className="answer-text"> {answer[0].content} </h2>
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
          <h2 className="answer-text"> {answer[1].content} </h2>
        </button>
      </div>
    </>
  );
};

export default VideoText
