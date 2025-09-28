import { SyncIcon } from "@primer/octicons-react";
import { Box } from "@primer/react";
import { useEffect } from "react";
import { useDebounce } from "use-debounce";
import Button from "../../../components-ui/button";
import DataTable from "../../../components-ui/data-table";
import Page from "../../../components-ui/page";
import Text from "../../../components-ui/text";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { rootActions } from "../../../state/actions/rootActions";
import { eReducerStatusBase } from "../../../state/reducer-model/eReducerStatusBase";

const BoMonPage = () => {
  const { height } = useWindowSize();
  const dispatch = useAppDispatch();
  const { status, boMons } = useAppSelector((x) => x.category.boMon);

  useEffect(() => {
    if (
      status === eReducerStatusBase.is_not_initialization ||
      status === eReducerStatusBase.is_need_reload
    ) {
      dispatch(rootActions.category.boMon.LOAD_START(undefined));
    }
  }, [status]);

  return (
    <Page title="Bộ môn">
      <DataTable
        titleComponent={
          <Box sx={{ display: "flex", gap: 2, alignItems: "flex-end", mb: 2 }}>
            <Text
              text="Danh sách bộ môn"
              sx={{ fontSize: 20, fontWeight: 700 }}
            />
          </Box>
        }
        actionComponent={
          <Box sx={{ display: "flex", gap: 2, alignItems: "flex-end", mb: 2 }}>
            <Button
              text="Làm mới"
              loading={status === eReducerStatusBase.is_loading}
              sx={{ mr: 1 }}
              size="small"
              leadingVisual={SyncIcon}
              onClick={() => {
                dispatch(rootActions.category.boMon.LOAD_START(undefined));
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
        data={boMons}
        columns={[
          {
            caption: "Mã bộ môn",
            dataField: "ma_bo_mon",
            width: "200px",
            align: "center",
          },
          {
            caption: "Tên bộ môn",
            dataField: "bo_mon",
            isMainColumn: true,
            align: "left",
          },
        ]}
      />
    </Page>
  );
};

export default BoMonPage;
