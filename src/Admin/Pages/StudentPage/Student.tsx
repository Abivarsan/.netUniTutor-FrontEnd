// import React, { useEffect, useState } from "react";
// import Single from "../../Components/Single/Single";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// type Student = {
//   id: number;
//   profileUrl: string;
//   firstName: string;
//   lastName: string;
//   createdAt: string; // Adjust type as per your actual data structure
//   complaints: number; // Adjust type as per your actual data structure
//   // Add more properties as needed
// };

// const SingleStudent: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [student, setStudent] = useState<Student | null>(null);

//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         const response = await axios.get<Student>(`http://localhost:5025/api/Admin/Studentdetails/${id}`);
//         setStudent(response.data);
//       } catch (error) {
//         console.error("Error fetching student:", error);
//       }
//     };

//     fetchStudent();
//   }, [id]);

//   if (!student) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="singleStudent">
//       <Single
//         id={student.id}
//         ProfileUrl={student.profileUrl}
//         title={`${student.firstName} ${student.lastName}`}
//         info={student}
//       />
//     </div>
//   );
// };

// export default SingleStudent;

// SingleStudent.tsx
// import React from "react";
// import Single from "../../Components/Single/Single";	

// const SingleStudent: React.FC = () => {
//   return <Single apiEndpoint="http://localhost:5025/api/Admin/Studentdetails" />;
// };

// export default SingleStudent;

import React from "react";
import Single from "../../Components/Single/Single";

const SingleStudent: React.FC = () => {
  return <Single apiEndpoint="http://localhost:5025/api/Admin/Studentdetails" personType="student" />;
};

export default SingleStudent;


