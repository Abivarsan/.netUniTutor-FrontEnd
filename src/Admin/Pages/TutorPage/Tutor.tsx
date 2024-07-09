// import React, { useEffect, useState } from "react";
// import Single from "../../Components/Single/Single";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// type Tutor = {
//   id: number;
//   avatarUrl: string;
//   firstName: string;
//   lastName: string;
//   createdAt: string; // Adjust type as per your actual data structure
//   verified: boolean; // Adjust type as per your actual data structure
//   complaints: number; // Adjust type as per your actual data structure
//   // Add more properties as needed
// };

// const SingleTutor: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [tutor, setTutor] = useState<Tutor | null>(null);

//   useEffect(() => {
//     const fetchTutor = async () => {
//       try {
//         const response = await axios.get<Tutor>(`http://localhost:5025/api/Admin/Tutordetails/${id}`);
//         setTutor(response.data);
//       } catch (error) {
//         console.error("Error fetching tutor:", error);
//       }
//     };

//     fetchTutor();
//   }, [id]);

//   if (!tutor) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="singleTutor">
//       <Single
//         id={tutor.id}
//         img={tutor.avatarUrl}
//         title={`${tutor.firstName} ${tutor.lastName}`}
//         info={tutor}
//       />
//     </div>
//   );
// };

// export default SingleTutor;

// SingleTutor.tsx
import React from "react";
import Single from "../../Components/Single/Single";

const SingleTutor: React.FC = () => {
  return <Single apiEndpoint="http://localhost:5025/api/Admin/Tutordetails" />;
};

export default SingleTutor;
