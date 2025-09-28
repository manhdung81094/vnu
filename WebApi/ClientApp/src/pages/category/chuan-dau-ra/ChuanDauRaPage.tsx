import {
  SyncIcon,
  PlusIcon,
  KebabHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "@primer/octicons-react";
import { ActionList, ActionMenu, Box, Checkbox, Octicon, useConfirm } from "@primer/react";
import { useEffect, useMemo } from "react";
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
import ChuanDauRaEditModal from "./modal/ChuanDauRaEditModal";
import ComboboxLoaiCDR from "../../../components-data/chuan-dau-ra/combobox-loai-cdr";
import { IDmChuanDauRa } from "../../../model/respone/category/IDmChuanDauRa";

const ChuanDauRaPage = () => {
  const { height } = useWindowSize();
  const dispatch = useAppDispatch();
  const { status, chuanDauRas, isShowEditModal, request } = useAppSelector(
    (x) => x.category.chuanDauRa
  );
  const confirm = useConfirm();

  useEffect(() => {
    if (
      status === eReducerStatusBase.is_not_initialization ||
      status === eReducerStatusBase.is_need_reload
    ) {
      dispatch(rootActions.category.chuanDauRa.LOAD_START(undefined));
    }
  }, [status]);

  const source = useMemo(() => {
    const isDaoTao = request.id_loai_cdr === 0 ? false : true;
    return chuanDauRas.filter((g) => g.is_dao_tao === isDaoTao);
  }, [request, chuanDauRas]);

  const handleDeleteAsync = async (id: number) => {
    if (
      await confirm({
        title: "Lưu ý",
        content: "Bạn có chắc chắn muốn xóa dữ liệu này?",
        cancelButtonContent: "Không xóa",
        confirmButtonContent: "Xóa",
        confirmButtonType: "danger",
      })
    ) {
      dispatch(rootActions.category.chuanDauRa.DELETE_START(id));
    }
  };

  return (
    <Page title={`Chuẩn đầu ra`}>
      <DataTable
        titleComponent={
          <Box sx={{ display: "flex", gap: 2, alignItems: "flex-end", mb: 2 }}>
            <Text
              text={`Danh sách chuẩn đầu ra ${
                request.id_loai_cdr === 0 ? "học phần" : "chương trình đào tạo"
              }`}
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
              size="medium"
              leadingVisual={SyncIcon}
              onClick={() => {
                dispatch(rootActions.category.chuanDauRa.LOAD_START(undefined));
              }}
            />
            <Button
              text="Thêm mới"
              leadingVisual={PlusIcon}
              size="medium"
              variant="primary"
              onClick={() => {
                dispatch(
                  rootActions.category.chuanDauRa.SHOW_EDIT_MODAL(undefined)
                );
              }}
            />
            <Box>
              <ComboboxLoaiCDR
                value={request.id_loai_cdr}
                onValueChanged={(e) => {
                  dispatch(
                    rootActions.category.chuanDauRa.CHANGE_REQUEST({
                      id_loai_cdr: e,
                    })
                  );
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
            caption: "Mã chuẩn đầu ra",
            dataField: "name",
            width: "200px",
            align: "left",
          },
          {
            caption: "Ghi chú",
            dataField: "note",
            align: "center",
          },
          {
            caption: "Thao tác",
            id: "cmd",
            width: "120px",
            cellRender: (data: IDmChuanDauRa) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    m: -2,
                  }}
                >
                  <ActionMenu>
                    <ActionMenu.Button
                      icon={KebabHorizontalIcon}
                      size="medium"
                      variant="invisible"
                    >
                      &nbsp;
                    </ActionMenu.Button>
                    <ActionMenu.Overlay width="auto">
                      <ActionList showDividers>
                        <ActionList.Item
                          onClick={() => {
                            dispatch(
                              rootActions.category.chuanDauRa.SHOW_EDIT_MODAL(data)
                            );
                          }}
                        >
                          <ActionList.LeadingVisual>
                            <Octicon icon={PencilIcon} />
                          </ActionList.LeadingVisual>
                          Sửa
                        </ActionList.Item>
                        <ActionList.Item
                          variant="danger"
                          onClick={() => {
                            handleDeleteAsync(data.id);
                          }}
                        >
                          Xóa
                          <ActionList.LeadingVisual>
                            <Octicon icon={TrashIcon} />
                          </ActionList.LeadingVisual>
                        </ActionList.Item>
                      </ActionList>
                    </ActionMenu.Overlay>
                  </ActionMenu>
                </Box>
              );
            },
          },
        ]}
      />
      {isShowEditModal && <ChuanDauRaEditModal />}
    </Page>
  );
};

export default ChuanDauRaPage;
