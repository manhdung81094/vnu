import { Box, Checkbox, FormControl, Textarea } from "@primer/react";
import { Controller, useForm } from "react-hook-form";
import Modal from "../../../../components-ui/modal";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import TextInput from "../../../../components-ui/text-input";
import ModalActions from "../../../../components-ui/modal/ModalActions";
import Button from "../../../../components-ui/button";
import { rootActions } from "../../../../state/actions/rootActions";
import { eReducerStatusBase } from "../../../../state/reducer-model/eReducerStatusBase";
import ComboboxLoaiCDR from "../../../../components-data/chuan-dau-ra/combobox-loai-cdr";
import { IDmChuanDauRa } from "../../../../model/respone/category/IDmChuanDauRa";

const ChuanDauRaEditModal = () => {
  const dispatch = useAppDispatch();
  const { chuanDauRaEdit, status, request } = useAppSelector(
    (x) => x.category.chuanDauRa
  );

  console.log(request);

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    setError,
    control,
    formState: { errors },
  } = useForm<IDmChuanDauRa>({
    defaultValues: {
      ...chuanDauRaEdit,
    },
  });
  const onSubmit = (data: any) => {
    dispatch(
      rootActions.category.chuanDauRa.SAVE_START({
        ...data,
        note: data.note ?? "",
        is_dao_tao: request.id_loai_cdr === 0 ? false : true,
      })
    );
  };
  return (
    <Modal
      isOpen={true}
      title={"Thêm mới"}
      onClose={() => {
        dispatch(rootActions.category.chuanDauRa.CLOSE_EDIT_MODAL(undefined));
      }}
      width={"large"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px 0",
          }}
        >
          <Box width={1}>
            <FormControl>
              <FormControl.Label>Mã chuẩn đầu ra</FormControl.Label>
              <TextInput
                register={register}
                errors={errors}
                required
                name="name"
                block
                validateMessage="Vui lòng điền mã chuẩn đầu ra"
              />
            </FormControl>
          </Box>
          <Box width={1}>
            <Controller
              control={control}
              name="note"
              rules={{}}
              render={({ field }) => (
                <FormControl>
                  <FormControl.Label>Ghi chú</FormControl.Label>
                  <Textarea block {...field} />
                </FormControl>
              )}
            />
          </Box>
        </Box>
        <ModalActions>
          <Button
            text="Đóng"
            size="small"
            onClick={() => {
              dispatch(
                rootActions.category.chuanDauRa.CLOSE_EDIT_MODAL(undefined)
              );
            }}
          />
          <Button
            text={chuanDauRaEdit ? "Cập nhật" : "Thêm mới"}
            variant="primary"
            size="small"
            type="submit"
            isLoading={status === eReducerStatusBase.is_saving}
          />
        </ModalActions>
      </form>
    </Modal>
  );
};

export default ChuanDauRaEditModal;
