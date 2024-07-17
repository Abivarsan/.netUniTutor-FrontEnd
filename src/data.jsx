import {
  Dashboard as DashboardIcon,
  Edit,
  List,
  Logout,
  AttachMoney,
  PeopleAlt,
  MenuBook,
} from "@mui/icons-material";
import ForumIcon from '@mui/icons-material/Forum';
import Groups2Icon from '@mui/icons-material/Groups2';

import Dashboard from "./Tutor/Dashboard";
import Editprofile from "./Tutor/Editprofile";
import Requestlist from "./Tutor/Requestlist";
import Coinbank from "./Tutor/Coinbank";
import Invitefriend from "./Tutor/Invitefriend";
import SignInSide from "./Signin";
import MyStudents from "./Tutor/MyStudents";
import Comment from "./Comment";

const data = [
  {
    id: 0,
    label: "Dashboard",
    icon: <DashboardIcon />,
    component: <Dashboard />,
    path: "/signin/Tutor/Dashboard",
  },
  {
    id: 1,
    label: "Editprofile",
    icon: <Edit />,
    component: <Editprofile />,
    path: "/signin/Tutor/Editprofile",
  },
  {
    id: 1,
    label: "My Subjects",
    icon: <MenuBook />,
    component: <Editprofile />,
    path: "/signin/Tutor/my-subjects",
  },
  {
    id: 2,
    label: "Requestlist",
    icon: <List />,
    component: <Requestlist />,
    path: "/signin/Tutor/requestlist",
  },
  {
    id: 3,
    label: "My Students",
    icon: <Groups2Icon />,
    component: <MyStudents />,
    path: "/signin/Tutor/MyStudents",
  },

  {
    id: 4,
    label: "Coinbank",
    icon: <AttachMoney />,
    component: <Coinbank />,
    path: "/signin/Tutor/Coinbank",
  },

  {
    id: 5,
    label: "Invitefriend",
    icon: <PeopleAlt />,
    component: <Invitefriend />,
    path: "/signin/Tutor/Invitefriend",
  },
  
  {
    id: 6,
    label: "Comments",
    icon: <ForumIcon />,
    component: <Comment />,
    path: "/signin/Tutor/Comment",
  },
  {
    id: 7,
    label: "Logout",
    icon: <Logout />,
    component: <SignInSide />,
    path: "/signin",
  },
];

export default data;
