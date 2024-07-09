import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Avatar } from "@mui/material";

type RequestTableProps = {
  requests: Array<{ id: number; name: string; email: string; avatarUrl: string }>;
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
};

const RequestTable: React.FC<RequestTableProps> = ({ requests, onAccept, onReject }) => {
  return (
    
    <Table sx={{bgcolor:"#DEF1FE"}}>
      <TableHead>
        <TableRow>
          <TableCell>Avatar</TableCell>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request.id}>
            <TableCell>
              <Avatar src={request.avatarUrl} alt={request.name} />
            </TableCell>
            <TableCell>{request.id}</TableCell>
            <TableCell>{request.name}</TableCell>
            <TableCell>{request.email}</TableCell>
            <TableCell>
              <Button
                color="primary"
                onClick={() => onAccept(request.id)}
                // disabled={!/\S+@\S+\.\S+/.test(request.email)} // Simple email validation
              >
                Accept
              </Button>
              <Button color="secondary" onClick={() => onReject(request.id)}>
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
