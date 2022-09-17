import "./tkUser.css";
import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ScrollPanel } from "primereact/scrollpanel";
import ThongTinUser from "./components/ThongTinUser/ttUser";
import DSBH from "./components/DSBH/dsbh";
import TroGiup from "./components/TroGiup/troGiup";
import { useNavigate } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import axios from "axios";

function TaiKhoanUser({ user, topics }) {
  const [path, setPath] = useState(undefined);

  const ContentCard2 = ({ path }) => {
    if (path === "profile") {
      return <ThongTinUser user={user} />;
    } else if (path === "trogiup") {
      return <TroGiup />;
    } else {
      return <DSBH user={user} topics={topics} />;
    }
  };

  return (
    <div className="p-grid " id="user">
      <div className="p-sm-2 p-col-0"></div>
      <div className="p-sm-2 p-col-3">
        <Card id="card1-user">
          <div className="p-grid" id="info-user">
            <div className="p-sm-3 p-col-12">
              <img src={user.url} className="img" />
            </div>
            <div className="p-sm-9 p-col-12">
              <span className="p-card-title">{user.username}</span>
            </div>
          </div>
          <div id="menu-user" className="">
            <div className="menu-user-section p-col-12">
              <Button
                className="p-text-bold p-button-text"
                onClick={() => {
                  setPath("dsbh");
                }}
              >
                <i className="pi pi-list"></i>
                <span className="txt">Bài học</span>
              </Button>
            </div>
            <div className="menu-user-section p-col-12">
              <Button
                className="p-text-bold p-button-text"
                onClick={() => {
                  setPath("profile");
                }}
              >
                <i className="pi pi-user"></i>
                <span className="txt">Thông tin</span>
              </Button>
            </div>
          </div>
          <div id="sign-out">
            <div className="p-col-12 menu-user-section">
              <Button
                className="p-text-bold p-button-text"
                onClick={() => {
                  window.localStorage.removeItem("id");
                  window.location.pathname = "/";
                }}
              >
                <i className="pi pi-sign-out"></i>
                <span className="txt">Đăng xuất</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <div className="p-sm-6 p-col-8">
        <Card className="card2-user">
          <div className="scrollpanel-demo">
            <div className="card">
              <div className="">
                <div className="">
                  <ContentCard2 path={path} />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="p-sm-2 p-col-0"></div>
    </div>
  );
}

export default TaiKhoanUser;
