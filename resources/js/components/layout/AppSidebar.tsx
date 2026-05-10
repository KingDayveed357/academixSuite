import { useCallback } from "react";
import { Link, usePage } from "@inertiajs/react";
import { HorizontaLDots } from "../../icons";
import { useSidebar } from "../../context/SidebarContext";
import SidebarWidget from "./SidebarWidget";
import { navigationItems } from "../../app/routes/navigation";
import { useAuth } from "../../hooks/useAuth";
import { useTenant } from "../../hooks/useTenant";

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const { url } = usePage();
  const { role } = useAuth();
  const { tenant } = useTenant();

  // Filter items by role
  const activeItems = navigationItems.filter(
    (item) => !role || item.roles.includes(role as any)
  );

  const isActive = useCallback(
    (path: string) => url === path || url.startsWith(`${path}/`),
    [url]
  );

  const renderMenuItems = (items: typeof navigationItems) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav) => {
        const Icon = nav.icon;
        const active = isActive(nav.href);
        return (
          <li key={nav.id}>
            <Link
              href={nav.href}
              className={`menu-item group ${
                active ? "menu-item-active" : "menu-item-inactive"
              }`}
            >
              <span
                className={`menu-item-icon-size ${
                  active
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                <Icon className="size-6" />
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.label}</span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <div className="flex items-center gap-3">
               {tenant?.metadata?.logo_path ? (
                 <img src={tenant.metadata.logo_path} alt={tenant.name} className="h-10 w-auto rounded" />
               ) : (
                 <div className="h-10 w-10 bg-brand-500 rounded flex items-center justify-center text-white font-bold">
                    {tenant?.name?.substring(0, 1) || 'A'}
                 </div>
               )}
               <div className="flex flex-col">
                  <span className="font-bold text-gray-900 dark:text-white truncate max-w-[150px]">
                    {tenant?.name || 'AcademixSuite'}
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                    {role?.replace('_', ' ')}
                  </span>
               </div>
            </div>
          ) : (
            tenant?.metadata?.logo_path ? (
              <img src={tenant.metadata.logo_path} alt={tenant.name} className="h-8 w-8 rounded" />
            ) : (
              <div className="h-8 w-8 bg-brand-500 rounded flex items-center justify-center text-white font-bold text-xs">
                 {tenant?.name?.substring(0, 1) || 'A'}
              </div>
            )
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(activeItems)}
            </div>
          </div>
        </nav>
        {/* {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null} */}
      </div>
    </aside>
  );
};

export default AppSidebar;
