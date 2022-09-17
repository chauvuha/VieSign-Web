import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "./header.css";
import React, { useState, useEffect } from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

function Header({
  setTableVideoVisible,
  setTableUserVisible,
  setFormVideoVisible,
}) {
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(1);

  const items = [
    {
      label: "Danh sách video",
      activeIndex: 1,
      command: () => {
        setTableVideoVisible(true);
        setTableUserVisible(false);
        setFormVideoVisible(false);
      },
    },
    {
      label: "Danh sách người dùng",
      activeIndex: 2,
      command: () => {
        setTableVideoVisible(false);
        setTableUserVisible(true);
        setFormVideoVisible(false);
      },
    },
  ];

  const start = (
    <div className="btn-logo">
      <Link to="/admin" style={{ textDecoration: "none" }}>
        <Button
          className="p-button-text p-button-plain"
          label="Viesign"
          id="btn-home"
        ></Button>
      </Link>
    </div>
  );

  const end = (
    <div className="navbar-end">
      <Button className="p-text-bold p-button-text">
        <i className="pi pi-sign-out sign-out-admin-icon"></i>
        <span
          className="sign-out-admin"
          onClick={() => {
            navigate("/");
            navigate(0);
          }}
        >
          Đăng xuất
        </span>
      </Button>
    </div>
  );

  return (
    <div>
      <div className="card-menu">
        <Menubar
          model={items}
          start={start}
          end={end}
          className="menubar"
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.value)}
        />
      </div>
    </div>
  );
}
export default Header;
