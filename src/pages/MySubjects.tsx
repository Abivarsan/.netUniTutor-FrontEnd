import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import SubjectForm, {
  SubjectInputs,
} from "../components/my-subjects/SubjectForm";
import axios from "axios";
import SubjectCard from "../components/my-subjects/SubjectCard";
import { toast } from "react-toastify";
import AlertBox from "../components/common/Alert";

export default function MySubjects() {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const [isFetching, setIsFetching] = useState(false);
  const [subjects, setSubjects] = useState<SubjectInputs[]>([]);
  const [subjectId, setSubjectId] = useState<string | null>(null);

  const [editData, setEditData] = useState<SubjectInputs | null>(null);
  const [deleteData, setDeleteData] = useState<string | null>(null);

  const fetchSubjects = async () => {
    const tutorId = "6682b3aba83ed27324efc71a";
    setIsFetching(true);
    try {
      const response = await axios.get(
        `http://localhost:8082/subject/tutor/${tutorId}`
      );
      setSubjects(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleDeleteSubject = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8082/subject/${id}`);
      setSubjectId(null);
      fetchSubjects();
      toast.success("Subject deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box p={1}>
        <Button
          variant="contained"
          color="primary"
          sx={{ float: "right" }}
          onClick={() => setOpen(true)}
        >
          Add Subject
        </Button>
        {isFetching ? (
          <Box textAlign={"center"}>
            <CircularProgress sx={{}} />
          </Box>
        ) : (
          <>
            <Grid container spacing={2}>
              {subjects?.map((subject) => (
                <Grid item xs={12} sm={6} lg={4} key={subject._id}>
                  <SubjectCard
                    subject={subject}
                    setEditData={(data: SubjectInputs) => setEditData(data)}
                    setDeleteData={(id: string) => {
                      setSubjectId(id);
                      setOpenAlert(true);
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>

      <SubjectForm
        open={open || !!editData}
        subject={editData}
        fetchSubjects={fetchSubjects}
        closeDrawer={() => {
          setOpen(false);
          setEditData(null);
        }}
      />

      <AlertBox
        open={openAlert}
        title="Delete Subject"
        message="Are you sure you want to delete this subject?"
        onClose={() => {
          setOpenAlert(false);
          setSubjectId(null);
        }}
        onAgree={() => {
          handleDeleteSubject(subjectId!);
          setOpenAlert(false);
        }}
      />
    </>
  );
}
