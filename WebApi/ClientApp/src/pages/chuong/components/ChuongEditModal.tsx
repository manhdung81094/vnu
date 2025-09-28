import { Box, Checkbox, FormControl, Textarea } from "@primer/react";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import Button from "../../../components-ui/button";
import Modal from "../../../components-ui/modal";
import ModalActions from "../../../components-ui/modal/ModalActions";
import { ICDR_Chuong } from "../../../model/respone/decuong/ICDR_Chuong";
import { rootActions } from "../../../state/actions/rootActions";
import TextInput from "../../../components-ui/text-input";
import { eReducerStatusBase } from "../../../state/reducer-model/eReducerStatusBase";

const ChuongEditModal = () => {
    const dispatch = useAppDispatch();
    const { chuongEditData, status } = useAppSelector((x) => x.deCuong.chuong);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ICDR_Chuong>({
        defaultValues: chuongEditData,
    });

    const onSubmit = (data: any) => {
        console.log("Submit data: ", data);
        const submitData = {
            ...data,
            hoat_dong_gv: "",
            hoat_dong_sv: "",
        };
        dispatch(rootActions.deCuong.chuong.SAVE_START(submitData));
    };

    return (
        <Modal
            isOpen={true}
            title={chuongEditData?.id ? "Chỉnh sửa" : "Thêm mới"}
            onClose={() => {
                dispatch(rootActions.deCuong.chuong.CLOSE_EDIT_MODAL(undefined));
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
                    <Box width={1} sx={{ display: "grid", gap: 2 }}>
                        <FormControl>
                            <FormControl.Label>Chương</FormControl.Label>
                            <TextInput
                                register={register}
                                errors={errors}
                                required
                                name="stt"
                                type="number"
                                width={200}
                                validateMessage="Vui lòng điền chương"
                                
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Nội dung</FormControl.Label>
                            <TextInput
                                register={register}
                                errors={errors}
                                required
                                name="noi_dung"
                                block
                                validateMessage="Vui lòng điền Nội dung"
                            />
                        </FormControl>
                        {/* <FormControl>
                            <FormControl.Label>Thời gian tự học của SV (giờ)</FormControl.Label>
                            <TextInput
                                register={register}
                                errors={errors}
                                required
                                type="number"
                                name="tu_hoc"
                                validateMessage="Vui lòng điền thời gian tự học"
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>CĐR học phần</FormControl.Label>
                            <TextInput
                                register={register}
                                errors={errors}
                                required
                                name="id_clos"
                                block
                                validateMessage="Vui lòng điền CĐR học phần"
                            />
                        </FormControl>
                        <Controller
                            name="hoat_dong_gv"
                            control={control}
                            render={({ field }) => {
                                return (
                                    <FormControl>
                                        <FormControl.Label>Hoạt động dạy (GV)</FormControl.Label>
                                        <Textarea
                                            rows={5}
                                            block
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                            }}
                                        />
                                    </FormControl>
                                );
                            }}
                        />
                        <Controller
                            name="hoat_dong_sv"
                            control={control}
                            render={({ field }) => {
                                return (
                                    <FormControl>
                                        <FormControl.Label>Hoạt động học (GV)</FormControl.Label>
                                        <Textarea
                                            rows={5}
                                            block
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                            }}
                                        />
                                    </FormControl>
                                );
                            }}
                        /> */}
                    </Box>
                </Box>
                <ModalActions>
                    <Button
                        text="Đóng"
                        size="medium"
                        onClick={() => {
                            dispatch(
                                rootActions.deCuong.chuong.CLOSE_EDIT_MODAL(undefined)
                            );
                        }}
                    />
                    <Button
                        text={chuongEditData ? "Cập nhật" : "Thêm mới"}
                        variant="primary"
                        size="medium"
                        type="submit"
                        isLoading={status === eReducerStatusBase.is_saving}
                    />
                </ModalActions>
            </form>
        </Modal>
    );
}

export default ChuongEditModal;