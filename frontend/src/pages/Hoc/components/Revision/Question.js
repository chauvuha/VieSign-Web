import React, { useEffect, useRef } from "react";
import axios from "axios";
import config from "../../../../config";
import TextVideo from "../TextVideo/textVideo";
import VideoText from "../VideoText/videoText";
import VideoVideo from "../VideoVideo/videoVideo";
import { Card } from "primereact/card";
import { VirtualScroller } from "primereact/virtualscroller";
import { Toast } from "primereact/toast";

function Question({
  topic,
  footer,
  questionStatus,
  currentQuestion,
  setAnswerLeft,
  setAnswerRight,
  videos,
  basicItems,
  basicItemTemplate,
  visible,
  nameTopic,
  questionVid,
  setAnswerLeftVideo,
  setAnswerRightVideo,
  setAllTopic,
  listQuestion,
  setListQuestion,
}) {
  const toast = useRef(null);

  useEffect(() => {
    axios
      .get(`${config.APP_API}/question/all-question`)
      .then((res) => {
        if (
          res.data.questions.find((item) => item.topic === topic) !== undefined
        ) {
          setAllTopic(res.data.questions);
          setListQuestion(
            res.data.questions
              .find((item) => item.topic === topic)
              .listQuestion.map((item) => item.question)
          );
        } else {
          toast.current.show({
            severity: "error",
            summary: "Lỗi",
            detail: "Không có câu hỏi cho phần này",
            life: 5000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setAllTopic, setListQuestion, topic]);

  return (
    <>
      <Toast ref={toast} />
      {visible && (
        <div className="tracnghiem-body p-grid">
          <div className="p-col-0 p-sm-2"></div>
          <div className="learn-card p-col-12 p-sm-6">
            <Card footer={footer}>
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
    </>
  );
}

export default Question;
