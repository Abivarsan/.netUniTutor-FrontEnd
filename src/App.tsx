import React from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import SignInSide from "./Signin";
import Forgot from "./forget";
import Otp from "./otp";
import Reset from "./reset";
import ResetSuccess from "./resetSux";
import Register from "./Register";
import StudentForm from "./StudentForm";
import TutorForm1 from "./TutorForm1";
import Sidebar from "./Tutor/Sidebar";
import Dashboard from "./Tutor/Dashboard";
import Editprofile from "./Tutor/Editprofile";
import Requestlist from "./Tutor/Requestlist";
import Message from "./Tutor/Message";
import Paymentdetail from "./Tutor/Paymentdetail";
import Coinbank from "./Tutor/Coinbank";
import Invitefriend from "./Tutor/Invitefriend";
import Settings from "./Tutor/Settings";
// import BuyCoins from "./Tutor/BuyCoins";

import Sidebarst from "./Student/SidebarSt";
import DashboardSt from "./Student/DashboardSt";
import SearchSt from "./Student/Search";
import Helpst from "./Student/Help";
import MyTutors from "./Student/MyTutors";



import Home from "./Admin/Pages/HomePage/Home";
import Students from "./Admin/Pages/StudentsPage/Students";
import Tutors from "./Admin/Pages/TutorsPage/Tutors";
import Navbar from "./Admin/Components/Navbar/Navbar";
import Footer from "./Admin/Components/Footer/Footer";
import Menu from "./Admin/Components/Menu/Menu";
import Login from "./Admin/Pages/LoginPage/Login";
import "./Admin/Styles/global.scss";
import Student from "./Admin/Pages/StudentPage/Student";
import Tutor from "./Admin/Pages/TutorPage/Tutor";
import Charts from "./Admin/Pages/ChartsPage/Charts";
import Requests from "./Admin/Pages/Requestpage/Requests";
import Requested from "./Student/Requested";
import CommentsPage from "./Admin/Pages/CommentsPage/CommentsPage";
import SettingsPage from "./Admin/Pages/SettingsPage/SettingsPage";
import { Bounce, ToastContainer } from "react-toastify";
import MyStudents from "./Tutor/MyStudents";
import MySubjects from "./pages/MySubjects";
// import CoverPage from "./Advertise";
import Comment from "./Comment";
import ReportPage from "./Admin/Components/Report/Report";


import EditProfilest from "./Student/Editprofile";
import { Logout } from "@mui/icons-material";
import Mysubjects from "./Student/MyTutors";
import RegistrationSuccess from "./Registrationsux";
import NavBar from "./ChatApp/components/NavBar";
import { auth1 } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import UserList from "./ChatApp/components/UserList";
import Welcome from "./ChatApp/components/Welcome";


const Layout: React.FC = () => {
 
  return (
    <div className="main">
      <Navbar />
      <div className="container">
        <div className="menuContainer">
          <Menu />
        </div>
        <div className="contentContainer">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

const TutorRoutes: React.FC = () => (
  <>
    <Sidebar />
    <div style={{ marginLeft: "64px", marginTop: "64px" }}>
      <Routes>
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="editprofile" element={<Editprofile/>} />
        <Route path="requestlist" element={<Requestlist />} />
        <Route path="MyStudents" element={<MyStudents />} />
        <Route path="Comment" element={<Comment />} />
        <Route path="coinbank" element={<Coinbank />} />
        <Route path="paymentdetail" element={<Paymentdetail />} />
        <Route path="invitefriend" element={<Invitefriend />} />
        <Route path="settings" element={<Settings />} />
        <Route path="my-subjects" element={<MySubjects />} />


      </Routes>
    </div>
  </>
);

const StudentRoutes: React.FC = () => (
  <>
    <Sidebarst />
    <div style={{ marginLeft: "64px", marginTop: "64px" }}>
      <Routes>
        <Route path="Dashboard" element={<DashboardSt />} />
        <Route path="editprofile" element={<EditProfilest/>} />
        <Route path="Requested" element={<Requested />} />  
        <Route path="message" element={<Message />} />
        <Route path="MySubjects" element={<Mysubjects />} />
        <Route path="Comment" element={<Comment />} />
        <Route path="Search" element={<SearchSt />} />
      </Routes>
    </div>
  </>
);

function App() {
  const [user] = useAuthState(auth1);
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<CoverPage />} /> */}
          <Route path="/" element={<SignInSide />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/resetpassword" element={<Reset />} />
          <Route path="/success" element={<RegistrationSuccess />} />
          <Route path="/resetSux" element={<ResetSuccess />} />
          <Route path="/register" element={<Register />} />
          <Route path="/studentForm" element={<StudentForm />} />
          <Route path="/TutorForm1" element={<TutorForm1 />} />

          {/* chat Box routing */}

          <Route
            path="/chat"
            element={
              <>
                <NavBar />
                {!user ? (
                  <Welcome />
                ) : (
                  <>
                    <UserList />
                  </>
                )}
                {/* You might need to pass some props to ChatBox here */}
                {/* <ChatBox recipUser={...} /> */}
              </>
            }
          />

          {/* Tutor Routes */}
          <Route path="/Tutor/*" element={<TutorRoutes />} />
          {/* Student Routes */}
          <Route path="/Student/*" element={<StudentRoutes />} />

          {/* Admin Routes */}
          <Route path="/Admin" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="students" element={<Students />} />
            <Route path="tutors" element={<Tutors />} />
            <Route path="student/:id" element={<Student />} />
            <Route path="tutor/:id" element={<Tutor />} />
            <Route path="charts" element={<Charts />} />
            <Route path="requests" element={<Requests />} />
            <Route path="comments" element={<CommentsPage />} />
            <Route path="settings" element={<Settings />} />
            <Route path="reports" element={<ReportPage />} />  
            <Route path="logOut" element={<Logout />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
