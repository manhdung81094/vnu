import { useEffect, useMemo } from "react";
import { rootActions } from "../state/actions/rootActions";
import { eReducerStatusBase } from "../state/reducer-model/eReducerStatusBase";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

export const useMucDo = () => {
  const { status, mucDos } = useAppSelector((x) => x.category.mucDo);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (
      status === eReducerStatusBase.is_not_initialization ||
      status === eReducerStatusBase.is_need_reload
    ) {
      dispatch(rootActions.category.mucDo.LOAD_START(undefined));
    }
  }, [status]);
  const mucDoDictionary = useMemo(() => {
    let obj: any = {};
    mucDos.forEach((mucDo) => {
      obj[mucDo.id.toString()] = mucDo;
    });
    return obj;
  }, [mucDos]);
  return {
    mucDos,
    isLoading: status === eReducerStatusBase.is_loading,
    mucDoDictionary,
  };
};
