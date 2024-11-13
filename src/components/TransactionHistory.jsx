// src/components/TransactionHistory.js
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { transactionHistory } from "../features/wallet/walletSlice";
import { dateFormatter } from "../utils/dateFormatter";

const TransactionHistory = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { status, transactions } = useSelector((state) => state.wallet);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      // Assuming transaction history is part of wallet slice
      // If not, create a separate thunk to fetch transactions
    }
  }, [user, dispatch, navigate]);
  useEffect(() => {
    dispatch(transactionHistory());
  }, [dispatch]);

  return (
    <Paper elevation={3} className="transaction-history-container">
      {status === "loading" && <p>Loading transactions...</p>}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Sender</TableCell>
              <TableCell>Recipient</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.length < 1 ? (
              <Box sx={{ m: 5 }}>
                <Typography variant="h3">No Record Found</Typography>
              </Box>
            ) : (
              transactions
                .slice()
                .reverse()
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Apply pagination
                .map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>{row._id}</TableCell>
                    <TableCell>{row.recipient.username}</TableCell>
                    <TableCell>{row.sender.username}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>
                      {dateFormatter(row.createdAt, "dd-MM-yyyy hh:mm:ss a")}
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination controls */}
      <TablePagination
        rowsPerPageOptions={[3, 5, 10, 25]}
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TransactionHistory;
