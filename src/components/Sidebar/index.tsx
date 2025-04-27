import { useMemo } from "react";
import { Link } from "react-router-dom";
import Icon from "../Icon";
import { DrawerSection } from "./Sidebar.types";

const Sidebar = () => {

  const menu: DrawerSection[] = useMemo(() => {
    return [
      {
        name: "Dashboard",
        iconName: "dashboard",
        url: "/dashboard",
      },
      {
        name: "Visualisation",
        iconName: "location",
        url: "/visualisation",
      },
    ];
  }, []);

  return (
    <>
      {/* sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-gray-800">
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <span className="text-white font-bold uppercase">Map System</span>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 bg-gray-800">
            {menu.map((section, index) => {
              return (
                <Link key={index}
                  to={section.url}
                  className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 gap-x-2 gap-y-10"
                >
                  <Icon name={section.iconName} />
                  <span className="text-white">{section.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
