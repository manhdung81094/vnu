import { Box, Textarea, TextInput } from "@primer/react";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import DataTable from "../../../components-ui/data-table";
import Button from "../../../components-ui/button";
import TextEditor from "../../../components-ui/text-editor";

const FormMoTa = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "mo_tas",
  });
  const getIndex = (row: any) => fields.findIndex((f) => f.id === row.id);
  const getStt = (f: any) => Number(f.stt) || 0;

  return (
    <Box sx={{ mt: 3, width: "1500px" }}>
      <DataTable
        data={fields}
        columns={[
          {
            caption: "STT",
            dataField: "stt",
            width: 100,
            cellRender: (row: any) => (
              <Controller
                control={control}
                name={`mo_tas.${getIndex(row)}.stt`}
                render={({ field }) => (
                  <TextInput
                    type="number"
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    width={1}
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
                name={`mo_tas.${getIndex(row)}.noi_dung`}
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
            caption: "Thao tác",
            dataField: "",
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
            const maxStt =
              fields.length > 0 ? Math.max(...fields.map(getStt)) : 0;
            append({
              noi_dung: "",
              stt: maxStt + 1,
            });
          }}
          variant="primary"
          type="button"
        >
          Thêm mô tả
        </Button>
      </Box>
    </Box>
  );
};

export default FormMoTa;
