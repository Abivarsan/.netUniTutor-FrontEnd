// import React, { useState } from "react";
// import "./Menu.scss";
// import { Link, useNavigate } from "react-router-dom";
// import { menu } from "../../Data";
// import "../../Styles/responsive.scss";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Button,
// } from "@mui/material";

// const Menu = () => {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);

//   const handleLogoutClick = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//     setOpen(false);
//   };

//   return (
//     <div className="menu">
//       {menu.map((item) => (
//         <div className="item" key={item.id}>
//           <span className="title">{item.title}</span>
//           {item.listItems.map((listItem) => (
//             listItem.title === "Log Out" ? (
//               <span
//                 className="listItem"
//                 key={listItem.id}
//                 onClick={handleLogoutClick}
//                 style={{ cursor: "pointer" }}
//               >
//                 <>{listItem.icon}</>
//                 <span className="listItemTitle">{listItem.title}</span>
//               </span>
//             ) : (
//               <Link to={listItem.url} className="listItem" key={listItem.id}>
//                 <>{listItem.icon}</>
//                 <span className="listItemTitle">{listItem.title}</span>
//               </Link>
//             )
//           ))}
//         </div>
//       ))}

//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             Are you sure you want to log out?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleLogout} color="primary" autoFocus>
//             Log Out
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default Menu;
import React, { useState } from "react";
import "./Menu.scss";
import { Link, useNavigate } from "react-router-dom";
import { menu } from "../../Data";
import "../../Styles/responsive.scss";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Slide,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Menu = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogoutClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
    setOpen(false);
  };

  return (
    <div className="menu">
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItem) => (
            listItem.title === "Log Out" ? (
              <span
                className="listItem"
                key={listItem.id}
                onClick={handleLogoutClick}
                style={{ cursor: "pointer" }}
              >
                <>{listItem.icon}</>
                <span className="listItemTitle">{listItem.title}</span>
              </span>
            ) : (
              <Link to={listItem.url} className="listItem" key={listItem.id}>
                <>{listItem.icon}</>
                <span className="listItemTitle">{listItem.title}</span>
              </Link>
            )
          ))}
        </div>
      ))}

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
            bgcolor: '#f5f5f5',
            boxShadow: 24,
          },
        }}
      >
        <DialogTitle id="alert-dialog-slide-title" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Confirm Logout</Typography>
          <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LogoutIcon color="error" sx={{ fontSize: 40, mr: 2 }} />
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure you want to log out?
            </DialogContentText>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} variant="contained" color="error">
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Menu;
