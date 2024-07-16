import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  InputBase,
  Box,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { formatDistanceToNow } from "date-fns";
import TransactionTable from "./TransactionTable";
import { toast } from "react-toastify";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoResponse } from "../data/interfaces";

interface Transaction {
  date: Date;
  details: string;
  coins: number;
}

interface PromocodeValues {
  VerificationCode: string;
}
const initialState: PromocodeValues = {
  VerificationCode: "",
};
const TodoSchema = z.object({
  VerificationCode: z.string().min(1, "Cannot be empty"),
});

const CoinWallet: React.FC = () => {
  const [coinsCount, setCoinsCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);


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

  const {
    control,
    reset,
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PromocodeValues>({
    resolver: zodResolver(TodoSchema),
    defaultValues: initialState,
  });

  const onSubmit = async (data: PromocodeValues) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `http://localhost:5025/api/Coin/verify-code`,
        {
          VerificationCode: data.VerificationCode,
        }
      );
      console.log(response.data);
      reset(initialState);
      setIsLoading(false);
      if (response.status === 200) {
        console.log(response.data);
        toast.success("You got 50 coins");
        fetchAllTransactions();
        reset(initialState);
        setIsLoading(false);
      }
      else{
        toast.error("Your verifycode is incorrect");
      }
      
    } catch (error) {
      toast.error("Failed to verify code");
      reset(initialState);
      console.log(error);
      setIsLoading(false);
    }
  };


  //Transcation fetching

  const fetchAllTransactions = async () => {
    try {
      const response = await axios.get<Transaction[]>
        (`http://localhost:5025/api/Transaction/getall/${localStorage.getItem("userId")}`)
      if (response.status === 200) {
        setTransactions(response.data);
        return;
      }
     // toast.error("Failed to fetch");
    } catch (error) {
      console.error(error);
      //toast.error("Something went wrong");
    }
  };
  const rows: Transaction[] = [
    {
      date: new Date(Date.now() - 16 * 60 * 60 * 1000),
      details: "Free coins for contacting teachers",
      coins: 150,
    },
    
  ];

  return (
    <Container>
      <Typography variant="h4" sx={{ color: "darkblue" }}>
        My Coins {coinsCount}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ my: 5 }}>
          <Typography variant="h6" sx={{ color: "darkblue" }}>
            Enter Your Promo Code Below
          </Typography>

          <TextField
            placeholder="Paste verification code here"
            {...register("VerificationCode")}
            error={!!errors.VerificationCode}
            helperText={errors.VerificationCode?.message}
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
            type="submit"
            size="small"
            color="primary"
            sx={{ ml: 2, mt: 5 }}
            disabled={isLoading}
            endIcon={isLoading ? <CircularProgress size="1rem" /> : null}
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </Button>
        </Box>
      </form>

      <Box sx={{ my: 10 }}>
        <TransactionTable />
      </Box>
    </Container>
  );
};

export default CoinWallet;
