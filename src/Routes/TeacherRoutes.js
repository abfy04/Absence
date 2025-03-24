import { Route } from "react-router-dom"
import TeacherSchedule from "../Pages/TeacherSchedule"
import TakeAbsence from "../Pages/TakeAbsence"
import ListAbsence from "../Pages/ListAbsence2"
import TrackProgress from "../Pages/TrackProgress"
import Profile from "../Profiles/UserProfile"
export const teacherRoutes = [
    <Route index path="/" element={<TeacherSchedule />} />,
    <Route path="/takeAbsence/:groupId" element={<TakeAbsence />} />,
    <Route path="/listabsence/:absenceId" element={<ListAbsence />} />,
    <Route path="/progress" element={<TrackProgress />} />,
    <Route path="/AdminProfile/:role" element={<Profile />} />
]