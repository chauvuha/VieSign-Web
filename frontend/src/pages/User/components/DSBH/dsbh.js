/* eslint-disable jsx-a11y/alt-text */
import "./dsbh.css";
import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Knob } from "primereact/knob";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../../../config";

const DSBH = ({ topics }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    let isMounted = true;
    axios
      .get(`${config.APP_API}/user/get-user-id`, {
        params: { id: JSON.parse(window.localStorage.getItem("id")) },
      })
      .then((res) => {
        if (isMounted) {
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      isMounted = false;
    };
  }, [topics]);

  return (
    <div id="card1">
      <div className="title-user">
        <span>Danh sách bài học</span>
      </div>
      {topics
        .filter((topic) => user?.topic?.includes(topic?.numberTopic))
        .map((value, idx) => {
          return (
            <div key={idx} className="p-shadow-1" id="card-lesson-info">
              <div className="p-grid flexcard">
                <div className="p-col-4">
                  <img
                    src={
                      require("../../../../assets/images/online.svg").default
                    }
                    className="img"
                  />
                </div>
                <div className="p-col-8 info-lessons-card">
                  <div>
                    <h2>Chủ đề {value.numberTopic}</h2>
                    <p>
                      {
                        topics.filter(
                          (item) => item?.numberTopic === value?.numberTopic
                        )[0]?.nameTopic
                      }
                    </p>
                    {/* <p>
                      Bài học hiện tại:{" "}
                      {user.topic > value.numberTopic ? 5 : user.part}
                    </p> */}
                  </div>

                  <div className="p-grid ">
                    <div className="p-col-2">
                      <Knob
                        size="70"
                        readOnly
                        max={400}
                        value={
                          user.score.filter(
                            (item) => item.topic === value.numberTopic
                          ).length === 0
                            ? 0
                            : user.score.filter(
                                (item) => item.topic === value.numberTopic
                              )[0].score
                        }
                        valueColor={"#026670"}
                      />
                    </div>

                    <div className="p-col-5" id="process-user">
                      Số điểm hiện tại
                    </div>
                    <div className="">
                      <Link to="/hoc" style={{ textDecoration: "none" }}>
                        <Button className="btn-user-learn">Học ngay</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default DSBH;
