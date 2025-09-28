import { ChevronDownIcon } from "@primer/octicons-react";
import { Box, Button } from "@primer/react";
import clsx from "clsx";
import { forwardRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { appConst } from "../AppConst";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useLayoutState } from "../hooks/useLayoutState";
import { rootActions } from "../state/actions/rootActions";
import { RootState } from "../state/reducers/rootReducer";
import styles from "./Header2.module.css";

const Header2 = forwardRef<HTMLDivElement>((props, ref) => {
  const { hoc_ky, nam_hoc, ky_dang_ky } = useLayoutState();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useSelector((x: RootState) => x.auth);
  const handleLogout = () => {
    dispatch(
      rootActions.auth.LOGOUT_START({
        access_token: "",
        refresh_token: "",
      })
    );
    navigate("../../signout-oidc");
  };
  const character_name = useMemo(() => {
    const texts = (user?.full_name ?? "").split(" ") ?? [];
    return texts[texts.length - 1].split("")[0];
  }, [user?.full_name]);

  return (
    <section ref={ref} id={clsx(styles.header)}>
      <div className={clsx(styles.left)}>
        <p>Phần mềm quản lý</p>
        <p>
          Đại học số{" "}
          <span className={clsx(styles.nameGroupProduct)}>ESSOFT</span>
        </p>
      </div>
      <div className={clsx(styles.mid)}>
        <Link to="/" className={clsx(styles.logo)}>
          <img src={appConst.LOGO} alt={`Logo ${appConst.NAME_UNIT}`} />
        </Link>

        <div className={clsx(styles.nameProduct)}>
          <p>{appConst.NAME_UNIT}</p>
          <p>Hệ thống quản lý đề cương môn học</p>
        </div>
      </div>
      <div className={clsx(styles.right)}>
        <div className={clsx(styles.userInfo)}>
          <div className={clsx(styles.top)}>
            <div className={clsx(styles.imageUser)}>
              <img
                alt="avatar"
                src={`../../../../images/${character_name}.png`}
                width={30}
                height={30}
                style={{
                  borderRadius: "50%",
                  border: "2px solid #fff",
                }}
              />
            </div>
            <p className={clsx(styles.userName)}>{user?.full_name}</p>
          </div>
          <div className={clsx(styles.mnSub)}>
            <ul>
              <li>
                <Link
                  to="/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.3999 14.25C1.9874 14.25 1.63428 14.1031 1.34053 13.8094C1.04678 13.5156 0.899902 13.1625 0.899902 12.75V2.25C0.899902 1.8375 1.04678 1.48438 1.34053 1.19063C1.63428 0.896875 1.9874 0.75 2.3999 0.75H6.8999C7.1124 0.75 7.29053 0.821875 7.43428 0.965625C7.57803 1.10938 7.6499 1.2875 7.6499 1.5C7.6499 1.7125 7.57803 1.89062 7.43428 2.03438C7.29053 2.17813 7.1124 2.25 6.8999 2.25H2.3999V12.75H6.8999C7.1124 12.75 7.29053 12.8219 7.43428 12.9656C7.57803 13.1094 7.6499 13.2875 7.6499 13.5C7.6499 13.7125 7.57803 13.8906 7.43428 14.0344C7.29053 14.1781 7.1124 14.25 6.8999 14.25H2.3999ZM11.5312 8.25H6.1499C5.9374 8.25 5.75928 8.17813 5.61553 8.03438C5.47178 7.89063 5.3999 7.7125 5.3999 7.5C5.3999 7.2875 5.47178 7.10938 5.61553 6.96563C5.75928 6.82188 5.9374 6.75 6.1499 6.75H11.5312L10.1249 5.34375C9.9874 5.20625 9.91865 5.0375 9.91865 4.8375C9.91865 4.6375 9.9874 4.4625 10.1249 4.3125C10.2624 4.1625 10.4374 4.08438 10.6499 4.07813C10.8624 4.07188 11.0437 4.14375 11.1937 4.29375L13.8749 6.975C14.0249 7.125 14.0999 7.3 14.0999 7.5C14.0999 7.7 14.0249 7.875 13.8749 8.025L11.1937 10.7063C11.0437 10.8563 10.8655 10.9281 10.6593 10.9219C10.453 10.9156 10.2749 10.8375 10.1249 10.6875C9.9874 10.5375 9.92178 10.3594 9.92803 10.1531C9.93428 9.94688 10.0062 9.775 10.1437 9.6375L11.5312 8.25Z"
                      fill="#333333"
                    />
                  </svg>
                  <span>Đăng xuất</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Header2;
