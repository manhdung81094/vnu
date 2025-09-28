import { SyncIcon } from "@primer/octicons-react";
import { Box, Checkbox } from "@primer/react";
import { useEffect, useMemo } from "react";
import { useDebounce } from "use-debounce";
import Button from "../../../components-ui/button";
import DataTable from "../../../components-ui/data-table";
import Page from "../../../components-ui/page";
import Text from "../../../components-ui/text";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { IMonHoc } from "../../../model/respone/category/IMonHoc";
import { rootActions } from "../../../state/actions/rootActions";
import { eReducerStatusBase } from "../../../state/reducer-model/eReducerStatusBase";
// import SelecboxKhoa from "../../../components-data/khoa/selectbox-khoa";
import SelecboxBoMon from "../../../components-data/bo-mon/selectbox-bomon";

const MonHocPage = () => {
  const { height } = useWindowSize();
  const dispatch = useAppDispatch();
  const { status, monhocs, request } = useAppSelector((x) => x.category.monHoc);

  useEffect(() => {
    if (
      status === eReducerStatusBase.is_not_initialization ||
      status === eReducerStatusBase.is_need_reload
    ) {
      dispatch(rootActions.category.monHoc.LOAD_START(undefined));
    }
  }, [status]);

  const source = useMemo(() => {
    // const idKhoaSet = new Set(request.id_khoas || []);
    const idBmSet = new Set(request.id_bms || []);

    return monhocs.filter((g) => {
      // const matchKhoa = idKhoaSet.size === 0 || idKhoaSet.has(g.id_khoa);
      const matchBm = idBmSet.size === 0 || idBmSet.has(g.id_bm);
      return matchBm;
    });
  }, [request, monhocs]);

  return (
    <Page title="Môn học">
      <DataTable
        titleComponent={
          <Box sx={{ display: "flex", gap: 2, alignItems: "flex-end", mb: 2 }}>
            <Text
              text="Danh sách môn học"
              sx={{ fontSize: 20, fontWeight: 700 }}
            />
          </Box>
        }
        actionComponent={
          <Box sx={{ display: "flex", gap: 2, alignItems: "flex-end", mb: 2 }}>
            <Box>
              {/* <SelecboxKhoa
                maxWidth={"200px"}
                value={request.id_khoas}
                onValueChanged={(value: number[]) => {
                  dispatch(
                    rootActions.category.monHoc.CHANGE_REQUEST({
                      id_khoas: value,
                    })
                  );
                }}
              /> */}
            </Box>
            <Box>
              <SelecboxBoMon
                maxWidth={"200px"}
                value={request.id_bms}
                onValueChanged={(value: number[]) => {
                  dispatch(
                    rootActions.category.monHoc.CHANGE_REQUEST({
                      id_bms: value,
                    })
                  );
                }}
              />
            </Box>
            <Box>
              <Button
                text="Làm mới"
                loading={status === eReducerStatusBase.is_loading}
                sx={{ mr: 1 }}
                size="small"
                leadingVisual={SyncIcon}
                onClick={() => {
                  dispatch(rootActions.category.monHoc.LOAD_START(undefined));
                }}
              />
            </Box>
          </Box>
        }
        paging={{
          enable: true,
          pageSize: 20,
          pageSizeItems: [10, 20, 30],
        }}
        isLoading={
          useDebounce(status === eReducerStatusBase.is_loading, 300)[0]
        }
        emptyComponent={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text text="Chưa có dữ liệu" />
          </Box>
        }
        searchEnable
        height={`${height - 80}px`}
        data={source}
        columns={[
          {
            caption: "STT",
            dataField: "",
            width: "100px",
            align: "center",
            cellRender: (data: IMonHoc, index?: number) => {
              return <>{index !== undefined ? index + 1 : ""}</>;
            },
          },
          {
            caption: "Ký hiệu",
            dataField: "ky_hieu",
            width: "100px",
            align: "center",
          },
          {
            caption: "Tên môn",
            dataField: "ten_mon",
            isMainColumn: true,
            align: "left",
          },
          {
            caption: "Tên viết tắt",
            dataField: "ten_viet_tat",
            align: "center",
            width: "100px",
          },
          {
            caption: "Số học trình",
            dataField: "so_hoc_trinh",
            align: "center",
            width: "100px",
          },
          {
            caption: "Bộ môn",
            dataField: "ten_bo_mon",
            align: "left",
            width: "250px",
          },
          {
            caption: "Khoa",
            dataField: "ten_khoa",
            align: "left",
            width: "250px",
          },
          {
            caption: "Kích hoạt",
            dataField: "",
            align: "center",
            width: "100px",
            cellRender: (data: IMonHoc) => {
              return (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Checkbox checked={data.is_active} />
                </Box>
              );
            },
          },
        ]}
      />
    </Page>
  );
};

export default MonHocPage;
