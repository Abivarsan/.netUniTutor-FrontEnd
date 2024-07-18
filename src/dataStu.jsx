import {
  Dashboard as DashboardIcon,
  Edit,
  List,
  Checklist,
  Sms,
  Logout,
  AttachMoney,
  Search as SearchIcon,
 
  Settings as SettingsIcon,
  Help as HelpIcon,
} from "@mui/icons-material";
import ForumIcon from '@mui/icons-material/Forum';
import Groups2Icon from '@mui/icons-material/Groups2';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Comment from "./Comment";




import Mysubjects from "./Student/MyTutors"

import Settingst from "./Tutor/Settings";
import Helpst from "./Comment";
import DashboardSt from "./Student/DashboardSt";
import EditprofileSt from "./Student/Editprofile";
import Search from "./Student/Search";

import Requested from "./Student/Requested";

const data = [
  {
    id: 0,
    label: "Dashboard",
    icon: <DashboardIcon />,
    component: <DashboardSt />,
    path: "/signin/Student/Dashboard",
  },
  {
    id: 1,
    label: "Editprofile",
    icon: <Edit />,
    component: <EditprofileSt />,
    path: "/signin/Student/Editprofile",
  },
  {
    id: 2,
    label: "SearchTutors",
    icon: <SearchIcon />,
    component: <Search />,
    path: "/signin/Student/Search",
  },
 
  {
    id: 3,
    label: "MySubjects",
    icon: <Groups2Icon />,
    component: <Mysubjects />,
    path: "/signin/Student/MySubjects",
  },
  {
    id: 4,
    label: "Requested",
    icon: <AddTaskIcon />,
    component: <Requested />,
    path: "/signin/Student/Requested",
  },
  {
    id: 5,
    label: "Comment",
    icon: <ForumIcon />,
    component: <Comment />,
    path: "/signin/Student/Comment",
  },
  {
    id: 6,
    label: "Logout",
    icon: <Logout />,
    component: "",
    path: "/signin",
  },
];

export default data;
