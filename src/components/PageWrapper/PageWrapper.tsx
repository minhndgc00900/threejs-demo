// import { DrawerSection } from '@/src/components/Drawer/Drawer.types';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { DrawerSection } from "@components/Sidebar/Sidebar.types";
import { useMemo } from "react";
import Icon from "@components/Icon";
import Select from 'react-select';
import { factories } from "@utils/factory";

const PageWrapper = () => {
  const navigate = useNavigate();
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

  type OptionType = {
    value: string;
    label: string;
  };
  
  const options: OptionType[] = factories.map((factory) => ({
    value: factory.id,
    label: factory.name,
  }));
  
    const handleChange = (option: OptionType | null) => {
      if (option) {
        navigate(`/details/${option.value}`);
      }
    };
  return (
    <div className="flex h-screen bg-gray-100">
      {/* <Sidebar /> */}

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex items-center justify-between h-16 bg-gray-800 border-b border-gray-200 fixed z-[90] w-[100vw]">
          <div className="flex items-center px-4 h-[100px] w-[80vw] mx-auto">
            {/* <input
              className="mx-4 w-full border rounded-md px-4 py-2 bg-[#fff]"
              type="text"
              placeholder="Search"
            /> */}
            <Select
              onChange={handleChange}
              options={options}
              placeholder="Search"
              className="mx-4 w-full border rounded-md px-4 py-2"
            />
            {menu.map((section, index) => {
              return (
                <Link
                  key={index}
                  to={section.url}
                  className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 gap-x-2 gap-y-10"
                >
                  <Icon name={section.iconName} color="#fff" />
                  <span className="text-white">{section.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="mt-[100px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PageWrapper;
