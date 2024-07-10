import React, { useEffect, useState } from "react";
import WelcomeScreen from "../welcome";
import { createRandomTasksArray } from "../../utils";
import { useDispatch } from "react-redux";
import { taskAction } from "../../storage/taskReducer";
const Router = () => {
    const [screen, setScreen] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        const dummyData = createRandomTasksArray(100);
        dispatch(taskAction.fetch(dummyData));
    }, [dispatch]); //Generate task data

    useEffect(() => {
        setScreen(<WelcomeScreen setScreen={setScreen} />);
    }, []);

    return screen;
};

export default Router;
