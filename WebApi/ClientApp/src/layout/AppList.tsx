import { Box } from "@primer/react";
import AppButton from "../components-ui/app-button";
import { useAuth } from "../hooks/useAuth";

const AppList = () => {
  const { user } = useAuth();
  const menus = user?.menus ?? [];
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {menus.map((menu, idx) => {
        return (
          <Box sx={{ mb: 4 }} key={idx}>
            <AppButton key={menu.id} module={menu} />
          </Box>
        );
      })}
    </Box>
  );
};

export default AppList;
