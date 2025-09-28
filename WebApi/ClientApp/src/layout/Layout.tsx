import { Box, PageLayout } from "@primer/react";
import React, { useEffect, useRef } from "react";
import UserPanel from "../components-ui/user-panel";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { useWindowSize } from "../hooks/useWindowSize";
import { eNavSubMode } from "../model/common/eNavSubMode";
import { rootActions } from "../state/actions/rootActions";
import AppList from "./AppList";
import Header2 from "./Header2";
import Humberger from "./Humberger";
import Menu from "./Menu";
import { appConst } from "../AppConst";

interface ILayoutProps {
  children?: React.ReactNode;
}
const Layout = (props: ILayoutProps) => {
  const { navSubMode } = useAppSelector((x) => x.common.layout);
  const { height, width } = useWindowSize();
  const headerRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (width < 1600) {
      dispatch(rootActions.common.layout.CHANGE_NAV_MODE(eNavSubMode.POPUP));
    } else {
      dispatch(rootActions.common.layout.CHANGE_NAV_MODE(eNavSubMode.FULL));
    }
  }, [width]);

  return (
    <>
      <Header2 ref={headerRef} />
      <Box
        sx={{
          backgroundImage: "url(../../../images/background.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: height,
        }}
      >
        <Box
          sx={{
            display: "flex",
          }}
        >
          {navSubMode === eNavSubMode.FULL ? (
            <Box
              sx={{
                width: "232px",
                backgroundColor: "var(--primary)",
                position: "relative",
                color: "var(--text_parent)",
              }}
            >
              <Menu />
            </Box>
          ) : (
            <Box
              sx={{
                width: "80px",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "var(--primary)",
                position: "relative",
                height: height,
              }}
            >
              <Box id="">
                <Humberger />
              </Box>
              <Box sx={{ flex: 1 }}>
                <AppList />
              </Box>
              <Box
                sx={{
                  bottom: 0,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <UserPanel />
              </Box>
            </Box>
          )}

          <Box
            sx={{
              overflow: "auto",
              flex: 1,
              backgroundColor: "rgba(255,255,255,0.7)",
            }}
          >
            <PageLayout padding="none" containerWidth="full">
              <PageLayout.Content>
                <Box sx={{ width: "100%" }}>{props.children}</Box>
              </PageLayout.Content>
            </PageLayout>
          </Box>
          {/* <Box>
            <Footer />
          </Box> */}
        </Box>
      </Box>
    </>
  );
};

export default Layout;
