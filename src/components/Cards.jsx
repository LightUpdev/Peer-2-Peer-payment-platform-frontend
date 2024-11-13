import React from "react";
import { useNavigate } from "react-router-dom";

const Cards = ({ icon, title, link }) => {
  const navigate = useNavigate();
  return (
    <div className="card" onClick={() => navigate(link)}>
      <div className="card-icon">
        <i className={icon}></i>
      </div>
      <p>{title}</p>
    </div>
  );
};

export default Cards;
