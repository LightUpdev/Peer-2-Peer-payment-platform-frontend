// src/App.js
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Notifications from "./components/Notifications";
import useSocket from "./hooks/useSocket";
import { useDispatch, useSelector } from "react-redux";
import InitiateTransfer from "./components/InitiateTransfer";
import CompleteTransfer from "./components/CompleteTransfer";
import Navbar from "./components/Navbar";
import "./App.css";
import DashboardHistory from "./components/DashboardHistory";
import { transactionHistory } from "./features/wallet/walletSlice";
import AccountDetail from "./components/AccountDetails";

const App = () => {
  useSocket(); // Initialize socket connection
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(transactionHistory());
  }, [dispatch]);

  return (
    <div>
      <Notifications />

      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        {user && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/initiate-transfer" element={<InitiateTransfer />} />
            <Route path="/complete-transfer" element={<CompleteTransfer />} />
            <Route path="/transactions" element={<DashboardHistory />} />
            <Route path="/account-detail" element={<AccountDetail />} />
          </>
        )}
        <Route path="*" element={<h2>404: Page Not Found</h2>} />
      </Routes>
    </div>
  );
};

export default App;
