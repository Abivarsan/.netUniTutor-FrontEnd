import React, { useState } from 'react';
import {
  Container,
  Typography,
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
  Button,
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
  const [verificationCode, setVerificationCode] = useState('');
  const [coinsAdded, setCoinsAdded] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleVerificationCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(event.target.value);
  };

  const handleVerifyCode = () => {
    // Clear previous error message
    setVerificationError(null);

    // Validate if the verification code is not empty
    if (!verificationCode.trim()) {
      setVerificationError('Please paste a valid verification code.');
      return;
    }

    // Call backend API to verify the code
    fetch('http://localhost:5025/api/Coin/verify-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: verificationCode }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          setCoinsAdded(true);
          // Optionally, you can update the UI or fetch new data after successful verification
        } else {
          setVerificationError('Verification failed. Please check your code and try again.');
        }
      })
      .catch(error => {
        setVerificationError('An error occurred while verifying the code. Please try again later.');
      });
  };

  const rows: Transaction[] = [
    { date: new Date(Date.now() - 16 * 60 * 60 * 1000), details: 'Free coins for contacting teachers', coins: 150 },
    // Add more rows as needed
  ];

  const filteredRows = rows.filter(row =>
    row.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" sx={{ color: 'darkblue' }}>
        Coin Wallet
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
      <Box sx={{ my: 2 }}>
        <Typography variant="h6" sx={{ color: 'darkblue' }}>Verification Code</Typography>
        <InputBase
          placeholder="Paste verification code here"
          value={verificationCode}
          onChange={handleVerificationCodeChange}
          sx={{
            padding: '8px',
            width: 300,
            border: '1px solid #ccc',
            borderRadius: 1,
            bgcolor: 'background.paper'
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleVerifyCode}
          sx={{ ml: 2 }}
        >
          Verify Code
        </Button>
        {verificationError && (
          <Typography sx={{ mt: 1, color: 'red' }}>{verificationError}</Typography>
        )}
        {coinsAdded && (
          <Typography sx={{ mt: 2, color: 'green' }}>Coins added successfully!</Typography>
        )}
      </Box>
      <TableContainer component={Paper} sx={{ my: 5 }}>
        <Table sx={{ width: 850 }}>
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
