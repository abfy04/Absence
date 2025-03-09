import { useState } from "react";
import { Route,Routes } from "react-router-dom";
//layout
import SideBar from "./Dashboard/SideBar";
import Dashboard from "./Dashboard/Dashboard";


import Students from "./Students/Students";
import Filieres from "./Filiere/Filieres";
import ExportData from "./ExportData";
import Teachers from "./Teacher/Teachers";
import AdminProfile from "./Admin/AdminProfile";

import AbsenceManagers from "./AbsenceManagers/AbcenseManagers";
import Groups from "./Group/Groups";
//Add pages
import AddUser from "./Teacher/AddUser";
import AddFiliere from "./Filiere/AddFiliere";
import AddGroup from "./Group/AddGroup";
import AddStudent from "./Students/AddStudent";

//edit pages
import EditUser from "./Teacher/EditUser";
import EditStudent from "./Students/EditStudent";
import EditFiliere from "./Filiere/EditFiliere";
import EditGroup from "./Group/EditGroup";
//profiles pages
import ProfileStudent from "./Students/ProfileStudent";
import ProfileGroup from "./Group/ProfileGroup";
import ProfileFiliere from "./Filiere/ProfileFiliere";
import AddRoom from "./Rooms/AddRoom";
import Rooms from "./Rooms/Rooms";
import EditRoom from "./Rooms/EditRoom";
import Schedule from "./Schedule/Schedule";
import SchedulesList from "./Schedule/SchedulesList";

function App() {
  const [isOpen,setIsOpen] = useState(false);
  const [theme,setTheme] = useState(localStorage.getItem('theme') || 'light');
  localStorage.setItem('theme',theme)

  
  
  
  return (
    <div className={`App ${theme } font-mainFont`} >
      <div className=" min-h-screen bg-white dark:bg-gray-800">
      {/* Main layout container */}
      <div className="flex h-full ">
        {/* Sidebar */}
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} darkMode={theme} setDarkMode={setTheme} />
        <div className={`md:p-8 p-4 pl-0 pb-4 pt-10 w-full overflow-x-hidden  lg:mx-auto ${isOpen ? 'lg:ml-64' : 'ml-20 lg:ml-24'}`}>

        
        <Routes >
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/students" element={<Students/>}/>
          <Route path="/filieres" element={<Filieres/>}/>
          <Route path="/groups" element={<Groups/>}/>
          <Route path="/export" element={<ExportData/>}/>
          <Route path="/teachers" element={<Teachers/>}/>
          <Route path="/absenceManagers" element={<AbsenceManagers/>}/>
          <Route path="/rooms" element={<Rooms/>}/>
          <Route path="/schedules" element={<SchedulesList />}/>
          <Route path="/schedule/:id" element={<Schedule />}/>
         
          {/* add routes */}
          <Route path="/addUser/:role?" element={<AddUser/>}/>
          <Route path="/addFiliere" element={<AddFiliere/>}/>
          <Route path="/addGroup" element={<AddGroup/>}/>
          <Route path="/addStudent" element={<AddStudent/>}/>
          <Route path="/addRoom" element={<AddRoom />} />
          {/* edit routes */}
          <Route path="/editFiliere/:id" element={<EditFiliere/>}/>
          <Route path="/editGroup/:id" element={<EditGroup/>}/>
          <Route path="/editStudent/:id" element={<EditStudent/>}/>
          <Route path="/editUser/:id" element={<EditUser/>}/>
          <Route path="/editRoom/:idRoom" element={<EditRoom/>}/>
          {/* profilesRoute */}
          <Route path="/adminProfile" element={<AdminProfile/>}/>
          <Route path="/studentProfile/:cef" element={<ProfileStudent/>}/>
          <Route path="/groupProfile/:id" element={<ProfileGroup/>}/>
          <Route path="/filiereProfile/:id" element={<ProfileFiliere/>}/>
        </Routes>
       
        

        </div>

      </div>
    </div>
    </div>
  );
}

export default App;
