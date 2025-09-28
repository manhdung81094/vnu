
import {
    PlusIcon,
} from "@primer/octicons-react";
import { Box } from "@primer/react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { useDebounce } from "use-debounce";
import DataTable from "../../../components-ui/data-table";
import { eReducerStatusBase } from "../../../state/reducer-model/eReducerStatusBase";
import { useAppSelector } from "../../../hooks/useAppSelector";
import Button from "../../../components-ui/button";

const ChuongChiTietPage = (props: any) => {
    const { chuong } = props;
    const { status } =
        useAppSelector((x) => x.deCuong.chuong);
    const dispatch = useAppDispatch();
    const { height } = useWindowSize();

    return (
        <>
            <DataTable
                title={`Chương ${chuong.stt} - ${chuong.noi_dung}`}
                height={`${height - 70}px`}
                emptyComponent={
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            color: "fg.muted",
                        }}
                    >
                        Chưa có nội dung của chương này!
                    </Box>
                }
                paging={{
                    enable: false,
                    pageSize: 20,
                    pageSizeItems: [10, 20, 30],
                }}
                columns={[
                    {
                        caption: "Nội dung",
                        dataField: "noi_dung",
                        width: "200px",
                        align: "center",
                    },
                    {
                        caption: "Phân bổ thời gian của học phần",
                        dataField: "",
                        width: "400px",
                        columns: [
                            {
                                caption: "LT,BT",
                                dataField: "",
                                cellRender: (data: any) => {
                                    return (
                                        <Box sx={{ textAlign: "center" }}>
                                            {0}
                                        </Box>
                                    );
                                }
                            },
                            {
                                caption: "TH",
                                dataField: "",
                                cellRender: (data: any) => {
                                    return (
                                        <Box sx={{ textAlign: "center" }}>
                                            {0}
                                        </Box>
                                    );
                                }
                            },
                            {
                                caption: "ĐAMH/BTL",
                                dataField: "",
                                cellRender: (data: any) => {
                                    return (
                                        <Box sx={{ textAlign: "center" }}>
                                            {0}
                                        </Box>
                                    );
                                }
                            },
                            {
                                caption: "KLTN/ĐATN/TT",
                                dataField: "",
                                cellRender: (data: any) => {
                                    return (
                                        <Box sx={{ textAlign: "center" }}>
                                            {0}
                                        </Box>
                                    );
                                }
                            },
                            {
                                caption: "Tổng số",
                                dataField: "",
                                cellRender: (data: any) => {
                                    return (
                                        <Box sx={{ textAlign: "center" }}>
                                            {0}
                                        </Box>
                                    );
                                }
                            },
                        ]
                    },
                    {
                        caption: "Hoạt động dạy (GV)",
                        dataField: "hoat_dong_gv",
                        align: "center",
                    },
                    {
                        caption: "Hoạt động học (SV)",
                        dataField: "hoat_dong_sv",
                        align: "center",
                    },
                    {
                        caption: "Thời gian tự học của SV(giờ)",
                        dataField: "tu_hoc",
                        align: "center",
                    },
                    {
                        caption: "CĐR học phần",
                        dataField: "id_clos",
                        align: "center",
                    },
                ]}
                data={Array(chuong)}
                isLoading={
                    useDebounce(status === eReducerStatusBase.is_loading, 300)[0]
                }
                actionComponent={
                    <>
                        <Button
                            text="Thêm mới bài"
                            size="small"
                            variant="primary"
                            leadingVisual={PlusIcon}
                            onClick={() => {

                            }}
                        />
                    </>
                }
            />
        </>
    );
}

export default ChuongChiTietPage;