import { Route } from "react-router-dom"

//main pages
import Dashboard from "../Pages/Dashboard"

//school resources
import Filieres from "../Pages/SchoolsResources/Filieres/Filieres";
import Groups from "../Pages/SchoolsResources/Groups/Groups";
import Rooms from "../Pages/SchoolsResources/Rooms";
import Schedule from "../Pages/SchoolsResources/Schedules/Schedule";
import SchedulesList from "../Pages/SchoolsResources/Schedules/SchedulesList";
import SchoolRessources from "../Indexes/SchoolRessources";
import SchoolResources from "../Pages/SchoolsResources/SchoolResources";

//human resources
import Teachers from "../Pages/HumanResources/Teachers";
import AbsenceManagers from "../Pages/HumanResources/AbcenseManagers";
import HumanRessources from "../Indexes/HumanRessources";
import HumanResources from "../Pages/HumanResources/HumanResources";
import TrackProgress from "../Pages/SchoolsResources/Progress/TrackProgress";



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
import ProfileGroup from "../Pages/SchoolsResources/Groups/ProfileGroup";
import ProfileFiliere from "../Pages/SchoolsResources/Filieres/ProfileFiliere";
import Profile from "../Profiles/UserProfile";

//history pages
import AbsencesHistorique from "../Pages/Historique/AbsencesHistorique";
import SchedulesHistorique from "../Pages/Historique/SchedulesHistorique";
import TeacherSchedulesArchive from "../Pages/Historique/TeacherSchedulesArchive";
import Historiques from "../Pages/Historique/Historiques";
import History from "../Indexes/History";
//configuration pages
import Configuration from "../Pages/Configuration";

import { ModalProvider } from "../Functions/Context/ModalContext";
import Progress from "../Pages/SchoolsResources/Progress/Progress";



export const adminRoutes = [
    <Route index path="/" element={<Dashboard/>}/>,
    
    /* profilesRoute */
    <Route path="/profile/:role" element={<Profile/>}/>,
 
   
   
  
    <Route path="/configuration" element={<Configuration />} />,
    <Route path="/historique" element={<History/>}>
        <Route index element={<Historiques/>}/>
        <Route path="absenceHistorique" element={<AbsencesHistorique />}/>
        <Route path="schedulesHistorique" element={<SchedulesHistorique />}/>
        <Route path="schedulesHistorique/:id" element={<TeacherSchedulesArchive/>}/>
    </Route>,

    <Route path="/humanResources" element={<HumanRessources />}>
        <Route index element={<HumanResources/>}/>
        <Route path="absenceManagers"  element={<AbsenceManagers />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="addUser/:role?" element={<AddUser/>}/>,   
        <Route path="editUser/:id" element={<EditUser/>}/>,

    </Route>,
    // schoolResources => rooms,schedules , filieres, groups
    <Route path="/schoolResources" element={<SchoolRessources/>}>
        <Route index element={<SchoolResources/>}/>
        <Route path="filieres" element={<Filieres/>}/>
        <Route path="groups" element={<Groups/>}/>
        <Route path="rooms" element={<Rooms/>}/>
        <Route path="schedules" element={<SchedulesList/>}/>
        <Route path="addFiliere" element={<AddFiliere/>}/>
        <Route path="addGroup" element={<AddGroup/>}/>
        <Route path="addRoom" element={<AddRoom/>}/>
        <Route path="schedule/:id" element={<Schedule />}/>
        <Route path="editFiliere/:id" element={<EditFiliere/>}/>
        <Route path="editGroup/:id" element={<EditGroup/>}/>
        <Route path="editRoom/:idRoom" element={<EditRoom/>}/>
        <Route path="groupProfile/:id" element={<ModalProvider><ProfileGroup/></ModalProvider>}/>
        <Route path="filiereProfile/:id" element={<ModalProvider><ProfileFiliere/></ModalProvider>}/>
        <Route path="progress" element={<Progress />}/>
        <Route path="progress/:filter/:id" element={<TrackProgress />}/>
    </Route>
]