import React from "react";
import { useAuthStore } from "../utils/useAuthStore";
import { LogOut, User } from "lucide-react";
import ShowCategories from "../components/ShowCategories.jsx";

const HomePage = () => {
  const { logout, userData } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-700">
          Event Management Dashboard
        </h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
            <User size={18} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-800">
              {userData?.authUser}
            </span>
            <span className="text-sm text-gray-600">
              ({userData?.name})
            </span>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

   
      <main className="p-6">
        <div className="">
          <ShowCategories />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
