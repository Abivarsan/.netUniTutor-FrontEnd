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
    profileUrl: string;
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
    profileUrl: string;
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
export interface TutorAccept {
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
  studentId: {
    _id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    profileUrl: string;
    district: string;
    schoolName: string;
    grade: string;
  };

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

export interface FeedbackI {
  _id: string;
  studentId: string;
  subjectId: string;
  rating: number;
  feedback: string;
  timestamp: string;
}
export interface ReviewResponse {
  reviews: FeedbackI[];
  averageRating: number;
}

export interface CommentResponse {
  _id: number;
  commentText: string;
  timestamp: string;
  fullName: string;
  profileUrl?: string;
}
export interface TodoResponse {
  _id: number;
  text: string;
  isCompleted: boolean;
}
