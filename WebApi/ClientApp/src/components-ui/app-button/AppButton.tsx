import { ActionList, ActionMenu, Box } from '@primer/react';
import clsx from "clsx";

import { useAppDispatch } from '../../hooks/useAppDispatch';

import { useAppSelector } from '../../hooks/useAppSelector';
import { eNavSubMode } from '../../model/common/eNavSubMode';
import { IMenuViewModel } from '../../model/respone/auth/IMenuViewModel';
import styles from "./AppButton.module.css";
import { useAuth } from '../../hooks/useAuth';
import { useMemo } from 'react';
import { rootActions } from '../../state/actions/rootActions';
import { useNavigate } from 'react-router-dom';
interface IAppButtonProps {
    module: IMenuViewModel
}
interface ISubMenuProps {
    menuParent: IMenuViewModel,
    key?: string
}
const SubMenu = (props: ISubMenuProps) => {
    const { menuParent } = props;

    const navigate = useNavigate();
    return (
        <>
            {menuParent.items.length > 0 &&
                <>
                    {menuParent.items.map(menu => {

                        return (
                            <ActionList.Item onClick={() => {
                                navigate({
                                    pathname: `../../${menu.path}`
                                })
                            }}>
                                {menu.name}

                            </ActionList.Item>

                        )
                    })}

                </>
            }
        </>
    )
}
const AppButton = (props: IAppButtonProps) => {
    const dispatch = useAppDispatch();
    const { module } = props;
    const { name, icon } = module;
    const { navSubMode, moduleSelected } = useAppSelector(x => x.common.layout)
    const { user } = useAuth();
    const menuAll = user?.menus ?? [];
    const menus = useMemo(() => {
        if (moduleSelected) {
            return menuAll.filter(x => x.id === moduleSelected.id)
        }
        return menuAll;
    }, [moduleSelected, menuAll]);

    const is_focused = module.id === moduleSelected?.id;
    const is_disabled = false;
    return (
        <>
            {navSubMode === eNavSubMode.FULL &&
                <Box className={clsx(styles.container,
                    is_focused ? styles.active : "",
                    is_disabled ? styles.disabled : ""
                )}
                    onClick={() => {
                        dispatch(rootActions.common.layout.CHANGE_MODULE_SELECTED(module))
                    }}
                >
                    <Box className={styles.icon}>
                        <Box className={styles.iconState}>
                            {is_focused &&
                                <div className={styles.activeState}>
                                    &nbsp;
                                </div>}
                        </Box>
                        <Box className={styles.iconImage}>
                            <div className={clsx(styles.iconApp, is_focused ? styles.active : "")}>
                                {icon &&
                                    <img alt='' src={`../../images/${icon}`}
                                        style={{
                                            width: "32px"
                                        }}
                                    />
                                }

                            </div>
                        </Box>
                        <Box className={styles.iconState}>

                        </Box>
                    </Box>
                    <Box className={styles.appName}>
                        {name}
                    </Box>
                </Box>
            }
            {navSubMode === eNavSubMode.POPUP &&
                <ActionMenu onOpenChange={() => {
                    dispatch(rootActions.common.layout.CHANGE_MODULE_SELECTED(module))

                }}>
                    <ActionMenu.Anchor>
                        <Box className={clsx(styles.container,
                            is_focused ? styles.active : "",
                            is_disabled ? styles.disabled : ""
                        )}
                            onClick={() => {
                                // console.log({ xxx: "1231313" });
                                dispatch(rootActions.common.layout.CHANGE_MODULE_SELECTED(module))
                            }}
                        >
                            <Box className={styles.icon}>
                                <Box className={styles.iconState}>
                                    {is_focused &&
                                        <div className={styles.activeState}>
                                            &nbsp;
                                        </div>}
                                </Box>
                                <Box className={styles.iconImage}>
                                    <div className={clsx(styles.iconApp, is_focused ? styles.active : "")}>
                                        {icon &&
                                            <img alt='' src={`../../images/${icon}`}
                                                style={{
                                                    width: "24px"
                                                }}
                                            />
                                        }

                                    </div>
                                </Box>
                                <Box className={styles.iconState}>

                                </Box>
                            </Box>
                            <Box className={styles.appName}>
                                {name}
                            </Box>
                        </Box>
                    </ActionMenu.Anchor>
                    <ActionMenu.Overlay side='outside-right'>
                        <Box className={styles.popup} sx={{
                            maxHeight: window.innerHeight - 300,
                            overflowY: "scroll"
                        }}>
                            <ActionList>
                                {menus.map(menu => {
                                    return (
                                        <ActionList.Group title={menu.name}>
                                            <SubMenu menuParent={menu} key={menu.id.toString()} />
                                        </ActionList.Group>
                                    );
                                })}

                            </ActionList>
                        </Box>
                    </ActionMenu.Overlay>
                </ActionMenu>
            }
        </>
    );
};

export default AppButton;