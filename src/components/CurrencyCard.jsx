import React from "react";

const CurrencyCard = ({ text, flag, amount, icon }) => {
  return (
    <div className="dashboard-currency-card">
      <div className="currency">
        <img src={flag} alt="country flag" />
        <div className="currency-content">
          <div className="amount">{amount}</div>
          <small>{text}</small>
        </div>
      </div>

      <div className="share-icon">
        <i className={icon}></i>
      </div>
    </div>
  );
};

export default CurrencyCard;
