import { useEffect, useMemo } from "react";
import { rootActions } from "../state/actions/rootActions";
import { eReducerStatusBase } from "../state/reducer-model/eReducerStatusBase";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

export const useKhoa = () => {
  const { status, khoas } = useAppSelector((x) => x.category.khoa);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (
      status === eReducerStatusBase.is_not_initialization ||
      status === eReducerStatusBase.is_need_reload
    ) {
      dispatch(rootActions.category.khoa.LOAD_START(undefined));
    }
  }, [status]);
  const khoaDictionary = useMemo(() => {
    let obj: any = {};
    khoas.forEach((khoa) => {
      obj[khoa.id_khoa.toString()] = khoa;
    });
    return obj;
  }, [khoas]);
  return {
    khoas,
    khoaDictionary,
    isLoading: status === eReducerStatusBase.is_loading,
  };
};
