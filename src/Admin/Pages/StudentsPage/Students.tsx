import React, { useState, useEffect } from "react";
import { GridColDef, GridValueGetterParams, GridRenderCellParams } from "@mui/x-data-grid";
import DataTable from "../../Components/DataTable/DataTable";
import "./Students.scss";
import axios from "axios";
import CustomAvatar from "../../Components/Avatar/CustomAvatar";
import moment from "moment";
import { Typography } from "@mui/material";


const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 90 },
  {
    field: "profileUrl",
    headerName: "Avatar",
    width: 100,
    renderCell: (params: GridRenderCellParams) => (
      <CustomAvatar
        name={`${params.row.firstName || ""} ${params.row.lastName || ""}`}
        src={params.row.profileUrl}
      />
    ),
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
    valueGetter: (params: GridRenderCellParams<any>) =>
      moment(params.row.createdAt).format("DD MMM YYYY - hh:mm A"),
  },
  
];

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:5025/api/Admin/AllStudents");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="students">
      <div className="info">
        <Typography variant="h4">
          <h2>STUDENTS</h2>
          </Typography>
        
      </div>
      <DataTable columns={columns} rows={students} slug="student" />
      {/* Add your Add component or any other components here */}
    </div>
  );
};

export default Students;

// import React, { useState, useEffect } from "react";
// import { GridColDef, GridValueGetterParams, GridRenderCellParams } from "@mui/x-data-grid";
// import DataTable from "../../Components/DataTable/DataTable";
// import Avatar from "@mui/material/Avatar";
// import "./Students.scss";
// import Add from "../../Components/Add/Add";
// import axios from "axios";

// // Helper function to create string-based avatars
// const stringToColor = (string: string) => {
//   let hash = 0;
//   let i;

//   for (i = 0; i < string.length; i += 1) {
//     hash = string.charCodeAt(i) + ((hash << 5) - hash);
//   }

//   let color = "#";

//   for (i = 0; i < 3; i += 1) {
//     const value = (hash >> (i * 8)) & 0xff;
//     color += `00${value.toString(16)}`.slice(-2);
//   }

//   return color;
// };

// const stringAvatar = (name: string) => {
//   return {
//     sx: {
//       bgcolor: stringToColor(name),
//       width: 50,
//       height: 50,
//     },
//     children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
//   };
// };

// const columns: GridColDef[] = [
//   { field: "_id", headerName: "ID", width: 90 },
//   {
//     field: "profileUrl",
//     headerName: "Avatar",
//     width: 100,
//     renderCell: (params: GridRenderCellParams) => (
//       params.value ? (
//         <Avatar src={params.value as string} alt="Avatar" style={{ width: 50, height: 50 }} />
//       ) : (
//         <Avatar {...stringAvatar(`${params.row.firstName || ""} ${params.row.lastName || ""}`)} />
//       )
//     ),
//   },
//   {
//     field: "fullName",
//     headerName: "Full name",
//     description: "This column has a value getter and is not sortable.",
//     sortable: false,
//     width: 160,
//     valueGetter: (params: GridValueGetterParams) =>
//       `${params.row.firstName || ""} ${params.row.lastName || ""}`,
//   },
//   {
//     field: "createdAt",
//     headerName: "Created At",
//     width: 200,
//     type: "string",
//   },
//   {
//     field: "complaints",
//     headerName: "No. of Complaints",
//     width: 150,
//     type: "number",
//     valueGetter: (params: GridValueGetterParams) => params.row.complaints || 0,
//   },
// ];

// const Students = () => {
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await axios.get("http://localhost:5025/api/Admin/AllStudents");
//         setStudents(response.data);
//       } catch (error) {
//         console.error("Error fetching students:", error);
//       }
//     };

//     fetchStudents();
//   }, []);

//   return (
//     <div className="students">
//       <div className="info">
//         <h1>Students</h1>
//       </div>
//       <DataTable columns={columns} rows={students} slug="student" />
//       {/* Add your Add component or any other components here */}
//     </div>
//   );
// };

// export default Students;
