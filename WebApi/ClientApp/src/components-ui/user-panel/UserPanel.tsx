import { SignOutIcon } from "@primer/octicons-react";
import { ActionList, ActionMenu, Button, Text } from '@primer/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/reducers/rootReducer';
import UserAvatar from "../user-avatar";
import { IBaseComponentProps } from '../utils/types/IBaseComponentProps';
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { rootActions } from "../../state/actions/rootActions";
import { useNavigate } from "react-router-dom";
interface IUserPanelProps extends IBaseComponentProps {

}
const UserPanel = (props: IUserPanelProps) => {
    const { user } = useSelector((x: RootState) => x.auth)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        dispatch(rootActions.auth.LOGOUT_START({
            access_token: "",
            refresh_token: ""
        }));
        navigate("../../signout-oidc")

    }
    const UserIcon = () => {
        return (
            <UserAvatar
                fullName={user?.full_name ?? ""}

                size="large"
            />
        );
    }
    return (
        <ActionMenu>
            <ActionMenu.Anchor>
                <Button variant="invisible" sx={{
                    height: "auto",
                    pt: 1,
                    pb: 1,
                    display: "flex"

                }}
                    leadingVisual={UserIcon}
                // trailingVisual={ChevronDownIcon}
                >

                    {/* <Box sx={{ textAlign: "left", color: "fg.default", flex: 1, width: "146px" }}>
                        <Box sx={{
                            fontWeight: "600",
                            display: "flex"
                        }}> {user?.full_name}</Box>
                        <Box sx={{ mt: "-2px", fontSize: "12px", color: "fg.muted" }}>
                            <Text>{user?.username}</Text>
                        </Box>
                    </Box> */}
                </Button>


            </ActionMenu.Anchor>

            <ActionMenu.Overlay>
                <ActionList>

                    <ActionList.Item>
                        <Text sx={{
                            fontWeight: "bold"
                        }}>{user?.full_name}</Text>
                        <br />
                        <Text>{user?.username}</Text>
                    </ActionList.Item>
                    <ActionList.Divider />
                    <ActionList.Item variant="danger" onClick={handleLogout}>
                        <ActionList.LeadingVisual>
                            <SignOutIcon />
                        </ActionList.LeadingVisual>
                        Log out
                    </ActionList.Item>
                </ActionList>
            </ActionMenu.Overlay>
        </ActionMenu>

    );
};

export default UserPanel;