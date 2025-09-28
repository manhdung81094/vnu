import { EyeIcon } from "@primer/octicons-react";
import { Box, Textarea, useConfirm } from "@primer/react";
import { useMemo, useState } from "react";
import Button from "../../../components-ui/button";
import Modal from "../../../components-ui/modal";
import Text from "../../../components-ui/text";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  eProgress,
  eProgressDic,
  eRole,
} from "../../../model/common/eProgress";
import { rootActions } from "../../../state/actions/rootActions";
import { eReducerStatusBase } from "../../../state/reducer-model/eReducerStatusBase";
import { deCuongApi } from "../../../api/decuong/deCuongApi";
import { NotifyHelper } from "../../../helpers/toast";

const mainActions = rootActions.deCuong.deCuong;

export interface DeCuongProgressModalProps {
  typeProgress: eProgress;
  role: eRole | null;
  userId: string;
}

const PheDuyetProgressModal = ({
  typeProgress,
  role,
  userId,
}: DeCuongProgressModalProps) => {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const [content, setContent] = useState<string>("");
  const [status, setStatus] = useState<eProgress>(typeProgress);

  const {
    deCuongs,
    idShowModal,
    status: statusDeCuong,
  } = useAppSelector((x) => x.deCuong.deCuong);

  console.log(userId);

  const handleSubmit = async () => {
    if (
      await confirm({
        title: "Lưu ý",
        content: `Bạn có chắc chắn muốn ${eProgressDic[status]}?`,
        cancelButtonContent: "Không",
        confirmButtonContent: eProgressDic[status],
        confirmButtonType: "danger",
      })
    ) {
      try {
        if (role === eRole.bo_mon) {
          const res = await deCuongApi.BoMonDuyet({
            id: idShowModal,
            type_progress: typeProgress,
            content: content,
            created_user_id: userId,
          });
          if (res && res.data) {
            dispatch(rootActions.deCuong.deCuong.LOAD_START(undefined));
            dispatch(mainActions.CLOSE_PD_MODAL(undefined));
            NotifyHelper.Success(
              `Trưởng bộ môn đã ${eProgressDic[typeProgress]} đề cương`
            );
          }
        }
        if (role === eRole.khoa) {
          const res = await deCuongApi.KhoaDuyet({
            id: idShowModal,
            type_progress: typeProgress,
            content: content,
            created_user_id: userId,
          });
          if (res && res.data) {
            dispatch(rootActions.deCuong.deCuong.LOAD_START(undefined));
            dispatch(mainActions.CLOSE_PD_MODAL(undefined));
            NotifyHelper.Success(
              `Trưởng khoa đã ${eProgressDic[typeProgress]} đề cương`
            );
          } else {
            NotifyHelper.Error(`${res.message}`);
          }
        }
        if (role === eRole.pdt) {
          const res = await deCuongApi.DaoTaoDuyet({
            id: idShowModal,
            type_progress: typeProgress,
            content: content,
            created_user_id: userId,
          });
          if (res && res.data) {
            dispatch(rootActions.deCuong.deCuong.LOAD_START(undefined));
            dispatch(mainActions.CLOSE_PD_MODAL(undefined));
            NotifyHelper.Success(
              `Phòng đào tạo đã ${eProgressDic[typeProgress]} đề cương`
            );
          } else {
            NotifyHelper.Error(`${res.message}`);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deCuongProgress = useMemo(() => {
    return deCuongs.find((item) => item.id === idShowModal);
  }, [idShowModal, deCuongs, typeProgress]);

  return (
    <Modal
      isOpen={true}
      titleComponent={
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Text text={`${eProgressDic[status]} đề cương`} />
        </Box>
      }
      onClose={() => {
        dispatch(mainActions.CLOSE_PD_MODAL(undefined));
      }}
      width="xlarge"
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box>
          <Text text={`Đề cương:`} />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              text={deCuongProgress?.ten_de_cuong}
              size="small"
              leadingVisual={EyeIcon}
            />
          </Box>
        </Box>

        <Box>
          <Text text="Trạng thái" />
          <Button text={eProgressDic[status]} size="small" />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Textarea
            rows={3}
            placeholder="Nội dung..."
            block
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
        <Button
          text={eProgressDic[status]}
          variant="primary"
          size="small"
          onClick={handleSubmit}
          //   isLoading={statusDeCuong === eReducerStatusBase.is_saving}
        />
        <Button
          text="Đóng"
          variant="danger"
          size="small"
          onClick={() => {
            dispatch(mainActions.CLOSE_PD_MODAL(undefined));
          }}
        />
      </Box>
    </Modal>
  );
};

export default PheDuyetProgressModal;
