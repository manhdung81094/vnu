import {
  DownloadIcon,
  EyeIcon,
  KebabHorizontalIcon,
  NoteIcon,
  PencilIcon,
  PlusIcon,
  SyncIcon,
  TrashIcon,
  VersionsIcon,
} from "@primer/octicons-react";
import {
  ActionList,
  ActionMenu,
  Box,
  Checkbox,
  Octicon,
  Spinner,
  useConfirm,
} from "@primer/react";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import TreeviewBoMonMonHoc from "../../components-data/treeview-bomon-monhoc";
import Button from "../../components-ui/button";
import DataTable from "../../components-ui/data-table";
import Page from "../../components-ui/page";
import Text from "../../components-ui/text";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useWindowSize } from "../../hooks/useWindowSize";
import { rootActions } from "../../state/actions/rootActions";
import { eReducerStatusBase } from "../../state/reducer-model/eReducerStatusBase";
import { ICDR_DeCuong } from "../../model/respone/decuong/ICDR_DeCuong";
import { useMonHoc } from "../../hooks/useMonHoc";
import DeCuongCreateEditModal from "./DeCuongCreateEditModal";
import DeCuongViewModal from "./view/DeCuongViewModal";
import { deCuongApi } from "../../api/decuong/deCuongApi";
import { useGiaoVien } from "../../hooks/useGiaoVien";
import { IDeCuongRequest } from "../../model/request/decuong/IDeCuongRequest";
import { eProgress, eProgressDic } from "../../model/common/eProgress";
import { NotifyHelper } from "../../helpers/toast";
import DeCuongProgressModal from "./modal/DeCuongProgressModal";
import { format } from "date-fns";

