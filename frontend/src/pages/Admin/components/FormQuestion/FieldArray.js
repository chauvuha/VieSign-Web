import React from "react";
import { useFieldArray, Controller } from "react-hook-form";
import NestedArray from "./nestedFieldArray";
// import { InputText } from "primereact/inputtext";
import "./styles.css";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";

function FieldArray({ control, register, videoByTopic, listVideoSelected }) {
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
              <h5 style={{ paddingRight: 70 }}>Câu hỏi {index + 1}</h5>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Controller
                  name={`listQuestion[${index}].question`}
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      style={{ width: "95%" }}
                      value={field.value}
                      options={videoByTopic
                        .filter(
                          (item) =>
                            !(
                              listVideoSelected?.includes(item?.content) &&
                              item?.content !== field.value
                            )
                        )
                        .map((item) => ({
                          name: item?.content,
                          value: item?.content,
                        }))}
                      optionLabel="name"
                      onChange={(e) => {
                        field.onChange(e.value);
                      }}
                      placeholder="Chọn câu hỏi"
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
                  onClick={() => remove(index)}
                />
              </div>
              <NestedArray
                nestIndex={index}
                {...{ control, register }}
                videoByTopic={videoByTopic}
              />
            </Card>
          );
        })}
      </div>
      <div style={{ paddingRight: 70 }}>
        <Button
          label="Thêm câu hỏi"
          style={{ width: "200px", marginTop: "12px"}}
          onClick={() => {
            append({ question: "", answers: [] });
          }}
        />
      </div>
    </>
  );
}

export default FieldArray;
