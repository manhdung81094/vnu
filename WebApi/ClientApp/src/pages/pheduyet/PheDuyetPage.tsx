import {
  PaperAirplaneIcon,
  KebabHorizontalIcon,
  SyncIcon,
  CircleSlashIcon,
  EyeIcon,
} from "@primer/octicons-react";
import { ActionList, ActionMenu, Box, Checkbox, Octicon } from "@primer/react";
import Button from "../../components-ui/button";
import DataTable from "../../components-ui/data-table";
import Page from "../../components-ui/page";
import Text from "../../components-ui/text";
import { eReducerStatusBase } from "../../state/reducer-model/eReducerStatusBase";
import { rootActions } from "../../state/actions/rootActions";
import { useDebounce } from "use-debounce";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useWindowSize } from "../../hooks/useWindowSize";
import { ICDR_DeCuong } from "../../model/respone/decuong/ICDR_DeCuong";
import { eProgress, eProgressDic, eRole } from "../../model/common/eProgress";
import { useEffect, useMemo, useState } from "react";
import { useMonHoc } from "../../hooks/useMonHoc";
import { format } from "date-fns";
import PheDuyetProgressModal from "./modal/PheDuyetModal";
import { deCuongApi } from "../../api/decuong/deCuongApi";
import { useGiaoVien } from "../../hooks/useGiaoVien";
import { IDeCuongRequest } from "../../model/request/decuong/IDeCuongRequest";
import DeCuongViewModal from "../decuong/view/DeCuongViewModal";

