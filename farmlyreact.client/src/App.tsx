import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import FarmInfo from "./pages/Farm/farm-info.tsx";
import AdminModerator from "./pages/UserManagement/AdminModerator";
import ModerationChat from "./pages/ModerationChat"; 
import FarmAdminLayout from "./layout/FarmAdminLayout";
import FarmAdminDashboard from "./pages/FarmAdmin/FarmAdminDashboard";
import FarmAdminUserManagement from "./pages/FarmAdmin/FarmAdminUserManagement";
import FarmAdminEquipment from "./pages/FarmAdmin/FarmAdminEquipment";
import FarmAdminFinancial from "./pages/FarmAdmin/FarmAdminFinancial";
import FarmAdminAquaponics from "./pages/FarmAdmin/FarmAdminAquaponics";


export default function App() {
    return (
        <>
            <Router>
                <ScrollToTop />
                <Routes>
                    {/* Main admin layout */}
                    <Route element={<AppLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/farm-info" element={<FarmInfo />} />
                        <Route path="/user-management" element={<AdminModerator />} />
                        <Route path="/moderate-chat" element={<ModerationChat />} />
                        <Route path="/chat-moderation/:moderatorId" element={<Blank />} />
                        <Route path="/profile" element={<UserProfiles />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/blank" element={<Blank />} />
                        <Route path="/form-elements" element={<FormElements />} />
                        <Route path="/basic-tables" element={<BasicTables />} />
                        <Route path="/alerts" element={<Alerts />} />
                        <Route path="/avatars" element={<Avatars />} />
                        <Route path="/badge" element={<Badges />} />
                        <Route path="/buttons" element={<Buttons />} />
                        <Route path="/images" element={<Images />} />
                        <Route path="/videos" element={<Videos />} />
                        <Route path="/line-chart" element={<LineChart />} />
                        <Route path="/bar-chart" element={<BarChart />} />
                    </Route>

                    {/* Farm Admin — completely separate layout, sibling NOT child */}
                    <Route element={<FarmAdminLayout />}>
                        <Route path="/farm-admin/dashboard" element={<FarmAdminDashboard />} />
                        <Route path="/farm-admin/user-management" element={<FarmAdminUserManagement />} />
                        <Route path="/farm-admin/user-management/employees" element={<FarmAdminUserManagement />} />
                        <Route path="/farm-admin/user-management/tasks" element={<FarmAdminUserManagement />} />
                        <Route path="/farm-admin/user-management/work-groups" element={<FarmAdminUserManagement />} />
                        <Route path="/farm-admin/equipment" element={<FarmAdminEquipment />} />
                        <Route path="/farm-admin/financial" element={<FarmAdminFinancial />} />
                        <Route path="/farm-admin/financial/wages" element={<FarmAdminFinancial />} />
                        <Route path="/farm-admin/financial/income" element={<FarmAdminFinancial />} />
                        <Route path="/farm-admin/financial/water" element={<FarmAdminFinancial />} />
                        <Route path="/farm-admin/financial/invoices" element={<FarmAdminFinancial />} />
                        <Route path="/farm-admin/aquaponics" element={<FarmAdminAquaponics />} />
                    </Route>

                    {/* Auth pages */}
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />

                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </>
    );
}
