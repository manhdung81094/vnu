import { useFormContext, Controller, FieldErrors } from "react-hook-form";
import { Box, FormControl, Textarea, TextInput } from "@primer/react";
import ComboboxMonHoc from "../../../components-data/mon-hoc/combobox-monhoc";
import ComboboxLoaiHocPhan from "../../../components-data/loai-hoc-phan/combobox-loaihocphan";
import { useAppSelector } from "../../../hooks/useAppSelector";

const FormThongTinChung = () => {
  const {
    register,
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext();
  const { ctdtList } = useAppSelector((x) => x.deCuong.deCuong);
  const { monhocs } = useAppSelector((x) => x.category.monHoc);
  // Ép kiểu để truy cập các trường con của de_cuong
  const deCuongErrors = (errors.de_cuong ?? {}) as FieldErrors<any>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
      <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "1fr 1fr 1fr" }}>
        <FormControl>
          <FormControl.Label>
            Học phần <span>*</span>
          </FormControl.Label>
          <Controller
            control={control}
            name="de_cuong.id_mon"
            rules={{ required: "Vui lòng chọn học phần" }}
            render={({ field }) => (
              <ComboboxMonHoc
                value={field.value}
                onValueChanged={(e) => {
                  field.onChange(e);
                  const selected = monhocs.find((m) => m.id_mon === e);
                  const ctdtSelected = ctdtList.find(
                    (ctdt) => ctdt.ID_mon === e
                  );
                  if (selected) {
                    setValue("de_cuong.so_tin_chi", selected.so_hoc_trinh);
                    setValue("de_cuong.ly_thuyet", selected.ly_thuyet);
                    setValue("de_cuong.thuc_hanh", selected.thuc_hanh);
                    setValue("de_cuong.tu_hoc", selected.tu_hoc);
                  }
                  if (ctdtSelected) {
                    setValue(
                      "de_cuong.loai_hoc_phan",
                      ctdtSelected.Loai_rang_buoc
                    );
                    setValue(
                      "de_cuong.id_mon_tien_quyet",
                      ctdtSelected.ID_mon_rb
                    );
                  }
                }}
              />
            )}
          />
          {deCuongErrors.id_mon?.message && (
            <span style={{ color: "red" }}>
              {deCuongErrors.id_mon?.message as string}
            </span>
          )}
        </FormControl>
        <FormControl>
          <FormControl.Label>
            Số tín chỉ <span>*</span>
          </FormControl.Label>
          <Controller
            control={control}
            name="de_cuong.so_tin_chi"
            rules={{ required: "Vui lòng điền số tín chỉ" }}
            render={({ field }) => (
              <TextInput
                value={field.value}
                type="number"
                min={1}
                onChange={field.onChange}
              />
            )}
          />
          {deCuongErrors.so_tin_chi?.message && (
            <span style={{ color: "red" }}>
              {deCuongErrors.so_tin_chi?.message as string}
            </span>
          )}
        </FormControl>
        <FormControl>
          <FormControl.Label>
            Loại học phần <span>*</span>
          </FormControl.Label>
          <Controller
            control={control}
            name="de_cuong.loai_hoc_phan"
            rules={{ required: "Vui lòng chọn loại học phần" }}
            render={({ field }) => (
              <ComboboxLoaiHocPhan
                value={field.value}
                onValueChanged={field.onChange}
              />
            )}
          />
          {deCuongErrors.loai_hoc_phan?.message && (
            <span style={{ color: "red" }}>
              {deCuongErrors.loai_hoc_phan?.message as string}
            </span>
          )}
        </FormControl>
      </Box>
      <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "1fr 1fr 1fr" }}>
        <FormControl>
          <FormControl.Label>Số giờ lý thuyết</FormControl.Label>
          <Controller
            control={control}
            name="de_cuong.ly_thuyet"
            render={({ field }) => (
              <TextInput
                value={field.value ?? 0}
                type="number"
                min={0}
                onChange={field.onChange}
              />
            )}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Số giờ thực hành</FormControl.Label>
          <Controller
            control={control}
            name="de_cuong.thuc_hanh"
            render={({ field }) => (
              <TextInput
                value={field.value ?? 0}
                type="number"
                min={0}
                onChange={field.onChange}
              />
            )}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Số giờ tự học</FormControl.Label>
          <Controller
            control={control}
            name="de_cuong.tu_hoc"
            render={({ field }) => (
              <TextInput
                value={field.value ?? 0}
                type="number"
                min={0}
                onChange={field.onChange}
              />
            )}
          />
        </FormControl>
      </Box>
      <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "1fr 1fr 1fr" }}>
        <FormControl>
          <FormControl.Label>Học phần tiên quyết</FormControl.Label>
          <Controller
            control={control}
            name="de_cuong.id_mon_tien_quyet"
            render={({ field }) => (
              <ComboboxMonHoc
                value={field.value}
                onValueChanged={field.onChange}
              />
            )}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Học phần kế tiếp</FormControl.Label>
          <Controller
            control={control}
            name="de_cuong.id_mon_ke_tiep"
            render={({ field }) => (
              <ComboboxMonHoc
                value={field.value}
                onValueChanged={field.onChange}
              />
            )}
          />
        </FormControl>
      </Box>
      <FormControl>
        <FormControl.Label>Yêu cầu để giảng dạy học phần</FormControl.Label>
        <Controller
          control={control}
          name="de_cuong.yeu_cau"
          render={({ field }) => (
            <>
              <Textarea
                rows={3}
                block
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
            </>
          )}
        />
      </FormControl>
      <FormControl>
        <FormControl.Label>
          Phương thức giảng viên tư vấn học tập cho sinh viên
        </FormControl.Label>
        <Controller
          control={control}
          name="de_cuong.phuong_thuc"
          render={({ field }) => (
            <>
              <Textarea
                rows={3}
                block
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
            </>
          )}
        />
      </FormControl>
    </Box>
  );
};

export default FormThongTinChung;
