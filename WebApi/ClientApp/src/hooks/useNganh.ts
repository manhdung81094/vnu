import { useEffect, useMemo } from "react";
import { rootActions } from "../state/actions/rootActions";
import { eReducerStatusBase } from "../state/reducer-model/eReducerStatusBase";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

export const useNganh = () => {
  const { status, nganhs } = useAppSelector((x) => x.category.nganh);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (
      status === eReducerStatusBase.is_not_initialization ||
      status === eReducerStatusBase.is_need_reload
    ) {
      dispatch(rootActions.category.nganh.LOAD_START(undefined));
    }
  }, [status]);
  const nganhDictionary = useMemo(() => {
    let obj: any = {};
    nganhs.forEach((nganh) => {
      obj[nganh.id_nganh.toString()] = nganh;
    });
    return obj;
  }, [nganhs]);
  return {
    nganhs,
    isLoading: status === eReducerStatusBase.is_loading,
    nganhDictionary,
  };
};
