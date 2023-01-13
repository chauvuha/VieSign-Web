import React from "react";
import { useFieldArray } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

function NestedFieldArray({ nestIndex, control, register }) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `listQuestion[${nestIndex}].answers`,
  });

  return (
    <div className="dynamic-form-question">
      <h5>Câu trả lời</h5>
      {fields.map((item, k) => {
        return (
          <div key={item.id} style={{ marginBottom: "8px" }}>
            <InputText
              style={{ width: "95%" }}
              id={item.name}
              {...register(`listQuestion[${nestIndex}].answers[${k}].answer`, {
                required: true,
              })}
              placeholder="Nhập câu trả lời"
            />
            <i
              className="pi pi-trash"
              style={{ cursor: "pointer", marginLeft: "10px", color: "red" }}
              onClick={() => remove(k)}
            />
          </div>
        );
      })}

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
  );
}

export default NestedFieldArray;
