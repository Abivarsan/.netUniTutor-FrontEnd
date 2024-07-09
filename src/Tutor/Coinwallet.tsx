import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  InputBase,
  Box,
  TableSortLabel
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

interface Transaction {
  date: Date;
  details: string;
  coins: number;
}

const CoinWallet: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rows: Transaction[] = [
    { date: new Date(Date.now() - 16 * 60 * 60 * 1000), details: 'Free coins for contacting teachers', coins: 150 },
    // { date: new Date(Date.now() - 16 * 60 * 60 * 1000), details: 'Free coins for contacting teachers', coins: 150 },
    // { date: new Date(Date.now() - 16 * 60 * 60 * 1000), details: 'Free coins for contacting teachers', coins: 150 },
    // { date: new Date(Date.now() - 16 * 60 * 60 * 1000), details: 'Free coins for contacting teachers', coins: 150 },
    // { date: new Date(Date.now() - 16 * 60 * 60 * 1000), details: 'Free coins for contacting teachers', coins: 150 },
    // { date: new Date(Date.now() - 16 * 60 * 60 * 1000), details: 'Free coins for contacting teachers', coins: 150 },
    // { date: new Date(Date.now() - 16 * 60 * 60 * 1000), details: 'Free coins for contacting teachers', coins: 150 },
    // { date: new Date(Date.now() - 16 * 60 * 60 * 1000), details: 'Free coins for contacting teachers', coins: 150 },
    // { date: new Date(Date.now() - 16 * 60 * 60 * 1000), details: 'Free coins for contacting teachers', coins: 150 },
    // { date: new Date(Date.now() - 16 * 60 * 60 * 1000), details: 'Free coins for contacting teachers', coins: 150 },
    // { date: new Date(Date.now() - 16 * 60 * 60 * 1000), details: 'Free coins for contacting teachers', coins: 150 },
    // { date: new Date(Date.now() - 16 * 60 * 60 * 1000), details: 'Free coins for contacting teachers', coins: 150 },
    // { date: new Date(Date.now() - 16 * 60 * 60 * 1000), details: 'Free ', coins: 150 },
    // { date: new Date(Date.now() - 16 * 60 * 60 * 1000), details: 'nilaxsan', coins: 150 },
    

];  

  const filteredRows = rows.filter(row =>
    row.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" sx={{color:"darkblue"}} >
        Coin Wallet
      </Typography>
      <Typography variant="h6" >
        Current Balance: {} coins 
      </Typography>
     
      <Box display="flex" justifyContent="flex-end" my={3}>
        <InputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => setSearchTerm(e.target.value)}
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
      <TableContainer component={Paper} sx={{my:5}}>
        <Table sx={{width:850}}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Coins</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                <TableCell>{formatDistanceToNow(row.date, { addSuffix: true })}</TableCell>
                <TableCell>{row.details}</TableCell>
                <TableCell>{row.coins}</TableCell>
              </TableRow>
            ))}
            {filteredRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Container>
  );
};

export default CoinWallet;