// src/components/DashboardHistory.js
import React from "react";
import { useSelector } from "react-redux";
import DashboardComponent from "./DashboardComponent";
import { Box, Divider, Paper, Typography } from "@mui/material";

const AccountDetail = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <DashboardComponent>
      <Box sx={{ m: 5 }}>
        <Paper elevation={3} sx={{ width: "80%" }}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            My Account Details
          </Typography>
          <Divider />
          <div className="account-detail">
            <p>
              <b>Username:</b> {user.username}
            </p>
            <p>
              <b>Email:</b> {user.email}
            </p>
            <p>
              <b>Account Number:</b> {user.accountNumber}
            </p>
            <p>
              <b>Wallet balance:</b> {user.walletBalance}
            </p>
          </div>
        </Paper>
      </Box>
    </DashboardComponent>
  );
};

export default AccountDetail;
