// // import React, { useEffect, useState } from "react";
// // import RequestTable from "../../Components/RequestTable/RequestTable";
// // import { CircularProgress, Container, Typography } from "@mui/material";
// // import axios from "axios";
// // import "./Requests.scss";
// // import { toast } from "react-toastify";

// // const Requests: React.FC = () => {
// //   const [requests, setRequests] = useState<
// //     { id: number; name: string; email: string; avatarUrl: string }[]
// //   >([]);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     const fetchRequests = async () => {
// //       try {
// //         const response = await axios.get("https://localhost:7248/api/Admin/tutors");
// //         setRequests(
// //           response.data.map((request: any) => ({
// //             ...request,
// //             name: `${request.firstName} ${request.lastName}`,
// //           }))
// //         );
// //         setLoading(false);
// //       } catch (error) {
// //         console.error("Error fetching requests:", error);
// //         setError("Failed to fetch requests. Please try again later.");
// //         setLoading(false);
// //       }
// //     };

// //     fetchRequests();
// //   }, []);

// //   const handleAccept = async (id: number) => {
// //     try {
// //       setLoading(true);
// //       await axios.post(`https://localhost:7248/api/Admin/accepttutor/${id}`);
// //       setRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
// //       toast.success("Tutor request accepted successfully.");
// //       setLoading(false);
// //     } catch (error) {
// //       console.error("Error accepting request:", error);
// //       setError("Failed to send verification email. Please try again.");
      
// //       setLoading(false);
// //     }
// //   };

// //   const handleReject = async (id: number) => {
// //     try {
// //       setLoading(true);
// //       await axios.delete(`https://localhost:7248/api/Admin/rejecttutor/${id}`);
// //       setRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
// //       setLoading(false);
// //       toast.success("Tutor request rejected successfully.");
// //     } catch (error) {
// //       console.error("Error rejecting request:", error);
// //       setError("Failed to reject request. Please try again.");
// //       setLoading(false);
// //     }
// //   };

// //   if (loading) return <CircularProgress />;
// //   if (error) return <Typography color="error">{error}</Typography>;

// //   return (
// //     <div className="requests">
// //       <Container className="admin-account-requests">
// //         <Typography variant="h5" gutterBottom>
// //          <h1>Tutor Account Requests</h1> 
// //         </Typography>
// //         <RequestTable
// //           requests={requests}
// //           onAccept={handleAccept}
// //           onReject={handleReject}
// //         />
// //       </Container>
// //     </div>
// //   );
// // };

// // export default Requests;
// import React, { useEffect, useState } from "react";
// import RequestTable from "../../Components/RequestTable/RequestTable";
// import { CircularProgress, Container, Typography } from "@mui/material";
// import axios from "axios";
// import "./Requests.scss";
// import { toast } from "react-toastify";
// import AlertBox from "../../../components/common/Alert";

// const Requests: React.FC = () => {
//   const [requests, setRequests] = useState<
//     { _id: number; name: string; universityMail: string; ProfileUrl: string }[]
//   >([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [alertOpen, setAlertOpen] = useState<boolean>(false);
//   const [alertTitle, setAlertTitle] = useState<string>("");
//   const [alertMessage, setAlertMessage] = useState<string>("");
//   const [currentId, setCurrentId] = useState<number | null>(null);
//   const [actionType, setActionType] = useState<string>("");

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const response = await axios.get("http://localhost:5025/api/Admin/TutorVerification");
//         setRequests(
//           response.data.map((request: any) => ({
//             ...request,
//             name: `${request.firstName} ${request.lastName}`,
//           }))
//         );
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching requests:", error);
//         setError("Failed to fetch requests. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchRequests();
//   }, []);

//   const handleAccept = async () => {
//     if (currentId === null) return;
//     try {
//       setLoading(true);
//       await axios.post(`http://localhost:5025/api/Admin/accepttutor/${currentId}`);
//       setRequests((prevRequests) => prevRequests.filter((request) => request._id !== currentId));
//       toast.success("Tutor request accepted successfully.");
//       setLoading(false);
//       handleCloseAlert();
//     } catch (error) {
//       console.error("Error accepting request:", error);
//       setError("Failed to send verification email. Please try again.");
//       setLoading(false);
//     }
//   };

