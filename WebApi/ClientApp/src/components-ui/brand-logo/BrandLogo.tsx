import { Box, Button } from "@primer/react";
import { env } from "process";
import React from "react";
import { appConst } from "../../AppConst";
interface IBrandLogoProps {
  height?: number;
}

const BrandLogo = (props: IBrandLogoProps) => {
  return (
    <Box>
      <Button
        variant="invisible"
        sx={{
          height: "auto",
        }}
      >
        {/* <img
          src="../../images/logo.png"
          alt="Logo"
          style={{
            height: `${props.height ?? 48}px`,
          }}
        /> */}
        <img
          src={appConst.LOGO}
          alt="Logo"
          style={{
            height: `${props.height ?? 48}px`,
          }}
        />
      </Button>
    </Box>
  );
};

export default BrandLogo;
