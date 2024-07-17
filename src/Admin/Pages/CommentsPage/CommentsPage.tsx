
// // src/Admin/Pages/CommentsPage/CommentsPage.tsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { DataGrid, GridColDef } from '@mui/x-data-grid';
// import { Container, Typography } from '@mui/material';
// import './CommentsPage.scss';

// const columns: GridColDef[] = [
//   { field: '_id', headerName: 'ID', width: 70 },
//   { field: 'ProfileUrl', headerName: 'ProfileUrl', width: 130},
//   { field: 'userType', headerName: 'User Type', width: 130 },
//   { field: 'fullName', headerName: 'Name', width: 200 },
//   { field: 'commentText', headerName: 'Comment', width: 400 },
//   { field: 'timestamp', headerName: 'Date', width: 150 },
// ];

// const CommentsPage: React.FC = () => {
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [pageSize, setPageSize] = useState<number>(5);

//   useEffect(() => {
//     axios.get<Comment[]>('http://localhost:5025/Comment')
//       .then(response => {
//         setComments(response.data);
//       })
//       .catch(error => {
//         console.error("There was an error fetching the comments!", error);
//       });
//   }, []);

//   return (
//     <Container className="commentsPage">
//       <Typography variant="h5" gutterBottom>
//         <h1>Comments</h1>
//       </Typography>
//       <div style={{ height: 400, width: '100%' }}>
//         <DataGrid
//           rows={comments}
//           columns={columns}
//           pageSizeOptions={[5, 10, 20]}
//           paginationModel={{ pageSize, page: 0 }}
//           onPaginationModelChange={(newModel) => setPageSize(newModel.pageSize)}
//           getRowId={(row) => row._id}
//         />
//       </div>
//     </Container>
//   );
// };

// export default CommentsPage;


// src/Admin/Pages/CommentsPage/CommentsPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Container, Typography } from '@mui/material';
import moment from 'moment';
import CustomAvatar from '../../Components/Avatar/CustomAvatar';
import './CommentsPage.scss';

const columns: GridColDef[] = [
  { field: '_id', headerName: 'ID', width: 70 },
  {
    field: 'profileUrl',
    headerName: 'Avatar',
    width: 130,
    renderCell: (params: GridRenderCellParams<any>) => (
      <CustomAvatar
        
        name={`${params.row.fullName  || ""} }`}
        src={params.row.profileUrl}
      />
    ),
  },
  { field: 'userType', headerName: 'User Type', width: 130 },
  { field: 'fullName', headerName: 'Name', width: 200 },
  { field: 'commentText', headerName: 'Comment', width: 400 },
  {
    field: 'timestamp',
    headerName: 'Date',
    width: 200,
    valueGetter: (params: GridRenderCellParams<any>) =>
      moment(params.row.timestamp).format('DD MMM YYYY - hh:mm A'),
  },
];

interface Comment {
  _id: string;
  profileUrl: string;
  userType: string;
  fullName: string;
  commentText: string;
  timestamp: string;
}

const CommentsPage: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);

 
  useEffect(() => {
    axios.get<Comment[]>('http://localhost:5025/Comment')
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the comments!", error);
      });
  }, []);

  return (
    <Container className="commentsPage">
      <Typography variant="h4" gutterBottom>
        <h1>COMMENTS</h1>
      </Typography>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={comments}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          paginationModel={{ pageSize, page: 0 }}
          onPaginationModelChange={(newModel) => setPageSize(newModel.pageSize)}
          getRowId={(row) => row._id}
        />
      </div>
    </Container>
  );
};

export default CommentsPage;
