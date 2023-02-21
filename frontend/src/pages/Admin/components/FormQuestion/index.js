import { Button } from "primereact/button";
import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import config from "../../../../config";
import FieldArray from "./FieldArray";

const FormQuestion = ({ topics, rowData }) => {
  const [videoByTopic, setVideoByTopic] = useState([]);
  const [listVideoSelected, setListVideoSelected] = useState([
    rowData?.listQuestion?.map((item) => item?.question),
  ]);
  const [topic, setTopic] = useState(rowData?.topic);
  const toast = useRef(null);

  const defaultValues =
    rowData === undefined || Object.keys(rowData).length === 0
      ? {
          listQuestion: [
            {
              question: "",
              answers: [{ answer: "" }],
            },
          ],
        }
      : {
          topic: rowData.topic,
          listQuestion: rowData.listQuestion.map((item) => ({
            question: item.question,
            answers: item.answer.map((v) => ({ answer: v })),
          })),
        };
  const {
    control,
    handleSubmit,
    register,
    watch,
  } = useForm({ defaultValues });

  const watchAllFields = watch();

  useEffect(() => {
    if (
      JSON.stringify(
        watchAllFields?.listQuestion?.map((item) => item?.question)
      ) !== JSON.stringify(listVideoSelected)
    ) {
      setListVideoSelected(
        watchAllFields?.listQuestion?.map((item) => item?.question)
      );
    }
  }, [listVideoSelected, watchAllFields]);

  useEffect(() => {
    axios
      .get(`${config.APP_API}/video/get-list-video-by-number-topic`, {
        params: {
          topic,
        },
      })
      .then((res) => {
        setVideoByTopic(res.data.listVideo);
      });
  }, [topic]);

  const onSubmit = (data) => {
    if (rowData === undefined || Object.keys(rowData).length === 0) {
      // add
      const info = {
        topic: data.topic,
        listQuestion: data.listQuestion.map((item) => ({
          question: item.question,
          answer: item.answers.map((v) => v.answer),
        })),
      };
      axios
        .post(
          `${config.APP_API}/question/create-question`,
          JSON.stringify(info),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            toast.current.show({
              severity: "success",
              summary: "Tạo thành công",
              detail: "Bạn đã tạo câu hỏi thành công",
              life: 3000,
            });
          }
        })
        .catch((err) => {
          toast.current.show({
            severity: "error",
            summary: "Tạo thất bại",
            detail: "Bạn đã tạo câu hỏi  hỏi o thất bại",
            life: 3000,
          });
        });
    } else {
      // update
      const info = {
        topic: data.topic,
        listQuestion: data.listQuestion.map((item) => ({
          question: item.question,
          answer: item.answers.map((v) => v.answer),
        })),
      };
      axios
        .put(
          `${config.APP_API}/question/update-question`,
          JSON.stringify(info),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            toast.current.show({
              severity: "success",
              summary: "Cập nhật thành công",
              detail: "Bạn đã cập nhật câu hỏi thành công",
              life: 3000,
            });
          }
        })
        .catch((err) => {
          toast.current.show({
            severity: "error",
            summary: "Cập nhật thất bại",
            detail: "Bạn đã cập nhật câu hỏi thất bại",
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
                      name="topic"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          value={field.value}
                          options={topics.map((item) => ({
                            name: item?.nameTopic,
                            value: item?.numberTopic,
                          }))}
                          optionLabel="name"
                          placeholder="Chọn chủ đề"
                          onChange={(e) => {
                            field.onChange(e.value);
                            setTopic(e.value);
                          }}
                        />
                      )}
                    />
                    <label htmlFor="topic">Chủ đề</label>
                  </span>
                </div>
                <FieldArray
                  {...{
                    control,
                    register,
                    videoByTopic,
                    listVideoSelected,
                  }}
                />
                <Button
                  type="submit"
                  label={
                    rowData === undefined || Object.keys(rowData).length === 0
                      ? "Tạo"
                      : "Cập nhật"
                  }
                  className="p-mt-2"
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

export default FormQuestion;
