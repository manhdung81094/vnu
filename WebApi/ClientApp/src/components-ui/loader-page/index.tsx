import React from "react";
import styles from "./LoaderPage.module.css";
import { Box } from "@primer/react";
import { appConst } from "../../AppConst";
export const LoaderPage = () => {
  return (
    <>
      <div
        style={{
          height: window.innerHeight - 100,
          display: "flex",
          alignItems: "center",
          width: "100%",
          background: "transparent",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box className={styles.logoContainer}>
          {/* <img
            alt="logo"
            className={styles.logo}
            style={{ height: "120px" }}
            src="https://namvietjsc.edu.vn/images/logo-NV.png"
          /> */}
          <img
            alt="logo"
            className={styles.logo}
            style={{ height: "120px" }}
            src={appConst.LOGO}
          />
          {/* <div className={styles.lightOverlay}></div> */}
          <Box
            className={styles.loadingDots}
            sx={{
              m: 3,
            }}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default LoaderPage;
