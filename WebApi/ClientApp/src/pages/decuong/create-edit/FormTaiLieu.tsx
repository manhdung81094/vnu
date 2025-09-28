import { Box, Checkbox } from "@primer/react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
// import ComboboxTaiLieu from "../../../components-data/tai-lieu/combobox-tailieu";
import Button from "../../../components-ui/button";
import DataTable from "../../../components-ui/data-table";
import TextEditor from "../../../components-ui/text-editor";

const FormTaiLieu = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tai_lieus",
  });

  const getIndex = (row: any) => fields.findIndex((f) => f.id === row.id);
  return (
    <Box sx={{ mt: 3, width: "1500px" }}>
      <DataTable
        data={fields}
        columns={[
          {
            caption: "Tài liệu",
            dataField: "noi_dung_tai_lieu",
            cellRender: (row: any) => (
              <Controller
                control={control}
                name={`tai_lieus.${getIndex(row)}.noi_dung_tai_lieu`}
                rules={{ required: "Vui lòng điền nội dung của học liệu" }}
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
            caption: "Tài liệu chính",
            dataField: "is_tai_lieu_chinh",
            width: 150,
            cellRender: (row: any) => (
              <Controller
                control={control}
                name={`tai_lieus.${getIndex(row)}.is_tai_lieu_chinh`}
                render={({ field }) => (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Checkbox
                      checked={!!field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
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
              id_tai_lieu: 0,
              is_tai_lieu_chinh: false,
              temp: " ",
            });
          }}
          variant="primary"
          type="button"
        >
          Thêm tài liệu
        </Button>
      </Box>
    </Box>
  );
};

export default FormTaiLieu;
