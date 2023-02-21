import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useFieldArray, Controller } from "react-hook-form";
// import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import "./styles.css";

function NestedFieldArray({ nestIndex, control, videoByTopic }) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `listQuestion[${nestIndex}].answers`,
  });

  return (
    <div className="dynamic-form-question">
      <h5 style={{ paddingRight: 70 }}>Câu trả lời</h5>

      {fields.map((_, k) => {
        return (
          <div
            key={k}
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: 10,
            }}
          >
            <Controller
              name={`listQuestion[${nestIndex}].answers[${k}].answer]`}
              control={control}
              render={({ field }) => (
                <Dropdown
                  style={{ width: "95%" }}
                  value={field.value}
                  options={videoByTopic.map((item) => ({
                    name: item?.content,
                    value: item?.content,
                  }))}
                  optionLabel="name"
                  onChange={(e) => {
                    field.onChange(e.value);
                  }}
                  placeholder="Chọn câu trả lời"
                />
              )}
            />
            <i
              className="pi pi-trash"
              style={{
                cursor: "pointer",
                color: "red",
                height: "16px",
                margin: "auto 0px auto 10px",
              }}
              onClick={() => remove(k)}
            />
          </div>
        );
      })}

      <div style={{ paddingRight: 70 }}>
        <Button
          label="Thêm câu trả lời"
          style={{ width: "200px" }}
          onClick={() =>
            append({
              answer: "",
            })
          }
        />
      </div>
    </div>
  );
}

export default NestedFieldArray;
