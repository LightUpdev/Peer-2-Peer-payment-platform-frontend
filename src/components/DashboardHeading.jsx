import React from "react";

const DashboardHeading = ({ title, linkTitle, goTo }) => {
  return (
    <div className="dashboard-heading">
      <h3>{title}</h3>
      <small style={{ cursor: "pointer" }} onClick={goTo}>
        {linkTitle} <i className="bi bi-chevron-right"></i>
      </small>
    </div>
  );
};

export default DashboardHeading;
