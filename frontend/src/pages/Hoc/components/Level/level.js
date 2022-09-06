import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import { Button } from "primereact/button";
import "./level.css";
import { useEffect, useState } from "react";
import Understand from "../Understand/understand";
import Revision from "../Revision/Revision"

import React from "react";

const Level = ({ topic, topics, setTopic }) => {
  const [part, setPart] = useState(-1);

  return (
    <>
      {part === -1 && (
        <>
          <Button
            label="Quay lại"
            icon="pi pi-arrow-left"
            onClick={() => {
              setTopic(-1);
            }}
            className="p-button-text"
            id="no-play-game"
          />
          <div className="learn-level-page p-grid">
            <div className="p-col-12 p-sm-2"></div>
            <div className="p-col-12 p-sm-8">
              <Button className="scroll-item-level-section heading">
                Chủ đề {topic}: {topics[topic - 1].nameTopic}
              </Button>
              <Button
                className="scroll-item-level-section"
                onClick={() => setPart(1)}
              >
                Phần 1: Kiến thức mới
              </Button>
              <Button
                className="scroll-item-level-section"
                onClick={() => setPart(2)}
              >
                Phần 2: Kiến thức mới
              </Button>
              <Button
                className="scroll-item-level-section"
                onClick={() => setPart(3)}
              >
                Phần 3: Hội thoại
              </Button>
              <Button
                className="scroll-item-level-section"
                onClick={() => setPart(4)}
              >
                Phần 4: Ôn tập
              </Button>
              <Button
                className="scroll-item-level-section"
                onClick={() => setPart(5)}
              >
                Phần 5: Thử thách
              </Button>
            </div>
            <div className=" p-col-12 p-sm-2"></div>
          </div>
        </>
      )}
      {part !== -1 && part < 4 && (
        <Understand
          nameTopic={topics[topic - 1].nameTopic}
          topic={topic}
          setPart={setPart}
          part={part}
        />
      )}
      {part === 4 && (
        <Revision
          nameTopic={topics[topic - 1].nameTopic}
          topic={topic}
          setPart={setPart}
          part={part}
          amount={15}
        />
      )}
      {part === 5 && (
        <Revision
          nameTopic={topics[topic - 1].nameTopic}
          topic={topic}
          setPart={setPart}
          part={part}
          amount={25}
        />
      )}
    </>
  );
};

export default Level;
