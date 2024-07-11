import React, { useEffect, useState } from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import DataTable from "../../Components/DataTable/DataTable";
import "./Tutors.scss";
import Add from "../../Components/Add/Add";
import axios from "axios";
import CustomAvatar from "../../Components/Avatar/CustomAvatar";

const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 90 },
  {
    field: "profileUrl",
    headerName: "Avatar",
    width: 100,
    renderCell: (params: GridRenderCellParams<any>) => (
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
    valueGetter: (params: GridRenderCellParams<any>) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 120,
    type: "string",
  },
  {
    field: "verified",
    headerName: "Verified",
    width: 80,
    type: "boolean",
  },
  {
    field: "complaints",
    headerName: "No. of Complaints",
    width: 150,
    type: "number",
    valueGetter: (params: GridRenderCellParams<any>) => params.row.complaints || 0,
  },
];

const Tutors = () => {
  const [tutors, setTutors] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get("http://localhost:5025/api/Admin/AllTutors");
        console.log(response.data); // Debugging log
        setTutors(response.data);
      } catch (error) {
        console.error("Error fetching tutors:", error);
      }
    };

    fetchTutors();
  }, []);

  return (
    <div className="tutors">
      <div className="info">
        <h1>Tutors</h1>
      </div>
      <DataTable columns={columns} rows={tutors} slug="tutor" />
      {open && <Add slug="tutors" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Tutors;

// import React, { useEffect, useState } from "react";
// import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
// import DataTable from "../../Components/DataTable/DataTable";
// import Avatar from "@mui/material/Avatar";
// import "./Tutors.scss";
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
//     renderCell: (params: GridRenderCellParams<any>) => (
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
//     valueGetter: (params: GridRenderCellParams<any>) =>
//       `${params.row.firstName || ""} ${params.row.lastName || ""}`,
//   },
//   {
//     field: "createdAt",
//     headerName: "Created At",
//     width: 120,
//     type: "string",
//   },
//   {
//     field: "verified",
//     headerName: "Verified",
//     width: 80,
//     type: "boolean",
//   },
//   {
//     field: "complaints",
//     headerName: "No. of Complaints",
//     width: 150,
//     type: "number",
//     valueGetter: (params: GridRenderCellParams<any>) => params.row.complaints || 0,
//   },
// ];

// const Tutors = () => {
//   const [tutors, setTutors] = useState([]);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     const fetchTutors = async () => {
//       try {
//         const response = await axios.get("http://localhost:5025/api/Admin/AllTutors");
//         console.log(response.data); // Debugging log
//         setTutors(response.data);
//       } catch (error) {
//         console.error("Error fetching tutors:", error);
//       }
//     };

//     fetchTutors();
//   }, []);

//   return (
//     <div className="tutors">
//       <div className="info">
//         <h1>Tutors</h1>
//       </div>
//       <DataTable columns={columns} rows={tutors} slug="tutor" />
//       {open && <Add slug="tutors" columns={columns} setOpen={setOpen} />}
//     </div>
//   );
// };

// export default Tutors;
