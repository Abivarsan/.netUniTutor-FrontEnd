import React, { useState, useEffect } from "react";
import { GridColDef, GridValueGetterParams, GridRenderCellParams } from "@mui/x-data-grid";
import DataTable from "../../Components/DataTable/DataTable";
import "./Students.scss";
import Add from "../../Components/Add/Add";
import axios from "axios";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "profileUrl",
    headerName: "Avatar",
    width: 100,
    renderCell: (params: GridRenderCellParams) => (
      <img src={params.row.profileUrl } alt="Avatar" style={{ width: 50, height: 50, borderRadius: "50%" }} />
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
  },
  {
    field: "complaints",
    headerName: "No. of Complaints",
    width: 150,
    type: "number",
    valueGetter: (params: GridValueGetterParams) => params.row.complaints || 0,
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
        <h1>Students</h1>
      </div>
      <DataTable columns={columns} rows={students} slug="student" />
      {/* Add your Add component or any other components here */}
    </div>
  );
};

export default Students;
