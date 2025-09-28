import { Box, Button, FormControl, Textarea, TextInput } from "@primer/react";
import { PlusIcon, TrashIcon } from "@primer/octicons-react";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import SelectboxChuanDauRa from "../../../components-data/chuan-dau-ra/selectbox-chuandaura";
import TextEditor from "../../../components-ui/text-editor";
const FormMucTieu = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "muc_tieus",
    keyName: "fieldId", // avoid conflict with id
  });

  return (
    <Box sx={{ mt: 2 }}>
      <Box
        sx={{
          fontWeight: "bold",
          mb: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        Danh sách mục tiêu
        <Button
          variant="primary"
          leadingVisual={PlusIcon}
          size="small"
          type="button"
          onClick={() =>
            append({
              ma: "",
              noi_dung: "",
            })
          }
        >
          Thêm mục tiêu
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {fields.length === 0 && (
          <Box sx={{ color: "fg.muted", fontStyle: "italic" }}>
            Chưa có nội dung nào.
          </Box>
        )}
        {fields.map((item, idx) => (
          <Box
            key={item.fieldId}
            sx={{
              display: "grid",
              alignItems: "center",
              gap: 2,
              border: "1px dashed #aaa",
              p: 2,
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <FormControl required sx={{ minWidth: 120 }}>
                <FormControl.Label>Mã mục tiêu </FormControl.Label>
                <Controller
                  control={control}
                  name={`muc_tieus.${idx}.ma`}
                  rules={{ required: "Vui lòng nhập mã mục tiêu" }}
                  render={({ field, fieldState }) => (
                    <>
                      <TextInput {...field} placeholder="Mã mục tiêu" />
                      {fieldState.error && (
                        <span style={{ color: "red" }}>
                          {fieldState.error.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>
                  Chuẩn đầu ra chương trình đào tạo <span>*</span>
                </FormControl.Label>
                <Controller
                  control={control}
                  name={`muc_tieus.${idx}.id_clos`}
                  rules={{ required: "Vui lòng chọn chuẩn đầu ra" }}
                  render={({ field, fieldState }) => (
                    <>
                      <SelectboxChuanDauRa
                        value={field.value ? field.value.split(",") : []}
                        onValueChanged={(arr: string[]) =>
                          field.onChange(arr.join(","))
                        }
                        is_dao_tao={true}
                      />
                      {fieldState.error && (
                        <span style={{ color: "red" }}>
                          {fieldState.error.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </FormControl>
            </Box>
            <FormControl required sx={{ flex: 1 }}>
              <FormControl.Label>Nội dung mục tiêu</FormControl.Label>
              <Controller
                control={control}
                name={`muc_tieus.${idx}.noi_dung`}
                rules={{ required: "Vui lòng nhập nội dung mục tiêu" }}
                render={({ field, fieldState }) => (
                  <Box sx={{ width: "100%" }}>
                    <>
                      <TextEditor
                        initialValue={field.value}
                        onChange={(value) => field.onChange(value)}
                      />
                    </>
                  </Box>
                )}
              />
            </FormControl>
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
            >
              <Button
                variant="primary"
                leadingVisual={PlusIcon}
                size="small"
                type="button"
                onClick={() =>
                  append({
                    ma: "",
                    noi_dung: "",
                  })
                }
              >
                Thêm mục tiêu
              </Button>
              <Button
                variant="danger"
                leadingVisual={TrashIcon}
                size="small"
                type="button"
                onClick={() => remove(idx)}
                aria-label="Xóa mục tiêu"
              >
                Xóa mục tiêu
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FormMucTieu;
