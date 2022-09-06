import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "./dangKy.css";

import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import moment from "moment";
import config from "../../../config";


function DangKy() {
  /*Dialog*/
  const [displayModal, setDisplayModal] = useState(false);
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [position, setPosition] = useState("center");
  const [success,  setSuccess] = useState(true);

  const dialogFuncMap = {
    displayModal: setDisplayModal,
    displayResponsive: setDisplayResponsive,
  };

  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

  /*Form */
  const [showMessage, setShowMessage] = useState(false);
  // const [formData, setFormData] = useState({});

  const defaultValues = {
    name: "",
    email: "",
    password: "",
    date: "",
    role: "",
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

  const dialogFooter = (
    <div className="p-d-flex p-jc-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => {
          setSuccess(true);
          setShowMessage(false);
        }}
      />
    </div>
  );
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
  const onSubmit = (data) => {
    console.log(data);
    const info = {
      username: data.name,
      password: data.password,
      email: data.email,
      role: data.role.number,
      dob: moment(data.date).format("DD-MM-YYYY"),
    };
    axios
      .post(
        `${config.APP_API}/user/create-user`,
        JSON.stringify(info),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        setSuccess(false);
        console.log(err);
      });
    setShowMessage(true);
    onHide("displayResponsive");
    reset();
  };

  /*Select role */
  const roles = [
    { name: "Người khiếm thính", number: 1 },
    { name: "Người nhà của người khiếm thính", number: 2 },
    { name: "Người nghe bình thường", number: 3 },
  ];

  return (
    <div className="dialog-demo">
      <div className="card-signup">
        <Button
          label="Tạo tài khoản"
          onClick={() => onClick("displayResponsive")}
          className="p-button-text p-button-plain"
        />
        <Dialog
          header="Đăng ký"
          visible={displayResponsive}
          onHide={() => onHide("displayResponsive")}
          breakpoints={{ "960px": "75vw" }}
          style={{ width: "50vw" }}
        >
          <div className="form-demo dangky-form">
            {/* <div className="p-d-flex p-jc-center">
              <div className="card">
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                  <div className="p-field">
                    <span className="p-float-label">
                      <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Họ Tên là bắt buộc." }}
                        render={({ field, fieldState }) => (
                          <InputText
                            id={field.name}
                            {...field}
                            autoFocus
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                          />
                        )}
                      />
                      <label
                        htmlFor="name"
                        className={classNames({ "p-error": errors.name })}
                      >
                        Họ Tên*
                      </label>
                    </span>
                    {getFormErrorMessage("name")}
                  </div>
                  <div className="p-field">
                    <span className="p-float-label p-input-icon-right">
                      <i className="pi pi-envelope" />
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
                        name="date"
                        control={control}
                        render={({ field }) => (
                          <Calendar
                            id={field.name}
                            value={field.value}
                            onChange={(e) => field.onChange(e.value)}
                            dateFormat="dd/mm/yy"
                            mask="99/99/9999"
                            showIcon
                          />
                        )}
                      />
                      <label htmlFor="date">Ngày Sinh</label>
                    </span>
                  </div>
                  <div className="p-field">
                    <Controller
                      name="role"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          value={field.value}
                          options={roles}
                          optionLabel="name"
                          placeholder="Bạn là "
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                        />
                      )}
                    />
                  </div>

                  <div className="p-field-checkbox">
                    <Controller
                      name="accept"
                      control={control}
                      rules={{ required: true }}
                      render={({ field, fieldState }) => (
                        <Checkbox
                          inputId={field.name}
                          onChange={(e) => field.onChange(e.checked)}
                          checked={field.value}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                        />
                      )}
                    />
                    <label
                      htmlFor="accept"
                      className={classNames({ "p-error": errors.accept })}
                    >
                      Tôi đồng ý với các Điều khoản và Điều kiện*
                    </label>
                  </div>

                  <Button
                    type="submit"
                    label="Đăng Ký"
                    className="p-mt-2"
                    className="btn-signup"
                  />
                </form>
              </div>
            </div> */}
            <div className="p-d-flex p-jc-center">
            <div className="card">
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                  <div className="p-field">
                    <span className="p-float-label">
                      <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Họ Tên là bắt buộc." }}
                        render={({ field, fieldState }) => (
                          <InputText
                            id={field.name}
                            {...field}
                            autoFocus
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                          />
                        )}
                      />
                      <label
                        htmlFor="name"
                        className={classNames({ "p-error": errors.name })}
                      >
                        Họ Tên*
                      </label>
                    </span>
                    {getFormErrorMessage("name")}
                  </div>
                  <div className="p-field">
                    <span className="p-float-label p-input-icon-right">
                      <i className="pi pi-envelope" />
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
                        name="date"
                        control={control}
                        render={({ field }) => (
                          <Calendar
                            id={field.name}
                            value={field.value}
                            onChange={(e) => field.onChange(e.value)}
                            dateFormat="dd/mm/yy"
                            mask="99/99/9999"
                            showIcon
                          />
                        )}
                      />
                      <label htmlFor="date">Ngày Sinh</label>
                    </span>
                  </div>
                  <div className="p-field">
                    <Controller
                      name="role"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          value={field.value}
                          options={roles}
                          optionLabel="name"
                          placeholder="Bạn là "
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                        />
                      )}
                    />
                  </div>

                  <div className="p-field-checkbox">
                    <Controller
                      name="accept"
                      control={control}
                      rules={{ required: true }}
                      render={({ field, fieldState }) => (
                        <Checkbox
                          inputId={field.name}
                          onChange={(e) => field.onChange(e.checked)}
                          checked={field.value}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                        />
                      )}
                    />
                    <label
                      htmlFor="accept"
                      className={classNames({ "p-error": errors.accept })}
                    >
                      Tôi đồng ý với các Điều khoản và Điều kiện*
                    </label>
                  </div>

                  <Button
                    type="submit"
                    label="Đăng Ký"
                    className="p-mt-2 btn-signup"
                    // className="btn-signup"
                  />
                </form>
              </div>
            </div>
          </div>
        </Dialog>
        <Dialog
          visible={showMessage}
          onHide={() => setShowMessage(false)}
          position="top"
          footer={dialogFooter}
          showHeader={false}
          breakpoints={{ "960px": "80vw" }}
          style={{ width: "30vw" }}
        >
          <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
            <i
              className={`pi ${
                success ? "pi-check-circle" : "pi-times-circle"
              }`}
              style={{
                fontSize: "5rem",
                color: `${success ? "var(--green-500)" : "var(--pink-700)"}`,
              }}
            ></i>
            <h5>
              {success
                ? "Đăng ký thành công!"
                : "Đăng kí thất bại: Email đã tồn tại!"}
            </h5>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default DangKy;
