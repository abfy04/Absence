import { Route } from "react-router-dom"

//main pages
import Dashboard from "../Pages/Dashboard"

//school resources
import Filieres from "../Pages/SchoolsResources/Filieres";
import Groups from "../Pages/SchoolsResources/Groups";
import Rooms from "../Pages/SchoolsResources/Rooms";
import Schedule from "../Pages/SchoolsResources/Schedule";
import SchedulesList from "../Pages/SchoolsResources/SchedulesList";
import SchoolRessources from "../Indexes/SchoolRessources";
import SchoolResources from "../Pages/SchoolsResources/SchoolResources";

//human resources
import Teachers from "../Pages/HumanResources/Teachers";
import AbsenceManagers from "../Pages/HumanResources/AbcenseManagers";
import HumanRessources from "../Indexes/HumanRessources";
import HumanResources from "../Pages/HumanResources/HumanResources";
import TrackProgress from "../Pages/TrackProgress";



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
import Profile from "../Profiles/UserProfile";

//history pages
import AbsencesHistorique from "../Pages/AbsencesHistorique";
import SchedulesHistorique from "../Pages/SchedulesHistorique";

//configuration pages
import Configuration from "../Pages/Configuration";

import { ModalProvider } from "../Functions/ModalContext";



export const adminRoutes = [
    <Route index path="/" element={<Dashboard/>}/>,
    
    
    <Route path="/groupProfile/:id" element={<ModalProvider><ProfileGroup/></ModalProvider>}/>,
    <Route path="/filiereProfile/:id" element={<ModalProvider><ProfileFiliere/></ModalProvider>}/>,
    // add forms
  
    <Route path="/addFiliere" element={<AddFiliere/>}/>,
    <Route path="/addGroup" element={<AddGroup/>}/>,
    <Route path="/addRoom" element={<AddRoom />} />,

    // edit forms
    <Route path="/editFiliere/:id" element={<EditFiliere/>}/>,
    <Route path="/editGroup/:id" element={<EditGroup/>}/>,
    <Route path="/editRoom/:idRoom" element={<EditRoom/>}/>,

    /* profilesRoute */
    <Route path="/adminProfile/:role" element={<Profile/>}/>,
 
    <Route path="/progress" element={<TrackProgress />}/>,
    <Route path="/absenceHistorique" element={<AbsencesHistorique />}/>,
    <Route path="/schedulesHistorique" element={<SchedulesHistorique />}/>,
  
  
    <Route path="/configuration" element={<Configuration />} />,

    <Route path="/humanRessources" element={<HumanRessources />}>
        <Route index element={<HumanResources/>}/>
        <Route path="absenceManagers"  element={<AbsenceManagers />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="addUser/:role?" element={<AddUser/>}/>,   
        <Route path="editUser/:id" element={<EditUser/>}/>,

    </Route>,
    <Route path="/schoolResources" element={<SchoolRessources/>}>
        <Route index element={<SchoolResources/>}/>
        <Route path="filieres" element={<Filieres/>}/>
        <Route path="groups" element={<Groups/>}/>
        <Route path="rooms" element={<Rooms/>}/>
        <Route path="schedules" element={<SchedulesList/>}/>
        <Route path="addFiliere" element={<AddFiliere/>}/>
        <Route path="addGroup" element={<AddGroup/>}/>
        <Route path="addRoom" element={<AddRoom/>}/>
        <Route path="schedule/:id" element={<Schedule />}/>,
    </Route>
]