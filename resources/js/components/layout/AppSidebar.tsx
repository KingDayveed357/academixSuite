import { useCallback } from "react";
import { Link, usePage } from "@inertiajs/react";
import { HorizontaLDots } from "../../icons";
import { useSidebar } from "../../context/SidebarContext";
import SidebarWidget from "./SidebarWidget";
import { navigationItems } from "../../app/routes/navigation";
import { useMockSession } from "../../app/providers/MockSessionProvider";

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const { url } = usePage();
  const { role } = useMockSession();

  // Filter items by role
  const activeItems = navigationItems.filter(
    (item) => !role || item.roles.includes(role)
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
          <li key={nav.label}>
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
            <>
              <img
                className="dark:hidden"
                src="/assets/logo.png"
                alt="Logo"
                width={150}
                height={40}
              />
              <img
                className="hidden dark:block"
                src="/assets/dark-logo.png"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <img
              src="/assets/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="object-contain"
            />
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
