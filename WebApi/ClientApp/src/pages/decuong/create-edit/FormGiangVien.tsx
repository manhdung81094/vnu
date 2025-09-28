import { Box, Checkbox, TextInput } from "@primer/react";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import DataTable from "../../../components-ui/data-table";
import ComboboxGiaoVien from "../../../components-data/giao-vien/combobox-giaovien";
import Button from "../../../components-ui/button";
import { useAppSelector } from "../../../hooks/useAppSelector";

const FormGiangVien = () => {
  const { control, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "giang_viens",
  });
  const { giaoVienList, lyLichList } = useAppSelector((x) => x.deCuong.deCuong);

  const getIndex = (row: any) => fields.findIndex((f) => f.id === row.id);

  return (
    <Box sx={{ mt: 3, width: "1500px" }}>
      <DataTable
        data={fields}
        columns={[
          {
            caption: "Giảng viên",
            dataField: "id_cb",
            width: 300,
            cellRender: (row: any) => (
              <Controller
                control={control}
                name={`giang_viens.${getIndex(row)}.id_cb`}
                render={({ field }) => (
                  <ComboboxGiaoVien
                    value={field.value}
                    block
                    onValueChanged={(e) => {
                      field.onChange(e);
                      const selected = lyLichList.find((gv) => gv.id_cb === e);
                      if (selected) {
                        // Cập nhật các trường liên quan
                        setValue(
                          `giang_viens.${getIndex(row)}.email`,
                          selected.email ?? ""
                        );
                        setValue(
                          `giang_viens.${getIndex(row)}.sdt`,
                          selected.dien_thoai ?? ""
                        );
                        setValue(
                          `giang_viens.${getIndex(row)}.don_vi_cong_tac`,
                          selected.co_quan_tuyen_dung ?? ""
                        );
                      }
                    }}
                  />
                )}
              />
            ),
          },
          {
            caption: "Email",
            dataField: "email",
            width: 150,
            cellRender: (row: any) => (
              <Controller
                control={control}
                name={`giang_viens.${getIndex(row)}.email`}
                render={({ field }) => (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <TextInput
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  </Box>
                )}
              />
            ),
          },
          {
            caption: "Số điện thoại",
            dataField: "sdt",
            width: 150,
            cellRender: (row: any) => (
              <Controller
                control={control}
                name={`giang_viens.${getIndex(row)}.sdt`}
                render={({ field }) => (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <TextInput
                      value={field.value || ""}
                      onChange={field.onChange}
                      width={1}
                    />
                  </Box>
                )}
              />
            ),
          },
          {
            caption: "Đơn vị công tác",
            dataField: "don_vi_cong_tac",
            width: 500,
            cellRender: (row: any) => (
              <Controller
                control={control}
                name={`giang_viens.${getIndex(row)}.don_vi_cong_tac`}
                render={({ field }) => (
                  <TextInput
                    value={field.value || ""}
                    onChange={field.onChange}
                    width={1}
                  />
                )}
              />
            ),
          },
          {
            caption: "Giảng viên chính",
            dataField: "is_gv_chinh",
            width: 150,
            cellRender: (row: any) => (
              <Controller
                control={control}
                name={`giang_viens.${getIndex(row)}.is_gv_chinh`}
                render={({ field }) => (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Checkbox
                      checked={field.value}
                      onChange={(e) => field.onChange(e)}
                    />
                  </Box>
                )}
              />
            ),
          },
          {
            caption: "Thao tác",
            dataField: "temp",
            width: 120,
            cellRender: (row: any) => (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="danger"
                  onClick={() => remove(getIndex(row))}
                  size="medium"
                  type="button"
                >
                  Xóa
                </Button>
              </Box>
            ),
          },
        ]}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
          mt: 2,
        }}
      >
        <Button
          onClick={() => {
            append({
              id_cb: "",
              email: "",
              sdt: "",
              don_vi_cong_tac: "",
              is_phu_trach: false,
              ghi_chu: "",
              temp: " ",
            });
          }}
          variant="primary"
          type="button"
        >
          Thêm giảng viên
        </Button>
      </Box>
    </Box>
  );
};

export default FormGiangVien;
