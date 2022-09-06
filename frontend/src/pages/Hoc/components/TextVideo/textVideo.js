import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "../../tracNghiem.css";

const TextVideo = ({ answer, setAnswerLeft, setAnswerRight, content }) => {
  return (
    <>
      <h3 className="card-question-title cl-darkgreen"></h3>
      <h3 className="question-text">
        Ký hiệu nào dưới đây có ý nghĩa là "{content}"?
      </h3>
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
            key={answer[0].url}
          >
            <source
              src={`https://drive.google.com/uc?export=download&id=${answer[0].url}`}
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
            key={answer[1].url}
          >
            <source
              src={`https://drive.google.com/uc?export=download&id=${answer[1].url}`}
              type="video/mp4"
            />
          </video>
        </button>
      </div>
    </>
  );
};

export default TextVideo;
