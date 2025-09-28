import { useEffect, useMemo } from 'react';
import { rootActions } from '../state/actions/rootActions';
import { eReducerStatusBase } from '../state/reducer-model/eReducerStatusBase';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

export const useHe = () => {
    const { status, hes } = useAppSelector(x => x.category.he)
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (status === eReducerStatusBase.is_not_initialization || status === eReducerStatusBase.is_need_reload) {
            dispatch(rootActions.category.he.LOAD_START(undefined))
        }
    }, [status])
    const heDictionary = useMemo(() => {
        let obj: any = {};
        hes.forEach(he => {
            obj[he.id_he.toString()] = he;
        })
        return obj;
    }, [hes])
    return {
        hes,
        isLoading: status === eReducerStatusBase.is_loading,
        heDictionary
    };
}