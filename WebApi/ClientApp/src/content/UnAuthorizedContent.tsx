import { ArrowRightIcon } from "@primer/octicons-react";
import { Box } from "@primer/react";
import { AuthProvider, AuthProviderProps, useAuth } from "oidc-react";
import { useEffect, useMemo } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { appConst } from "../AppConst";
import BrandLogo from "../components-ui/brand-logo";
import Button from "../components-ui/button";
import LoaderPage from "../components-ui/loader-page";
import Text from "../components-ui/text";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { rootActions } from "../state/actions/rootActions";

const LoginOidcPage = () => {
  const auth = useAuth();

  const { userData, userManager } = auth;
  const dispatch = useAppDispatch();
  // console.log({
  //     userData,
  //     userManager
  // });

  const id_token = userData ? userData.id_token : "";
  const email = userData && userData.profile ? userData.profile.email : "";
  const access_token = userData ? userData.access_token : "";
  const refresh_token = userData ? userData.refresh_token ?? "" : "";

  useEffect(() => {
    if (access_token && id_token) {
      //   console.log({
      //     access_token,
      //     id_token,
      //     email,
      //     refresh_token,
      //   });
      dispatch(
        rootActions.auth.LOGIN_START({
          access_token,
          id_token,
          refresh_token,
        })
      );
    }
  }, [access_token, id_token]);

  return <LoaderPage />;
};

const LogoutPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { userData, userManager } = auth;
  useEffect(() => {
    doSignOutAsync();
  }, []);

  const doSignOutAsync = async () => {
    await userManager.signoutRedirect({
      id_token_hint: userData?.id_token ?? "",
      post_logout_redirect_uri: appConst?.OIDC_LOGOUT,
    });

    navigate("../../login");
  };

  return <LoaderPage />;
};
const LoginForm = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(2rem)",
        width: 400,
        p: 4,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Text
            text="Đăng nhập"
            sx={{
              fontSize: 20,
              fontWeight: "bolder",
            }}
          />
          <Text
            text="Xác thực bằng cổng đăng nhập tập trung"
            sx={{
              color: "fg.muted",
              mb: 2,
            }}
          />
        </Box>

        <BrandLogo height={64} />
      </Box>
      <Box>
        <Button
          text="Tiếp tục"
          variant="primary"
          onClick={() => {
            navigate(`../../signin-oidc`);
          }}
          trailingVisual={ArrowRightIcon}
          block
          size="medium"
          sx={{
            mb: 2,
          }}
        />
      </Box>
    </Box>
  );
};
const OidcContent = () => {
  const oidcConfig: AuthProviderProps = useMemo(() => {
    return {
      authority: appConst?.OIDC_AUTHORITY,
      clientId: appConst?.OIDC_CLIENT_ID,
      post_logout_redirect_uri: appConst.OIDC_REDIRECT_URI,
      redirectUri: appConst?.OIDC_REDIRECT_URI,
      postLogoutRedirectUri: appConst?.OIDC_REDIRECT_URI,
      clientSecret: appConst?.OIDC_CLIENT_SECRET,
      responseType: "code",
      automaticSilentRenew: true,
      scope: "openid profile email",
    };
  }, [appConst]);
  return (
    <AuthProvider {...oidcConfig}>
      <Routes>
        <Route path={`/signin-oidc`} Component={LoginOidcPage} />
        <Route path={`/signout-oidc`} Component={LogoutPage} />
        <Route path="*" element={<Navigate to={"/login"} replace />} />
      </Routes>
    </AuthProvider>
  );
};
const UnAuthorizedContent = () => {
  return (
    <Box
      sx={{
        backgroundImage: "url(../../../images/background.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: window.innerHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Routes>
        <Route path={`/login`} Component={LoginForm} />
        <Route path="*" Component={OidcContent} />
      </Routes>
    </Box>
  );
};

export default UnAuthorizedContent;
