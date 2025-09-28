import { Box } from "@primer/react";

import { ThreeBarsIcon } from "@primer/octicons-react";
import styles from "./Humberger.module.css";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { eNavSubMode } from "../model/common/eNavSubMode";
import { rootActions } from "../state/actions/rootActions";

const Humberger = () => {
  const dispatch = useAppDispatch();
  const { navSubMode } = useAppSelector((x) => x.common.layout);
  const handleClick = () => {
    const mode =
      navSubMode === eNavSubMode.FULL ? eNavSubMode.POPUP : eNavSubMode.FULL;
    dispatch(rootActions.common.layout.CHANGE_NAV_MODE(mode));
  };
  return (
    <Box className={styles.container} onClick={handleClick}>
      <Box className={styles.humberger}>
        <ThreeBarsIcon />
      </Box>
    </Box>
  );
};

export default Humberger;
