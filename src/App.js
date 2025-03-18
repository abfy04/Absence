import { useState } from "react";
import { Routes } from "react-router-dom";

import SideBar from "./Components/Common/SideBar";
import Login from "./Authentification/Login";
import { adminRoutes } from "./Routes/AdminRoutes";
import { teacherRoutes } from "./Routes/TeacherRoutes";

function App() {
  const [isOpen,setIsOpen] = useState(false);
  const [role ,setRole] = useState(localStorage.getItem('userRole') || false)
  localStorage.setItem('userRole',role)

  const [theme,setTheme] = useState(localStorage.getItem('theme') || 'light');
  localStorage.setItem('theme',theme)
 
  return (
    <div className={`App ${theme } font-mainFont`} >
      <div className=" min-h-screen bg-white dark:bg-gray-800">
        {/* Main layout container */}
        {
          !role  || role === 'null'  ? 
          <Login setRole={setRole} />
          :
          <div className="flex h-full ">
            {/* Sidebar */}
            <SideBar 
              isOpen={isOpen} 
              setIsOpen={setIsOpen} 
              darkMode={theme} 
              setDarkMode={setTheme} 
              role={role} 
              setRole={setRole} 
            />
            
            <div className={`md:px-6 md:py-4 p-4 pl-0 pb-4 pt-8 w-full overflow-x-hidden  mx-auto ${isOpen ? 'lg:ml-60' : 'ml-20'}`}>
                <Routes > 
                  {
                    role === 'Admin' && adminRoutes
                  
                  }
                  {
                    role === 'Teacher' && teacherRoutes
                  }
                </Routes>
            </div>
        </div>
        }
      </div>
    </div>
  );
}

export default App;
