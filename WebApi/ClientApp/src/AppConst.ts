interface IAppConst {
  headerHeight: number;
  baseApiURL: string;
  OIDC_AUTHORITY: string;
  OIDC_LOGOUT: string;
  OIDC_CLIENT_ID: string;
  OIDC_REDIRECT_URI: string;
  OIDC_CLIENT_SECRET: string;
  LOGO: string;
  NAME_UNIT: string;

  FILEPATH_BASE: string;

  THEME: string;
  THEME_COLOR_PRIMARY: string;
  THEME_COLOR_PRIMARY_HOVER: string;
  THEME_COLOR_PRODUCT: string;
  THEME_COLOR_TEXT_PARENT: string;
  THEME_COLOR_HOVER: string;
}
export const appConst: IAppConst = {
  headerHeight: 56,
  FILEPATH_BASE: process.env.REACT_APP_FILEPATH_BASE?.toString() ?? "",
  baseApiURL: process.env.REACT_APP_API_BASE_URL?.toString() ?? "",
  OIDC_AUTHORITY: process.env.REACT_APP_OIDC_AUTHORITY?.toString() ?? "",
  OIDC_CLIENT_ID: process.env.REACT_APP_OIDC_CLIENT_ID?.toString() ?? "",
  OIDC_CLIENT_SECRET:
    process.env.REACT_APP_OIDC_CLIENT_SECRET?.toString() ?? "",
  OIDC_REDIRECT_URI: process.env.REACT_APP_OIDC_REDIRECT_URI?.toString() ?? "",
  OIDC_LOGOUT: process.env.REACT_APP_OIDC_LOGOUT?.toString() ?? "",
  LOGO: process.env.REACT_APP_LOGO?.toString() ?? "",
  NAME_UNIT:
    process.env.REACT_APP_NAME_UNIT?.toString() ?? "Học Viện Tài Chính",

  //style
  THEME: process.env.REACT_APP_THEME?.toString() ?? "",
  THEME_COLOR_PRIMARY:
    process.env.REACT_APP_THEME_COLOR_PRIMARY?.toString() ?? "",
  THEME_COLOR_PRIMARY_HOVER:
    process.env.REACT_APP_THEME_COLOR_PRIMARY_HOVER?.toString() ?? "",
  THEME_COLOR_PRODUCT:
    process.env.REACT_APP_THEME_COLOR_PRODUCT?.toString() ?? "",
  THEME_COLOR_TEXT_PARENT:
    process.env.REACT_APP_THEME_COLOR_TEXT_PARENT?.toString() ?? "",
  THEME_COLOR_HOVER: process.env.REACT_APP_THEME_COLOR_HOVER?.toString() ?? "",
};
