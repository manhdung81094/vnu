import { Box } from "@primer/react";
import { BetterSystemStyleObject } from "@primer/react/lib/sx";
import { useDropzone } from "react-dropzone";
import Text from "../../components-ui/text";
import { NotifyHelper } from "../../helpers/toast";
import { eReducerStatusBase } from "../../state/reducer-model/eReducerStatusBase";
import styles from "./Upload.module.css";
interface IUploadProps {
  sx?: BetterSystemStyleObject;
  onUploadSuccess: (data: File) => void;
  accept?: any;
  status: eReducerStatusBase;
  icon?: React.ReactNode;
  // isUploadCert?: boolean
}
const Upload = (props: IUploadProps) => {
  const accept: any = props.accept
    ? props.accept
    : {
        "image/*": [],
        "application/pdf": [],
        "application/msword": [".doc", ".docx"],
        "application/vnd.ms-excel": [".xls", ".xlsx"],
        "application/msg": [".msg"],
      };
  const onDrop = async (acceptedFiles: any) => {
    if (acceptedFiles.length > 0) {
      try {
        props.onUploadSuccess(acceptedFiles[0]);
      } catch (error) {
        NotifyHelper.Error("Upload thất bại");
      }
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept,
  });
  return (
    <Box sx={props.sx}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <Box
          sx={{
            p: 3,
            textAlign: "center",
            borderStyle: "dashed",
            borderWidth: "1px",
            borderColor: "border.default",
            borderRadius: 2,
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            color: "fg.muted",
          }}
          className={isDragActive ? styles.isDragActive : ""}
        >
          {props.icon ? <Box>{props.icon}</Box> : null}
          {props.status === eReducerStatusBase.is_saving && (
            <Text text="Đang thực thi..." />
          )}
          {props.status !== eReducerStatusBase.is_saving && (
            <Text text="Kéo thả hoặc nhấn vào đây để upload" />
          )}
        </Box>
      </div>
    </Box>
  );
};

export default Upload;
