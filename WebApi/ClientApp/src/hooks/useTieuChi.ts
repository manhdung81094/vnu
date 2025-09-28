import { useEffect, useMemo } from "react";
import { rootActions } from "../state/actions/rootActions";
import { eReducerStatusBase } from "../state/reducer-model/eReducerStatusBase";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

export const useTieuChi = () => {
  const { status, tieuChis } = useAppSelector((x) => x.category.tieuChi);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (
      status === eReducerStatusBase.is_not_initialization ||
      status === eReducerStatusBase.is_need_reload
    ) {
      dispatch(rootActions.category.tieuChi.LOAD_START(undefined));
    }
  }, [status]);
  const tieuChiDictionary = useMemo(() => {
    let obj: any = {};
    tieuChis.forEach((tieuChi) => {
      obj[tieuChi.id.toString()] = tieuChi;
    });
    return obj;
  }, [tieuChis]);
  return {
    tieuChis,
    isLoading: status === eReducerStatusBase.is_loading,
    tieuChiDictionary,
  };
};
