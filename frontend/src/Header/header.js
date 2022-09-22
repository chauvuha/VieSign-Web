/* eslint-disable jsx-a11y/anchor-is-valid */
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "./header.css";
import DangNhap from "./components/DangNhap/dangNhap";
import DangKy from "./components/DangKy/dangKy";
import React, { useState, useEffect, useRef } from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import i18next from "i18next";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import axios from "axios";
import config from "../config";
import { useForm, Controller } from "react-hook-form";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";

function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const toast = useRef(null);
  const languages = [
    {
      code: "vi",
      name: "Tiếng Việt",
      country_code: "vn",
    },
    {
      code: "en",
      name: "English",
      country_code: "gb",
    },
  ];

  const currentLanguageCode = cookies.get("i18next") || "vi";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

  const [activeIndex, setActiveIndex] = useState(3);
  const [user, setUser] = useState({});
  const [displayResetPass, setDisplayResetPass] = useState(
    window.location.pathname.split("/").includes("reset-password")
      ? true
      : false
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${config.APP_API}/user/get-user-id`, {
        params: { id: JSON.parse(window.localStorage.getItem("id")) },
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
                <span className={`flag-icon flag-icon-${country_code} mx-2`}>
                  {" "}
                </span>
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
      label: t("menubar-first"),
      activeIndex: 1,
      command: () => {
        window.location = "/thongtin";
      },
    },
    {
      label: t("menubar-second"),
      activeIndex: 2,
      command: () => {
        window.location = "/hoc";
      },
    },
    {
      label: t("menubar-third"),
      activeIndex: 3,
      command: () => {
        window.location = "/trochoi";
      },
    },
    {
      label: t("menubar-fourth"),
      activeIndex: 4,
      items: [
        {
          label: t("navbar-sponsor-oxfam"),
          command: () => {
            window.location = "/sponsor";
          },
        },
        {
          label: t("navbar-sponsor-vasf"),
          command: () => {
            window.location = "/sponsor2";
          },
        },
      ],
    },
    {
      label: t("menubar-fifth"),
      activeIndex: 5,
      command: () => {
        window.location = "/support";
      },
    },
  ];

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);
    setDisplayResetPass(false);
    axios
      .post(
        `${config.APP_API}/user/reset-password`,
        { ...data, id: window.location.pathname.split("/")[2] },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.current.show({
          severity: "success",
          summary: "Thành công",
          detail: "Bạn đã đổi mật khẩu thành công",
          life: 5000,
        });
        setIsLoading(false);
        reset();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.current.show({
          severity: "error",
          summary: "Thất bại",
          detail: "Đã có lỗi xảy ra, hãy đảm bảo bạn nhập email đúng",
          life: 5000,
        });
        setIsLoading(false);
      });
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const passwordHeader = <h6>Chọn mật khẩu</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="p-mt-2">Gợi ý</p>
      <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: "1.5" }}>
        <li>Ít nhất một chữ thường</li>
        <li>Ít nhất một chữ hoa</li>
        <li>Ít nhất một số</li>
        <li>Tối thiểu 8 ký tự</li>
      </ul>
    </React.Fragment>
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
      <Toast ref={toast} />
      <Dialog
        header="Quên mật khẩu"
        visible={displayResetPass}
        onHide={() => setDisplayResetPass(false)}
        breakpoints={{ "960px": "75vw" }}
        style={{ width: "50vw" }}
      >
        <div className="form-demo dangnhap-form">
          <div className="p-d-flex p-jc-center">
            <div className="card">
              <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                <div className="p-field">
                  <span className="p-float-label">
                    <Controller
                      name="password"
                      control={control}
                      rules={{
                        required: "Mật khẩu là bắt buộc.",
                      }}
                      render={({ field, fieldState }) => (
                        <Password
                          id={field.name}
                          {...field}
                          toggleMask
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          header={passwordHeader}
                          footer={passwordFooter}
                        />
                      )}
                    />
                    <label
                      htmlFor="password"
                      className={classNames({ "p-error": errors.password })}
                    >
                      Mật khẩu*
                    </label>
                  </span>
                  {getFormErrorMessage("password")}
                </div>
                <div className="p-field">
                  <span className="p-float-label">
                    <Controller
                      name="confirmPassword"
                      control={control}
                      rules={{
                        required: "Mật khẩu là bắt buộc.",
                        validate: (password) => {
                          if (password === getValues("password")) {
                            return true;
                          }
                          return 'Mật khẩu không khớp';
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <Password
                          id={field.name}
                          {...field}
                          feedback={false}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                        />
                      )}
                    />
                    <label
                      htmlFor="confirmPassword"
                      className={classNames({ "p-error": errors.password })}
                    >
                      Xác nhận lại mật khẩu*
                    </label>
                  </span>
                  {getFormErrorMessage("confirmPassword")}
                </div>
                <Button
                  type="submit"
                  label="Đặt lại mật khẩu"
                  className="p-mt-2 btn-login"
                />
              </form>
            </div>
          </div>
        </div>
      </Dialog>
      <Dialog
        visible={isLoading}
        breakpoints={{ "960px": "75vw" }}
        style={{ width: "50vw" }}
      >
        <ProgressSpinner />
      </Dialog>
    </div>
  );
}
export default Header;
