import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "./dangNhap.css";
import React, { useRef } from "react";
import { Button } from "primereact/button";
import { useForm, Controller } from "react-hook-form";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import { Toast } from "primereact/toast";
import config from "../../../../config";

function DangNhap({ setUser }) {
  /*Dialog*/
  const toast = useRef(null);

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
      summary: "Đăng nhập thành công",
      life: 3000,
    });
  };
  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Đăng nhập thất bại",
      life: 3000,
    });
  };
  const onSubmit = (data) => {
    axios
      .post(`${config.APP_API}/user/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          axios
            .get(`${config.APP_API}/user/get-user-id`, {
              params: { id: res?.data?.userId },
            })
            .then((resUser) => {
              if (resUser?.data?.user?.role === 4) {
                setUser(resUser.data.user);
                showSuccess();
              } else {
                showError();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        showError();
      });
    reset();
  };

  return (
    <div className="dialog-demo">
      <div className="card-login">
        <Toast ref={toast} />
        <div className="form-demo admin-dangnhap">
          <div className="p-d-flex p-jc-center">
            <div className="card">
              <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                <div className="p-field">
                  <span className="p-float-label p-input-icon-right">
                    <Controller
                      name="email"
                      control={control}
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
                      Username
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
                  className="p-mt-2"
                  className="btn-login"
                />
                <div className="p-field">
                  <div className="btnforget">Bạn quên mật khẩu</div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DangNhap;
