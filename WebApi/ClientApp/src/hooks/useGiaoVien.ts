import { useEffect, useMemo, useState } from "react";
import { rootActions } from "../state/actions/rootActions";
import { eReducerStatusBase } from "../state/reducer-model/eReducerStatusBase";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { set } from "date-fns";
import { GiaoVien } from "../model/respone/decuong/GiaoVien";

export const useGiaoVien = () => {
  const { status, giaoViens } = useAppSelector((x) => x.category.giaoVien);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (
      status === eReducerStatusBase.is_not_initialization ||
      status === eReducerStatusBase.is_need_reload
    ) {
      dispatch(rootActions.category.giaoVien.LOAD_START(undefined));
    }
  }, [status]);
  const giaoVienDictionary = useMemo(() => {
    let obj: any = {};
    giaoViens.forEach((giaoVien) => {
      obj[giaoVien.id_cb.toString()] = giaoVien;
    });
    return obj;
  }, [giaoViens]);
  return {
    giaoViens,
    giaoVienDictionary,
    isLoading: status === eReducerStatusBase.is_loading,
  };
};
