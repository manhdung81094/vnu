import {
    ActionList,
    ActionMenu,
    Box,
    Octicon,
    useConfirm,
} from "@primer/react";

import {
    KebabHorizontalIcon,
    PencilIcon,
    PlusIcon,
    SearchIcon,
    SyncIcon,
    TrashIcon,
} from "@primer/octicons-react";

import { useEffect, useMemo, useState } from "react";
import TextInput from "../../../components-ui/text-input";
import Text from "../../../components-ui/text";
import Button from "../../../components-ui/button";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { eReducerStatusBase } from "../../../state/reducer-model/eReducerStatusBase";
import { rootActions } from "../../../state/actions/rootActions";
import { useDebounce } from "use-debounce";
import ChuongEditModal from "./ChuongEditModal";

const ChuongList = () => {
    const dispatch = useAppDispatch();
    const { chuongList, status, isShowEditModal } =
        useAppSelector((x) => x.deCuong.chuong);
    const { height } = useWindowSize();
    const confirm = useConfirm();
    const [searchKey, setSearchKey] = useState("");
    const searchKeyDelayed = useDebounce(searchKey, 300)[0];
    const idDeCuong = 0;

    useEffect(() => {
        if (
            status === eReducerStatusBase.is_not_initialization ||
            status === eReducerStatusBase.is_need_reload
        ) {
            dispatch(rootActions.deCuong.chuong.LOAD_START(idDeCuong));
        }
    }, [status]);

    const chuongFilter = useMemo(() => {
        return chuongList.filter(
            (x) =>
                x.noi_dung.toLowerCase().includes(searchKeyDelayed)
        );
    }, [chuongList, searchKeyDelayed]);

    const handleDeleteAsync = async (id: number) => {
        if (
            await confirm({
                title: "Lưu ý",
                content: "Bạn có chắc chắn muốn xóa dữ liệu này?",
                cancelButtonContent: "Không xóa",
                confirmButtonContent: "Xóa",
                confirmButtonType: "danger",
            })
        ) {
            dispatch(rootActions.deCuong.chuong.DELETE_START(id));
        }
    };

    return (
        <>
            <Box sx={{ display: "flex" }}>
                <Box sx={{ flex: 1, pr: 2 }}>
                    <TextInput
                        placeholder="Tìm kiếm"
                        block
                        trailingVisual={SearchIcon}
                        onChange={(e) => {
                            setSearchKey(e.target.value);
                        }}
                    />
                </Box>
                <Box sx={{ display: "flex" }}>
                    <Button
                        text="Làm mới"
                        sx={{ mr: 1 }}
                        size="medium"
                        // variant='primary'
                        leadingVisual={SyncIcon}
                        onClick={() => {
                            dispatch(rootActions.deCuong.chuong.LOAD_START(idDeCuong));
                        }}
                    />
                    <Button
                        text="Thêm mới"
                        size="medium"
                        variant="primary"
                        leadingVisual={PlusIcon}
                        onClick={() => {
                            dispatch(
                                rootActions.deCuong.chuong.SHOW_EDIT_MODAL(undefined)
                            );
                        }}
                    />
                </Box>
            </Box>
            <Box
                sx={{
                    height: height - 70,
                    overflowY: "auto",
                    pt: 2,
                }}
            >
                <ActionList selectionVariant="single" showDividers variant="full">
                    <ActionList.Group >
                        {chuongFilter.map((c) => {
                            return (
                                <ActionList.Item
                                    key={c.id}
                                    onSelect={() => {
                                        dispatch(
                                            rootActions.deCuong.chuong.LOAD_BY_ID_START(c.id)
                                        );
                                    }}
                                >
                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                        <Box>
                                            <b>Chương {c.stt}</b> - {c.noi_dung}
                                        </Box>
                                        <Box sx={{ color: "fg.muted" }}>
                                            <Text
                                                text={
                                                    ""
                                                }
                                            />
                                        </Box>
                                    </Box>
                                    <ActionList.TrailingVisual>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <ActionMenu>
                                                <ActionMenu.Button
                                                    icon={KebabHorizontalIcon}
                                                    size="small"
                                                    variant="invisible"
                                                >
                                                    &nbsp;
                                                </ActionMenu.Button>
                                                <ActionMenu.Overlay width="auto">
                                                    <ActionList showDividers>
                                                        <ActionList.Item
                                                            onClick={() => {
                                                                dispatch(
                                                                    rootActions.deCuong.chuong.SHOW_EDIT_MODAL(
                                                                        c
                                                                    )
                                                                );
                                                            }}
                                                        >
                                                            <ActionList.LeadingVisual>
                                                                <Octicon icon={PencilIcon} />
                                                            </ActionList.LeadingVisual>
                                                            Sửa
                                                        </ActionList.Item>
                                                        <ActionList.Item
                                                            variant="danger"
                                                            onClick={() => {
                                                                handleDeleteAsync(c.id);
                                                            }}
                                                        >
                                                            Xóa
                                                            <ActionList.LeadingVisual>
                                                                <Octicon icon={TrashIcon} />
                                                            </ActionList.LeadingVisual>
                                                        </ActionList.Item>
                                                    </ActionList>
                                                </ActionMenu.Overlay>
                                            </ActionMenu>
                                        </Box>
                                    </ActionList.TrailingVisual>
                                </ActionList.Item>
                            );
                        })}
                    </ActionList.Group>
                </ActionList>
            </Box>

            {isShowEditModal && <ChuongEditModal />}
        </>
    )
};

export default ChuongList;