import "./ttUser.css";
import React, { useState, useRef } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import { FileUpload } from "primereact/fileupload";
import { Avatar } from "primereact/avatar";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import config from "../../../../config";

function TTUser({ user }) {
  const navigate = useNavigate();
  const defaultValues = {
    hotenlot: "",
    ten: "",
    password: "",
    date: "",
    country: "",
    address: "",
    city: "",
    zipcode: "",
    phone: "",
    url: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });

  const invoiceUploadHandler = ({ files }) => {
    const [file] = files;
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      uploadInvoice(e.target.result);
      console.log(e.target);
    };
    fileReader.readAsDataURL(file);
  };
  const uploadInvoice = async (invoiceFile) => {
    let formData = new FormData();
    formData.append("invoiceFile", invoiceFile);
  };

  const onSubmit = (data) => {
    let hotenlot =
      data.hotenlot !== ""
        ? data.hotenlot
        : user.username.split(" ").slice(0, -1).join(" ");
    let ten =
      data.ten !== "" ? data.ten : user.username.split(" ").slice(-1).join(" ");

    const info = {
      _id: JSON.parse(window.localStorage.getItem("id")),
      username: `${hotenlot} ${ten}`,
      password: data.password !== "" ? data.password : user.password,
      email: user.email,
      date:
        data.date !== "" ? moment(data.date).format("DD-MM-YYYY") : user.dob,
      country: data.country !== "" ? data.country : user.country,
      address: data.address !== "" ? data.address : user.address,
      city: data.city !== "" ? data.city : user.city,
      zipcode: data.zipcode !== "" ? data.zipcode : user.zipcode,
      phone: data.phone !== "" ? data.phone : user.phone,
      url: data.url !== "" ? data.url : user.url,
    };

    if (data.password === "") {
      const key = "password";
      delete info[key]; 
    }
    
    axios
      .post(`${config.APP_API}/user/update-user`, JSON.stringify(info), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        navigate(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="card2">
      <div className="p-card-title "> Thông tin cá nhân</div>
      <Divider />
      <div className="form-demo ttuser">
        <div className="p-d-flex p-jc-center">
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            <div className="p-grid flexcard" id="card2-info-user">
              <div className="p-sm-2 p-col-12">
                <img src={user.url} className="img" />
              </div>
              <div className="p-sm-7 p-col-12 ta-center">
                <div className="hoten"> {user.username}</div>
                <div className="email">{user.email}</div>
                {/*
                <div>
                  <Controller
                    name="url"
                    control={control}
                    render={({ field }) => (
                      <div className="card">
                        <FileUpload
                          id={field.url}
                          mode="basic"
                          customUpload={true}
                          uploadHandler={invoiceUploadHandler}
                          accept="image/*"
                          maxFileSize={1000000}
                          //onUpload={(e) => field.onChange(e)}
                          className="p-button-text"
                          chooseLabel="Đổi ảnh giao diện"
                        />
                      </div>
                    )}
                  />
                </div>
                */}
              </div>
              <div className="p-sm-3 p-col-12">
                <div className="role-user">Học viên</div>
              </div>
            </div>
            <Divider />

              <div className="p-grid flexcard" id="tttk">
                <div className="p-col-10" id="name-card-info-user">
                  Thông tin tài khoản
                </div>
                <div className=" p-col-2"></div>
              </div>
              <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-6">
                  <label htmlFor="hotenlot" id="txt-info-user">
                    Họ và tên lót
                  </label>
                  <Controller
                    name="hotenlot"
                    control={control}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.hotenlot}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        type="text"
                        placeholder={user.username
                          .split(" ")
                          .slice(0, -1)
                          .join(" ")}
                      />
                    )}
                  />
                </div>
                <div className="p-field p-col-12 p-md-6">
                  <label htmlFor="ten" id="txt-info-user">
                    Tên
                  </label>
                  <Controller
                    name="ten"
                    control={control}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.ten}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        type="text"
                        placeholder={user.username
                          .split(" ")
                          .slice(-1)
                          .join(" ")}
                      />
                    )}
                  />
                </div>
                <div className="p-field p-col-12 p-md-6">
                  <label htmlFor="ngaysinh" id="txt-info-user" class>
                    Ngày sinh
                  </label>
                  <div>
                    <Controller
                      name="date"
                      control={control}
                      render={({ field }) => (
                        <Calendar
                          id={field.date}
                          onChange={(e) => field.onChange(e.value)}
                          dateFormat="dd-mm-yy"
                          // mask="99/99/9999"
                          showIcon
                          placeholder={user.dob}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="p-field p-col-12 p-md-6">
                  <label htmlFor="password" id="txt-info-user">
                    Password
                  </label>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.password}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        type="password"
                        placeholder="******"
                      />
                    )}
                  />
                </div>
              </div>
            <Divider />
            <div>
              <div className="p-grid flexcard" id="dcll">
                <div className="p-col-10" id="name-card-info-user">
                  Địa chỉ liên lạc
                </div>
                <div className=" p-col-2" id="btn-card-TTUser"></div>
              </div>
              <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-6">
                  <label htmlFor="quocgia" id="txt-info-user">
                    Quốc gia
                  </label>
                  <Controller
                    name="country"
                    control={control}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.country}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        type="text"
                        placeholder={user.country}
                      />
                    )}
                  />
                </div>
                <div className="p-field p-col-12 p-md-6">
                  <label htmlFor="thanhpho" id="txt-info-user">
                    Thành Phố
                  </label>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.city}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        type="text"
                        placeholder={user.city}
                      />
                    )}
                  />
                </div>
                <div className="p-field p-col-12 p-md-6">
                  <label htmlFor="sdt" id="txt-info-user">
                    Số điện thoại
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.phone}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        type="text"
                        placeholder={user.phone}
                      />
                    )}
                  />
                </div>
                <div className="p-field p-col-12 p-md-6">
                  <label htmlFor="mabuudien" id="txt-info-user">
                    Mã bưu điện
                  </label>
                  <Controller
                    name="zipcode"
                    control={control}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.zipcode}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        type="text"
                        placeholder={user.zipcode}
                      />
                    )}
                  />
                </div>
                <div className="p-field p-col-12">
                  <label htmlFor="diachi" id="txt-info-user">
                    Địa chỉ
                  </label>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.address}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        type="text"
                        placeholder={user.address}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="btn-TTUser">
              <Button
                className="p-button btn-signup"
                type="submit"
                label=" Cập nhập"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default TTUser;
