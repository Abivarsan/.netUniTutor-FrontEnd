import { SubjectInputs } from "../components/my-subjects/SubjectForm";

export interface SubjectResponse extends SubjectInputs {
  _id: number;
  averageRating: number;
  tutorName: string;
}

export interface RequestResponse {
  _id: number;
  subjectId: {
    _id: number;
    title: string;
    coverImage: string;
  };
  studentId: {
    _id: number;
    firstName: string;
    email: string;
    phoneNumber: string;
    district: string;
    schoolName: string;
    grade: string;
  };
  tutorId: number;
  studentEmail: string;
  status: string;
  timestamp: string;
}
