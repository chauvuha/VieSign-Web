import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Ripple } from "primereact/ripple";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import config from "../../../../config";

const TableUser = () => {
  const [users, setUsers] = useState([]);
  const [first1, setFirst1] = useState(0);
  const [rows1, setRows1] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Press 'Enter' key to go to this page."
  );

  useEffect(() => {
    axios.get(`${config.APP_API}/user/all-user`).then((res) => {
      setUsers(res.data.allUser);
    });
  }, []);

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

  const renderTypeUser = (dataRow) => {
    if (dataRow.role === 1) {
      return <>Người khiếm thính</>;
    } else if (dataRow.role === 2) {
      return <>Người nhà của người khiếm thính</>;
    } else {
      return <>Người bình thường</>;
    }
  }

  return (
    <div className="p-grid ">
      <div className="p-col-1"></div>
      <div className="p-col-10">
        <div className="card " rows={10}>
          <DataTable

            header="Danh sách người dùng"
            value={users}
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
              key="username"
              field="username"
              header="Tên tài khoàn"
              style={{ minWidth: "" }}
            />
            <Column
              key="role"
              field="role"
              header="Loại người dùng"
              style={{ minWidth: "" }}
              body={renderTypeUser}
            />
            <Column
              key="dob"
              field="dob"
              header="Ngày sinh"
              style={{ minWidth: "" }}
            />
            <Column
              key="country"
              field="country"
              header="Quốc gia"
              style={{ minWidth: "" }}
            />
            <Column
              key="city"
              field="city"
              header="Thành phố"
              style={{ minWidth: "" }}
            />
            <Column
              key="address"
              field="address"
              header="Địa chỉ"
              style={{ minWidth: "" }}
            />
            <Column
              key="zipcode"
              field="zipcode"
              header="Mã bưu điện"
              style={{ minWidth: "" }}
            />
            <Column
              key="phone"
              field="phone"
              header="Số điện thoại"
              style={{ minWidth: "" }}
            />
            <Column
              key="topic"
              field="topic"
              header="Chủ đề học hiện tại"
              style={{ minWidth: "" }}
            />
            <Column
              key="part"
              field="part"
              header="Phần học hiện tại"
              style={{ minWidth: "" }}
            />
          </DataTable>
        </div>
      </div>
      <div className="p-col-1"></div>
    </div>
  );
};

export default TableUser;
