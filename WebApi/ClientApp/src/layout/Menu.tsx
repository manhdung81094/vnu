import { Box, NavList, TreeView, TreeViewSubTreeProps } from "@primer/react";
import { ElementType, useMemo } from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { FaChartBar } from "react-icons/fa";
import { MdChecklist } from "react-icons/md";
import { RiFileChartLine } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { TfiWrite } from "react-icons/tfi";
import { VscOpenPreview } from "react-icons/vsc";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAuth } from "../hooks/useAuth";
import { useWindowSize } from "../hooks/useWindowSize";
import { IMenuViewModel } from "../model/respone/auth/IMenuViewModel";
import { LuUsersRound } from "react-icons/lu";
import { CiUsb } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import styles from "./Menu.module.css";

const iconMap: { [key: string]: ElementType } = {
  MdChecklist: MdChecklist as ElementType,
  BiCategoryAlt: BiCategoryAlt as ElementType,
  VscOpenPreview: VscOpenPreview as ElementType,
  TbReportAnalytics: TbReportAnalytics as ElementType,
  RiFileChartLine: RiFileChartLine as ElementType,
  TfiWrite: TfiWrite as ElementType,
  FaChartBar: FaChartBar as ElementType,
  LuUsersRound: LuUsersRound as ElementType,
  IoSearch: IoSearch as ElementType,
  CiUsb: CiUsb as ElementType,
};

interface ISubMenuProps extends TreeViewSubTreeProps {
  menuParent: IMenuViewModel;
  key?: string;
}

const NavItem = ({ to, children, defaultOpen, className }: any) => {
  const resolved = useResolvedPath(to);
  const isCurrent = useMatch({ path: resolved.pathname, end: true });
  return (
    <NavList.Item
      as={Link}
      to={to}
      aria-current={isCurrent ? "page" : undefined}
      defaultOpen={defaultOpen}
      className={className}
    >
      {children}
    </NavList.Item>
  );
};

const Menu = () => {
  const { user } = useAuth();
  const { moduleSelected } = useAppSelector((x) => x.common.layout);
  const { height } = useWindowSize();
  const menuAll = user?.menus ?? [];

  const menus = useMemo(() => {
    if (moduleSelected) {
      return menuAll.filter((x) => x.id === moduleSelected.id);
    }
    return menuAll;
  }, [moduleSelected, menuAll]);

  return (
    <Box
      sx={{ mb: 0, height: height, overflow: "auto" }}
      className={styles.menu}
    >
      <NavList>
        {menus
          .filter((x) => x.menu_id_parent === 0)
          .map((group) => (
            <NavList.Group key={`group-${group.id}`}>
              <span className={styles.nameGroup}>{group.name}</span>
              {group.items.map((menu) => {
                const IconComponent = iconMap[menu.icon] || null;
                return (
                  <NavItem
                    to={`../../../${menu.path}`}
                    // Thêm group.id vào key để đảm bảo duy nhất
                    key={`menu-${group.id}-${menu.id}`}
                    defaultOpen={menu.items.length > 0 ? true : undefined}
                    className={styles.menuItem}
                  >
                    <NavList.LeadingVisual>
                      {menu.icon &&
                        (IconComponent ? (
                          <IconComponent
                            size={17}
                            className={styles.menuIcon}
                          />
                        ) : (
                          <img
                            src={`../../images/${menu.icon}`}
                            alt="icon"
                            style={{
                              width: "17px",
                              marginRight: "-1px",
                            }}
                          />
                        ))}
                    </NavList.LeadingVisual>
                    <span className={styles.menuName}>{menu.name}</span>
                    {menu.items.length > 0 && (
                      <NavList.SubNav>
                        {menu.items.map((s) => {
                          const SubIcon = iconMap[s.icon] || null;
                          return (
                            <NavItem
                              // Thêm group.id + menu.id vào key submenu
                              key={`submenu-${group.id}-${menu.id}-${s.id}`}
                              to={`../../../${s.path}`}
                            >
                              <NavList.LeadingVisual>
                                {s.icon &&
                                  (SubIcon ? (
                                    <SubIcon
                                      className={styles.menuIcon}
                                      size={17}
                                    />
                                  ) : (
                                    <img
                                      src={`../../images/${s.icon}`}
                                      alt="icon"
                                      style={{
                                        width: "17px",
                                        marginRight: "-1px",
                                      }}
                                    />
                                  ))}
                              </NavList.LeadingVisual>
                              <span className={styles.menuName}>{s.name}</span>
                            </NavItem>
                          );
                        })}
                      </NavList.SubNav>
                    )}
                  </NavItem>
                );
              })}
            </NavList.Group>
          ))}
      </NavList>
    </Box>
  );
};

const SubMenu = (props: ISubMenuProps) => {
  const { menuParent } = props;

  return (
    <>
      {menuParent.items.length > 0 && (
        <>
          {menuParent.items.map((menu) => {
            const IconComponent = iconMap[menu.icon] || null;
            return (
              <TreeView.Item
                key={`tree-${menu.id}`}
                id={`tree-${menu.id}`}
                current={menu.id === 1}
                onSelect={() => {
                  // handle navigation if needed
                }}
              >
                {menu.icon && (
                  <TreeView.LeadingVisual>
                    {IconComponent ? (
                      <IconComponent size={17} />
                    ) : (
                      <img
                        src={`../../images/${menu.icon}`}
                        alt="icon"
                        style={{
                          width: "17px",
                          marginRight: "-1px",
                        }}
                      />
                    )}
                  </TreeView.LeadingVisual>
                )}
                <Link to={`../../${menu.path}`} className="link">
                  {menu.name}
                </Link>
                <SubMenu menuParent={menu} />
              </TreeView.Item>
            );
          })}
        </>
      )}
    </>
  );
};

export default Menu;
