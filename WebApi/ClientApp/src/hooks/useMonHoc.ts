import { useEffect, useMemo } from "react";
import { rootActions } from "../state/actions/rootActions";
import { eReducerStatusBase } from "../state/reducer-model/eReducerStatusBase";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

export const useMonHoc = () => {
  const { status, monhocs } = useAppSelector((x) => x.category.monHoc);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (
      status === eReducerStatusBase.is_not_initialization ||
      status === eReducerStatusBase.is_need_reload
    ) {
      dispatch(rootActions.category.monHoc.LOAD_START(undefined));
    }
  }, [status]);
  const monHocDictionary = useMemo(() => {
    let obj: any = {};
    monhocs.forEach((monHoc) => {
      obj[monHoc.id_mon.toString()] = monHoc;
    });
    return obj;
  }, [monhocs]);
  return {
    monhocs,
    monHocDictionary,
    isLoading: status === eReducerStatusBase.is_loading,
  };
};
