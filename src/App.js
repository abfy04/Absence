import { useState } from "react";
import { Route,Routes } from "react-router-dom";
//layout
import SideBar from "./Dashboard/SideBar";
import Dashboard from "./Dashboard/Dashboard";

import Filieres from "./Filiere/Filieres";
import Teachers from "./Teacher/Teachers";
import AdminProfile from "./Admin/AdminProfile";
import AbsenceManagers from "./AbsenceManagers/AbcenseManagers";
import Groups from "./Group/Groups";
//Add pages
import AddUser from "./Users/AddUser";
import AddFiliere from "./Filiere/AddFiliere";
import AddGroup from "./Group/AddGroup";

//edit pages
import EditUser from "./Users/EditUser";
import EditFiliere from "./Filiere/EditFiliere";
import EditGroup from "./Group/EditGroup";

//profiles pages
import ProfileGroup from "./Group/ProfileGroup";
import ProfileFiliere from "./Filiere/ProfileFiliere";
import AddRoom from "./Rooms/AddRoom";
import Rooms from "./Rooms/Rooms";
import EditRoom from "./Rooms/EditRoom";
import Schedule from "./Schedule/Schedule";
import SchedulesList from "./Schedule/SchedulesList";
import { ModalProvider } from "./Functions/ModalContext";
import TrackProgress from "./TrackProgress/TrackProgress";
import SelectGroups from "./SelectGroup/SelectGroups";

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
        <div className={`md:px-6 md:py-4 p-4 pl-0 pb-4 pt-8 w-full overflow-x-hidden  mx-auto ${isOpen ? 'lg:ml-60' : 'ml-20'}`}>

        
        <Routes >
          <Route path="/" element={<Dashboard/>}/>
          {/* <Route path="/students" element={<Students/>}/> */}
          <Route path="/filieres" element={<Filieres/>}/>
          <Route path="/groups" element={<Groups/>}/>
          
          <Route path="/teachers" element={<Teachers/>}/>
          <Route path="/absenceManagers" element={<AbsenceManagers/>}/>
          <Route path="/rooms" element={<Rooms/>}/>
          <Route path="/schedules" element={<SchedulesList />}/>
          <Route path="/schedule/:id" element={<Schedule />}/>
         
          {/* add routes */}
          <Route path="/addUser/:role?" element={<AddUser/>}/>
          <Route path="/addFiliere" element={<AddFiliere/>}/>
          <Route path="/addGroup" element={<AddGroup/>}/>
          {/* <Route path="/addStudent" element={<AddStudent/>}/> */}
          <Route path="/addRoom" element={<AddRoom />} />

          {/* edit routes */}
          <Route path="/editFiliere/:id" element={<EditFiliere/>}/>
          <Route path="/editGroup/:id" element={<EditGroup/>}/>
          {/* <Route path="/editStudent/:id" element={<EditStudent/>}/> */}
          <Route path="/editUser/:id" element={<EditUser/>}/>
          <Route path="/editRoom/:idRoom" element={<EditRoom/>}/>

          {/* profilesRoute */}
          <Route path="/adminProfile" element={<AdminProfile/>}/>
          {/* <Route path="/studentProfile/:cef" element={<ProfileStudent/>}/> */}
          <Route path="/groupProfile/:id" element={<ModalProvider><ProfileGroup/></ModalProvider>}/>
          <Route path="/filiereProfile/:id" element={<ModalProvider><ProfileFiliere/></ModalProvider>}/>
          <Route path="/progress" element={<TrackProgress />}/>
          <Route path="/selectGroups" element={<SelectGroups />}/>
        </Routes>
       
        

        </div>

      </div>
    </div>
    </div>
  );
}

export default App;
