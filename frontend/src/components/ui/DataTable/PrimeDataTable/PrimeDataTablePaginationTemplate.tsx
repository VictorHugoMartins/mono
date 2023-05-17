import { Ripple } from "primereact/ripple";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { PaginatorTemplateOptions } from "primereact/paginator";

export const PrimeDataTablePaginationTemplate: PaginatorTemplateOptions = {
  layout: "PrevPageLink PageLinks NextPageLink RowsPerPageDropdown",
  FirstPageLink: null,
  LastPageLink: null,
  CurrentPageReport: null,
  JumpToPageInput: null,
  PrevPageLink: (options) => {
    return (
      <button
        type="button"
        className={options.className}
        onClick={options.onClick}
        disabled={options.disabled}
      >
        <i className="pi pi-angle-left"></i>
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
        <i className="pi pi-angle-right"></i>
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
      { label: 5, value: 5 },
      { label: 10, value: 10 },
      { label: 15, value: 15 },
      { label: 25, value: 25 },
      { label: 50, value: 50 },
    ];

    return (
      <Dropdown
        value={options.value}
        options={dropdownOptions}
        onChange={options.onChange}
        style={{ zIndex: "2000" }}
      />
    );
  },
};
