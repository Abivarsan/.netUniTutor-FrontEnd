// import React from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TablePagination,
// } from '@mui/material';
// import { formatDistanceToNow } from 'date-fns';

// interface Transaction {
//   date: Date;
//   details: string;
//   coins: number;
// }

// interface TransactionTableProps {
//   rows: Transaction[];
//   filteredRows: Transaction[];
//   page: number;
//   rowsPerPage: number;
//   handleChangePage: (event: unknown, newPage: number) => void;
//   handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
// }

// const TransactionTable: React.FC<TransactionTableProps> = ({
//   rows,
//   filteredRows,
//   page,
//   rowsPerPage,
//   handleChangePage,
//   handleChangeRowsPerPage,
// }) => {
//   return (
//     <TableContainer component={Paper} sx={{ my: 5 }}>
//       <Table sx={{ width: 850 }}>
//         <TableHead>
//           <TableRow>
//             <TableCell>Date</TableCell>
//             <TableCell>Details</TableCell>
//             <TableCell>Coins</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
//             <TableRow key={index}>
//               <TableCell>{formatDistanceToNow(row.date, { addSuffix: true })}</TableCell>
//               <TableCell>{row.details}</TableCell>
//               <TableCell>{row.coins}</TableCell>
//             </TableRow>
//           ))}
//           {filteredRows.length === 0 && (
//             <TableRow>
//               <TableCell colSpan={3} align="center">
//                 No transactions found.
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 15]}
//         component="div"
//         count={filteredRows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </TableContainer>
//   );
// };

// export default TransactionTable;


// import * as React from "react";
// import axios from 'axios';
// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.white,
//     color: theme.palette.primary.main,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// interface Transaction {
//   date: Date;
//   description: string;
//   coins: number;
// }

// const TransactionTable: React.FC = () => {
//   const [transactions, setTransactions] = React.useState<Transaction[]>([]);

//   React.useEffect(() => {
//     axios.get('http://localhost:5025/api/Transactions')
//       .then(response => {
//         setTransactions(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching transactions:', error);
//       });
//   }, []);

//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 700 }} aria-label="customized table">
//         <TableHead>
//           <TableRow>
//             <StyledTableCell>Date</StyledTableCell>
//             <StyledTableCell>Description</StyledTableCell>
//             <StyledTableCell align="right">Coins</StyledTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {transactions.map((transaction, index) => (
//             <StyledTableRow key={index}>
//               <StyledTableCell component="th" scope="row">
//                 {new Date(transaction.date).toLocaleDateString()}
//               </StyledTableCell>
//               <StyledTableCell>{transaction.description}</StyledTableCell>
//               <StyledTableCell align="right">{transaction.coins}</StyledTableCell>
//             </StyledTableRow>
//           ))}
//           {transactions.length === 0 && (
//             <StyledTableRow>
//               <StyledTableCell colSpan={3} align="center">
//                 No transactions yet.
//              </StyledTableCell>
//             </StyledTableRow>
//           )}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default TransactionTable;


import * as React from "react";
import axios from 'axios';
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  InputBase,
  Typography,
  tableCellClasses,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface Transaction {
  date: string;
  description: string;
  coins: number;
}

const TransactionTable: React.FC = () => {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    axios.get('http://localhost:5025/api/Transactions')
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <TableContainer component={Paper}>
      <Box display="flex" justifyContent="space-between" alignItems="center" padding={2}>
        <Typography variant="h6" sx={{ color: "darkblue" }}>My Transactions </Typography>
        <InputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          onChange={handleSearchChange}
          startAdornment={<SearchIcon />}
          sx={{
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 300,
            border: '1px solid #ccc',
            borderRadius: 1,
            bgcolor: 'background.paper'
          }}
        />
      </Box>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell align="right">Coins</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTransactions.map((transaction, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {new Date(transaction.date).toLocaleDateString()}
              </StyledTableCell>
              <StyledTableCell>{transaction.description}</StyledTableCell>
              <StyledTableCell align="right">{transaction.coins}</StyledTableCell>
            </StyledTableRow>
          ))}
          {filteredTransactions.length === 0 && (
            <StyledTableRow>
              <StyledTableCell colSpan={3} align="center">
                No transactions found.
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;
