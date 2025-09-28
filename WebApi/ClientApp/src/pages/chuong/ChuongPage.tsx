import { AlertIcon, SyncIcon } from "@primer/octicons-react";
import { Box, Flash, Octicon, PageLayout } from "@primer/react";
import { useEffect, useState } from "react";
import Page from "../../components-ui/page";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import ChuongList from "./components/ChuongList";
import { useAppSelector } from "../../hooks/useAppSelector";
import ChuongChiTietPage from "./components/ChuongChiTietPage";

const ChuongPage = () => {
  const { height } = useWindowSize();
  const dispatch = useAppDispatch();

  const { chuongSelected } = useAppSelector((x) => x.deCuong.chuong);
  return (
    <Page title="Chương">
      <Box sx={{ m: -3 }}>
        <PageLayout containerWidth="full">
          <PageLayout.Pane
            resizable
            position="start"
            aria-label="Side pane"
            minWidth={400}
          >
            <ChuongList />
          </PageLayout.Pane>
          <PageLayout.Content>
            {!Object.keys(chuongSelected).length && (
              <Flash variant="default">
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Box sx={{ mr: 2 }}>
                    <Octicon icon={AlertIcon} size={"medium"} />
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box
                      sx={{
                        fontSize: 16,
                        fontWeight: 600,
                      }}
                    >
                      Chọn chương
                    </Box>
                    Chọn một chương từ danh sách để xem thông tin chi tiết
                  </Box>
                </Box>
              </Flash>
            )}
            {Object.keys(chuongSelected).length > 0 && (
              <ChuongChiTietPage chuong={chuongSelected} />
            )}
          </PageLayout.Content>
        </PageLayout>
      </Box>
    </Page>
  );
};

export default ChuongPage;
