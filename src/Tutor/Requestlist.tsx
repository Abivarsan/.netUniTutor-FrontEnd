// import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from "@mui/material";
// import RequestCard from "./RequestCardN";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { RequestResponse } from "../data/interfaces";
// import { toast } from "react-toastify";
// import PopupModal from "../components/common/PopupModal";
// import RequestDetails from "../components/common/subject-requests/RequestDetails";
// import { useNavigate } from "react-router-dom";

// export default function Requestlist() {
//   const [requests, setRequests] = useState<RequestResponse[]>([]);
//   const [selectedRequest, setSelectedRequest] =
//     useState<RequestResponse | null>(null);
//   const navigate = useNavigate();

//   const [isFetching, setIsFetching] = useState(true);
//   const [coinsCount, setCoinsCount] = useState<number>(0);
//   const [buyCoinOpen, setBuyCoinOpen] = useState(false);
//   const [isAccepting, setIsAccepting] = useState(false); // New state for tracking loading

//   const handleBuyCoinClose = () => {
//     setBuyCoinOpen(false);
//   };

//   const tutorId = localStorage.getItem("userId");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const coinsCountResponse = await axios.get<number>(
//           `http://localhost:5025/api/Transaction/totalamount/${tutorId}`
//         );
//         setCoinsCount(coinsCountResponse.data);
//       } catch (error) {
//         console.error("Error fetching data", error);
//       }
//     };

//     if (tutorId) {
//       fetchData();
//     }
//   }, [tutorId]);

//   const fetchRequests = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5025/api/Request/tutor/${tutorId}`
//       );
//       if (response.status === 200) {
//         setRequests(response.data);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch requests");
//     }
//   };

//   useEffect(() => {
//     setIsFetching(true);
//     fetchRequests();
//     setIsFetching(false);
//   }, []);

//   const handleRequest = async (id: number, isAccept: boolean) => {
//     if (isAccept) {
//       if (coinsCount > 0) {
//         setIsAccepting(true); // Set loading state to true
//         try {
//           const response = await axios.put(
//             `http://localhost:5025/api/Request/request/${id}`,
//             {
//               status: "ACCEPTED",
//             }
//           );
//           if (response.status === 200) {
//             toast.success("Request accepted");
//             fetchRequests();
//             setSelectedRequest(null);
//           }
//         } catch (error) {
//           console.error(error);
//           toast.error("Failed to accept request");
//         } finally {
//           setIsAccepting(false); // Set loading state to false
//         }
//       } else {
//         setBuyCoinOpen(true);
//       }
//       return;
//     }

//     try {
//       const response = await axios.put(
//         `http://localhost:5025/api/Request/request/${id}`,
//         {
//           status: "REJECTED",
//         }
//       );
//       if (response.status === 200) {
//         toast.success("Request rejected");
//         fetchRequests();
//         setSelectedRequest(null);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to reject request");
//     }
//   };

//   if (isFetching) {
//     return (
//       <Box p={1}>
//         <h1>Loading...</h1>
//       </Box>
//     );
//   }

//   return (
//     <>
//       <Box p={2}>
//         <Grid container spacing={2}>
//           {requests.length > 0 ? (
//             requests.map((request) => (
//               <Grid key={request._id} item sm={12} md={3}>
//                 <RequestCard
//                   request={request}
//                   onSelectRequest={(request: RequestResponse) => {
//                     setSelectedRequest(request);
//                   }}
//                 />
//               </Grid>
//             ))
//           ) : (
//             <h1>No requests found</h1>
//           )}
//         </Grid>
//       </Box>

//       {selectedRequest && (
//         <PopupModal
//           open={!!selectedRequest}
//           onClose={() => setSelectedRequest(null)}
//         >
//           <RequestDetails
//             request={selectedRequest}
//             handleRequest={handleRequest}
//           />
//         </PopupModal>
//       )}

//       <Dialog
//         open={buyCoinOpen}
//         onClose={handleBuyCoinClose}
//       >
//         <DialogTitle>Insufficient Coins</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             You do not have enough coins to accept this request. Please add coins to your wallet.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => navigate("/Tutor/Coinbank")} color="primary">
//             Add Coins
//           </Button>
//           <Button onClick={handleBuyCoinClose} color="primary">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {isAccepting &&  (
//         <Dialog
//           open={isAccepting}
//           onClose={() => {}}
//           sx={{ textAlign: "center" }}
//         >
//           <DialogContent>
//             <CircularProgress />
//             <DialogContentText>
//               Processing request, please wait...
//             </DialogContentText>
//           </DialogContent>
//         </Dialog>
//       )}
//     </>
//   );
// }