const PheDuyetPage = () => {
  const { height } = useWindowSize();
  const dispatch = useAppDispatch();
  const { monhocs } = useMonHoc();
  const { giaoViens } = useGiaoVien();

  const {
    status,
    deCuongs,
    isShowExamModal,
    idProgressSelections,
    isShowPdModal,
    lyLichList,
  } = useAppSelector((x) => x.deCuong.deCuong);

  const { user } = useAppSelector((x) => x.auth);

  useEffect(() => {
    if (
      status === eReducerStatusBase.is_not_initialization ||
      status === eReducerStatusBase.is_need_reload
    ) {
      dispatch(rootActions.deCuong.deCuong.LOAD_START(undefined));
    }
  }, [status, dispatch]);

  const [typeProgress, setTypeProgress] = useState<eProgress>(
    eProgress.khoi_tao
  );
  const [role, setRole] = useState<eRole | null>(null);
  const [userId, setUserId] = useState("");

  const filterDeCuongs = useMemo(() => {
    return deCuongs.filter((x) => x.status !== eProgress.khoi_tao);
  }, [deCuongs]);

  const handleBoMonDuyet = (
    id: number,
    type_progress: eProgress,
    user: string
  ) => {
    setTypeProgress(type_progress);
    setRole(eRole.bo_mon);
    if (
      typeProgress === eProgress.duyet ||
      typeProgress === eProgress.tra_lai
    ) {
      setUserId(user);
    }
    dispatch(rootActions.deCuong.deCuong.SHOW_PD_MODAL(id));
  };
  const handleKhoaDuyet = (
    id: number,
    type_progress: eProgress,
    user: string
  ) => {
    setTypeProgress(type_progress);
    setRole(eRole.khoa);
    if (
      typeProgress === eProgress.duyet ||
      typeProgress === eProgress.tra_lai
    ) {
      setUserId(user);
    }
    dispatch(rootActions.deCuong.deCuong.SHOW_PD_MODAL(id));
  };

  const handleDaoTaoDuyet = async (
    id: number,
    type_progress: eProgress,
    user: string
  ) => {
    setTypeProgress(type_progress);
    setRole(eRole.pdt);
    if (
      typeProgress === eProgress.duyet ||
      typeProgress === eProgress.tra_lai
    ) {
      setUserId(user);
    }
    dispatch(rootActions.deCuong.deCuong.SHOW_PD_MODAL(id));
  };

  const handleView = async (id: number) => {
    try {
      const res = await deCuongApi.Select(id);
      if (res && res.data) {
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
        dispatch(rootActions.deCuong.deCuong.SHOW_EXAM(requestData));
      }
    } catch (error) {
      // Handle error appropriately
      console.error("View failed:", error);
    }
  };

  return (
    <Page title="Phê duyệt đề cương">
      <Box>
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
          data={filterDeCuongs}
          columns={[
            {
              caption: "Tên đề cương",
              dataField: "ten_de_cuong",
              align: "left",
              isMainColumn: true,
              width: "400px",
              cellRender: (data: ICDR_DeCuong) => {
                return <Text text={`${data?.ten_de_cuong ?? ""}`} />;
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
              caption: "Lý do bộ môn duyệt/trả lại",
              dataField: "",
              align: "center",

              cellRender: (data: ICDR_DeCuong) => {
                return (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Text
                      text={data.noi_dung_bm_duyet ?? ""}
                      sx={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                    />
                  </Box>
                );
              },
            },
            {
              caption: "Lý do khoa duyệt/trả lại",
              dataField: "",
              align: "center",

              cellRender: (data: ICDR_DeCuong) => {
                return (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Text
                      text={data.noi_dung_khoa_duyet ?? ""}
                      sx={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                    />
                  </Box>
                );
              },
            },
            {
              caption: "Lý do phòng đào tạo duyệt/trả lại",
              dataField: "",
              align: "center",
              cellRender: (data: ICDR_DeCuong) => {
                return (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Text
                      text={data.noi_dung_pdt_duyet ?? ""}
                      sx={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                    />
                  </Box>
                );
              },
            },
            {
              caption: "Người gửi duyệt",
              dataField: "user_gui_duyet",
              align: "center",
              cellRender: (data: ICDR_DeCuong) => {
                return (
                  <Text
                    text={`${lyLichList.find((o) => o.id_cb === data.user_gui_duyet)
                      ?.ho_ten ?? ""
                      }`}
                  />
                );
              },
            },
            {
              caption: "Ngày gửi duyệt",
              dataField: "ngay_gui_duyet",
              align: "center",
              cellRender: (data: ICDR_DeCuong) => {
                return (
                  <Text
                    text={
                      data?.ngay_gui_duyet
                        ? format(new Date(data.ngay_gui_duyet), "dd/MM/yyyy")
                        : ""
                    }
                  />
                );
              },
            },
            {
              caption: "Trạng thái",
              dataField: "status",
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
              caption: "Thao tác",
              id: "cmd",
              width: "120px",
              cellRender: (data: ICDR_DeCuong) => {
                return (
                  <>
                    {data.status !== eProgress.tra_lai && (
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
                              {(user?.role === "BOMON" ||
                                user?.role === "QUANTRI") && (
                                  <>
                                    {!data.is_bm_duyet && (
                                      <ActionList.Item
                                        onClick={() => {
                                          handleBoMonDuyet(
                                            data.id,
                                            eProgress.duyet,
                                            data.created_user_id ?? ""
                                          );
                                        }}
                                      >
                                        Trường bộ môn duyệt
                                        <ActionList.LeadingVisual>
                                          <Octicon icon={PaperAirplaneIcon} />
                                        </ActionList.LeadingVisual>
                                      </ActionList.Item>
                                    )}
                                    {!data.is_khoa_duyet && (
                                      <ActionList.Item
                                        onClick={() => {
                                          handleBoMonDuyet(
                                            data.id,
                                            eProgress.tra_lai,
                                            data.created_user_id ?? ""
                                          );
                                        }}
                                      >
                                        Trường bộ môn trả lại duyệt
                                        <ActionList.LeadingVisual>
                                          <Octicon icon={CircleSlashIcon} />
                                        </ActionList.LeadingVisual>
                                      </ActionList.Item>
                                    )}
                                  </>
                                )}

                              {(user?.role === "KHOA" ||
                                user?.role === "QUANTRI") && (
                                  <>
                                    {!data.is_khoa_duyet && (
                                      <ActionList.Item
                                        onClick={() => {
                                          handleKhoaDuyet(
                                            data.id,
                                            eProgress.duyet,
                                            data.created_user_id ?? ""
                                          );
                                        }}
                                      >
                                        Trưởng khoa duyệt
                                        <ActionList.LeadingVisual>
                                          <Octicon icon={PaperAirplaneIcon} />
                                        </ActionList.LeadingVisual>
                                      </ActionList.Item>
                                    )}
                                    {!data.is_pdt_duyet && (
                                      <ActionList.Item
                                        onClick={() => {
                                          handleKhoaDuyet(
                                            data.id,
                                            eProgress.tra_lai,
                                            data.created_user_id ?? ""
                                          );
                                        }}
                                      >
                                        Trường khoa trả lại duyệt
                                        <ActionList.LeadingVisual>
                                          <Octicon icon={CircleSlashIcon} />
                                        </ActionList.LeadingVisual>
                                      </ActionList.Item>
                                    )}
                                  </>
                                )}

                              {(user?.role === "QUANTRI" ||
                                user?.role === "PHONGDAOTAO") && (
                                  <>
                                    {!data.is_pdt_duyet && (
                                      <ActionList.Item
                                        onClick={() => {
                                          handleDaoTaoDuyet(
                                            data.id,
                                            eProgress.duyet,
                                            data.created_user_id ?? ""
                                          );
                                        }}
                                      >
                                        Phòng đào tạo duyệt
                                        <ActionList.LeadingVisual>
                                          <Octicon icon={PaperAirplaneIcon} />
                                        </ActionList.LeadingVisual>
                                      </ActionList.Item>
                                    )}
                                    <ActionList.Item
                                      onClick={() => {
                                        handleDaoTaoDuyet(
                                          data.id,
                                          eProgress.tra_lai,
                                          data.created_user_id ?? ""
                                        );
                                      }}
                                    >
                                      Phòng đào tạo trả lại duyệt
                                      <ActionList.LeadingVisual>
                                        <Octicon icon={CircleSlashIcon} />
                                      </ActionList.LeadingVisual>
                                    </ActionList.Item>
                                  </>
                                )}
                            </ActionList>
                          </ActionMenu.Overlay>
                        </ActionMenu>
                      </Box>
                    )}
                  </>
                );
              },
            },
          ]}
        />
      </Box>

      {isShowPdModal && (
        <PheDuyetProgressModal
          typeProgress={typeProgress}
          role={role}
          userId={userId}
        />
      )}
      {isShowExamModal && <DeCuongViewModal />}
    </Page>
  );
};

export default PheDuyetPage;
