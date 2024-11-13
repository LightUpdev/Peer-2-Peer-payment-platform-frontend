// src/features/wallet/walletSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfig";

// Async Thunks
export const fetchBalance = createAsyncThunk(
  "wallet/fetchBalance",
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const response = await axiosInstance.get("/api/wallet/balance", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.walletBalance;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const initiateTransfer = createAsyncThunk(
  "wallet/initiateTransfer",
  async (transferData, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const response = await axiosInstance.post(
        "/api/wallet/initiate-transfer",
        transferData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);

      return response.data.transaction;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const completeTransfer = createAsyncThunk(
  "wallet/completeTransfer",
  async (transferData, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const response = await axiosInstance.post(
        "/api/wallet/complete-transfer",
        transferData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.transaction;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const transactionHistory = createAsyncThunk(
  "wallet/transactionHistory",
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const response = await axiosInstance.get("/api/wallet/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Slice
const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    balance: 0,
    transactions: [],
    transaction: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Balance
      .addCase(fetchBalance.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.balance = action.payload;
        state.error = null;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload.message || "Failed to fetch balance";
      })
      // Transfer Money
      .addCase(initiateTransfer.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(initiateTransfer.fulfilled, (state, action) => {
        state.status = "Pending";
        state.transaction = action.payload;
        state.error = null;
      })
      .addCase(initiateTransfer.rejected, (state, action) => {
        state.status = "Failed";
        state.transaction = null;
        state.error = action.payload.message || "Transfer failed";
      })
      // Transfer Money
      .addCase(completeTransfer.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(completeTransfer.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.transactions.unshift(action.payload.transaction); // Add to top of transactions
        state.balance -= action.payload.amount; // Update balance
        state.error = null;
      })
      .addCase(completeTransfer.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload.message ;
      })
      .addCase(transactionHistory.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(transactionHistory.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.transactions = action.payload;
        state.error = null;
      })
      .addCase(transactionHistory.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload.message || "No Transaction History";
      });
  },
});

export default walletSlice.reducer;
