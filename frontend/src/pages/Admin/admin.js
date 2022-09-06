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

function TaiKhoanAdmin() {
  const navigate = useNavigate();
  const [amountTopic, setAmountTopic] = useState(0);
  const [user, setUser] = useState({});
  const [tableVideoVisible, setTableVideoVisible] = useState(true);
  const [tableUserVisible, setTableUserVisible] = useState(false);
  const [formVideoVisible, setFormVideoVisible] = useState(false);
  const [rowData, setRowData] = useState({});

  useEffect(() => {
    axios.get(`${config.APP_API}/video/list-topic`).then((res) => {
      setAmountTopic(res.data.listTopic.length);
    });
  }, []);

  return (
    <>
      {user?.email === "admin" ? (
        <>
          <Header
            setTableVideoVisible={setTableVideoVisible}
            setTableUserVisible={setTableUserVisible}
            setFormVideoVisible={setFormVideoVisible}
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
        </>
      ) : (
        <>
          <DangNhap setUser={setUser} />
        </>
      )}
    </>
  );
}

export default TaiKhoanAdmin;
