import { SyncIcon } from "@primer/octicons-react";
import { Box } from "@primer/react";
import { useEffect, useMemo } from "react";
import Moment from "react-moment";
import { useDebounce } from "use-debounce";
import SelecboxBoMon from "../../../components-data/bo-mon/selectbox-bomon";
import Button from "../../../components-ui/button";
import DataTable from "../../../components-ui/data-table";
import Page from "../../../components-ui/page";
import Text from "../../../components-ui/text";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { IGiaoVien } from "../../../model/respone/category/IGiaoVien";
import { rootActions } from "../../../state/actions/rootActions";
import { eReducerStatusBase } from "../../../state/reducer-model/eReducerStatusBase";
import { format } from "date-fns";

const GiaoVienPage = () => {
  const { height } = useWindowSize();
  const dispatch = useAppDispatch();
  const { status, giaoViens, request } = useAppSelector(
    (x) => x.category.giaoVien
  );
  const { lyLichList } = useAppSelector((x) => x.deCuong.deCuong);

  useEffect(() => {
    if (
      status === eReducerStatusBase.is_not_initialization ||
      status === eReducerStatusBase.is_need_reload
    ) {
      dispatch(rootActions.category.giaoVien.LOAD_START(undefined));
    }
  }, [status]);

  const source = useMemo(() => {
    const idKhoaSet = new Set(request.id_khoas || []);
    const idBmSet = new Set(request.id_bms || []);
    const idDvSet = new Set(request.id_dvs || []);

    return giaoViens.filter((g) => {
      const matchKhoa = idKhoaSet.size === 0 || idKhoaSet.has(g.id_khoa);
      const matchBm = idBmSet.size === 0 || idBmSet.has(g.id_bm);
      const matchDv = idDvSet.size === 0 || idDvSet.has(g.id_dv);
      return matchKhoa && matchBm && matchDv;
    });
  }, [request, giaoViens]);

  return (
    <Page title="Giáo viên">
      <DataTable
        titleComponent={
          <Box sx={{ display: "flex", gap: 2, alignItems: "flex-end", mb: 2 }}>
            <Text
              text="Danh sách giáo viên"
              sx={{ fontSize: 20, fontWeight: 700 }}
            />
          </Box>
        }
        actionComponent={
          <Box sx={{ display: "flex", gap: 2, alignItems: "flex-end", mb: 2 }}>
            <Box>
              <SelecboxBoMon
                maxWidth={"200px"}
                value={request.id_bms}
                onValueChanged={(value: number[]) => {
                  dispatch(
                    rootActions.category.giaoVien.CHANGE_REQUEST({
                      id_bms: value,
                    })
                  );
                }}
              />
            </Box>
            <Button
              text="Làm mới"
              loading={status === eReducerStatusBase.is_loading}
              sx={{ mr: 1 }}
              size="medium"
              leadingVisual={SyncIcon}
              onClick={() => {
                dispatch(rootActions.category.giaoVien.LOAD_START(undefined));
              }}
            />
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
            caption: "Mã",
            dataField: "ma_cb",
            width: "150px",
            align: "left",
          },
          {
            caption: "Họ tên",
            dataField: "ho_ten",
            isMainColumn: true,
            align: "left",
          },
          {
            caption: "Ngày sinh",
            dataField: "",
            width: "150px",
            align: "center",
            cellRender: (data: IGiaoVien) => {
              const lyLich = lyLichList.find((o) => o.id_cb === data.id_cb);
              return (
                <Text
                  text={
                    lyLich && lyLich.ngay_sinh
                      ? format(new Date(lyLich.ngay_sinh), "dd/MM/yyyy")
                      : ""
                  }
                />
              );
            },
          },
          {
            caption: "Tên đơn vị",
            dataField: "ten_don_vi",
            width: "200px",
            align: "left",
          },
          {
            caption: "Bộ môn",
            dataField: "ten_bo_mon",
            width: "200px",
            align: "left",
          },
          {
            caption: "Khoa",
            dataField: "ten_khoa",
            width: "200px",
            align: "left",
          },
          {
            caption: "Điện thoại",
            dataField: "dien_thoai",
            width: "150px",
            align: "left",
          },
        ]}
      />
    </Page>
  );
};

export default GiaoVienPage;
