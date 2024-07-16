import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import moment from "moment";


interface Report {
  reportId: number;
  description: string;
  date: string;
  reporterId: number;
  reportedId: number;
  reporterType: string;
  reportedType: string;
  email?: string;
  universityMail?: string;
}

const ReportList: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ username: '', password: '' });
  const [emailMessage, setEmailMessage] = useState('');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null); // Initialize as null

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

  const handleSuspendClick = (reportedId: number, reportedType: string) => {
    // Create a temporary object to represent the selected report
    const tempReport: Report = {
      reportId: 0, // Set appropriate default value or placeholder
      description: "",
      date: "",
      reporterId: 0,
      reportedId,
      reporterType: "",
      reportedType,
    };
    setSelectedReport(tempReport);
    setSuspendDialogOpen(true);
  };

  const handleSuspendConfirm = async () => {
    try {
      if (!selectedReport) return; // Ensure selectedReport is not null

      await axios.post(
        `http://localhost:5025/api/Reports/suspend?userId=${selectedReport.reportedId}&userType=${selectedReport.reportedType}`
      );
      setSuspendDialogOpen(false);
      setLoginDialogOpen(true);
    } catch (error) {
      console.error("Error suspending user:", error);
      toast.error("Error suspending user.");
    }
  };

  const handleRestoreClick = (reportedId: number, reportedType: string) => {
    // Create a temporary object to represent the selected report
    const tempReport: Report = {
      reportId: 0, // Set appropriate default value or placeholder
      description: "",
      date: "",
      reporterId: 0,
      reportedId,
      reporterType: "",
      reportedType,
    };
    setSelectedReport(tempReport);
    setRestoreDialogOpen(true);
  };

  const handleRestoreConfirm = async () => {
    try {
      if (!selectedReport) return; // Ensure selectedReport is not null

      await axios.post(
        `http://localhost:5025/api/Reports/restore?userId=${selectedReport.reportedId}&userType=${selectedReport.reportedType}`
      );
      setRestoreDialogOpen(false);
      setLoginDialogOpen(true);
    } catch (error) {
      console.error("Error restoring user:", error);
      toast.error("Error restoring user.");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5025/api/Admin/relogin', adminCredentials);
      if (response.data.success) {
        setLoginDialogOpen(false);
        setEmailDialogOpen(true);
      } else {
        alert('Invalid login credentials');
      }
    } catch (error) {
      console.error("Error during admin login:", error);
    }
  };

  const handleSendEmail = async () => {
    try {
      if (!selectedReport) return; // Ensure selectedReport is not null
  
      const endpoint = `http://localhost:5025/api/Admin/${selectedReport.reportedType === 'student' ? 'Student' : 'Tutor'}details/${selectedReport.reportedId}`;
      const response = await axios.get(endpoint);
  
      const emailOrUniversityMail = selectedReport.reportedType === 'student' ? response.data.email : response.data.universityMail;
  
      await axios.post('http://localhost:5025/api/Admin/Report/send-email', {
        to: emailOrUniversityMail,
        message: emailMessage
      });
      setEmailDialogOpen(false);
      toast.success("Email sent successfully.");
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Error sending email.");
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
                  {moment(report.date).format("DD MMM YYYY - hh:mm A")}
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
                      onClick={() => handleSuspendClick(report.reportedId, report.reportedType)}
                    >
                      Suspend
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      size="small"
                      color="success"
                      onClick={() => handleRestoreClick(report.reportedId, report.reportedType)}
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

      {/* Suspend Confirmation Dialog */}
      <Dialog open={suspendDialogOpen} onClose={() => setSuspendDialogOpen(false)}>
        <DialogTitle>Suspend the account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to suspend this account? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuspendDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSuspendConfirm} color="secondary">Yes, Suspend</Button>
        </DialogActions>
      </Dialog>

      {/* Restore Confirmation Dialog */}
      <Dialog open={restoreDialogOpen} onClose={() => setRestoreDialogOpen(false)}>
        <DialogTitle>Restore the account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to restore this account? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRestoreDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleRestoreConfirm} color="secondary">Yes, Restore</Button>
        </DialogActions>
      </Dialog>

      {/* Admin Login Dialog */}
      <Dialog open={loginDialogOpen} onClose={() => setLoginDialogOpen(false)}>
        <DialogTitle>Admin Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your admin credentials to confirm the action.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            value={adminCredentials.username}
            onChange={(e) => setAdminCredentials({ ...adminCredentials, username: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={adminCredentials.password}
            onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoginDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleLogin} color="primary">Login</Button>
        </DialogActions>
      </Dialog>

      {/* Email Message Dialog */}
      <Dialog open={emailDialogOpen} onClose={() => setEmailDialogOpen(false)}>
        <DialogTitle>Send Email</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please type the message to be sent to the user.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Email Message"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={4}
            value={emailMessage}
            onChange={(e) => setEmailMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEmailDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSendEmail} color="primary">Send Email</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReportList;
  