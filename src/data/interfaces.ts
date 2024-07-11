import { SubjectInputs } from "../components/my-subjects/SubjectForm";

export interface SubjectResponse extends SubjectInputs {
  _id: number;
  averageRating: number;
  tutorName: string;
  tutorId: number;
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


export interface SubjectRequest {
  rating: number | undefined;
  description: string;
  tutorName: string;
  _id: number;
  subjectId: {
    _id: number;
    title: string;
    coverImage: string;
    description: string;
  };
  studentId: number;
  tutorId: {
    _id: number;
    ProfileUrl: string;
    firstName: string;
    lastName: string;
    district: string;
    universityMail: string;
    phoneNumber: string;
                    
  };
  studentEmail: string;
  status: string;
  timestamp: string;
}


