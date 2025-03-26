import { Route } from "react-router-dom"
import TeacherSchedule from "../Indexes/TeacherSchedule"
import TakeAbsence from "../Pages/Teacher/TakeAbsence"
import ListAbsence from "../Pages/Teacher/ListAbsence2"
import TrackProgress from "../Pages/SchoolsResources/Progress/TrackProgress"
import Profile from "../Profiles/UserProfile"
import TeacherSchedulesArchive from "../Pages/Historique/TeacherSchedulesArchive"
export const teacherRoutes = [
    <Route index path="/" element={<TeacherSchedule />} />,
    <Route path="/takeAbsence/:groupId" element={<TakeAbsence />} />,
    <Route path="/listabsence/:absenceId" element={<ListAbsence />} />,
    <Route path="/progress" element={<TrackProgress />} />,
    <Route path="/schedulesArchive/:id" element={<TeacherSchedulesArchive />} />,
    <Route path="/profile/:role" element={<Profile />} />
]