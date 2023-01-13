import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Ripple } from "primereact/ripple";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Tooltip } from "primereact/tooltip";
import axios from "axios";
import { Toast } from "primereact/toast";
import { useState, useEffect, useRef } from "react";
import config from "../../../../config";

const TableQuestion = ({
  setFormQuestionVisible,
  setTableQuestionVisible,
  setRowData,
}) => {
  const [questions, setQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [first1, setFirst1] = useState(0);
  const [rows1, setRows1] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Press 'Enter' key to go to this page."
  );
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios.get(`${config.APP_API}/question/all-question`).then((res) => {
      setQuestions(res.data.questions);
    });
    axios.get(`${config.APP_API}/video/list-topic`).then((res) => {
      setTopics(res.data.listTopic);
    });
  }, [reload]);

  const toast = useRef(null);

  const renderHeader = () => {
    return (
      <div
        className="p-d-flex p-jc-between p-ai-center"
        style={{ paddingRight: "10rem" }}
      >
        <h5 className="p-m-1">Danh sách câu hỏi</h5>
        <span className="p-input-icon-left" onClick={handleClickAdd}>
          <i
            className="pi pi-plus-circle"
            style={{ color: "green", fontSize: "20px", cursor: "pointer" }}
          />
        </span>
      </div>
    );
  };

  const onPageInputKeyDown = (event, options) => {
    if (event.key === "Enter") {
      const page = parseInt(currentPage);
      if (page < 0 || page > options.totalPages) {
        setPageInputTooltip(
          `Value must be between 1 and ${options.totalPages}.`
        );
      } else {
        const first = currentPage ? options.rows * (page - 1) : 0;

        setFirst1(first);
        setPageInputTooltip("Press 'Enter' key to go to this page.");
      }
    }
  };

  const onPageInputChange = (event) => {
    setCurrentPage(event.target.value);
  };

  const template1 = {
    layout:
      "PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport",
    PrevPageLink: (options) => {
      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-p-3">Previous</span>
          <Ripple />
        </button>
      );
    },
    NextPageLink: (options) => {
      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-p-3">Next</span>
          <Ripple />
        </button>
      );
    },
    PageLinks: (options) => {
      if (
        (options.view.startPage === options.page &&
          options.view.startPage !== 0) ||
        (options.view.endPage === options.page &&
          options.page + 1 !== options.totalPages)
      ) {
        const className = classNames(options.className, { "p-disabled": true });

        return (
          <span className={className} style={{ userSelect: "none" }}>
            ...
          </span>
        );
      }

      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
        >
          {options.page + 1}
          <Ripple />
        </button>
      );
    },
    RowsPerPageDropdown: (options) => {
      const dropdownOptions = [
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 50, value: 50 },
        { label: "All", value: options.totalRecords },
      ];

      return (
        <Dropdown
          value={options.value}
          options={dropdownOptions}
          onChange={options.onChange}
        />
      );
    },
    CurrentPageReport: (options) => {
      return (
        <span
          className="p-mx-3"
          style={{ color: "var(--text-color)", userSelect: "none" }}
        >
          Go to{" "}
          <InputText
            size="2"
            className="p-ml-1"
            value={currentPage}
            tooltip={pageInputTooltip}
            onKeyDown={(e) => onPageInputKeyDown(e, options)}
            onChange={onPageInputChange}
          />
        </span>
      );
    },
  };

  const onCustomPage1 = (event) => {
    setFirst1(event.first);
    setRows1(event.rows);
    setCurrentPage(event.page + 1);
  };

  const handleClickEdit = (rowData) => {
    setRowData(rowData);
    setTableQuestionVisible(false);
    setFormQuestionVisible(true);
  };

  const handleClickDelete = (rowData) => {
    axios
      .delete(`${config.APP_API}/question/delete-question`, {
        params: {
          _id: rowData._id,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.current.show({
            severity: "success",
            summary: "Xóa thành công",
            detail: "Bạn đã xóa video thành công",
            life: 3000,
          });
          setReload(!reload);
        }
      });
  };

  const actionRender = (rowData) => {
    return (
      <>
        <i
          className="pi pi-pencil"
          style={{ cursor: "pointer", marginLeft: "10px" }}
          onClick={() => handleClickEdit(rowData)}
        ></i>
        <i
          className="pi pi-trash"
          style={{ cursor: "pointer", marginLeft: "10px", color: "red" }}
          onClick={() => handleClickDelete(rowData)}
        ></i>
      </>
    );
  };

  //handle add, update, remove
  const handleClickAdd = () => {
    setRowData({});
    setTableQuestionVisible(false);
    setFormQuestionVisible(true);
  };

  return (
    <div className="p-grid " id="admin">
      <div className="p-col-1"></div>
      <div className="p-col-10">
        <div className="" rows={10}>
          <Toast ref={toast} />
          <DataTable
            header={renderHeader}
            value={questions}
            paginator
            paginatorTemplate={template1}
            first={first1}
            rows={rows1}
            onPage={onCustomPage1}
          >
            <Column
              key="stt"
              field="stt"
              header="STT"
              style={{ minWidth: "" }}
              body={(_, options) => options.rowIndex + 1}
            />
            <Column
              key="topic"
              field="topic"
              header="Chủ đề"
              style={{ minWidth: "" }}
              body={(rowData) =>
                topics.find((item) => item?.numberTopic === rowData?.topic)
                  ?.nameTopic
              }
            />
            <Column
              key="question"
              field="question"
              header="Câu hỏi"
              style={{ maxWidth: "400px" }}
              bodyStyle={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              body={(rowData) => (
                <div>
                  <Tooltip
                    target={`.question-${rowData?.topic}`}
                    position="left"
                    content={rowData?.listQuestion
                      ?.map((item) => item?.question)
                      .join(", ")}
                  />
                  <div
                    className={`question-${rowData?.topic}`}
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {rowData?.listQuestion
                      ?.map((item) => item?.question)
                      .join(", ")}
                  </div>
                </div>
              )}
            />
            <Column
              key="answer"
              field="answer"
              header="Câu trả lời"
              style={{ maxWidth: "400px" }}
              body={(rowData) => (
                <div>
                  <Tooltip
                    target={`.answerQuestion-${rowData?.topic}`}
                    position="left"
                    content={rowData?.listQuestion
                      ?.map((item) => item?.answer)
                      ?.flat()
                      ?.join(", ")}
                  />
                  <div
                    className={`answerQuestion-${rowData?.topic}`}
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {rowData?.listQuestion
                      ?.map((item) => item?.answer)
                      ?.flat()
                      ?.join(", ")}
                  </div>
                </div>
              )}
            />
            <Column
              key="action"
              field="action"
              header="Action"
              style={{ minWidth: "" }}
              body={actionRender}
            />
          </DataTable>
        </div>
      </div>
      <div className="p-col-1"></div>
    </div>
  );
};

export default TableQuestion;
