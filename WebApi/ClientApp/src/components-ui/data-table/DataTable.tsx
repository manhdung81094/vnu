import {
  DownloadIcon,
  LockIcon,
  SearchIcon,
  SortAscIcon,
  SortDescIcon,
} from "@primer/octicons-react";
import {
  ActionList,
  ActionMenu,
  Box,
  Button,
  Checkbox,
  IconButton,
  Pagination,
} from "@primer/react";
import clsx from "clsx";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { Column, useTable } from "react-table";
import { useDebounce } from "use-debounce";

import { PlaceHolder } from "../place-holder";
import TextInput from "../text-input";
import styles from "./DataTable.module.css";
import Text from "../text";
export enum eSortMode {
  ASC = "asc",
  DESC = "desc",
}
function removeAccents(str: string) {
  if (!str) return str;
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}
function dynamicSort(property: string, mode: eSortMode) {
  let sortOrder = 1;
  // if (property[0] === "-") {
  //     sortOrder = -1;
  //     property = property.substr(1);
  // }
  if (mode === eSortMode.ASC) {
    sortOrder = 1;
  } else {
    sortOrder = -1;
  }
  return function (a: any, b: any) {
    let result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}
export interface IFocusCell {
  rowData: any;
  dataField: string;
}
interface ISelectionProps {
  keyExpr?: string;
  mode: "multiple" | "single";
  onSelectionChanged: (keys: any[]) => void;
  selectedRowKeys?: any[];
  isShowLockIcon?: boolean;
}
interface ISortConfig {
  enable: boolean;
  field?: string;
  mode: eSortMode;
  onValueChanged?: (field: string, mode: eSortMode) => void;
}
interface IPaging {
  enable: boolean;
  pageSize?: number;
  pageSizeItems?: number[];
  pageIndex?: number;
  pageCount?: number;
  totalCount?: number;
  onPageIndexChanged?: (pageIndex: number) => void;
  onPageSizeChanged?: (page_size: number) => void;
  isPagedFromData?: boolean;
}

export interface IColumn {
  caption?: string;
  dataField?: string;
  isMainColumn?: boolean;
  fixed?: boolean;
  id?: string;
  cellRender?: (data: any) => JSX.Element;
  headerRender?: (data: any) => ReactNode;
  columns?: IColumn[];
  width?: number | string | undefined;
  minWidth?: number | string | undefined;
  maxWidth?: number | string | undefined;
  align?: "left" | "center" | "right";
  isAllowFocus?: boolean;
}
interface ICheckDontSaveChange {
  fields: string[];
  rootDataSource: any[];
}
interface IDataTableProps {
  width?: string;
  columns: IColumn[];
  data: any[];
  height?: string;
  title?: string;
  titleComponent?: React.ReactNode;
  subTitle?: string;
  subTitleComponent?: React.ReactNode;
  actionComponent?: React.ReactNode;
  isLoading?: boolean;
  paging?: IPaging;
  searchEnable?: boolean;
  onSearch?: (search_key: string) => void;
  sortConfig?: ISortConfig;
  exportEnable?: boolean;
  selection?: ISelectionProps;
  onFocuseCellChanged?: (data: IFocusCell) => void;
  focusedCell?: IFocusCell;
  checkDontSaveChange?: ICheckDontSaveChange;
  emptyComponent?: React.ReactNode;
}
const DataTable = (props: IDataTableProps) => {
  const [search_key, setSearch_key] = useState("");
  const [searchKeyDelayed] = useDebounce(search_key, 1000);
  const [pageIndex, setPageIndex] = useState(props.paging?.pageIndex ?? 0);
  const [pageSize, setPageSize] = useState(props.paging?.pageSize ?? 20);
  const [sortConfig, setSortConfig] = useState(props.sortConfig);
  const {
    data,
    title,
    titleComponent,
    subTitle,
    subTitleComponent,
    actionComponent,
    isLoading,
    paging,
    height,
    searchEnable,
    exportEnable,
    onSearch,
  } = props;

  const sort_by = useMemo(() => {
    return sortConfig?.field ?? "";
  }, [sortConfig]);

  useEffect(() => {
    if (props.paging?.pageSize && props.paging?.pageIndex) {
      setPageSize(props.paging?.pageSize ?? 20);
      setPageIndex(props.paging?.pageIndex ?? 0);
    }
  }, [props.paging]);

  useEffect(() => {
    if (sort_by) setPageIndex(0);
  }, [sort_by]);

  const getNestedValue = (obj: any, keys: string[]): any => {
    return keys.reduce(
      (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
      obj
    );
  };

  const sort_by_name = useMemo(() => {
    return props.columns
      .filter((x) => x.caption === sort_by)
      .map((x) => x.caption)
      .join(",");
  }, [props.columns, sort_by]);

  const filterdData: any[] = useMemo(() => {
    if (paging?.isPagedFromData) return data;
    const fieledColumns = props.columns.filter((col) => col.dataField);
    const temp = data
      .map((x) => {
        let isIncluded: boolean = false;
        fieledColumns.forEach((col) => {
          if (!isIncluded) {
            let field_split: string[] = [];
            if (col.dataField) {
              field_split = col.dataField.split(".");
            }
            const value = getNestedValue(x, field_split);
            if (value)
              if (
                removeAccents(value.toString().toLowerCase()).includes(
                  removeAccents(searchKeyDelayed.toLowerCase())
                )
              ) {
                isIncluded = true;
              }
          }
        });
        if (isIncluded) {
          return x;
        }
        return undefined;
      })
      .filter((x) => x !== undefined);
    const tempSort = temp.sort(
      dynamicSort(sort_by, sortConfig?.mode ?? eSortMode.DESC)
    );
    return tempSort;
  }, [searchKeyDelayed, data, props.columns, sort_by, sortConfig?.mode]);

  const pageCount = useMemo(() => {
    if (paging?.pageCount) return paging.pageCount;
    if (pageSize <= 0) return filterdData.length;
    const c = Math.floor(filterdData.length / pageSize);
    if (c * pageSize < filterdData.length) return c + 1;
    return c;
  }, [filterdData.length, pageSize, paging?.pageCount]);

  const pagedData = useMemo(() => {
    if (paging?.enable === true && !paging.isPagedFromData) {
      const data = filterdData.slice(
        pageSize * pageIndex,
        pageSize * pageIndex + pageSize
      );
      return data;
    }
    return filterdData;
  }, [filterdData, pageIndex, pageSize, paging?.isPagedFromData]);
  const settingColum = (column: IColumn): Column => {
    const col: any = {
      ...column,
      width: column.width,
      minWidth: column.minWidth,
      columns:
        column.columns && column.columns.length > 0
          ? column.columns.map((x) => settingColum(x))
          : undefined,
      Header: column.caption ?? "",
      accessor: column.dataField ?? column.id ?? "",
    };
    return col;
  };

  const columns: any[] = useMemo(() => {
    let col = props.columns.map((x) => {
      return settingColum(x);
    });
    if (props.selection?.mode === "multiple") {
      const selectionCol: any = {
        id: "selection",
        width: "40px",
        align: "center",
        cellRender: (data: any) => {
          const id = data.id as typeof data.id;
          return props.selection?.isShowLockIcon && data.disabled ? (
            <LockIcon size={16} />
          ) : (
            <Checkbox
              checked={(props.selection?.selectedRowKeys ?? []).includes(id)}
              disabled={data.disabled}
              onChange={(e) => {
                if (e.target.checked) {
                  props.selection?.onSelectionChanged([
                    ...(props.selection?.selectedRowKeys ?? []),
                    id,
                  ]);
                } else {
                  props.selection?.onSelectionChanged([
                    ...(props.selection?.selectedRowKeys ?? []).filter(
                      (x) => x !== id
                    ),
                  ]);
                }
              }}
            />
          );
        },
        headerRender: () => {
          return (
            <Checkbox
              checked={
                filterdData.filter((g) => !g.disabled).length > 0 &&
                filterdData
                  .filter((g) => !g.disabled)
                  .find(
                    (x) =>
                      !(props.selection?.selectedRowKeys ?? []).includes(x.id)
                  ) === undefined
              }
              onChange={(e) => {
                const ids = filterdData
                  .filter((g) => !g.disabled)
                  ?.map((x) => x.id);
                if (e.target.checked) {
                  props.selection?.onSelectionChanged(
                    Array.from(
                      new Set([
                        ...(props.selection?.selectedRowKeys ?? []),
                        ...ids,
                      ])
                    )
                  );
                } else {
                  props.selection?.onSelectionChanged(
                    Array.from(
                      new Set(
                        (props.selection?.selectedRowKeys ?? []).filter(
                          (x) => !ids.includes(x)
                        )
                      )
                    )
                  );
                }
              }}
            />
          );
        },
      };
      return [selectionCol, ...col];
    }
    return col;
  }, [props.columns, props.selection?.mode, props.selection?.selectedRowKeys]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<any>({ columns, data: pagedData });

  // const [startCell, setStartCell] = useState<any>(null);
  // const [endCell, setEndCell] = useState<any>(null);
  // const [isSelecting, setIsSelecting] = useState(false);

  // const handleMouseDown = (rowIndex: number, colIndex: number) => {
  //   setStartCell({ row: rowIndex, col: colIndex });
  //   setEndCell({ row: rowIndex, col: colIndex });
  //   setIsSelecting(true);
  // };

  // const handleMouseOver = (rowIndex: number, colIndex: number) => {
  //   if (isSelecting) {
  //     setEndCell({ row: rowIndex, col: colIndex });
  //   }
  // };

  // const handleMouseUp = () => {
  //   setIsSelecting(false);
  // };

  // Function to check if a cell is within the selection range
  // const isCellSelected = (rowIndex: number, colIndex: number) => {
  //   if (!startCell || !endCell) return false;
  //   const minRow = Math.min(startCell.row, endCell.row);
  //   const maxRow = Math.max(startCell.row, endCell.row);
  //   const minCol = Math.min(startCell.col, endCell.col);
  //   const maxCol = Math.max(startCell.col, endCell.col);
  //   return (
  //     rowIndex >= minRow &&
  //     rowIndex <= maxRow &&
  //     colIndex >= minCol &&
  //     colIndex <= maxCol
  //   );
  // };
  return (
    <Box>
      <Box id="toolbar" sx={{ display: "flex", mb: 1 }}>
        <Box
          id="left"
          sx={{
            flex: 1,
          }}
        >
          {props.title && (
            // <Box className={styles.title}>
            //     {title}
            // </Box>
            <Text
              text={props.title}
              sx={{
                fontWeight: 600,
                fontSize: 20,
              }}
            />
          )}
          {props.titleComponent && <Box>{titleComponent}</Box>}
          {props.subTitle && <Box className={styles.subTitle}>{subTitle}</Box>}
          {props.subTitleComponent && <Box>{subTitleComponent}</Box>}
        </Box>
        <Box
          id="actions"
          sx={{
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          {actionComponent}
          {searchEnable && (
            <Box sx={{ ml: 2 }}>
              <TextInput
                leadingVisual={SearchIcon}
                placeholder={"Tìm kiếm..."}
                value={search_key}
                onChange={(e) => {
                  if (onSearch) {
                    onSearch(e.target.value);
                  }
                  setSearch_key(e.target.value);
                }}
              ></TextInput>
            </Box>
          )}
          {sortConfig && sortConfig.enable && (
            <Box sx={{ ml: 2 }}>
              <ActionMenu>
                <ActionMenu.Button
                  leadingVisual={
                    sortConfig?.mode === eSortMode.DESC
                      ? SortDescIcon
                      : SortAscIcon
                  }
                >
                  Sắp xếp theo <b>{sort_by_name}</b>
                </ActionMenu.Button>
                <ActionMenu.Overlay>
                  <ActionList
                    selectionVariant="single"
                    role="menu"
                    aria-label=""
                  >
                    {props.columns
                      .filter((x) => x.dataField)
                      .map((x) => {
                        return (
                          <ActionList.Item
                            key={x.id}
                            role="menuitemcheckbox"
                            selected={x.dataField === sortConfig.field}
                            onSelect={() => {
                              setSortConfig({
                                ...sortConfig,
                                field: x.dataField ?? "",
                              });
                            }}
                          >
                            {x.caption}
                          </ActionList.Item>
                        );
                      })}

                    <ActionList.Divider></ActionList.Divider>
                    <ActionList.Item
                      role="menuitemcheckbox"
                      selected={sortConfig.mode === eSortMode.ASC}
                      onSelect={() => {
                        setSortConfig({
                          ...sortConfig,
                          mode: eSortMode.ASC,
                        });
                      }}
                    >
                      <ActionList.LeadingVisual>
                        <SortAscIcon />
                      </ActionList.LeadingVisual>
                      Tăng dần
                    </ActionList.Item>
                    <ActionList.Item
                      role="menuitemcheckbox"
                      selected={sortConfig.mode === eSortMode.DESC}
                      onSelect={() => {
                        setSortConfig({
                          ...sortConfig,
                          mode: eSortMode.DESC,
                        });
                      }}
                    >
                      <ActionList.LeadingVisual>
                        <SortDescIcon />
                      </ActionList.LeadingVisual>
                      Giảm dần
                    </ActionList.Item>
                  </ActionList>
                </ActionMenu.Overlay>
              </ActionMenu>
            </Box>
          )}
          {exportEnable && (
            <Box sx={{ ml: 2 }}>
              <IconButton
                icon={DownloadIcon}
                variant="default"
                aria-label="Download"
              />
            </Box>
          )}
        </Box>
      </Box>
      <Box
        id="warpper"
        sx={{
          position: "relative",
        }}
        // sx={{
        //     overflow: "auto",
        //     height: props.height ?? "auto"
        // }}
      >
        <Box
          className={clsx(styles.container)}
          sx={{
            overflow: "auto",
            height: !isNaN(parseInt(props.height ?? ""))
              ? parseInt(props.height ?? "") - 42
              : "auto",
          }}
        >
          <table
            {...getTableProps()}
            // onMouseUp={handleMouseUp}
            className={clsx(
              styles.myTable,
              paging?.enable === true ? styles.hasPaging : ""
            )}
          >
            <thead className={styles.header}>
              {headerGroups.map((headerGroup: any, idxGroup: number) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={idxGroup}>
                  {headerGroup.headers.map((column: any, idx: number) => {
                    return (
                      <th
                        {...column.getHeaderProps()}
                        key={idx}
                        // className={clsx(idx === 0 ? styles.fixed_column_header : "")}
                        style={{
                          textAlign: column.align,

                          // width: column.placeholderOf ? (column.placeholderOf.width ?? column.placeholderOf.minWidth) : (column.width ?? column.minWidth),
                          width: column.placeholderOf
                            ? column.placeholderOf.width
                            : column.width,
                          minWidth: column.placeholderOf
                            ? column.placeholderOf.minWidth
                            : column.minWidth,
                        }}
                      >
                        {/* {column.render('Header')} */}
                        {column.headerRender
                          ? column.headerRender()
                          : column.render("Header")}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            {isLoading && (
              <tbody {...getTableBodyProps()}>
                {headerGroups.map((headerGroup: any, idxGroup: number) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={idxGroup}>
                    {headerGroup.headers.map((column: any, idx: number) => {
                      return (
                        <td
                          {...column.getHeaderProps()}
                          key={idx}
                          // className={clsx(idx === 0 ? styles.fixed_column_header : "")}
                          style={{
                            width: column.placeholderOf
                              ? column.placeholderOf.width ??
                                column.placeholderOf.minWidth
                              : column.width ?? column.minWidth,
                          }}
                        >
                          <Box sx={{ m: "-1rem", mb: "-1.8rem" }}>
                            <PlaceHolder line_number={1} />
                          </Box>
                        </td>
                      );
                    })}
                  </tr>
                ))}
                {headerGroups.map((headerGroup: any, idxGroup: number) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={idxGroup}>
                    {headerGroup.headers.map((column: any, idx: number) => {
                      return (
                        <td
                          {...column.getHeaderProps()}
                          key={idx}
                          // className={clsx(idx === 0 ? styles.fixed_column_header : "")}
                          style={{
                            width: column.placeholderOf
                              ? column.placeholderOf.width ??
                                column.placeholderOf.minWidth
                              : column.width ?? column.minWidth,
                          }}
                        >
                          <Box sx={{ m: "-1rem", mb: "-1.8rem" }}>
                            <PlaceHolder line_number={1} />
                          </Box>
                        </td>
                      );
                    })}
                  </tr>
                ))}
                {headerGroups.map((headerGroup: any, idxGroup: number) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={idxGroup}>
                    {headerGroup.headers.map((column: any, idx: number) => {
                      return (
                        <td
                          {...column.getHeaderProps()}
                          key={idx}
                          // className={clsx(idx === 0 ? styles.fixed_column_header : "")}
                          style={{
                            width: column.placeholderOf
                              ? column.placeholderOf.width ??
                                column.placeholderOf.minWidth
                              : column.width ?? column.minWidth,
                          }}
                        >
                          <Box sx={{ m: "-1rem", mb: "-1.8rem" }}>
                            <PlaceHolder line_number={1} />
                          </Box>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            )}
            {!isLoading && (
              <>
                {pagedData.length > 0 && (
                  <tbody {...getTableBodyProps()}>
                    {rows.map((row: any, rowIndex: number) => {
                      prepareRow(row);
                      let isSelectedSigle: boolean = false;
                      if (props.selection) {
                        if (props.selection.mode === "single") {
                          if (
                            props.selection.selectedRowKeys &&
                            props.selection.selectedRowKeys.length > 0 &&
                            props.selection.selectedRowKeys[0] ===
                              row.original.id
                          ) {
                            isSelectedSigle = true;
                          }
                        }
                      }
                      return (
                        <tr
                          {...row.getRowProps()}
                          key={rowIndex}
                          onClick={() => {
                            if (
                              props.selection &&
                              props.selection.mode === "single"
                            ) {
                              props.selection.onSelectionChanged([
                                row.original.id,
                              ]);
                            }
                          }}
                        >
                          {row.cells.map((cell: any, idx: number) => {
                            // console.log({
                            //     cell
                            // });
                            let isDontSave: boolean = false;
                            if (
                              props.checkDontSaveChange &&
                              cell.column.isAllowFocus
                            ) {
                              const rootRowData =
                                props.checkDontSaveChange.rootDataSource.find(
                                  (x) => x.id === row.original.id
                                );
                              if (rootRowData) {
                                const rootValue =
                                  rootRowData[cell.column.dataField];
                                const currentValue =
                                  row.original[cell.column.dataField];
                                if (rootValue !== currentValue) {
                                  isDontSave = true;
                                }
                              }
                            }
                            return (
                              <td
                                {...cell.getCellProps()}
                                key={idx}
                                // className={clsx(idx === 0 ? styles.fixed_column : "")}
                                style={{
                                  // width: cell.column.width ?? cell.column.minWidth,
                                  width: cell.column.width,
                                  minWidth: cell.column.minWidth,
                                  fontWeight: cell.column.isMainColumn
                                    ? "600"
                                    : 400,
                                  whiteSpace: "break-spaces",
                                  textAlign: cell.column.align,
                                  backgroundColor: isSelectedSigle
                                    ? "#fff8c5"
                                    : undefined,
                                }}
                                tabIndex={
                                  cell.column.isAllowFocus ? 0 : undefined
                                }
                                onFocus={() => {
                                  if (props.onFocuseCellChanged) {
                                    props.onFocuseCellChanged({
                                      rowData: row.original,
                                      dataField: cell.column.dataField,
                                    });
                                  }
                                }}
                                // onMouseDown={() => {
                                //   handleMouseDown(rowIndex, idx);
                                // }}
                                // onMouseOver={() => {
                                //   handleMouseOver(rowIndex, idx);
                                // }}
                                className={clsx(
                                  props.focusedCell &&
                                    props.focusedCell.dataField ===
                                      cell.column.dataField &&
                                    props.focusedCell.rowData.id ===
                                      row.original.id
                                    ? styles.focused
                                    : "",
                                  isDontSave ? styles.isDoneSave : ""
                                  // isCellSelected(rowIndex, idx)
                                  //   ? styles.selected
                                  //   : ""
                                )}
                              >
                                {cell.column.cellRender
                                  ? cell.column.cellRender(row.original)
                                  : cell.render("Cell")}
                                {/* {cell.render('Cell')} */}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                )}
                {pagedData.length <= 0 && (
                  <tbody>
                    <tr>
                      <td colSpan={props.columns.length}>
                        {props.emptyComponent}
                      </td>
                    </tr>
                  </tbody>
                )}
              </>
            )}
          </table>
        </Box>
        {paging?.enable === true && pageCount > 0 && (
          <Box
            id="paging"
            className={clsx(styles.pagingContainer)}
            sx={{
              display: "flex",
              alignItems: "center",
              // minHeight: "30px"
            }}
          >
            <Box sx={{ flex: 1 }}>
              {props.paging?.pageSizeItems && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      fontSize: "11px",
                      color: "fg.muted",
                    }}
                  >
                    Page size&nbsp;&nbsp;
                  </Box>
                  {props.paging?.pageSizeItems.map((x) => {
                    return (
                      <Button
                        key={x}
                        className={clsx(
                          styles.pageSize,
                          x === pageSize ? styles.selected : ""
                        )}
                        variant="invisible"
                        sx={{
                          color: "fg.default",
                          fontWeight: 400,
                        }}
                        size="medium"
                        onClick={() => {
                          if (paging?.onPageSizeChanged) {
                            paging.onPageSizeChanged(x);
                          } else {
                            setPageSize(x);
                            setPageIndex(0);
                          }
                        }}
                      >
                        {x.toString()}
                      </Button>
                    );
                  })}
                </Box>
              )}
            </Box>
            <Box id="info" sx={{ width: "100px", textAlign: "center" }}>
              <Box
                sx={{
                  color: "fg.muted",
                }}
              >
                {pageIndex * pageSize + 1} -{" "}
                {(pageIndex + 1) * pageSize >
                (paging?.totalCount ?? data.length)
                  ? paging?.totalCount ?? data.length
                  : (pageIndex + 1) * pageSize}{" "}
                of {paging?.totalCount ?? data.length}
              </Box>
            </Box>
            <Box
              sx={{ flex: 1, display: "flex", flexDirection: "row-reverse" }}
            >
              {pageCount > 1 && (
                <Pagination
                  pageCount={pageCount}
                  currentPage={pageIndex + 1}
                  showPages={{
                    narrow: false,
                  }}
                  onPageChange={(e, n) => {
                    if (paging?.onPageIndexChanged) {
                      paging.onPageIndexChanged(n - 1);
                    } else {
                      setPageIndex(n - 1);
                    }
                  }}
                />
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DataTable;
