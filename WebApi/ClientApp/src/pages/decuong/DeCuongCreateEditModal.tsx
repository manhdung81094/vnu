import {
  BookIcon,
  CheckCircleIcon,
  FileDirectoryIcon,
  GraphIcon,
  InfoIcon,
  PersonIcon,
  ProjectRoadmapIcon,
} from "@primer/octicons-react";
import { useEffect } from "react";
import { Box } from "@primer/react";
import { UnderlinePanels } from "@primer/react/lib-esm/drafts";
import { FormProvider, useForm } from "react-hook-form";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useWindowSize } from "../../hooks/useWindowSize";
import { rootActions } from "../../state/actions/rootActions";
import { IDeCuongVm } from "../../model/respone/decuong/IDeCuongVm";
import Modal from "../../components-ui/modal";
import Button from "../../components-ui/button";
import FormThongTinChung from "./create-edit/FormThongTinChung";
import FormGiangVien from "./create-edit/FormGiangVien";
import FormMoTa from "./create-edit/FormMoTa";
import FormChuanDauRa from "./create-edit/FormChuanDauRa";
import FormTaiLieu from "./create-edit/FormTaiLieu";
import FormDanhGia from "./create-edit/FormDanhGia";
import FormChuongBai from "./create-edit/FormChuongBai";
import FormMucTieu from "./create-edit/FormMucTieu";
import FormPhuongPhap from "./create-edit/FormPhuongPhap";
import FormQuyTac from "./create-edit/FormQuyTac";
import { NotifyHelper } from "../../helpers/toast";

