// src/components/Dashboard.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBalance } from "../features/wallet/walletSlice";
import { useNavigate } from "react-router-dom";
import { formatNumberWithCommas } from "../utils/numberFormatter";
import Cards from "./Cards";
import cardContents from "../cardContents";
import DashboardComponent from "./DashboardComponent";
import DashboardHeading from "./DashboardHeading";
import CurrencyCard from "./CurrencyCard";
import { currency } from "../currencyCard";
import TransactionHistory from "./TransactionHistory";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { balance } = useSelector((state) => state.wallet);

  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(fetchBalance());
    }
  }, [user, dispatch, navigate]);

  return (
    <DashboardComponent>
      <small>Total available amount</small>
      <p className="balance">
        {balance ? formatNumberWithCommas(balance) : "0"} EUR
      </p>
      <div className="dashboard-cards">
        {cardContents.map((cardItem) => {
          const { id, title, icon, link } = cardItem;
          return <Cards key={id} title={title} icon={icon} link={link} />;
        })}
      </div>
      <DashboardHeading title="Accounts" linkTitle="All accounts" />
      <div className="currency-card-container">
        {currency.map((card) => {
          const { id, amount, text, flag, icon } = card;
          return (
            <CurrencyCard
              key={id}
              amount={amount}
              text={text}
              flag={flag}
              icon={icon}
            />
          );
        })}
      </div>

      <DashboardHeading
        title="Payment History"
        linkTitle="All History"
        goTo={()=>navigate("/transactions")}
      />
      <TransactionHistory />
    </DashboardComponent>
  );
};

export default Dashboard;