import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@mui/material";
import RequestCard from "./RequestCardN";
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { RequestResponse } from "../data/interfaces";
import { toast } from "react-toastify";
import PopupModal from "../components/common/PopupModal";
import RequestDetails from "../components/common/subject-requests/RequestDetails";
import { useNavigate } from "react-router-dom";

export default function Requestlist() {
  const [requests, setRequests] = useState<RequestResponse[]>([]);
  const [selectedRequest, setSelectedRequest] =
    useState<RequestResponse | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(""); // New state for search query
  const navigate = useNavigate();

  const [isFetching, setIsFetching] = useState(true);
  const [coinsCount, setCoinsCount] = useState<number>(0);
  const [buyCoinOpen, setBuyCoinOpen] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false); // New state for tracking loading

  const handleBuyCoinClose = () => {
    setBuyCoinOpen(false);
  };

  const tutorId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coinsCountResponse = await axios.get<number>(
          `http://localhost:5025/api/Transaction/totalamount/${tutorId}`
        );
        setCoinsCount(coinsCountResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    if (tutorId) {
      fetchData();
    }
  }, [tutorId]);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5025/api/Request/tutor/${tutorId}`
      );
      if (response.status === 200) {
        setRequests(response.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch requests");
    }
  };

  useEffect(() => {
    setIsFetching(true);
    fetchRequests();
    setIsFetching(false);
  }, []);

  const handleRequest = async (id: number, isAccept: boolean) => {
    if (isAccept) {
      if (coinsCount > 0) {
        setIsAccepting(true); // Set loading state to true
        try {
          const response = await axios.put(
            `http://localhost:5025/api/Request/request/${id}`,
            {
              status: "ACCEPTED",
            }
          );
          if (response.status === 200) {
            toast.success("Request accepted");
            fetchRequests();
            setSelectedRequest(null);
          }
        } catch (error) {
          console.error(error);
          toast.error("Failed to accept request");
        } finally {
          setIsAccepting(false); // Set loading state to false
        }
      } else {
        setBuyCoinOpen(true);
      }
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5025/api/Request/request/${id}`,
        {
          status: "REJECTED",
        }
      );
      if (response.status === 200) {
        toast.success("Request rejected");
        fetchRequests();
        setSelectedRequest(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to reject request");
    }
  };

  const filteredRequests = requests.filter(request => 
    request.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isFetching) {
    return (
      <Box p={1}>
        <h1>Loading...</h1>
      </Box>
    );
  }

  return (
    <>
      <Box p={2}>
        <TextField 
           
          variant="outlined" 
         placeholder="Search requests..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          margin="normal"
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: "#bbb", mr: 1 }} />,
          }}
          sx={{
            bgcolor: "#D6E6F0",
            
          }}
        />
        <Grid container spacing={2}>
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <Grid key={request._id} item sm={12} md={3}>
                <RequestCard
                  request={request}
                  onSelectRequest={(request: RequestResponse) => {
                    setSelectedRequest(request);
                  }}
                />
              </Grid>
            ))
          ) : (
            <h1>No requests found</h1>
          )}
        </Grid>
      </Box>

      {selectedRequest && (
        <PopupModal
          open={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
        >
          <RequestDetails
            request={selectedRequest}
            handleRequest={handleRequest}
          />
        </PopupModal>
      )}

      <Dialog
        open={buyCoinOpen}
        onClose={handleBuyCoinClose}
      >
        <DialogTitle>Insufficient Coins</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You do not have enough coins to accept this request. Please add coins to your wallet.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate("/signin/Tutor/Coinbank")} color="primary">
            Add Coins
          </Button>
          <Button onClick={handleBuyCoinClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {isAccepting &&  (
        <Dialog
          open={isAccepting}
          onClose={() => {}}
          sx={{ textAlign: "center" }}
        >
          <DialogContent>
            <CircularProgress />
            <DialogContentText>
              Processing request, please wait...
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
