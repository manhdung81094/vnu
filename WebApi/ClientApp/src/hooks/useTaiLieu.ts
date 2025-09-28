import { useEffect, useMemo } from "react";
import { rootActions } from "../state/actions/rootActions";
import { eReducerStatusBase } from "../state/reducer-model/eReducerStatusBase";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

export const useTaiLieu = () => {
  const { status, taiLieus } = useAppSelector((x) => x.category.taiLieu);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (
      status === eReducerStatusBase.is_not_initialization ||
      status === eReducerStatusBase.is_need_reload
    ) {
      dispatch(rootActions.category.taiLieu.LOAD_START(undefined));
    }
  }, [status]);
  const taiLieuDictionary = useMemo(() => {
    let obj: any = {};
    taiLieus.forEach((taiLieu) => {
      obj[taiLieu.id.toString()] = taiLieu;
    });
    return obj;
  }, [taiLieus]);
  return {
    taiLieus,
    isLoading: status === eReducerStatusBase.is_loading,
    taiLieuDictionary,
  };
};
