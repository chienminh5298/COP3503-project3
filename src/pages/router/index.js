import React, { useEffect, useState } from "react";
import WelcomeScreen from "../welcome";
import { createRandomTaskHeap } from "../../components/task";
import { useDispatch } from "react-redux";
import { taskAction } from "../../storage/taskReducer";
const Router = () => {
  const [screen, setScreen] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const heap = createRandomTaskHeap(10);
    dispatch(taskAction.fetch(heap));
  }, [dispatch]); //Generate task data

  useEffect(() => {
    setScreen(<WelcomeScreen setScreen={setScreen} />);
  }, []);

  return screen;
};

export default Router;
