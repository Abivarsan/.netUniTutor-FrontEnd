import React from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import "./DataTable.scss";

type Props = {
  columns: GridColDef[];
  rows: any[]; // Adjust type as per your actual data structure
  slug: string; // 'student' or 'tutor'
};

const DataTable: React.FC<Props> = ({ columns, rows, slug }) => {
  const actionColumn: GridColDef = {
    field: "action",
    headerName: "View more",
    width: 150,
    renderCell: (params) => (
      <div className="action">
        <Link to={`/Admin/${slug}/${params.row.id}`}>
          <img src="/view.svg" alt="view" />
        </Link>
      </div>
    ),
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={rows}
        columns={[...columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;


