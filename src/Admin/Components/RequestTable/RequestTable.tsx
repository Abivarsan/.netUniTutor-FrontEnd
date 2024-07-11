// import React from "react";
// import { Table, TableBody, TableCell, TableHead, TableRow, Button, Avatar } from "@mui/material";

// type RequestTableProps = {
//   requests: Array<{ _id: number; name: string; universityMail: string; ProfileUrl: string }>;
//   onAccept: (_id: number) => void;
//   onReject: (_id: number) => void;
// };

// const RequestTable: React.FC<RequestTableProps> = ({ requests, onAccept, onReject }) => {
//   return (
    
//     <Table sx={{bgcolor:"#DEF1FE"}}>
//       <TableHead>
//         <TableRow>
//           <TableCell>Avatar</TableCell>
//           <TableCell>ID</TableCell>
//           <TableCell>Name</TableCell>
//           <TableCell>Email</TableCell>
//           <TableCell>Actions</TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {requests.map((request) => (
//           <TableRow key={request._id}>
//             <TableCell>
//               <Avatar src={request.ProfileUrl} alt={request.name} />
//             </TableCell>
//             <TableCell>{request._id}</TableCell>
//             <TableCell>{request.name}</TableCell>
//             <TableCell>{request.universityMail}</TableCell>
//             <TableCell>
//               <Button
//                 color="primary"
//                 onClick={() => onAccept(request._id)}
//                 // disabled={!/\S+@\S+\.\S+/.test(request.email)} // Simple email validation
//               >
//                 Accept
//               </Button>
//               <Button color="secondary" onClick={() => onReject(request._id)}>
//                 Reject
//               </Button>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };

// export default RequestTable;
// import React from "react";
// import { Table, TableBody, TableCell, TableHead, TableRow, Button, Avatar } from "@mui/material";
// import CustomAvatar from "../../Components/Avatar/CustomAvatar";

// type RequestTableProps = {
//   requests: Array<{
//     _id: number;
//     name: string;
//     universityMail: string;
//     ProfileUrl: string;
//     cv: string;
//     universityID: string;
//   }>;
//   onAccept: (_id: number) => void;
//   onReject: (_id: number) => void;
//   onViewCv: (cv: string) => void;
//   onViewUniversityId: (universityId: string) => void;
// };

// const RequestTable: React.FC<RequestTableProps> = ({ requests, onAccept, onReject, onViewCv, onViewUniversityId }) => {
//   return (
//     <Table sx={{ bgcolor: "#DEF1FE" }}>
//       <TableHead>
//         <TableRow>
//           <TableCell>ID</TableCell>
//           <TableCell>Avatar</TableCell>
//           <TableCell>Name</TableCell>
//           <TableCell>Email</TableCell>
//           <TableCell>CV</TableCell>
//           <TableCell>UniversityID</TableCell>
//           <TableCell>Actions</TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {requests.map((request) => (
//           <TableRow key={request._id}>
//             <TableCell>{request._id}</TableCell>
//             <TableCell>
//               <CustomAvatar
//               name={request.name}
//               src={request.ProfileUrl}
//             />
//             </TableCell>
//             <TableCell>{request.name}</TableCell>
//             <TableCell>{request.universityMail}</TableCell>
//               <TableCell>
//               <Button onClick={() => onViewCv(request.cv)}>View CV</Button>
              
//             </TableCell>
//             <TableCell>
//               <Button onClick={() => onViewUniversityId(request.universityID)}>View University ID</Button>
//             </TableCell>
//             <TableCell>
//               <Button color="primary" onClick={() => onAccept(request._id)}>
//                 Accept
//               </Button>
//               <Button color="secondary" onClick={() => onReject(request._id)}>
//                 Reject
//               </Button>
//               </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };

// export default RequestTable;

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import CustomAvatar from "../../Components/Avatar/CustomAvatar";

type RequestTableProps = {
  requests: Array<{
    _id: number;
    name: string;
    universityMail: string;
    ProfileUrl: string;
    cv: string;
    universityID: string;
  }>;
  onAccept: (_id: number) => void;
  onReject: (_id: number) => void;
  onViewCv: (cv: string) => void;
  onViewUniversityId: (universityId: string) => void;
};

const RequestTable: React.FC<RequestTableProps> = ({ requests, onAccept, onReject, onViewCv, onViewUniversityId }) => {
  return (
    <Table sx={{ bgcolor: "#DEF1FE" }}>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Avatar</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>CV</TableCell>
          <TableCell>University ID</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request._id}>
            <TableCell>{request._id}</TableCell>
            <TableCell>
              <CustomAvatar name={request.name} src={request.ProfileUrl} />
            </TableCell>
            <TableCell>{request.name}</TableCell>
            <TableCell>{request.universityMail}</TableCell>
            <TableCell>
              <Button onClick={() => onViewCv(request.cv)}>View CV</Button>
            </TableCell>
            <TableCell>
              <Button onClick={() => onViewUniversityId(request.universityID)}>View University ID</Button>
            </TableCell>
            <TableCell>
              <Button color="primary" onClick={() => onAccept(request._id)}>
                Accept
              </Button>
              <Button color="secondary" onClick={() => onReject(request._id)}>
                Reject
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RequestTable;
