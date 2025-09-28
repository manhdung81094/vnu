import { Box, TextInput, Textarea } from "@primer/react";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import DataTable from "../../../components-ui/data-table";
import Button from "../../../components-ui/button";
import { v4 as uuidv4 } from "uuid";
import ComboboxChuanDauRa from "../../../components-data/chuan-dau-ra/combobox-chuandaura";
import SelecboxMucTieu from "../../../components-data/muc-tieu/selectbox-muctieu/SelectboxMucTieu";
import TextEditor from "../../../components-ui/text-editor";

const FormChuanDauRa = () => {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "clos",
  });

  const mucTieus = watch("muc_tieus");

  const getIndex = (row: any) => fields.findIndex((f) => f.id === row.id);

  return (
    <Box sx={{ mt: 3, width: "1500px" }}>
      <DataTable
        data={fields}
        columns={[
          {
            caption: "Mã",
            dataField: "ma",
            width: 200,
            cellRender: (row: any) => (
              <Controller
                control={control}
                name={`clos.${getIndex(row)}.ma`}
                render={({ field }) => (
                  <ComboboxChuanDauRa
                    value={field.value}
                    onValueChanged={field.onChange}
                    is_dao_tao={false}
                  />
                )}
              />
            ),
          },
          {
            caption: "Nội dung",
            dataField: "noi_dung",
            cellRender: (row: any) => (
              <Controller
                control={control}
                name={`clos.${getIndex(row)}.noi_dung`}
                render={({ field }) => (
                  <>
                    <TextEditor
                      initialValue={field.value}
                      onChange={(value) => field.onChange(value)}
                    />
                  </>
                )}
              />
            ),
          },
          {
            caption: "Mục tiêu",
            dataField: "muc_tieu",
            width: 200,
            cellRender: (row: any) => (
              <Controller
                control={control}
                name={`clos.${getIndex(row)}.muc_tieu`}
                render={({ field }) => (
                  <SelecboxMucTieu
                    mucTieus={mucTieus}
                    value={field.value ? field.value.split(",") : []}
                    onValueChanged={(arr: any[]) =>
                      field.onChange(arr.join(","))
                    }
                  />
                )}
              />
            ),
          },
          {
            caption: "Thao tác",
            dataField: "id_temp",
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
          justifyContent: "flex-end",
          width: "100%",
          mt: 2,
        }}
      >
        <Button
          onClick={() => {
            append({
              ma: "",
              noi_dung: "",
              muc_tieu: "",
              id_temp: uuidv4(),
            });
          }}
          variant="primary"
          type="button"
        >
          Thêm chuẩn đầu ra
        </Button>
      </Box>
    </Box>
  );
};

export default FormChuanDauRa;
