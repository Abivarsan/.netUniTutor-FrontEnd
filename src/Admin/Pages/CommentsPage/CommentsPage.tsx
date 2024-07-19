
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

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import moment from 'moment';
import CustomAvatar from '../../Components/Avatar/CustomAvatar'; // Ensure CustomAvatar is imported
import { stringAvatar } from '../../Components/Avatar/AvatarUtils'; // Ensure stringAvatar is imported
import './CommentsPage.scss';

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
  const [loading, setLoading] = useState<boolean>(true); // For skeleton loading effect

  useEffect(() => {
    axios.get<Comment[]>('http://localhost:5025/Comment')
      .then(response => {
        setComments(response.data);
        setLoading(false); // Turn off skeleton loading once data is fetched
      })
      .catch(error => {
        console.error("There was an error fetching the comments!", error);
        setLoading(false); // Turn off skeleton loading on error
      });
  }, []);

  return (
    <Container className="commentsPage">
      <Typography variant="h4" gutterBottom className='comment-header'>
       <h3 > COMMENTS</h3>
      </Typography>
      {loading ? ( // Skeleton loading effect while fetching data
        <div className="skeletonLoading">
          <CircularProgress />
        </div>
      ) : (
        <div className="commentsContainer">
          {comments.map(comment => (
            <Card key={comment._id} className="commentCard">
              <div className="content">
                <div className="details">
                  <CustomAvatar name={comment.fullName} src={comment.profileUrl} />
                  <Typography variant="h6">{comment.fullName}</Typography>
                </div>
                <div className="text">
                  <Typography variant="body1" color="textSecondary">{comment.commentText}</Typography>
                </div>
                <div className="details">
                  <Typography variant="caption" color="textSecondary">
                    {moment(comment.timestamp).format('DD MMM YYYY - hh:mm A')}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">{comment.userType}</Typography>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default CommentsPage;
