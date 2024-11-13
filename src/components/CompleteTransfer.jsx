// src/components/CompleteTransfer.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { completeTransfer } from "../features/wallet/walletSlice";
import { useNavigate } from "react-router-dom";
import DashboardComponent from "./DashboardComponent";
import OtpInput from "react-otp-input";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const CompleteTransfer = () => {
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { transaction } = useSelector((state) => state.wallet);

  const { status, error } = useSelector((state) => state.wallet);
  const transactionData = { transactionId: transaction?._id, otp };

  const handleChange = (otp) => {
    setOtp(otp);
  };

  const transferCompletion = (e) => {
    if (otp.length === 6) {
      try {
        dispatch(completeTransfer(transactionData));
        navigate("/dashboard");
      } catch (error) {
        console.error("Transfer failed:", error);
      }
    } else {
      console.log("Incomplete OTP");
    }
  };

  // Handle OTP paste
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text"); // Get the pasted string
    if (pasteData.length === 6 && /^\d+$/.test(pasteData)) {
      // Check if it matches 6 digits
      setOtp(pasteData); // Set OTP state directly
      e.preventDefault(); // Prevent default paste behavior
      transferCompletion();
    }
  };

  return (
    <DashboardComponent>
      <div className="complete-transfer">
        <h2>Complete Transfer</h2>
        {status === "loading" && <p>Transferring...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <h3>Enter OTP</h3>
          <OtpInput
            value={otp}
            onChange={handleChange}
            onPaste={handlePaste}
            numInputs={6}
            isInputNum={true}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              width: "40px",
              height: "40px",
              margin: "0 8px",
              fontSize: "18px",
              borderRadius: "4px",
              border: "1px solid #ced4da",
            }}
            focusStyle={{
              border: "1px solid #007bff",
            }}
          />
        </div>
        <br />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={() => transferCompletion()}
        >
          Transfer
        </Button>
      </div>
    </DashboardComponent>
  );
};

export default CompleteTransfer;