const DeCuongCreateEditModal = () => {
  const { height } = useWindowSize();
  const dispatch = useAppDispatch();
  const { deCuongEdit, isShowEditModal, idDeCuong } = useAppSelector(
    (x) => x.deCuong.deCuong
  );

  const methods = useForm<IDeCuongVm>({
    defaultValues: {
      ...deCuongEdit,
    },
    shouldUnregister: false // giữ rule và dữ liệu của field kể cả khi unmount
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    reset({
      ...deCuongEdit,
      de_cuong: deCuongEdit?.de_cuong ?? {},
      giang_viens: deCuongEdit?.giang_viens ?? [],
      clos: deCuongEdit?.clos ?? [],
      mo_tas: deCuongEdit?.mo_tas ?? [],
      danh_gias: deCuongEdit?.danh_gias ?? [],
      tai_lieus: deCuongEdit?.tai_lieus ?? [],
      chuongs: deCuongEdit?.chuongs ?? [],
      muc_tieus: deCuongEdit?.muc_tieus ?? [],
      phuong_phaps: deCuongEdit?.phuong_phaps ?? [],
      quy_tacs: deCuongEdit?.quy_tacs ?? [],
    });
  }, [deCuongEdit, reset]);

  const onSubmit = (data: IDeCuongVm) => {
    dispatch(rootActions.deCuong.deCuong.SAVE_START(data));
  };

  const showAllErrors = (errObj: any, path = "") => {
    Object.entries(errObj).forEach(([key, err]: [string, any]) => {
      const currentPath = path ? `${path}.${key}` : key;

      // Lấy tên hiển thị từ key gốc
      const rootKey = currentPath.split(".")[0];
      let sectionName = rootKey;
      switch (rootKey) {
        case "de_cuong":
          sectionName = "Thông tinh chung";
          break;
        case "giang_viens":
          sectionName = "Giảng viên";
          break;
        case "mo_tas":
          sectionName = "Mô tả";
          break;
        case "muc_tieus":
          sectionName = "Mục tiêu";
          break;
        case "clos":
          sectionName = "Chuẩn đầu ra";
          break;
        case "chuongs":
          sectionName = "Nội dung";
          break;
        case "phuong_phaps":
          sectionName = "Phương pháp";
          break;
        case "danh_gias":
          sectionName = "Đánh giá";
          break;
        case "tai_lieus":
          sectionName = "Tài liệu";
          break;
        case "quy_tacs":
          sectionName = "Quy tắc";
          break;
        default:
          sectionName = rootKey;
          break;
      }

      if (err?.message) {
        NotifyHelper.Error(`${sectionName}: ${err.message}`);
      }

      if (typeof err === "object" && !err?.message) {
        showAllErrors(err, currentPath);
      }
    });
  };


  useEffect(() => {
    dispatch(rootActions.deCuong.deCuong.LOAD_BY_ID_START(idDeCuong));
  }, [idDeCuong]);

  return (
    <Modal
      title={
        deCuongEdit?.de_cuong?.id ? "Chỉnh sửa đề cương" : "Thêm mới đề cương"
      }
      isOpen={isShowEditModal}
      onClose={() => {
        dispatch(rootActions.deCuong.deCuong.CLOSE_EDIT_MODAL(undefined));
      }}
      sx={{ width: "auto" }}
    >
      <FormProvider {...methods}>
        <Box sx={{ mt: -2 }}>
          <UnderlinePanels aria-label=" ">
            <UnderlinePanels.Tab icon={InfoIcon}>
              I. Thông tin chung
            </UnderlinePanels.Tab>
            <UnderlinePanels.Tab icon={PersonIcon}>
              II. Giảng viên
            </UnderlinePanels.Tab>
            <UnderlinePanels.Tab icon={ProjectRoadmapIcon}>
              III.Mô tả
            </UnderlinePanels.Tab>
            <UnderlinePanels.Tab icon={ProjectRoadmapIcon}>
              IV. Mục tiêu
            </UnderlinePanels.Tab>
            <UnderlinePanels.Tab icon={CheckCircleIcon}>
              V. Chuẩn đầu ra
            </UnderlinePanels.Tab>
            <UnderlinePanels.Tab icon={BookIcon}>
              VI. Nội dung
            </UnderlinePanels.Tab>
            <UnderlinePanels.Tab icon={BookIcon}>
              VII. Phương pháp
            </UnderlinePanels.Tab>
            <UnderlinePanels.Tab icon={GraphIcon}>
              VIII. Đánh giá
            </UnderlinePanels.Tab>
            <UnderlinePanels.Tab icon={FileDirectoryIcon}>
              IX. Tài liệu
            </UnderlinePanels.Tab>
            <UnderlinePanels.Tab icon={ProjectRoadmapIcon}>
              X. Quy tắc
            </UnderlinePanels.Tab>
            <UnderlinePanels.Panel>
              <FormThongTinChung />
            </UnderlinePanels.Panel>
            <UnderlinePanels.Panel>
              <FormGiangVien />
            </UnderlinePanels.Panel>
            <UnderlinePanels.Panel>
              <FormMoTa />
            </UnderlinePanels.Panel>
            <UnderlinePanels.Panel>
              <FormMucTieu />
            </UnderlinePanels.Panel>
            <UnderlinePanels.Panel>
              <FormChuanDauRa />
            </UnderlinePanels.Panel>
            <UnderlinePanels.Panel>
              <FormChuongBai />
            </UnderlinePanels.Panel>
            <UnderlinePanels.Panel>
              <FormPhuongPhap />
            </UnderlinePanels.Panel>
            <UnderlinePanels.Panel>
              <FormDanhGia />
            </UnderlinePanels.Panel>
            <UnderlinePanels.Panel>
              <FormTaiLieu />
            </UnderlinePanels.Panel>
            <UnderlinePanels.Panel>
              <FormQuyTac />
            </UnderlinePanels.Panel>
          </UnderlinePanels>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
          <Button
            text="Đóng"
            onClick={() => {
              dispatch(rootActions.deCuong.deCuong.CLOSE_EDIT_MODAL(undefined));
            }}
            variant="danger"
            size="medium"
            type="button"
          />
          <Button
            text={deCuongEdit?.de_cuong?.id ? "Lưu" : "Thêm mới"}
            variant="primary"
            size="medium"
            type="button"
            onClick={handleSubmit(
              onSubmit,
              (formErrors) => {
                showAllErrors(formErrors);
              }
            )}
          />
        </Box>
      </FormProvider>
    </Modal>
  );
};

export default DeCuongCreateEditModal;
