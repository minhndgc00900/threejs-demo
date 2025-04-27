// import { DrawerSection } from '@/src/components/Drawer/Drawer.types';
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";

const PageWrapper = () => {

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200">
          <div className="flex items-center px-4">
            <input
              className="mx-4 w-full border rounded-md px-4 py-2"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PageWrapper;
