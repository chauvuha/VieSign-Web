import { Button } from "primereact/button";
import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import config from "../../../../config";

const FormVideo = ({ amountTopic, rowData }) => {
  const toast = useRef(null);
  const filterOption = (number, name) => {
    if (name === "part") {
      for (let item of numberPart) {
        if (item.number === number) {
          return item;
        }
      }
    } else {
      for (let item of type) {
        if (item.number === number) {
          return item;
        }
      }
    }
  };

  /*Select number part */
  const numberPart = [
    { name: "1", number: 1 },
    { name: "2", number: 2 },
    { name: "3", number: 3 },
  ];

  /*Select type */
  const type = [
    { name: "Câu hỏi", number: 1 },
    { name: "Câu trả lời", number: 2 },
    { name: "Từ vựng", number: 3 },
  ];

  const defaultValues = {
    content: rowData?.content !== undefined ? rowData.content : "",
    url: rowData?.url !== undefined ? rowData.url : "",
    numberTopic: rowData?.numberTopic !== undefined ? rowData.numberTopic : 1,
    nameTopic: rowData?.nameTopic !== undefined ? rowData.nameTopic : "",
    numberPart:
      rowData?.numberPart !== undefined
        ? filterOption(rowData.numberPart, "part")
        : { name: "1", number: 1 },
    type:
      rowData?.type !== undefined
        ? filterOption(rowData.type, "type")
        : { name: "Từ vựng", number: 3 },
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm({ defaultValues });

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const onSubmit = (data) => {
    if (rowData === undefined) {
      const info = {
        content: data.content,
        url: data.url,
        numberTopic: parseInt(data.numberTopic),
        nameTopic: data.nameTopic,
        numberPart: data.numberPart.number,
        type: data.type.number,
      };

      axios
        .post(`${config.APP_API}/video/create-video`, JSON.stringify(info), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            toast.current.show({
              severity: "success",
              summary: "Tạo thành công",
              detail: "Bạn đã tạo video thành công",
              life: 3000,
            });
          }
        })
        .catch((err) => {
          toast.current.show({
            severity: "error",
            summary: "Tạo thất bại",
            detail: "Bạn đã tạo video thất bại",
            life: 3000,
          });
        });
    } else {
      const info = {
        _id: rowData._id,
        content: data.content,
        url: data.url,
        numberTopic: parseInt(data.numberTopic),
        nameTopic: data.nameTopic,
        numberPart: data.numberPart.number,
        type: data.type.number,
      };

      axios
        .post(`${config.APP_API}/video/update-video`, JSON.stringify(info), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            toast.current.show({
              severity: "success",
              summary: "Cập nhật thành công",
              detail: "Bạn đã cập nhật video thành công",
              life: 3000,
            });
          }
        })
        .catch((err) => {
          toast.current.show({
            severity: "error",
            summary: "Cập nhật thất bại",
            detail: "Bạn đã cập nhật video thất bại",
            life: 3000,
          });
        });
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="p-grid " id="admin">
        <div className="p-col-2"></div>
        <div className="p-col-8">
          <Card>
            <div className="form-demo">
              <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                <div className="p-field">
                  <span className="p-float-label">
                    <Controller
                      name="content"
                      control={control}
                      rules={{ required: "Nội dung video là bắt buộc." }}
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
                      htmlFor="content"
                      className={classNames({ "p-error": errors.content })}
                    >
                      Nội dung
                    </label>
                  </span>
                  {getFormErrorMessage("content")}
                </div>
                <div className="p-field">
                  <span className="p-float-label p-input-icon-right">
                    <Controller
                      name="url"
                      control={control}
                      rules={{
                        required: "id của video là bắt buộc.",
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
                      htmlFor="url"
                      className={classNames({ "p-error": !!errors.url })}
                    >
                      URL video
                    </label>
                  </span>
                  {getFormErrorMessage("url")}
                </div>
                <div className="p-field">
                  <span className="p-float-label">
                    <Controller
                      name="numberTopic"
                      control={control}
                      rules={{
                        required: "Chủ đề của video là bắt buộc.",
                        validate: () => {
                          if (
                            parseInt(getValues("numberTopic")) >
                            amountTopic + 1
                          )
                            return `Chủ đề video phải nhỏ hơn hoặc bằng ${
                              amountTopic + 1
                            }`;
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
                      htmlFor="numberTopic"
                      className={classNames({ "p-error": errors.numberTopic })}
                    >
                      Số chủ đề
                    </label>
                  </span>
                  {getFormErrorMessage("numberTopic")}
                </div>
                <div className="p-field">
                  <span className="p-float-label">
                    <Controller
                      name="nameTopic"
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
                    <label htmlFor="nameTopic">Tên chủ đề</label>
                  </span>
                </div>
                <div className="p-field">
                  <span className="p-float-label">
                    <Controller
                      name="numberPart"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          value={field.value}
                          options={numberPart}
                          optionLabel="name"
                          placeholder="Phần 1 hay 2 hay 3?"
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                        />
                      )}
                    />
                    <label htmlFor="numberPart">Số phần</label>
                  </span>
                </div>
                <div className="p-field">
                  <span className="p-float-label">
                    <Controller
                      name="type"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          value={field.value}
                          options={type}
                          optionLabel="name"
                          placeholder="Loại video (câu hỏi, câu trả lời, từ vựng)"
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                        />
                      )}
                    />
                    <label htmlFor="numberPart">Loại video</label>
                  </span>
                </div>
                <Button
                  type="submit"
                  label={rowData === undefined ? "Tạo" : "Cập nhật"}
                  className="p-mt-2"
                  className="btn-signup"
                />
              </form>
            </div>
          </Card>
        </div>
        <div className="p-col-2"></div>
      </div>
    </>
  );
};

export default FormVideo;
