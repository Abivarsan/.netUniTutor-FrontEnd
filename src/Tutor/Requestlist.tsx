import { Box, Grid } from "@mui/material";
import RequestCard from "./RequestCardN";
import { useEffect, useState } from "react";
import axios from "axios";
import { RequestResponse } from "../data/interfaces";
import { toast } from "react-toastify";
import PopupModal from "../components/common/PopupModal";
import RequestDetails from "../components/common/subject-requests/RequestDetails";

export default function Requestlist() {
  const [requests, setRequests] = useState<RequestResponse[]>([]);
  const [selectedRequest, setSelectedRequest] =
    useState<RequestResponse | null>(null);

  const [isFetching, setIsFetching] = useState(true);

  const fetchRequests = async () => {
    const tutorId = 2;
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

  const handleRequest = async (id: number, isAccept: boolean) => {};
  
  if (isFetching) {
    return (
      <Box p={1}>
        <h1>Loading...</h1>
      </Box>
    );
  }

  return (
    <>
      <Box p={1}>
        <Grid container spacing={2}>
          {requests.length > 0 ? (
            requests.map((request) => (
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
    </>
  );
}
