import { Fragment, useState, useEffect, useMemo } from "react";
import Checkbox from "../checkbox/Checkbox";
import Button from "../button/Button";
import styles from "./Table.module.scss";
import {
  currentNumberOfResults,
  getPrefilledPaginationControls
} from "../../utils/helpers/pagination-helpers";
import { resources } from "../../utils/resources";
import Select, { Option } from "../select/Select";

const pageSizeOptions: Option[] = [
  {
    label: "5",
    value: 5
  },
  {
    label: "10",
    value: 10
  },
  {
    label: "15",
    value: 15
  },
  {
    label: "20",
    value: 20
  },
  {
    label: "30",
    value: 30
  }
];

export interface Column {
  title: string;
  dataIndex: string;
  key: any;
  sortBy?: string;
  render?: (cellData: any, row: any, index: number) => string | JSX.Element;
}

export interface Pagination {
  pageSize: number;
  total: number;
  pageNumber: number;
}

interface TableProps {
  dataSource: any[];
  columns: Column[];
  rowExpandRender?: (row: any) => string | JSX.Element;
  pagination: Pagination;
  onPageChange?: (pageNumber: number) => void;
  loading?: boolean;
  showCheckbox?: boolean;
  onPageSizeChange?: (pageSize: number) => void;
  emptyText?: string;
}