//   const handleReject = async () => {
//     if (currentId === null) return;
//     try {
//       setLoading(true);
//       await axios.delete(`http://localhost:5025/api/Admin/rejecttutor/${currentId}`);
//       setRequests((prevRequests) => prevRequests.filter((request) => request._id !== currentId));
//       toast.success("Tutor request rejected successfully.");
//       setLoading(false);
//       handleCloseAlert();
//     } catch (error) {
//       console.error("Error rejecting request:", error);
//       setError("Failed to reject request. Please try again.");
//       setLoading(false);
//     }
//   };

//   const handleOpenAlert = (id: number, type: string) => {
//     setCurrentId(id);
//     setActionType(type);
//     if (type === "accept") {
//       setAlertTitle("Accept Tutor");
//       setAlertMessage("Are you sure you want to accept this tutor?");
//     } else if (type === "reject") {
//       setAlertTitle("Reject Tutor");
//       setAlertMessage("Are you sure you want to reject this tutor?");
//     }
//     setAlertOpen(true);
//   };

//   const handleCloseAlert = () => {
//     setAlertOpen(false);
//     setCurrentId(null);
//     setActionType("");
//   };

//   if (loading) return <CircularProgress />;
//   if (error) return <Typography color="error">{error}</Typography>;

//   return (
//     <div className="requests">
//       <Container className="admin-account-requests">
//         <Typography variant="h5" gutterBottom>
//           <h1>Tutor Account Requests</h1>
//         </Typography>
//         <RequestTable
//           requests={requests}
//           onAccept={(_id) => handleOpenAlert(_id, "accept")}
//           onReject={(_id) => handleOpenAlert(_id, "reject")}
//         />
//       </Container>
//       <AlertBox
//         open={alertOpen}
//         title={alertTitle}
//         message={alertMessage}
//         onClose={handleCloseAlert}
//         onAgree={actionType === "accept" ? handleAccept : handleReject}
//       />
//     </div>
//   );
// };

// export default Requests;
import React, { useEffect, useState } from "react";
import RequestTable from "../../Components/RequestTable/RequestTable";
import { 
  Box,
  Button, 
  CircularProgress, 
  Container, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  TextField, 
  Typography 
} from "@mui/material";
import axios from "axios";
import "./Requests.scss";
import { toast } from "react-toastify";
import ImageViewerDialog from "../../Components/ImageViewerDialog/ImageViewerDialog";

