import { Box, Checkbox, FormControl, Textarea } from "@primer/react";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import Button from "../../../components-ui/button";
import Modal from "../../../components-ui/modal";
import ModalActions from "../../../components-ui/modal/ModalActions";
import { rootActions } from "../../../state/actions/rootActions";
import TextInput from "../../../components-ui/text-input";
import { eReducerStatusBase } from "../../../state/reducer-model/eReducerStatusBase";

const BaiEditModal = () => {
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<any>();

    const onSubmit = (data: any) => {
        console.log("Submit data: ", data);
    };

    return (
        <Modal
            isOpen={false}
            title={"Thêm mới"}
            onClose={() => {
                // dispatch(rootActions.deCuong.chuong.CLOSE_EDIT_MODAL(undefined));
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
                            <FormControl.Label>Lý thuyết</FormControl.Label>
                            <TextInput
                                register={register}
                                errors={errors}
                                required
                                name="ly_thuyet"
                                type="number"
                                width={200}
                                validateMessage="Vui lòng điền lý thuyết"

                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Bài tập</FormControl.Label>
                            <TextInput
                                register={register}
                                errors={errors}
                                required
                                name="bai_tap"
                                type="number"
                                width={200}
                                validateMessage="Vui lòng điền lý thuyết"

                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Thực hành</FormControl.Label>
                            <TextInput
                                register={register}
                                errors={errors}
                                required
                                name="thuc_hanh"
                                type="number"
                                width={200}
                                validateMessage="Vui lòng điền lý thuyết"

                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Đồ án môn học</FormControl.Label>
                            <TextInput
                                register={register}
                                errors={errors}
                                required
                                name="thuc_hanh"
                                type="number"
                                width={200}
                                validateMessage="Vui lòng điền lý thuyết"

                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Bài tập lớn</FormControl.Label>
                            <TextInput
                                register={register}
                                errors={errors}
                                required
                                name="thuc_hanh"
                                type="number"
                                width={200}
                                validateMessage="Vui lòng điền lý thuyết"

                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Khóa luận tốt nghiệp</FormControl.Label>
                            <TextInput
                                register={register}
                                errors={errors}
                                required
                                name="khoa_luan_tot_nghiep"
                                type="number"
                                width={200}
                                validateMessage="Vui lòng điền lý thuyết"

                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Đồ án tốt nghiệp</FormControl.Label>
                            <TextInput
                                register={register}
                                errors={errors}
                                required
                                name="do_an_tot_nghiep"
                                type="number"
                                width={200}
                                validateMessage="Vui lòng điền lý thuyết"

                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Thực tập</FormControl.Label>
                            <TextInput
                                register={register}
                                errors={errors}
                                required
                                name="thuc_tap"
                                type="number"
                                width={200}
                                validateMessage="Vui lòng điền lý thuyết"

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
                        />
                        <Controller
                            name="tai_lieu"
                            control={control}
                            render={({ field }) => {
                                return (
                                    <FormControl>
                                        <FormControl.Label>Tài liệu</FormControl.Label>
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
                    </Box>
                </Box>
                <ModalActions>
                    <Button
                        text="Đóng"
                        size="medium"
                        onClick={() => {
                            // dispatch(
                            //     rootActions.deCuong.chuong.CLOSE_EDIT_MODAL(undefined)
                            // );
                        }}
                    />
                    <Button
                        text="Thêm mới"
                        // text={chuongEditData ? "Cập nhật" : "Thêm mới"}
                        variant="primary"
                        size="medium"
                        type="submit"
                        // isLoading={status === eReducerStatusBase.is_saving}
                    />
                </ModalActions>
            </form>
        </Modal>
    );

}
export default BaiEditModal;