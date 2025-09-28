import { useAppSelector } from "./useAppSelector";

export const useLayoutState = () => {
  const { hoc_ky, nam_hoc, ky_dang_ky } = useAppSelector(
    (x) => x.common.layout
  );
  return {
    hoc_ky,
    nam_hoc,
    ky_dang_ky,
  };
};
