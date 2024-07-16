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
import { CircularProgress, Container, Typography } from "@mui/material";
import axios from "axios";
import "./Requests.scss";
import { toast } from "react-toastify";
import AlertBox from "../../../components/common/Alert";
import ImageViewerDialog from "../../Components/ImageViewerDialog/ImageViewerDialog";

const Requests: React.FC = () => {
  const [requests, setRequests] = useState<
    {
      _id: number;
      name: string;
      universityMail: string;
      ProfileUrl: string;
      cv: string;
      universityID: string;
      CreatedAt : string;
    }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertTitle, setAlertTitle] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [actionType, setActionType] = useState<string>("");
  const [imageViewerOpen, setImageViewerOpen] = useState<boolean>(false);
  const [imageToView, setImageToView] = useState<string>("");

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

  const handleAccept = async () => {
    if (currentId === null) return;
    try {
      setLoading(true);
      await axios.post(`http://localhost:5025/api/Admin/accepttutor/${currentId}`);
      setRequests((prevRequests) => prevRequests.filter((request) => request._id !== currentId));
      toast.success("Tutor request accepted successfully.");
      setLoading(false);
      handleCloseAlert();
    } catch (error) {
      console.error("Error accepting request:", error);
      setError("Failed to send verification email. Please try again.");
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (currentId === null) return;
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5025/api/Admin/rejecttutor/${currentId}`);
      setRequests((prevRequests) => prevRequests.filter((request) => request._id !== currentId));
      toast.success("Tutor request rejected successfully.");
      setLoading(false);
      handleCloseAlert();
    } catch (error) {
      console.error("Error rejecting request:", error);
      setError("Failed to reject request. Please try again.");
      setLoading(false);
    }
  };

  const handleOpenAlert = (_id: number, type: string) => {
    setCurrentId(_id);
    setActionType(type);
    if (type === "accept") {
      setAlertTitle("Accept Tutor");
      setAlertMessage("Are you sure you want to accept this tutor?");
    } else if (type === "reject") {
      setAlertTitle("Reject Tutor");
      setAlertMessage("Are you sure you want to reject this tutor?");
    }
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
    setCurrentId(null);
    setActionType("");
  };

  const handleViewImage = (imageUrl: string) => {
    setImageToView(imageUrl);
    setImageViewerOpen(true);
  };

  const handleCloseImageViewer = () => {
    setImageViewerOpen(false);
    setImageToView("");
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div className="requests">
      <Container className="admin-account-requests">
        <Typography variant="h5" gutterBottom>
          <h1>Tutor Account Requests</h1>
        </Typography>
        <RequestTable
          requests={requests}
          onAccept={(_id) => handleOpenAlert(_id, "accept")}
          onReject={(_id) => handleOpenAlert(_id, "reject")}
          onViewCv={(cv) => handleViewImage(cv)}
          onViewUniversityId={(universityID) => handleViewImage(universityID)}
        />
      </Container>
      <AlertBox
        open={alertOpen}
        title={alertTitle}
        message={alertMessage}
        onClose={handleCloseAlert}
        onAgree={actionType === "accept" ? handleAccept : handleReject}
      />
      <ImageViewerDialog
        open={imageViewerOpen}
        imageUrl={imageToView}
        onClose={handleCloseImageViewer}
      />
    </div>
  );
};

export default Requests;
