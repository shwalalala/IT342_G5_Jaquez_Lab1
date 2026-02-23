import React from "react";
import "../styles/components.css";

const Card = ({ children, title, className = "" }) => {
  return (
    <div className={`card ${className}`}>
      {title && <h2 className="card-title">{title}</h2>}
      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card;
