import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./hoc.css";
import { TabView, TabPanel } from "primereact/tabview";
import React, { Fragment } from "react";
import { Button } from "primereact/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import Level from "./components/Level/level";
import axios from "axios";
import config from "../../config";

function Hoc({ topics }) {
  const [displayBasic, setDisplayBasic] = useState(
    window.localStorage.getItem("id") ? false : true
  );
  const [displayBasic2, setDisplayBasic2] = useState(false);
  const [topic, setTopic] = useState(-1);

  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  // useEffect(() => {
  //   axios
  //     .get(`${config.APP_API}/user/get-user-id`, {
  //       params: { id: JSON.parse(window.localStorage.getItem("id")) },
  //     })
  //     .then((res) => {
  //       if (res.data.user.topic < topic) {
  //         setDisplayBasic2(true);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [topic]);

  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
    displayBasic2: setDisplayBasic2,
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

  const renderFooter = (name) => {
    return (
      <>
        {name === "displayBasic" ? (
          <div>
            <Button
              label="Quay lại"
              icon="pi pi-arrow-left"
              onClick={() => {
                navigate("/");
                onHide(name);
              }}
              className="p-button-text"
              id="no-play-game"
            />
          </div>
        ) : (
          <div>
            <Button
              label="Quay lại"
              icon="pi pi-arrow-left"
              onClick={() => {
                navigate(0);
                onHide(name);
              }}
              className="p-button-text"
              id="no-play-game"
            />
          </div>
        )}
      </>
    );
  };

  return (
    <>
      {topic === -1 && (
        <>
          <div className="learn-body">
            <div className="learn-heading p-grid">
              <div className=" p-col-2"></div>
              <h1 className="p-col-8 ta-left fw-bold"> CÁC CHỦ ĐỀ CỦA BẠN </h1>
              <div className=" p-col-2"></div>
            </div>
            <Button
              label="Cơ bản"
              id="btn-footer"
              className={activeIndex === 0 ? "active" : ""}
              onClick={() => setActiveIndex(0)}
            />
            <Button
              label="Y tế"
              id="btn-footer"
              className={activeIndex === 1 ? "active" : ""}
              onClick={() => setActiveIndex(1)}
            />
            <Button
              label="Luật"
              id="btn-footer"
              className={activeIndex === 2 ? "active" : ""}
              onClick={() => setActiveIndex(2)}
            />
            <TabView
              activeIndex={activeIndex}
              onTabChange={(e) => setActiveIndex(e.index)}
              className="tabview-custom"
            >
              <TabPanel
                header="Cơ bản"
                contentStyle={{ backgroundColor: "#E5E5E5" }}
                headerStyle={{ backgroundColor: "#E5E5E5" }}
              >
                <h3>Cơ bản</h3>
                <div className="learn-body-line p-grid">
                  <div className=" p-col-12 p-sm-2"></div>
                  {topics
                    .filter(
                      (topic) =>
                        !topic.nameTopic.includes("Y tế") &&
                        !topic.nameTopic.includes("Luật")
                    )
                    .map((item, index) => (
                      <Fragment key={index}>
                        <button
                          className="learn-section p-col-12 p-sm-2"
                          onClick={() => setTopic(index + 1)}
                        >
                          <img
                            alt="online"
                            width="100%"
                            src={
                              require("../../assets/images/online.svg").default
                            }
                            className="img"
                          />
                          <h2 className="ta-left">Chủ đề {index + 1}</h2>
                          <p className="ta-left">{item.nameTopic}</p>
                          <div />
                        </button>
                        {index % 4 === 3 && (
                          <div className="p-col-12 p-sm-2"></div>
                        )}
                      </Fragment>
                    ))}
                </div>
              </TabPanel>
              <TabPanel header="Y tế">
                <h3>Y tế</h3>
                <div className="learn-body-line p-grid">
                  <div className=" p-col-12 p-sm-2"></div>
                  {topics
                    .filter((topic) => topic.nameTopic.includes("Y tế"))
                    .map((item, index) => (
                      <Fragment key={index}>
                        <button
                          className="learn-section p-col-12 p-sm-2"
                          onClick={() => setTopic(index + 1)}
                        >
                          <img
                            alt="online"
                            width="100%"
                            src={
                              require("../../assets/images/online.svg").default
                            }
                            className="img"
                          />
                          <h2 className="ta-left">Chủ đề {index + 1}</h2>
                          <p className="ta-left">{item.nameTopic}</p>
                          <div />
                        </button>
                        {index % 4 === 3 && (
                          <div className="p-col-12 p-sm-2"></div>
                        )}
                      </Fragment>
                    ))}
                </div>
              </TabPanel>
              <TabPanel header="Luật">
                <h3>Luật</h3>
                <div className="learn-body-line p-grid">
                  <div className=" p-col-12 p-sm-2"></div>
                  {topics
                    .filter((topic) => topic.nameTopic.includes("Luật"))
                    .map((item, index) => (
                      <Fragment key={index}>
                        <button
                          className="learn-section p-col-12 p-sm-2"
                          onClick={() => setTopic(index + 1)}
                        >
                          <img
                            alt="online"
                            width="100%"
                            src={
                              require("../../assets/images/online.svg").default
                            }
                            className="img"
                          />
                          <h2 className="ta-left">Chủ đề {index + 1}</h2>
                          <p className="ta-left">{item.nameTopic}</p>
                          <div />
                        </button>
                        {index % 4 === 3 && (
                          <div className="p-col-12 p-sm-2"></div>
                        )}
                      </Fragment>
                    ))}
                </div>
              </TabPanel>
            </TabView>
          </div>
        </>
      )}
      {topic !== -1 && (
        <>
          <Level topic={topic} topics={topics} setTopic={setTopic} />
        </>
      )}
      <>
        <Dialog
          visible={displayBasic}
          style={{ width: "50vw" }}
          footer={renderFooter("displayBasic")}
          onHide={() => {
            navigate("/");
            onHide("displayBasic");
          }}
        >
          <div className="congra-img">
            <img
              alt="warn"
              src={require("../../assets/images/warn.png").default}
            />
          </div>
          <div className="congra-txt">
            <p style={{ color: "#026670" }}>
              Bạn cần đăng nhập để truy cập chức năng này!
            </p>
          </div>
        </Dialog>
      </>
      <>
        <Dialog
          visible={displayBasic2}
          style={{ width: "50vw" }}
          footer={renderFooter("displayBasic2")}
          onHide={() => {
            navigate(0);
            onHide("displayBasic2");
          }}
        >
          <div className="congra-img">
            <img
              alt="warn"
              src={require("../../assets/images/warn.png").default}
            />
          </div>
          <div className="congra-txt">
            <p style={{ color: "#026670" }}>
              Bạn phải hoàn thành chủ đề hiện tại mới có thể học chủ đề này!
            </p>
          </div>
        </Dialog>
      </>
    </>
  );
}

export default Hoc;
