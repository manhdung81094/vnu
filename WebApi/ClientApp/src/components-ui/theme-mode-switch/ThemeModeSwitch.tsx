import { Box, Checkbox } from '@primer/react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { eThemeMode } from '../../model/common/eThemeMode';
import { rootActions } from '../../state/actions/rootActions';

const ThemeModeSwitch = () => {
    const { themeMode } = useAppSelector(x => x.common.layout)
    const dispatch = useAppDispatch();
    return (
        <Box>
            <Checkbox checked={themeMode === "dark"} onChange={(e) => {
                dispatch(
                    rootActions.common.layout.CHANGE_THEME_MODE(e.target.checked ? eThemeMode.dark : eThemeMode.light)
                )
            }} />
        </Box>
    );
};

export default ThemeModeSwitch;