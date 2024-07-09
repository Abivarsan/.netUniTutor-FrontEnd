import React from "react";
import {
  Container,
  Typography,
  Button,
  MenuItem,
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface BuyCoinsValues {
  coins: number;
  description: string;
}

const initialState: BuyCoinsValues = { coins: 0, description: "" };

const schemaCoin = z.object({
  coins: z.number().min(1, "Please select the coins"),
  description: z.string().min(5, "Please enter a description"),
});

const BuyCoins: React.FC = () => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm<BuyCoinsValues>({
    resolver: zodResolver(schemaCoin),
    defaultValues: initialState,
  });

  const onSubmit = (data: BuyCoinsValues) => {
    console.log(data);
    reset(initialState);
  };

  const calculateLkrAmount = (coins: number) => {
    return coins * 5; // 1 coin = 5 LKR
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Box textAlign="center" my={3} width={850}>
          <Typography variant="h4" sx={{ color: "darkblue" }}>
            How many coins do you want?
          </Typography>
          <TextField
            select
            sx={{ width: 400, mt: 3 }}
            id="coin-amount"
            label="Coins"
            {...control.register("coins")}
            error={!!errors.coins}
            helperText={errors.coins?.message}
          >
            <MenuItem value={0}>-Select-</MenuItem>
            <MenuItem value={50}>50 coins</MenuItem>
            <MenuItem value={100}>100 coins</MenuItem>
            <MenuItem value={150}>150 coins</MenuItem>
            {/* <MenuItem value={200}>200 coins</MenuItem>
            <MenuItem value={250}>250 coins</MenuItem> */}
          </TextField>

          <Box display="flex" justifyContent="center" alignItems="center">
            <Card
              sx={{
                width: 400,
                height: 100,
                mt: 3,
                backgroundColor: "#f0f0f0",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              }}
            >
              <CardHeader subheader="Amount " />
              <CardContent>
                <Typography variant="h6" sx={{ fontSize: "15px" }}>
                  {calculateLkrAmount(Number(watch("coins"))).toFixed(2)} LKR
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box>
            <TextField
              size="small"
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              sx={{ my: 2, width: 400 }}
              {...register("description")}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<PaymentIcon />}
            size="large"
            sx={{ width: 300, mt: 4 }}
          >
            Get {watch("coins")} coins
          </Button>
        </Box>
      </Container>
    </form>
  );
};

export default BuyCoins;
