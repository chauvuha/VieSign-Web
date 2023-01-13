import React from "react";
import { useFieldArray } from "react-hook-form";
import NestedArray from "./nestedFieldArray";
import { InputText } from "primereact/inputtext";
import "./styles.css";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

function FieldArray({ control, register }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "listQuestion",
  });

  return (
    <>
      <div>
        {fields.map((item, index) => {
          return (
            <Card
              key={item.id}
              style={{ marginTop: "12px", border: "1px solid #000000" }}
            >
              <h5>Câu hỏi {index + 1}</h5>
              <InputText
                style={{ width: "95%" }}
                id={item.name}
                {...register(`listQuestion[${index}].question`, {})}
                placeholder="Nhập câu hỏi"
              />
              <i
                className="pi pi-trash"
                style={{ cursor: "pointer", marginLeft: "10px", color: "red" }}
                onClick={() => remove(index)}
              />

              <NestedArray nestIndex={index} {...{ control, register }} />
            </Card>
          );
        })}
      </div>

      <Button
        label="Thêm câu hỏi"
        style={{ width: "200px", marginTop: "12px" }}
        onClick={() => {
          append({ question: "", answers: [] });
        }}
      />
    </>
  );
}

export default FieldArray;
