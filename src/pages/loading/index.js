import React from "react";
import "./index.scss";
import loading from "../../asset/gg.gif";

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Loading = () => {
    return (
        <div className="loadingContainer">
            <img src={loading} alt="loading gif" />
        </div>
    );
};

export default Loading;
