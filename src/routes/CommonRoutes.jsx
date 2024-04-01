
import { Route, Routes, BrowserRouter } from "react-router-dom";
import TopNavigationBar from "../components/TopNavigationBar";
import SignIn from "../pages/SignIn";
import Booking from "../pages/Booking";
import Traveller from "../pages/Traveller";
import Train from '../pages/Train'
import AdminDashboard from "../pages/AdminDashboard";
import CommonView from "../pages/CommonView";
import Welcome from "../pages/welcomeScreen";


export default function CommonRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<CommonView />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/employees" element={<AdminDashboard />} />
          <Route path="/travellers" element={<Traveller />} />
          <Route path="/bookings" element={<Booking />} />
          <Route path="/trains" element={<Train />} />
          <Route path="/*" element={<div>404 page not found!</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
