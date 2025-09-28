import { Box, Breadcrumbs } from "@primer/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useLayoutState } from "../hooks/useLayoutState";
// import SinhVienSearch from "../components-data/sinh-vien-search/SinhVienSearch";

const Header = () => {
  const { hoc_ky, nam_hoc } = useLayoutState();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const is_nhap_hoc = ["/tong-hop-nhap-hoc", "/thu-phi-nhap-hoc"].includes(
    location.pathname
  );
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        // backgroundColor: "rgba(255,255,255,0.7)",
        p: 3,
        height: "54px",
        // borderBottom:"1px solid",
        // borderBottomColor:"border.default"
      }}
    >
      <Box sx={{ pl: 1, flex: 1 }}>
        <Breadcrumbs>
          <Breadcrumbs.Item href="#">Trang chủ</Breadcrumbs.Item>
          <Breadcrumbs.Item href="#">Danh mục</Breadcrumbs.Item>
          <Breadcrumbs.Item href="#" selected>
            Khoản nộp
          </Breadcrumbs.Item>
        </Breadcrumbs>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}></Box>
    </Box>
  );
};

export default Header;
