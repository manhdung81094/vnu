import { Box, TreeView } from "@primer/react";
import { SearchIcon, VersionsIcon, BookIcon } from "@primer/octicons-react";
import TextInput from "../../components-ui/text-input";
import { useDebounce } from "use-debounce";
import { useMemo, useState } from "react";
import styles from "./TreeviewBoMonMonHoc.module.css";
import { useBoMon } from "../../hooks/useBoMon";
import { useMonHoc } from "../../hooks/useMonHoc";
import { IBoMon } from "../../model/respone/category/IBoMon";
import { IMonHoc } from "../../model/respone/category/IMonHoc";

export interface ITreeviewBoMonMonHocProps {
  onMonHocSelect?: (monHoc: IMonHoc) => void;
  height?: number;
  focusIdMon: number;
  focusIdBoMon: number;
}

const TreeviewBoMonMonHoc = (props: ITreeviewBoMonMonHocProps) => {
  const { boMons } = useBoMon();
  const { monhocs } = useMonHoc();
  const [searchKey, setSearchKey] = useState<string>("");
  const [searchKeyDelayed] = useDebounce(searchKey.toLowerCase(), 300);

  const filteredBoMons = useMemo(() => {
    if (!searchKeyDelayed) return boMons;
    return boMons.filter((bm) =>
      bm.bo_mon.toLowerCase().includes(searchKeyDelayed)
    );
  }, [boMons, searchKeyDelayed]);

  const filteredMonHocs = useMemo(() => {
    if (!searchKeyDelayed) return monhocs;
    return monhocs.filter((mh) =>
      mh.ten_mon.toLowerCase().includes(searchKeyDelayed)
    );
  }, [monhocs, searchKeyDelayed]);

  // Xây dựng cây: mỗi bộ môn là cha, các môn học là con
  const treeData = useMemo(() => {
    return filteredBoMons.map((bm) => ({
      ...bm,
      children: filteredMonHocs.filter((mh) => mh.id_bm === bm.id_bm),
    }));
  }, [filteredBoMons, filteredMonHocs]);

  const renderTree = (nodes: (IBoMon & { children: IMonHoc[] })[]) => {
    return nodes.map((bm) => (
      <TreeView.Item
        key={`bomon_${bm.id_bm}`}
        id={`bomon_${bm.id_bm}`}
        current={props.focusIdBoMon === bm.id_bm}
        defaultExpanded={props.focusIdBoMon === bm.id_bm}
      >
        <Box className={styles.nodeContent} sx={{ display: "flex" }}>
          <TreeView.LeadingVisual>
            <VersionsIcon />
          </TreeView.LeadingVisual>
          <Box sx={{ pl: 2 }}>{bm.bo_mon}</Box>
        </Box>
        {bm.children.length > 0 && (
          <TreeView.SubTree>
            {bm.children.map((mh) => (
              <TreeView.Item
                key={`monhoc_${mh.id_mon}`}
                id={`monhoc_${mh.id_mon}`}
                onSelect={() => props.onMonHocSelect?.(mh)}
                current={props.focusIdMon === mh.id_mon}
              >
                <Box className={styles.nodeContent} sx={{ display: "flex" }}>
                  <TreeView.LeadingVisual>
                    <BookIcon />
                  </TreeView.LeadingVisual>
                  <Box sx={{ pl: 2 }}>{mh.ten_mon}</Box>
                </Box>
              </TreeView.Item>
            ))}
          </TreeView.SubTree>
        )}
      </TreeView.Item>
    ));
  };

  return (
    <Box sx={{ borderRight: "1px solid #ccc", pr: 2 }}>
      <Box sx={{ mb: 1, display: "flex", gap: 1 }}>
        <TextInput
          placeholder="Tìm kiếm"
          trailingVisual={SearchIcon}
          block
          onChange={(e) => setSearchKey(e.target.value)}
          sx={{ flex: 1 }}
        />
      </Box>
      <Box
        sx={{
          height: props.height || 400,
          overflowY: "auto",
          pr: 3,
          pl: 2,
        }}
      >
        <TreeView aria-label="BoMonMonHocTree">{renderTree(treeData)}</TreeView>
      </Box>
    </Box>
  );
};

export default TreeviewBoMonMonHoc;
