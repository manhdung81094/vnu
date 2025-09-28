import { useEffect, useMemo } from "react";
import { rootActions } from "../state/actions/rootActions";
import { eReducerStatusBase } from "../state/reducer-model/eReducerStatusBase";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

export const useChuanDauRa = (props: any) => {
  const { is_dao_tao } = props;
  const { status, chuanDauRas } = useAppSelector((x) => x.category.chuanDauRa);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (
      status === eReducerStatusBase.is_not_initialization ||
      status === eReducerStatusBase.is_need_reload
    ) {
      dispatch(rootActions.category.chuanDauRa.LOAD_START(undefined));
    }
  }, [status]);

  const source = chuanDauRas.filter((x) => x.is_dao_tao === is_dao_tao);
  const chuanDauRaDictionary = useMemo(() => {
    let obj: any = {};
    source.forEach((cdr) => {
      obj[cdr.id.toString()] = source;
    });
    return obj;
  }, [source]);
  return {
    source,
    chuanDauRaDictionary,
    isLoading: status === eReducerStatusBase.is_loading,
  };
};
