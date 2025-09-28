import { PlusIcon } from "@primer/octicons-react";
import { Box, Button, FormControl, TextInput, Textarea } from "@primer/react";
import {
  Controller,
  FieldErrors,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import SelectboxChuanDauRa from "../../../components-data/chuan-dau-ra/selectbox-chuandaura";
import { v4 as uuidv4 } from "uuid";
import TextEditor from "../../../components-ui/text-editor";

const FormDanhGia = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const {
    fields: danhGias,
    append: appendDanhGia,
    remove: removeDanhGia,
  } = useFieldArray({
    control,
    name: "danh_gias",
  });

  return (
    <Box sx={{ mt: 3 }}>
      <Box
        sx={{ fontWeight: "bold", mb: 2, fontSize: 2, display: "flex", gap: 2 }}
      >
        Thành phần đánh giá{" "}
        <Button
          variant="primary"
          leadingVisual={PlusIcon}
          size="small"
          onClick={() => appendDanhGia({ id_temp: uuidv4(), subs: {} })}
        />
      </Box>
      {danhGias.length === 0 && (
        <Box sx={{ color: "fg.muted", fontStyle: "italic" }}>
          Chưa có nội dung nào.
        </Box>
      )}
      {danhGias.map((dg, dgIdx) => (
        <Box
          key={dg.id ?? dgIdx}
          sx={{ border: "1px solid #ccc", p: 2, mb: 2 }}
        >
          <Box sx={{ mt: 2, ml: 3 }}>
            <Box sx={{ border: "1px dashed #aaa", p: 2, mb: 2 }}>
              <Box sx={{ display: "grid", width: "100%" }}>
                <FormControl>
                  <FormControl.Label>Tính chất<span>*</span></FormControl.Label>
                  <Controller
                    control={control}
                    name={`danh_gias.${dgIdx}.subs.hinh_thuc`}
                    rules={{ required: "Vui lòng nhập nội dung tính chất" }}
                    render={({ field }) => (
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
              </Box>
              <Box sx={{ display: "grid", width: "100%" }}>
                <FormControl>
                  <FormControl.Label>
                    Hoạt động kiểm tra đánh giá<span>*</span>
                  </FormControl.Label>
                  <Controller
                    control={control}
                    name={`danh_gias.${dgIdx}.subs.noi_dung`}
                     rules={{ required: "Vui lòng nhập nội dung hoạt động kiểm tra" }}
                    render={({ field }) => (
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
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <FormControl>
                  <FormControl.Label>
                    Trọng số (%) <span>*</span>
                  </FormControl.Label>
                  <Controller
                    control={control}
                    name={`danh_gias.${dgIdx}.subs.trong_so`}
                    rules={{ required: "Vui lòng nhập trọng số" }}
                    render={({ field, fieldState }) => (
                      <>
                        <TextInput
                          value={field.value}
                          type="number"
                          min={1}
                          onChange={field.onChange}
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
                <FormControl>
                  <FormControl.Label>
                    Chuẩn đầu ra <span>*</span>
                  </FormControl.Label>
                  <Controller
                    control={control}
                    name={`danh_gias.${dgIdx}.subs.ma_clo`}
                    rules={{ required: "Vui lòng chọn chuẩn đầu ra" }}
                    render={({ field, fieldState }) => (
                      <>
                        <SelectboxChuanDauRa
                          value={field.value ? field.value.split(",") : []}
                          onValueChanged={(arr: string[]) =>
                            field.onChange(arr.join(","))
                          }
                          is_dao_tao={false}
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
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <Button
                  variant="primary"
                  leadingVisual={PlusIcon}
                  onClick={() => appendDanhGia({ id_temp: uuidv4(), subs: {} })}
                >
                  Thêm đánh giá
                </Button>
                <Button
                  variant="danger"
                  onClick={() => removeDanhGia(dgIdx)}
                  sx={{ alignSelf: "self-end" }}
                >
                  Xóa
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default FormDanhGia;
