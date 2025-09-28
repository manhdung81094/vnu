import { Box, Stack, Text, Button, Spinner } from "@primer/react";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { rootActions } from "../../../state/actions/rootActions";
import { eReducerStatusBase } from "../../../state/reducer-model/eReducerStatusBase";
import Modal from "../../../components-ui/modal";
import { deCuongApi } from "../../../api/decuong/deCuongApi";

const DeCuongViewModal = () => {
  const dispatch = useAppDispatch();
  const contentRef = useRef<HTMLDivElement>(null);

  const { isShowExamModal, status, htmlContent, examData } = useAppSelector(
    (x) => x.deCuong.deCuong
  );
  const [isExporting, setIsExporting] = useState(false); // Add loading state

  useEffect(() => {
    if (isShowExamModal && examData) {
      dispatch(rootActions.deCuong.deCuong.VIEW_EXAM_START(examData));
    }
  }, [isShowExamModal, dispatch, examData]);

  const handleExportPdf = async () => {
    setIsExporting(true); // Start spinner
    try {
      const res = await deCuongApi.ExportPdf(examData);
      // Assuming the API returns { data: ArrayBuffer, fileName: string }
      if (res && res.data) {
        handleDownload(res.data);
      }
    } catch (error) {
      // Handle error appropriately
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false); // Stop spinner
    }
  };

  const handleDownload = (res: any) => {
    const { FileContents, FileDownloadName, ContentType } = res;

    // Convert Base64 to binary
    const byteCharacters = atob(FileContents);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: ContentType });
    const url = URL.createObjectURL(blob);

    // Create a link and click to download
    const link = document.createElement("a");
    link.href = url;
    link.download = FileDownloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Modal
      isOpen={isShowExamModal ?? false}
      titleComponent={
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack direction="horizontal" align="center">
            <div id="statusAfterSwitch-toggle-label">Đê cương</div>
          </Stack>
          <Button
            onClick={() => handleExportPdf()}
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <Spinner size="small" sx={{ mr: 2 }} /> Đang xuất file...
              </>
            ) : (
              "In đề cương"
            )}
          </Button>
        </Box>
      }
      sx={{ width: "960px", maxWidth: "90vw" }}
      onClose={() => {
        dispatch(rootActions.deCuong.deCuong.CLOSE_EXAM(undefined));
      }}
    >
      <Box sx={{ p: 3 }}>
        {status === eReducerStatusBase.is_loading ? (
          <Text>Đang tải...</Text>
        ) : (
          <Box>
            <Box sx={{ mt: 3 }}>
              {htmlContent ? (
                <div
                  ref={contentRef}
                  dangerouslySetInnerHTML={{
                    __html: htmlContent,
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    overflow: "auto",
                    backgroundColor: "#fff",
                  }}
                />
              ) : (
                <Box sx={{ textAlign: "center", fontStyle: "italic", mt: 2 }}>
                  <Text>Chưa có nội dung đề cương</Text>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default DeCuongViewModal;