const DeCuongPage = () => {
  const confirm = useConfirm();
  const { height } = useWindowSize();
  const dispatch = useAppDispatch();
  const { monHocDictionary, monhocs } = useMonHoc();
  const { giaoViens } = useGiaoVien();

  const {
    status,
    deCuongs,
    idMon,
    idBoMon,
    deCuongEdit,
    isShowExamModal,
    idSelections,
    isShowProgressModal,
    lyLichList,
  } = useAppSelector((x) => x.deCuong.deCuong);

  const { user } = useAppSelector((x) => x.auth);

  const decuongFilter = useMemo(() => {
    return deCuongs.filter((d) => {
      if (user?.role === "QUANTRI" || user?.role === "PHONGDAOTAO") {
        return true; // Admin sees all
      } else {
        return d.created_user_id === user?.id;
      }
    });
  }, [deCuongs, user]);

  const [exportingId, setExportingId] = useState<number | null>(null); // Add state
  const [typeProgress, setTypeProgress] = useState<eProgress>(
    eProgress.khoi_tao
  );

  useEffect(() => {
    if (
      status === eReducerStatusBase.is_not_initialization ||
      status === eReducerStatusBase.is_need_reload
    ) {
      dispatch(rootActions.deCuong.deCuong.LOAD_START(undefined));
    }
  }, [status]);

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
      dispatch(rootActions.deCuong.deCuong.DELETE_START(id));
    }
  };

  const handleView = async (id: number) => {
    try {
      const res = await deCuongApi.Select(id);
      // Assuming the API returns { data: ArrayBuffer, fileName: string }
      if (res && res.data) {
        // const filterHe = hes.find((h) => h.id_he === res.data.de_cuong.id_he);
        // const filterNganh = nganhs.find(
        //   (n) => n.id_nganh === res.data.de_cuong.id_nganh
        // );
        // const filterBoMon = boMons.find(
        //   (b) => b.id_bm === res.data.de_cuong.id_bm
        // );
        const filterMonHoc = monhocs.find(
          (m: any) => m.id_mon === res.data.de_cuong.id_mon
        );
        const idCanBolist = res.data.giang_viens.map((item: any) => item.id_cb);
        const filterGiangVien = giaoViens.filter((g) =>
          idCanBolist.includes(g.id_cb)
        );

        const giang_viens = res.data.giang_viens.map((gv: any) => {
          const giaoVien = filterGiangVien.find((g) => g.id_cb === gv.id_cb);
          return {
            ...gv,
            ten_cb: giaoVien?.ho_ten ?? "",
            // email: giaoVien?.email ?? "",
            // phone_number: giaoVien?.dien_thoai ?? "",
            // don_vi_cong_tac: giaoVien?.ten_don_vi ?? "",
          };
        });

        const requestData: IDeCuongRequest = {
          de_cuong: {
            ...res.data.de_cuong,
            // ten_he: filterHe?.ten_he ?? "",
            // ten_nganh: filterNganh?.ten_nganh ?? "",
            // ten_bm: filterBoMon?.bo_mon ?? "",
            ten_mon: filterMonHoc?.ten_mon ?? "",
            ten_mon_en: filterMonHoc?.ten_tieng_anh ?? "",
            ma_hoc_phan: filterMonHoc?.ky_hieu ?? "",
          },
          giang_viens: giang_viens || [],
          clos: Array.isArray(res.data.clos) ? [...res.data.clos] : [],
          mo_tas: Array.isArray(res.data.mo_tas) ? [...res.data.mo_tas] : [],
          danh_gias: Array.isArray(res.data.danh_gias)
            ? [...res.data.danh_gias]
            : [],
          tai_lieus: Array.isArray(res.data.tai_lieus)
            ? [...res.data.tai_lieus]
            : [],
          chuongs: Array.isArray(res.data.chuongs) ? [...res.data.chuongs] : [],
          muc_tieus: Array.isArray(res.data.muc_tieus)
            ? [...res.data.muc_tieus]
            : [],
          phuong_phaps: Array.isArray(res.data.phuong_phaps)
            ? [...res.data.phuong_phaps]
            : [],
          quy_tacs: Array.isArray(res.data.quy_tacs)
            ? [...res.data.quy_tacs]
            : [],
        };
        dispatch(rootActions.deCuong.deCuong.SHOW_EXAM(requestData));
      }
    } catch (error) {
      // Handle error appropriately
      console.error("View failed:", error);
    }
  };

  const handleExportWord = async (id: number) => {
    setExportingId(id); // Start spinner for this row
    try {
      const res = await deCuongApi.Select(id);
      // const res = await cauHoiApi.ExportWord();
      // // Assuming the API returns { data: ArrayBuffer, fileName: string }
      if (res && res.data) {
        const filterMonHoc = monhocs.find(
          (m) => m.id_mon === res.data.de_cuong.id_mon
        );
        const idCanBolist = res.data.giang_viens.map((item: any) => item.id_cb);
        const filterGiangVien = giaoViens.filter((g) =>
          idCanBolist.includes(g.id_cb)
        );

        const giang_viens = res.data.giang_viens.map((gv: any) => {
          const giaoVien = filterGiangVien.find((g) => g.id_cb === gv.id_cb);
          return {
            ...gv,
            ten_cb: giaoVien?.ho_ten ?? "",
          };
        });

        const requestData: IDeCuongRequest = {
          de_cuong: {
            ...res.data.de_cuong,
            ten_mon: filterMonHoc?.ten_mon ?? "",
            ten_mon_en: filterMonHoc?.ten_tieng_anh ?? "",
            ma_hoc_phan: filterMonHoc?.ky_hieu ?? "",
          },
          giang_viens: giang_viens || [],
          clos: Array.isArray(res.data.clos) ? [...res.data.clos] : [],
          mo_tas: Array.isArray(res.data.mo_tas) ? [...res.data.mo_tas] : [],
          danh_gias: Array.isArray(res.data.danh_gias)
            ? [...res.data.danh_gias]
            : [],
          tai_lieus: Array.isArray(res.data.tai_lieus)
            ? [...res.data.tai_lieus]
            : [],
          chuongs: Array.isArray(res.data.chuongs) ? [...res.data.chuongs] : [],
          muc_tieus: Array.isArray(res.data.muc_tieus)
            ? [...res.data.muc_tieus]
            : [],
          phuong_phaps: Array.isArray(res.data.phuong_phaps)
            ? [...res.data.phuong_phaps]
            : [],
          quy_tacs: Array.isArray(res.data.quy_tacs)
            ? [...res.data.quy_tacs]
            : [],
        };

        try {
          const response = await deCuongApi.ExportWord(requestData);
          if (response && response.data) {
            handleDownload(response.data);
          }
        } catch (error) {
          // Handle error appropriately
          console.error("Export failed:", error);
        } finally {
          setExportingId(null); // Stop spinner after export
        }
      }
    } catch (error) {
      // Handle error appropriately
      console.error("Export failed:", error);
    }
  };

  const handleDownload = (res: any) => {
    const { FileContents, FileDownloadName, ContentType } = res;

    // Convert Base64 to binary
    const byteCharacters = atob(FileContents);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: ContentType });
    const url = URL.createObjectURL(blob);

    // Create a link and click to download
    const link = document.createElement("a");
    link.href = url;
    link.download = FileDownloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleProgressAsync = (type: eProgress) => {
    if (!idSelections.length) {
      NotifyHelper.Error(`Chưa chọn bản ghi cần ${eProgressDic[type]}`);
      return false;
    }
    const khong_hop_les =
      type === eProgress.gui_duyet
        ? deCuongs.filter(
            (g) =>
              idSelections.includes(g.id) &&
              g.status !== eProgress.khoi_tao &&
              g.status !== eProgress.tra_lai
          )
        : [];
    if (khong_hop_les.length > 0) {
      const ten_de_cuong = khong_hop_les
        .map((g) => monHocDictionary[g.id_mon])
        .join(", ");
      NotifyHelper.Error(`Đề cương ${ten_de_cuong} đã gửi duyệt`);
      return false;
    }
    setTypeProgress(type);
    dispatch(rootActions.deCuong.deCuong.SHOW_PROGRESS_MODAL(idSelections));
  };

  return (
    <Page title="Đề cương môn học">
      <Box sx={{ display: "flex", gap: 2 }}>
        {/* <Box sx={{ width: 300 }}>
          <TreeviewBoMonMonHoc
            height={height - 80}
            onMonHocSelect={() => {}}
            focusIdBoMon={idBoMon}
            focusIdMon={idMon}
          />
        </Box> */}
        <Box sx={{ flex: 1 }}>
          <DataTable
            titleComponent={
              <Box
                sx={{ display: "flex", gap: 2, alignItems: "flex-end", mb: 2 }}
              >
                <Text text="Danh sách" sx={{ fontSize: 20, fontWeight: 700 }} />
              </Box>
            }
            actionComponent={
              <Box
                sx={{ display: "flex", gap: 2, alignItems: "flex-end", mb: 2 }}
              >
                <Button
                  text="Làm mới"
                  loading={status === eReducerStatusBase.is_loading}
                  sx={{ mr: 1 }}
                  size="medium"
                  leadingVisual={SyncIcon}
                  onClick={() => {
                    dispatch(rootActions.deCuong.deCuong.LOAD_START(undefined));
                  }}
                />
                <Button
                  text="Thêm mới"
                  leadingVisual={PlusIcon}
                  size="medium"
                  variant="primary"
                  onClick={() => {
                    dispatch(
                      rootActions.deCuong.deCuong.SHOW_EDIT_MODAL(undefined)
                    );
                  }}
                />
                <Button
                  text="Gửi duyệt"
                  sx={{ mr: 1 }}
                  disabled={!idSelections.length}
                  leadingVisual={VersionsIcon}
                  variant="danger"
                  size="small"
                  onClick={() => {
                    handleProgressAsync(eProgress.gui_duyet);
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
            selection={{
              mode: "multiple",
              keyExpr: "id",
              isShowLockIcon: true,
              selectedRowKeys: idSelections ?? [],
              onSelectionChanged: (keys) => {
                dispatch(rootActions.deCuong.deCuong.SELECTED_ID(keys));
              },
            }}
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
            data={decuongFilter}
            columns={[
              {
                caption: "Tên đề cương",
                dataField: "ten_de_cuong",
                align: "left",
                isMainColumn: true,
              },
              {
                caption: "Học phần",
                dataField: "",
                align: "left",
                isMainColumn: true,
                cellRender: (data: ICDR_DeCuong) => {
                  const mon = monHocDictionary[data.id_mon];
                  return (
                    <Text
                      text={`${mon?.ky_hieu ?? ""}- ${mon?.ten_mon ?? ""}`}
                    />
                  );
                },
              },
              {
                caption: "Bộ môn duyệt",
                dataField: "",
                align: "center",
                width: "120px",
                cellRender: (data: ICDR_DeCuong) => {
                  return (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Checkbox checked={data.is_bm_duyet} />
                    </Box>
                  );
                },
              },
              {
                caption: "Khoa duyệt",
                dataField: "",
                align: "center",
                width: "120px",
                cellRender: (data: ICDR_DeCuong) => {
                  return (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Checkbox checked={data.is_khoa_duyet} />
                    </Box>
                  );
                },
              },
              {
                caption: "Phòng đào tạo duyệt",
                dataField: "",
                align: "center",
                width: "120px",
                cellRender: (data: ICDR_DeCuong) => {
                  return (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Checkbox checked={data.is_pdt_duyet} />
                    </Box>
                  );
                },
              },
              {
                caption: "Trạng thái",
                dataField: "",
                align: "center",
                width: "120px",
                cellRender: (data: ICDR_DeCuong) => {
                  return (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Text text={eProgressDic[data.status as eProgress]} />
                    </Box>
                  );
                },
              },
              {
                caption: "Ngày tạo",
                dataField: "",
                align: "center",
                width: "120px",
                cellRender: (data: ICDR_DeCuong) => {
                  return (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Text
                        text={
                          data?.created_time
                            ? format(new Date(data.created_time), "dd/MM/yyyy")
                            : ""
                        }
                      />
                    </Box>
                  );
                },
              },
              {
                caption: "Người tạo",
                dataField: "",
                align: "center",
                width: "120px",
                cellRender: (data: ICDR_DeCuong) => {
                  return (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Text
                        text={
                          lyLichList.find(
                            (o) => o.id_cb === data.created_user_id
                          )?.ho_ten ?? ""
                        }
                      />
                    </Box>
                  );
                },
              },
              {
                caption: "Thao tác",
                id: "cmd",
                width: "120px",
                cellRender: (data: ICDR_DeCuong) => {
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
                                handleView(data.id);
                              }}
                            >
                              <ActionList.LeadingVisual>
                                <Octicon icon={EyeIcon} />
                              </ActionList.LeadingVisual>
                              Xem
                            </ActionList.Item>
                            <ActionList.Item
                              onClick={() => {
                                handleExportWord(data.id);
                              }}
                              disabled={exportingId === data.id}
                            >
                              <ActionList.LeadingVisual>
                                <Octicon icon={NoteIcon} />
                              </ActionList.LeadingVisual>
                              {exportingId === data.id ? (
                                <>
                                  <Spinner size="small" sx={{ mr: 1 }} /> Đang
                                  xuất Word...
                                </>
                              ) : (
                                "Xuất file Word"
                              )}
                            </ActionList.Item>
                            {(data.status === eProgress.khoi_tao ||
                              data.status === eProgress.tra_lai) && (
                              <>
                                <ActionList.Item
                                  onClick={() => {
                                    dispatch(
                                      rootActions.deCuong.deCuong.SHOW_EDIT_MODAL(
                                        data
                                      )
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
                              </>
                            )}
                          </ActionList>
                        </ActionMenu.Overlay>
                      </ActionMenu>
                    </Box>
                  );
                },
              },
            ]}
          />
        </Box>
      </Box>
      <DeCuongCreateEditModal />
      {isShowExamModal && <DeCuongViewModal />}
      {isShowProgressModal && (
        <DeCuongProgressModal typeProgress={typeProgress} />
      )}
    </Page>
  );
};

export default DeCuongPage;