const Table: (props: TableProps) => JSX.Element = props => {
  const [expandedKeys, setExpandedKeys] = useState<any>({});
  const [pageCount, setPageCount] = useState(0);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedMap, setSelectedMap] = useState<any>({});
  const [unSelectedMap, setUnSelectedMap] = useState<any>({});
  const [isChecked, setIsChecked] = useState(false);
  const [currentSortLogic, setCurrentSortLogic] = useState("");

  const {
    dataSource,
    columns: _columns,
    rowExpandRender,
    pagination,
    onPageChange = () => {},
    loading,
    showCheckbox,
    onPageSizeChange,
    emptyText
  } = props;

  const { pageSize = 10, total = 0, pageNumber = 1 } = pagination || {};

  const rowExpansionCol: Column = {
    title: "",
    key: "rowExpandCol",
    dataIndex: "rowExpandCol"
  };

  const columns: Column[] = [
    ..._columns,
    rowExpandRender && rowExpansionCol
  ].filter(Boolean) as Column[];

  const handlePageControlClick: (pageNumber: number) => void = _page => {
    if (_page >= 1 && _page <= pageCount) onPageChange(_page);
  };

  const handleSelectAll = () => {
    setUnSelectedMap({});
    setSelectedMap({});
    setSelectAll(true);
  };

  const handleUnSelectAll = () => {
    setUnSelectedMap({});
    setSelectedMap({});
    setSelectAll(false);
  };

  useEffect(() => {
    setSelectedMap({});
    setUnSelectedMap({});
    setSelectAll(false);
  }, [dataSource]);

  useEffect(() => {
    setPageCount(Math.ceil(total / pageSize));
  }, [total, pageSize]);

  useEffect(() => {
    setExpandedKeys({});
  }, [pageNumber]);

  const getCellRender: (row: any, col: Column, index: number) => JSX.Element = (
    row,
    col,
    i
  ) => {
    return col.render
      ? col.render(row[col.dataIndex], row, i)
      : row[col.dataIndex];
  };

  const handleChecked = (checked: boolean) => {
    setIsChecked(checked);
    if (checked) {
      handleSelectAll();
    } else {
      handleUnSelectAll();
    }
  };

  const sortIcons: (sortBy: string) => JSX.Element = sortBy => {
    return (
      <div className={styles["sort-wrapper"]}>
        <Button
          iconOnly
          type="transparent"
          onClick={() =>
            setCurrentSortLogic(
              currentSortLogic === `${sortBy} ASC` ? "" : `${sortBy} ASC`
            )
          }
        >
          <img
            alt="sort up"
            src={
              currentSortLogic === `${sortBy} ASC`
                ? "/icons/caret-up-blue.svg"
                : "/icons/caret-up.svg"
            }
            className={styles["sort-icon"]}
          />
        </Button>
        <Button
          iconOnly
          type="transparent"
          onClick={() =>
            setCurrentSortLogic(
              currentSortLogic === `${sortBy} DESC` ? "" : `${sortBy} DESC`
            )
          }
        >
          <img
            alt="sort descending"
            src={
              currentSortLogic === `${sortBy} DESC`
                ? "/icons/caret-down-blue.svg"
                : "/icons/caret-down.svg"
            }
            className={styles["sort-icon"]}
          />
        </Button>
      </div>
    );
  };

  const paginationControls = useMemo(() => {
    return getPrefilledPaginationControls(pageNumber, pageCount);
  }, [pageCount, pageNumber]);

  const handlePageSkip: (direction: "forward" | "backward") => void =
    direction => {
      const newPage =
        direction === "forward"
          ? Math.min(pageNumber + 5, pageCount)
          : Math.max(pageNumber - 5, 1);
      onPageChange(newPage);
    };

  return (
    <div className={styles["table-wrapper"]}>
      <table className={styles.table}>
        <thead>
          <tr>
            {showCheckbox && (
              <th className={styles.th}>
                {" "}
                <Checkbox checked={isChecked} onChange={handleChecked} />{" "}
              </th>
            )}
            {columns.map(col => (
              <th className={styles.th} key={col.key}>
                {col.title} {col.sortBy && sortIcons(col.sortBy)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!dataSource.length && (
            <tr>
              <td colSpan={columns.length}>
                <em className={styles["no-data"]}>{emptyText || "No data"}</em>
              </td>
            </tr>
          )}
          {dataSource.map(
            (row, i) =>
              i + 1 < pageSize && (
                <Fragment key={i}>
                  <tr>
                    {showCheckbox && (
                      <td className={styles.td}>
                        <Checkbox
                          checked={Boolean(
                            selectAll
                              ? !unSelectedMap[row.key]
                              : selectedMap[row.key]
                          )}
                          onChange={checked =>
                            selectAll
                              ? setUnSelectedMap({
                                  ...unSelectedMap,
                                  [row.key]: !checked
                                })
                              : setSelectedMap({
                                  ...selectedMap,
                                  [row.key]: checked
                                })
                          }
                        />
                      </td>
                    )}
                    {columns.map((col, j) => (
                      <td key={j} className={styles.td}>
                        {col.dataIndex === "rowExpandCol" ? (
                          <div
                            className={styles["expand-wrapper"]}
                            role="button"
                            onClick={() =>
                              setExpandedKeys({
                                ...expandedKeys,
                                [row.key]: !expandedKeys[row.key]
                              })
                            }
                          >
                            <div
                              className={[
                                styles.expand,
                                expandedKeys[row.key] && styles.active
                              ].join(" ")}
                            />
                          </div>
                        ) : (
                          getCellRender(row, col, i)
                        )}
                      </td>
                    ))}
                  </tr>
                  {rowExpandRender && (
                    <tr>
                      <td
                        className={[
                          styles["expand-row"],
                          expandedKeys[row.key] && styles.active
                        ].join(" ")}
                        colSpan={columns.length}
                      >
                        {rowExpandRender(row)}
                      </td>
                    </tr>
                  )}
                </Fragment>
              )
          )}
        </tbody>
      </table>

      {pagination && (
        <div className="flex center-align between margin-top">
          <div className="flex spaced center-align">
            <span className="margin-left margin-right">
              Showing{" "}
              <span>
                {currentNumberOfResults(total, pageNumber, pageSize)}{" "}
                {`result${
                  currentNumberOfResults(total, pageNumber, pageSize) !== 1
                    ? "s"
                    : ""
                }`}
              </span>{" "}
              of {total} {`record${total !== 1 ? "s" : ""}`}
            </span>
            <span className="flex inline spaced center-align margin-left">
              <strong>Per page: </strong>
              <Select
                options={pageSizeOptions}
                value={pagination.pageSize}
                onSelect={value => onPageSizeChange?.(value as number)}
                dropdownOnTop
                size="small"
                theme="dark"
              />
            </span>
          </div>
          <div className={styles["pagination-flex"]}>
            <div
              onClick={() => handlePageControlClick(pageNumber - 1)}
              role="button"
              className={[
                styles["page-control"],
                styles.previous,
                pageNumber === 1 && styles.invalid
              ].join(" ")}
            >
              <div className={styles.arrow} />
            </div>
            {paginationControls.map((control, index) =>
              control.pageNumber ? (
                <div
                  key={index}
                  role="button"
                  className={[
                    styles["page-control"],
                    pageNumber === control.pageNumber && styles.active
                  ].join(" ")}
                  onClick={() =>
                    handlePageControlClick(control.pageNumber || 1)
                  }
                >
                  {control.pageNumber}
                </div>
              ) : (
                <div
                  key={index}
                  role="button"
                  className={[
                    styles.skip,
                    styles[control.skipDirection || "forward"]
                  ].join(" ")}
                  onClick={() =>
                    handlePageSkip(control.skipDirection || "forward")
                  }
                >
                  <div className={styles.dot} />
                  <div className={styles.dot} />
                  <div className={styles.dot} />
                </div>
              )
            )}
            <div
              onClick={() => handlePageControlClick(pageNumber + 1)}
              role="button"
              className={[
                styles["page-control"],
                styles.next,
                (!pageCount || pageNumber === pageCount) && styles.invalid
              ].join(" ")}
            >
              <div className={styles.arrow} />
            </div>
          </div>
        </div>
      )}

      <div className={[styles.loader, loading && styles.active].join(" ")}>
        <img
          src={resources.images.ANIMATION_IMG_SPIN}
          className={styles.image}
          alt="loading"
        />
      </div>
    </div>
  );
};

export default Table;
