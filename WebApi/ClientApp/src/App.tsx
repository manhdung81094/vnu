import { ThemeProvider, theme } from "@primer/react";

import deepmerge from "deepmerge";
import { useEffect } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { BrowserRouter as Router } from "react-router-dom";
import BaseStyles from "./BaseStyles";
import { LazyPage } from "./components-ui/loadable";
import { CommonProvider } from "./contexts/common";
import { useAppSelector } from "./hooks/useAppSelector";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { rootActions } from "./state/actions/rootActions";
import { HubProvider } from "./contexts/HubProvider";
import "./App.scss";
import { appConst } from "./AppConst";

const AuthorizedContent = LazyPage(import("./content/AuthorizedContent"));
const UnAuthorizedContent = LazyPage(import("./content/UnAuthorizedContent"));

const customTheme = deepmerge(
  {
    ...theme,
    fontSizes: [
      "11px",
      "13px",
      "16px",
      "20px",
      "24px",
      "32px",
      "40px",
      "48px",
      "56px",
    ],
  },
  {
    colorSchemes: {
      light: {
        colors: {
          accent: {
            fg: "var(--primary)",
            emphasis: "var(--primary)",
          },
          // --bgColor-accent-emphasis
          btn: {
            primary: {
              bg: "var(--primary)",
              focusBg: "var(--primary)",
              hoverBg: "var(--primary)",
              selectedBg: "var(--primary)",
              disabledBg: "rgba(222, 63, 15,0.6)",
            },
          },
        },
      },
    },
  }
);

function App() {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((x) => x.auth);
  const { themeMode } = useAppSelector((x) => x.common.layout);

  useEffect(() => {
    dispatch(rootActions.auth.GET_USER_INFO_START(undefined));
    dispatch(rootActions.deCuong.deCuong.LOAD_LY_LICH_START(undefined));
    dispatch(rootActions.deCuong.deCuong.LOAD_START(undefined));
    dispatch(rootActions.deCuong.deCuong.LOAD_CTDT_START(undefined));
  }, []);

  useEffect(() => {
    if (!user?.role) {
      dispatch(rootActions.auth.GET_USER_INFO_START(undefined));
    }
  }, [user?.role, dispatch]);

  return (
    <Router>
      <style>{`
      :root {
        --bg_header: url(/imageStyle/${appConst.THEME}/banner.png);
        --bg_header_left: url(/imageStyle/${appConst.THEME}/bannerLeft.png); 
        --primary: ${appConst.THEME_COLOR_PRIMARY};
        --text_parent: ${appConst.THEME_COLOR_TEXT_PARENT};
        --bg_hover: ${appConst.THEME_COLOR_HOVER};
        --primary_hover: ${appConst.THEME_COLOR_PRIMARY_HOVER};
        --background_scrollbar_track: #f2f2f2;
        --background_scrollbar_thumb: #999;
        --color_product: ${appConst.THEME_COLOR_PRODUCT};
      }
    `}</style>
      <CommonProvider>
        <ThemeProvider theme={customTheme} colorMode={themeMode}>
          <BaseStyles>
            {user && user.role ? (
              <HubProvider>
                <AuthorizedContent />
              </HubProvider>
            ) : (
              <UnAuthorizedContent />
            )}
          </BaseStyles>
        </ThemeProvider>
      </CommonProvider>
    </Router>
  );
}
export default App;
