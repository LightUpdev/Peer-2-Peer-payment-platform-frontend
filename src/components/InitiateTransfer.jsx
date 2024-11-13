// src/components/InitiateTransfer.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initiateTransfer } from "../features/wallet/walletSlice";
import { useNavigate } from "react-router-dom";
import DashboardComponent from "./DashboardComponent";
import Grid from "@mui/material/Grid2";
import SendIcon from "@mui/icons-material/Send";

import { Box, Button, TextField } from "@mui/material";

const InitiateTransfer = () => {
  const [transferData, setTransferData] = useState({
    recipientAccountNumber: "",
    amount: "",
  });
  console.log(transferData.amount);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.wallet);

  const handleChange = (e) => {
    setTransferData({ ...transferData, [e.target.name]: e.target.value });
  };

  const transferInitiation = (e) => {
    e.preventDefault();

    try {
      dispatch(
        initiateTransfer({
          recipientAccountNumber: transferData.recipientAccountNumber,
          amount: parseInt(transferData.amount),
        })
      );

      navigate("/complete-transfer");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardComponent>
      <div className="initiate-transfer-container">
        <h2>Send Money</h2>
        {status === "loading" && <p>Transferring...</p>}
        {error && (
          <p className="error-msg" style={{ color: "red" }}>
            {error}
          </p>
        )}
        <Box component="form" onSubmit={transferInitiation} className="form">
          <Grid container spacing={3} className="initiate-form">
            {/* Amount to be transferred */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Amount to Transfer"
                name="amount"
                type="number"
                value={transferData.amount}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>

            {/* Recipient's Account Number */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Recipient Account Number"
                name="recipientAccountNumber"
                type="text"
                value={transferData.recipientAccountNumber}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
              >
                Transfer
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </DashboardComponent>
  );
};

export default InitiateTransfer;
