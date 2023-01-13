import "./admin.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import DangNhap from "./components/DangNhap";
import TableVideo from "./components/TableVideo";
import TableUser from "./components/TableUser";
import FormVideo from "./components/FormVideo";
import config from "../../config";
import TableQuestion from "./components/TableQuestion";
import FormQuestion from "./components/FormQuestion";

function TaiKhoanAdmin() {
  const navigate = useNavigate();
  const [amountTopic, setAmountTopic] = useState(0);
  const [topics, setTopics] = useState([]);
  const [user, setUser] = useState({});
  const [tableVideoVisible, setTableVideoVisible] = useState(true);
  const [tableUserVisible, setTableUserVisible] = useState(false);
  const [tableQuestionVisible, setTableQuestionVisible] = useState(false);
  const [formVideoVisible, setFormVideoVisible] = useState(false);
  const [formQuestionVisible, setFormQuestionVisible] = useState(false);
  const [rowData, setRowData] = useState({});

  useEffect(() => {
    axios.get(`${config.APP_API}/video/list-topic`).then((res) => {
      setAmountTopic(res.data.listTopic.length);
      setTopics(res.data.listTopic);
    });
  }, []);

  return (
    <>
      {user?.email === "admin" ? (
        <div style={{minHeight: 800}}>
          <Header
            setTableVideoVisible={setTableVideoVisible}
            setTableUserVisible={setTableUserVisible}
            setTableQuestionVisible={setTableQuestionVisible}
            setFormVideoVisible={setFormVideoVisible}
            setFormQuestionVisible={setFormQuestionVisible}
            setRowData={setRowData}
          />
          {tableVideoVisible && (
            <TableVideo
              setFormVideoVisible={setFormVideoVisible}
              setTableVideoVisible={setTableVideoVisible}
              setRowData={setRowData}
            />
          )}
          {formVideoVisible && (
            <FormVideo amountTopic={amountTopic} rowData={rowData} />
          )}
          {tableUserVisible && <TableUser />}
          {tableQuestionVisible && (
            <TableQuestion
              setFormQuestionVisible={setFormQuestionVisible}
              setTableQuestionVisible={setTableQuestionVisible}
              setRowData={setRowData}
            />
          )}
          {formQuestionVisible && (
            <FormQuestion topics={topics} rowData={rowData} />
          )}
        </div>
      ) : (
        <div style={{height: 800}}>
          <DangNhap setUser={setUser} />
        </div>
      )}
    </>
  );
}

export default TaiKhoanAdmin;
