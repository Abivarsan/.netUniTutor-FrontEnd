import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  InputBase,
  Box,
  Button,
  TextField,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { formatDistanceToNow } from "date-fns";
import TransactionTable from "./TransactionTable";
import { toast } from "react-toastify";
import axios from "axios";

interface Transaction {
  date: Date;
  details: string;
  coins: number;
}

const CoinWallet: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [coinsAdded, setCoinsAdded] = useState(false);
  const [coinsCount, setCoinsCount] = useState<number>(0);
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );

  const tutorId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coinsCountResponse = await axios.get<number>(
          `http://localhost:5025/api/Transaction/totalamount/${tutorId}`
        );
        setCoinsCount(coinsCountResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    if (tutorId) {
      fetchData();
    }
  }, [tutorId]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleVerificationCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerificationCode(event.target.value);
  };

  const handleVerifyCode = () => {
    // Clear previous error message
    setVerificationError(null);

    // Validate if the verification code is not empty
    if (!verificationCode.trim()) {
      setVerificationError("Please paste a valid verification code.");
      return;
    }

    // Call backend API to verify the code
    fetch("http://localhost:5025/api/Coin/verify-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: verificationCode }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setCoinsAdded(true);
          // Optionally, you can update the UI or fetch new data after successful verification
        } else {
          setVerificationError(
            "Verification failed. Please check your code and try again."
          );
        }
      })
      .catch((error) => {
        setVerificationError(
          "An error occurred while verifying the code. Please try again later."
        );
      });
  };

  const rows: Transaction[] = [
    {
      date: new Date(Date.now() - 16 * 60 * 60 * 1000),
      details: "Free coins for contacting teachers",
      coins: 150,
    },
    // Add more rows as needed
  ];

  return (
    <Container>
      <Typography variant="h4" sx={{ color: "darkblue" }}>
        My Coins {coinsCount} 
      </Typography>

      <Box sx={{ my: 5 }}>
        <Typography variant="h6" sx={{ color: "darkblue" }}>
          Enter Your Promo Code Below
        </Typography>
        {/* <Typography variant="h6" sx={{ color: "darkblue" }} display={'flex'} alignContent={'center'}>
          To claim your 50 coins for inviting a friend, please enter the promo
          code you received. Once verified, the coins will be credited to your
          UniTutor account immediately.
        </Typography> */}

        <TextField
          placeholder="Paste verification code here"
          value={verificationCode}
          onChange={handleVerificationCodeChange}
          sx={{
            padding: "8px",
            width: 300,
            mt: 2,
            border: "1px solid #ccc",
            borderRadius: 1,
            bgcolor: "background.paper",
          }}
        />
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={handleVerifyCode}
          sx={{ ml: 2, mt: 5 }}
        >
          Verify Code
        </Button>
        {verificationError && (
          <Typography sx={{ mt: 1, color: "red" }}>
            {verificationError}
          </Typography>
        )}
        {coinsAdded && (
          <Typography sx={{ mt: 2, color: "green" }}>
            Coins added successfully!
          </Typography>
          // toast.success('Coins added successfully!', { position: 'top-center' })
        )}
      </Box>
      {/* <TransactionTable
        rows={rows}
        filteredRows={filteredRows}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      /> */}
      <Box sx={{ my: 10 }}>
        <TransactionTable />
      </Box>
    </Container>
  );
};

export default CoinWallet;
