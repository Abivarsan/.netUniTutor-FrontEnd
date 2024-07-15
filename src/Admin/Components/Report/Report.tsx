import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";

interface Report {
  reportId: number;
  description: string;
  reportedDate: string;
  reporterId: number;
  reportedId: number;
  reporterType: string;
  reportedType: string;
}

const ReportList: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5025/api/Reports/Al"
        );
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    fetchReports();
  }, []);

  const handleSuspend = async (reportedId: number, reportedType: string) => {
    try {
      await axios.post(
        `http://localhost:5025/api/Reports/suspend?userId=${reportedId}&userType=${reportedType}`,
        { userId: reportedId, userType: reportedType }
      );
      toast.success("User suspended.");
    } catch (error) {
      console.error("Error suspending user:", error);
      toast.error("Error suspending user.");
    }
  };

  const handleRestore = async (reportedId: number, reportedType: string) => {
    try {
      await axios.post(
        `http://localhost:5025/api/Reports/restore?userId=${reportedId}&userType=${reportedType}`,
        { userId: reportedId, userType: reportedType }
      );
      toast.success("User restored successfully.");
    } catch (error) {
      console.error("Error restoring user:", error);
      toast.error("Error restoring user.");
    }
  };

  return (
    <div>
      <Typography variant="h4" color={"darkblue"}>
        Reports
      </Typography>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {reports.map((report) => (
          <Grid item xs={12} md={6} lg={4} key={report.reportId}>
            <Card
              sx={{
                borderRadius: 3,
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardContent>
                <Typography variant="body1">Description</Typography>
                <Typography variant="body2" color="text.secondary">
                  {report.description}
                </Typography>
                <Typography variant="body1" component="div" sx={{ mt: 2 }}>
                  Reported Date
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {report.reportedDate}
                </Typography>
                <Typography variant="body1" component="div" sx={{ mt: 2 }}>
                  Reporter ID
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {report.reporterId}
                </Typography>
                <Typography variant="body1" component="div" sx={{ mt: 2 }}>
                  Reported ID
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {report.reportedId}
                </Typography>
                <Grid
                  container
                  spacing={2}
                  sx={{ mt: 2 }}
                  display={"flex"}
                  alignItems={"space-between"}
                  justifyContent={"space-between"}
                >
                  <Grid item>
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      onClick={() =>
                        handleSuspend(report.reportedId, report.reportedType)
                      }
                    >
                      Suspend
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      size="small"
                      color="success"
                      onClick={() =>
                        handleRestore(report.reportedId, report.reportedType)
                      }
                    >
                      Restore
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ReportList;
