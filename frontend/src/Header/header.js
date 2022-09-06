import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "./header.css";
import DangNhap from "./components/DangNhap/dangNhap";
import DangKy from "./components/DangKy/dangKy";
import React, { useState, useEffect } from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import i18next from 'i18next'
import cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import config from "../config";

function Header() {
  const { t } = useTranslation()
  const navigate = useNavigate();
  
  const languages = [
    {
      code: 'vi',
      name: 'Tiếng Việt',
      country_code: 'vn',
    },
    {
      code: 'en',
      name: 'English',
      country_code: 'gb',
    }
  ]

  const currentLanguageCode = cookies.get('i18next') || 'vi'
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode)

  const [activeIndex, setActiveIndex] = useState(3);
  const [user, setUser] = useState({})

  useEffect(() => {
    axios
      .get(`${config.APP_API}/user/get-user-id`, {
        params:{id: JSON.parse(window.localStorage.getItem("id"))}
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])  
  

  const start = (
    <div className="btn-logo">
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button
          className="p-button-text p-button-plain"
          label="VieSign"
          id="btn-home"
        ></Button>
      </Link>
    </div>
  );

  const end = (
    <div className="navbar-end">
      {user === null ? (
        <div className="btn-end">
          <div className="signup">
            <DangKy />
          </div>
          <div className="login">
            <DangNhap />
          </div>
        </div>
      ) : (
        <div className="btn-end">
          <Link to="/taikhoan" style={{ textDecoration: "none" }}>
            <Button id="profile-user-header" className="p-button-text">
              <span className="">
                <Avatar
                  image={user.url}
                  className="p-mr-2"
                  size="medium"
                  shape="circle"
                />
              </span>
              <span className="p-button-lable">{user.username}</span>
            </Button>
          </Link>
        </div>
      )}
      <div className="dropdown d-flex flex-row-reverse">
        <button
          className="btn btn-link dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span
            className={`flag-icon flag-icon-${currentLanguage.country_code} mx-2`}
          ></span>
          {/* {currentLanguage.name} */}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {languages.map(({ code, name, country_code }) => (
            <li key={country_code}>
              <a
                href="#"
                onClick={() => {
                  i18next.changeLanguage(code);
                }}
              >
                <span
                  className={`flag-icon flag-icon-${country_code} mx-2`}
                > </span>
               {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const items = [
    
    {
      label: t('menubar-first'),
      activeIndex: 1,
      command: () => {
        window.location = "/thongtin";
      },
    },
    {
      label: t('menubar-second'),
      activeIndex: 2,
      command: () => {
        window.location = "/hoc";
      },
    },
    {
      label: t('menubar-third'),
      activeIndex: 3,
      command: () => {
        window.location = "/trochoi";
      },
    },
    {
      label: t('menubar-fourth'),
      activeIndex: 4,
      items: [
        {
          label:t('navbar-sponsor-oxfam'),
          command: () => {
            window.location = "/sponsor";
          },
       },
       {
        label:t('navbar-sponsor-vasf'),
        command: () => {
          window.location = "/sponsor2";
        },
     },
      ]
    },
    {
      label: t('menubar-fifth'),
      activeIndex: 5,
      command: () => {
        window.location = "/support";
      },
    },
  ];

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
