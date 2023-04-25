import React from "react";
import "./DetailCard.scss";

const DetailCard = ({ title, children, className, imgleft, imgRight }) => {
  return (
    <div className={`detail-card ${className}`}>
      <div className="detail-card__title">
        {imgleft && <img src={imgleft} alt="icon" className="left-img" />}
        {title}
        {imgRight && <img src={imgRight} alt="icon" className="right-img" />}
      </div>
      <div className="detail-card__content">{children}</div>
    </div>
  );
};

export default DetailCard;
