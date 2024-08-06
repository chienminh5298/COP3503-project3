import React, { useState } from "react";

import "./index.scss";
import Home from "../home";
import Tasks from "../tasks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../loading";

const Skeleton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState(<Home setIsLoading={setIsLoading} />);
    return (
        <div className="skeletonContainer">
            {isLoading && <Loading />}
            <div className="navBar">
                <button onClick={() => setContent(<Home setIsLoading={setIsLoading} />)}>Home</button>
                <button onClick={() => setContent(<Tasks setIsLoading={setIsLoading} />)}>Tasks</button>
            </div>
            <div className="contentContainer">{content}</div>
            <ToastContainer />
        </div>
    );
};

export default Skeleton;
