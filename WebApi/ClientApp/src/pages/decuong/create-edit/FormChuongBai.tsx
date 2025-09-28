import { PlusIcon } from "@primer/octicons-react";
import { Box, Button, FormControl, TextInput } from "@primer/react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import SelectboxChuanDauRa from "../../../components-data/chuan-dau-ra/selectbox-chuandaura";
import TextEditor from "../../../components-ui/text-editor";

// Kiểu props cho SubList
interface SubListProps {
  nestIndex: number;
  appendChuong: (value: any) => void;
}

const SubList = ({ nestIndex, appendChuong }: SubListProps) => {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `chuongs.${nestIndex}.chuongSub`,
  });
  const clos = watch("clos") || [];

  return (
    <Box sx={{ mt: 2, ml: 3 }}>
      <Box
        sx={{
          fontWeight: "bold",
          mb: 1,
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        Nội dung chương
        <Button
          variant="primary"
          leadingVisual={PlusIcon}
          size="small"
          onClick={() =>
            append({
              noi_dung: "",
              ly_thuyet: 0,
              bai_tap: 0,
              thuc_hanh: 0,
              do_an_mon_hoc: 0,
              bai_tap_lon: 0,
              khoa_luan_tot_nghiep: 0,
              do_an_tot_nghiep: 0,
              thuc_tap: 0,
              tu_hoc: 0,
              hoat_dong_gv: "",
              hoat_dong_sv: "",
              tai_lieu: "",
              // sub2: [],
            })
          }
          sx={{ mt: 1 }}
        ></Button>
      </Box>
      {fields.map((item, idx) => (
        <Box
          key={item.id ?? idx}
          sx={{ border: "1px dashed #aaa", p: 2, mb: 2 }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ width: "100%" }} display={"grid"}>
              <FormControl>
                <FormControl.Label>Nội dung chương</FormControl.Label>
                <Controller
                  control={control}
                  name={`chuongs.${nestIndex}.chuongSub.${idx}.hoat_dong_gv`}
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
              <FormControl>
                <FormControl.Label>Tài liệu</FormControl.Label>
                <Controller
                  control={control}
                  name={`chuongs.${nestIndex}.chuongSub.${idx}.tai_lieu`}
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
            <Box sx={{ display: "grid" }}>
              <FormControl>
                <FormControl.Label>
                  Chuẩn đầu ra học phần <span>*</span>
                </FormControl.Label>
                <Controller
                  control={control}
                  name={`chuongs.${nestIndex}.chuongSub.${idx}.id_clos`}
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

            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Button
                variant="primary"
                leadingVisual={PlusIcon}
                sx={{ alignSelf: "center" }}
                onClick={() => {
                  appendChuong({ stt: "", noi_dung: "", chuongSub: [] });
                }}
              >
                Thêm chương
              </Button>
              <Button
                variant="danger"
                onClick={() => remove(idx)}
                sx={{ alignSelf: "center" }}
              >
                Xóa
              </Button>
            </Box>
          </Box>
          {/* <Sub2List nestIndex={nestIndex} subIndex={idx} /> */}
        </Box>
      ))}
    </Box>
  );
};

const FormChuongBai = () => {
  const { control } = useFormContext();

  const {
    fields: chuongs,
    append: appendChuong,
    remove: removeChuong,
  } = useFieldArray({
    control,
    name: "chuongs",
  });

  return (
    <Box sx={{ mt: 3 }}>
      <Box
        sx={{ fontWeight: "bold", mb: 2, fontSize: 2, display: "flex", gap: 2 }}
      >
        Chương{" "}
        <Button
          variant="primary"
          leadingVisual={PlusIcon}
          size="small"
          onClick={() => appendChuong({ stt: "", noi_dung: "", chuongSub: [] })}
          type="button"
        />
      </Box>
      {chuongs.length === 0 && (
        <Box sx={{ color: "fg.muted", fontStyle: "italic" }}>
          Chưa có nội dung nào.
        </Box>
      )}
      {chuongs.map((c, index) => (
        <Box key={c.id ?? index} sx={{ border: "1px solid #ccc", p: 2, mb: 2 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl>
              <FormControl.Label>
                Chương <span>*</span>
              </FormControl.Label>
              <Controller
                control={control}
                rules={{ required: "Vui lòng điền chương" }}
                name={`chuongs.${index}.stt`}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    placeholder="Chương"
                    type="number"
                    sx={{ width: 150 }}
                  />
                )}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>
                Tên chương <span>*</span>
              </FormControl.Label>
              <Controller
                control={control}
                name={`chuongs.${index}.noi_dung`}
                rules={{ required: "Vui lòng điền tên chương" }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    placeholder="Tên chương"
                    sx={{ width: 400 }}
                  />
                )}
              />
            </FormControl>
            <Button
              variant="danger"
              onClick={() => removeChuong(index)}
              sx={{ alignSelf: "end" }}
              type="button"
            >
              Xóa
            </Button>
          </Box>
          <SubList nestIndex={index} appendChuong={appendChuong} />
        </Box>
      ))}
    </Box>
  );
};

export default FormChuongBai;
