import { Route } from "react-router-dom"
import Dashboard from "../Pages/Dashboard"
import Filieres from "../Indexes/Filieres";
import Teachers from "../Indexes/Teachers";
import Profile from "../Profiles/UserProfile";
import AbsenceManagers from "../Indexes/AbcenseManagers";
import Groups from "../Indexes/Groups";
//Add pages
import AddUser from "../Forms/AddForms/AddUser";
import AddFiliere from "../Forms/AddForms/AddFiliere";
import AddGroup from "../Forms/AddForms/AddGroup";
import AddRoom from "../Forms/AddForms/AddRoom";
//edit pages
import EditUser from "../Forms/EditForms/EditUser";
import EditFiliere from "../Forms/EditForms/EditFiliere";
import EditGroup from "../Forms/EditForms/EditGroup";
import EditRoom from "../Forms/EditForms/EditRoom";
//profiles pages
import ProfileGroup from "../Profiles/ProfileGroup";
import ProfileFiliere from "../Profiles/ProfileFiliere";

import Rooms from "../Indexes/Rooms";

import Schedule from "../Pages/Schedule";
import SchedulesList from "../Pages/SchedulesList";
import { ModalProvider } from "../Functions/ModalContext";
import TrackProgress from "../Pages/TrackProgress";

export const adminRoutes = [
    <Route index path="/" element={<Dashboard/>}/>,
    
    <Route path="/filieres" element={<Filieres/>}/>,
    <Route path="/groups" element={<Groups/>}/>,
    
    <Route path="/teachers" element={<Teachers/>}/>,
    <Route path="/absenceManagers" element={<AbsenceManagers/>}/>,
    <Route path="/rooms" element={<Rooms/>}/>,
    <Route path="/schedules" element={<SchedulesList />}/>,
    <Route path="/schedule/:id" element={<Schedule />}/>,
  

    <Route path="/addUser/:role?" element={<AddUser/>}/>,
    <Route path="/addFiliere" element={<AddFiliere/>}/>,
    <Route path="/addGroup" element={<AddGroup/>}/>,
  
    <Route path="/addRoom" element={<AddRoom />} />,

    <Route path="/editFiliere/:id" element={<EditFiliere/>}/>,
    <Route path="/editGroup/:id" element={<EditGroup/>}/>,
    /* <Route path="/editStudent/:id" element={<EditStudent/>}/> */
    <Route path="/editUser/:id" element={<EditUser/>}/>,
    <Route path="/editRoom/:idRoom" element={<EditRoom/>}/>,

    /* profilesRoute */
    <Route path="/adminProfile/:role" element={<Profile/>}/>,
    /* <Route path="/studentProfile/:cef" element={<ProfileStudent/>}/> */
    <Route path="/groupProfile/:id" element={<ModalProvider><ProfileGroup/></ModalProvider>}/>,
    <Route path="/filiereProfile/:id" element={<ModalProvider><ProfileFiliere/></ModalProvider>}/>,
    <Route path="/progress" element={<TrackProgress />}/>
  



]