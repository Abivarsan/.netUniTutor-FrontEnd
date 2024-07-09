import { SubjectInputs } from "../components/my-subjects/SubjectForm";

export interface SubjectResponse extends SubjectInputs {
  _id: string;
  averageRating: number;
  tutorName: string;
}

export interface RequestResponse {
  _id: string;
  subjectId: {
    _id: string;
    title: string;
    coverImage: string;
  };
  studentId: {
    _id: string;
    firstName: string;
    email: string;
    phoneNumber: string;
    district: string;
    schoolName: string;
    grade: string;
  };
  tutorId: string;
  studentEmail: string;
  status: string;
  timestamp: string;
}
