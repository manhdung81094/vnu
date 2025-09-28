import { Box, BoxProps } from "@primer/react";
import React from "react";
import { Helmet } from "react-helmet";
import { useWindowSize } from "../../hooks/useWindowSize";
interface IPageProps extends BoxProps {
  title?: string;
}
const Page = (props: IPageProps) => {
  const { height } = useWindowSize();
  return (
    <>
      <Helmet>
        <title>{props.title}</title>
      </Helmet>
      <Box
        sx={{
          p: 3,
          backgroundColor: "#fff",
          minHeight: height - 54,
          height: height,
          overflow: "auto",
          borderRadius: 2,
          ...props.sx,
        }}
      >
        {props.children}
      </Box>
    </>
  );
};

export default Page;