const Requests: React.FC = () => {
  const [requests, setRequests] = useState<
    {
      _id: number;
      name: string;
      createdAt: string;
      universityMail: string;
      ProfileUrl: string;
      cv: string;
      universityID: string;
    }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [actionType, setActionType] = useState<string>("");
  const [imageViewerOpen, setImageViewerOpen] = useState<boolean>(false);
  const [imageToView, setImageToView] = useState<string>("");
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({
    username: "",
    password: "",
  });
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5025/api/Admin/TutorVerification");
        setRequests(
          response.data.map((request: any) => ({
            ...request,
            name: `${request.firstName} ${request.lastName}`,
          }))
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setError("Failed to fetch requests. Please try again later.");
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAcceptConfirm = async () => {
    if (currentId === null) return;
    try {
      setLoading(true);
      await axios.post(`http://localhost:5025/api/Admin/accepttutor/${currentId}`);
      setRequests((prevRequests) => prevRequests.filter((request) => request._id !== currentId));
      toast.success("Tutor request accepted successfully.");
      setLoading(false);
    } catch (error) {
      console.error("Error accepting request:", error);
      setError("Failed to send verification email. Please try again.");
      setLoading(false);
    }
  };

  const handleRejectConfirm = async () => {
    if (currentId === null) return;
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5025/api/Admin/rejecttutor/${currentId}`);
      setRequests((prevRequests) => prevRequests.filter((request) => request._id !== currentId));
      toast.success("Tutor request rejected successfully.");
      setLoading(false);
    } catch (error) {
      console.error("Error rejecting request:", error);
      setError("Failed to reject request. Please try again.");
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`http://localhost:5025/api/Admin/relogin`, adminCredentials);
      if (response.data.success) {
        setLoginDialogOpen(false);
        if (actionType === "accept") {
          handleAcceptConfirm();
        } else if (actionType === "reject") {
          setEmailDialogOpen(true);
        }
      } else {
        toast.error("Invalid login credentials");
      }
    } catch (error) {
      console.error("Error during admin login:", error);
      toast.error("An error occurred during login. Please try again.");
    }
  };

  const handleSendEmail = async () => {
    try {
      setIsLoading(true);
      if (currentId === null) return;

      const currentRequest = requests.find((request) => request._id === currentId);
      if (!currentRequest) return;

      await axios.post("http://localhost:5025/api/Admin/Report/send-email", {
        to: currentRequest.universityMail,
        message: emailMessage,
      });

      handleRejectConfirm();
      setIsLoading(false);
      setEmailDialogOpen(false);
      toast.success("Email sent successfully.");
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Error sending email.");
      setIsLoading(false);
    }
  };

  const handleViewImage = (imageUrl: string) => {
    setImageToView(imageUrl);
    setImageViewerOpen(true);
  };

  const handleCloseImageViewer = () => {
    setImageViewerOpen(false);
    setImageToView("");
  };

  const handleOpenAlert = (id: number, type: string) => {
    setCurrentId(id);
    setActionType(type);
    if (type === "accept") {
      setAcceptDialogOpen(true);
    } else if (type === "reject") {
      setRejectDialogOpen(true);
    }
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="100vh"
        bgcolor="#f5f5f5" 
        p={4}
      >
        <Box textAlign="center">
          <CircularProgress size={80} thickness={5} />
          <Typography 
            variant="h6" 
            style={{ 
              marginTop: 16, 
              color: '#3f51b5', 
              fontWeight: 'bold'
            }}
          >
            Please wait...
          </Typography>
        </Box>
      </Box>
    );
  }
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div className="requests">
      <Container className="admin-account-requests">
        <Typography variant="h4" gutterBottom>
          <h3>TUTOR ACCOUNT REQUESTS</h3>
        </Typography>
        <RequestTable
          requests={requests}
          onAccept={(_id) => handleOpenAlert(_id, "accept")}
          onReject={(_id) => handleOpenAlert(_id, "reject")}
          onViewCv={(cv) => handleViewImage(cv)}
          onViewUniversityId={(universityID) => handleViewImage(universityID)}
        />
      </Container>

      {/* Accept Confirmation Dialog */}
      <Dialog
        open={acceptDialogOpen}
        onClose={() => setAcceptDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Accept Tutor</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to accept this tutor?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAcceptDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              setAcceptDialogOpen(false);
              setLoginDialogOpen(true);
            }}
            color="success"
            autoFocus
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reject Confirmation Dialog */}
      <Dialog
        open={rejectDialogOpen}
        onClose={() => setRejectDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Reject Tutor</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to reject this tutor?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              setRejectDialogOpen(false);
              setLoginDialogOpen(true);
            }}
            color="error"
            autoFocus
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>

      {/* Admin Login Dialog */}
      <Dialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Admin Login</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please enter your admin credentials to continue.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            value={adminCredentials.username}
            onChange={(e) =>
              setAdminCredentials({
                ...adminCredentials,
                username: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={adminCredentials.password}
            onChange={(e) =>
              setAdminCredentials({
                ...adminCredentials,
                password: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoginDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogin} color="success">
            Login
          </Button>
        </DialogActions>
      </Dialog>

      {/* Email Dialog */}
      <Dialog
        open={emailDialogOpen}
        onClose={() => setEmailDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Send Rejection Email</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please edit the message below before sending the rejection email.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="emailMessage"
            label="Email Message"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="standard"
            value={emailMessage}
            onChange={(e) => setEmailMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEmailDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSendEmail}
            color="success"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Send Email"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Viewer Dialog */}
      <ImageViewerDialog
        open={imageViewerOpen}
        onClose={handleCloseImageViewer}
        imageUrl={imageToView}
      />
    </div>
  );
};

export default Requests;
