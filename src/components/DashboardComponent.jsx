// src/components/Dashboard.js
import React from "react";

import verticalNavContent from "../verticalNavContent";
import { useNavigate } from "react-router-dom";

const DashboardComponent = (props) => {
  const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      <div className="nav">
        <ul>
          {verticalNavContent.map((navContent) => {
            const { id, title, icon, link } = navContent;
            return (
              <li key={id} onClick={() => navigate(link)}>
                <div>
                  <p>{title}</p>
                </div>
                <div>
                  <i className={icon}></i>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="dashboard">{props.children}</div>
    </div>
  );
};

export default DashboardComponent;
