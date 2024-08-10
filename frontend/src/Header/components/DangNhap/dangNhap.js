import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "./dangNhap.css";

import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useForm, Controller } from "react-hook-form";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toast } from "primereact/toast";
import config from "../../../config";
import { ProgressSpinner } from "primereact/progressspinner";

function DangNhap() {
  /*Dialog*/
  const toast = useRef(null);
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [displayForgotPass, setDisplayForgotPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dialogFuncMap = {
    displayResponsive: setDisplayResponsive,
    displayForgotPass: setDisplayForgotPass,
  };

  const onClick = (name) => {
    dialogFuncMap[`${name}`](true);
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

  /*Form */
  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Xin chào",
      detail: "Bạn đã đăng nhập thành công!",
      life: 3000,
    });
  };
  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Ôi không!",
      detail: "Bạn chưa đăng nhập thành công! Vui lòng thử lại",
      life: 3000,
    });
  };
  const navigate = useNavigate();
  const onSubmit = (data) => {
    axios
      .post(`${config.APP_API}/user/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          window.localStorage.setItem("id", JSON.stringify(res.data.userId));
          navigate(0);
          showSuccess();
        }
      })
      .catch((err) => {
        console.log(err);
        showError();
      });

    onHide("displayResponsive");
    reset();
  };
  const onSubmitForgotPass = (data) => {
    setIsLoading(true);
    onHide("displayForgotPass");
    axios
      .post(`${config.APP_API}/user/forgot-password`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setIsLoading(false);
        if (res.status === 200) {
          toast.current.show({
            severity: "success",
            summary: "Thành công",
            detail: `Chúng tôi đã gửi đường dẫn đặt lại mật khẩu qua email của bạn, 
            vui lòng click vào đường dẫn và đặt lại mật khẩu. 
            Hãy kiểm tra trong phần spam nếu bạn không thấy email`,
            life: 10000,
          });
        } else {
          toast.current.show({
            severity: "error",
            summary: "Thất bại",
            detail: "Đã có lỗi xảy ra, hãy đảm bảo bạn nhập email đúng",
            life: 5000,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        toast.current.show({
          severity: "error",
          summary: "Thất bại",
          detail: "Đã có lỗi xảy ra, hãy đảm bảo bạn nhập email đúng",
          life: 5000,
        });
      });
  };

  return (
    <div className="dialog-demo">
      <div className="card-login">
        <Toast ref={toast} />
        <Button
          label="Đăng nhập"
          onClick={() => onClick("displayResponsive")}
          className="p-button-text p-button-plain"
        />
        <Dialog
          header="Đăng nhập"
          visible={displayResponsive}
          onHide={() => onHide("displayResponsive")}
          breakpoints={{ "960px": "75vw" }}
          style={{ width: "50vw" }}
        >
          <div className="form-demo dangnhap-form">
            <div className="p-d-flex p-jc-center">
              <div className="card">
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                  <div className="p-field">
                    <span className="p-float-label p-input-icon-right">
                      <Controller
                        name="email"
                        control={control}
                        rules={{
                          required: "Email là bắt buộc.",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message:
                              "Địa chỉ email không hợp lệ. Ví dụ: example@email.com",
                          },
                        }}
                        render={({ field, fieldState }) => (
                          <InputText
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                          />
                        )}
                      />
                      <label
                        htmlFor="email"
                        className={classNames({ "p-error": !!errors.email })}
                      >
                        Email*
                      </label>
                    </span>
                    {getFormErrorMessage("email")}
                  </div>
                  <div className="p-field">
                    <span className="p-float-label">
                      <Controller
                        name="password"
                        control={control}
                        rules={{ required: "Mật khẩu là bắt buộc." }}
                        render={({ field, fieldState }) => (
                          <Password
                            id={field.name}
                            {...field}
                            toggleMask
                            feedback={false}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
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

                  <Button
                    type="submit"
                    label="Đăng Nhập"
                    className="p-mt-2 btn-login"
                  />

                  <div className="p-field">
                    <div
                      className="btnforget"
                      onClick={() => {
                        onClick("displayForgotPass");
                        onHide("displayResponsive");
                      }}
                    >
                      Bạn quên mật khẩu
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Dialog>
        <Dialog
          header="Quên mật khẩu"
          visible={displayForgotPass}
          onHide={() => onHide("displayForgotPass")}
          breakpoints={{ "960px": "75vw" }}
          style={{ width: "50vw" }}
        >
          <div className="form-demo dangnhap-form">
            <div className="p-d-flex p-jc-center">
              <div className="card">
                <form
                  onSubmit={handleSubmit(onSubmitForgotPass)}
                  className="p-fluid"
                >
                  <div className="p-field">
                    <span className="p-float-label p-input-icon-right">
                      <Controller
                        name="email"
                        control={control}
                        rules={{
                          required: "Email là bắt buộc.",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message:
                              "Địa chỉ email không hợp lệ. Ví dụ: example@email.com",
                          },
                        }}
                        render={({ field, fieldState }) => (
                          <InputText
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                          />
                        )}
                      />
                      <label
                        htmlFor="email"
                        className={classNames({ "p-error": !!errors.email })}
                      >
                        Email*
                      </label>
                    </span>
                    {getFormErrorMessage("email")}
                  </div>
                  <Button
                    type="submit"
                    label="Gửi đường dẫn đặt lại mật khẩu"
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
    </div>
  );
}

export default DangNhap;
