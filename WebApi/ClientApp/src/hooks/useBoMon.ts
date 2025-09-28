import { useEffect, useMemo } from "react";
import { rootActions } from "../state/actions/rootActions";
import { eReducerStatusBase } from "../state/reducer-model/eReducerStatusBase";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

export const useBoMon = () => {
  const { status, boMons } = useAppSelector((x) => x.category.boMon);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (
      status === eReducerStatusBase.is_not_initialization ||
      status === eReducerStatusBase.is_need_reload
    ) {
      dispatch(rootActions.category.boMon.LOAD_START(undefined));
    }
  }, [status]);
  const boMonDictionary = useMemo(() => {
    let obj: any = {};
    boMons.forEach((boMon) => {
      if (boMon && boMon.id_bm !== undefined && boMon.id_bm !== null) {
        obj[boMon.id_bm.toString()] = boMon;
      }
    });
    return obj;
  }, [boMons]);
  return {
    boMons,
    boMonDictionary,
    isLoading: status === eReducerStatusBase.is_loading,
  };
};
