import { createReducer, createAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

export const setUser = createAction("setUser");
export const logout = createAction("logout");
export const setToken = createAction("setToken");
export const setMeasurements = createAction("setMeasurements");
export const setBottomNavTab = createAction("setBottomNavTab");


const initialState = {
  user: null,
  token: null,
  measurements: [],
  bottomNavTab: "workouts"
};

export const UserReducer = createReducer(initialState, {
  [setUser]: (state, action) => {
    state.user = jwt_decode(action.payload.user);
    return state;
  },
  [logout]: (state) => {
    localStorage.removeItem("persist:root");
    state = {
      user: null,
      token: null,
      measurements: [],
      bottomNavTab: "workouts"
    };
    return state;
  },
  [setToken]: (state, action) => {
    state.token = action.payload.token;
    return state;
  },
  [setMeasurements]: (state, action) => {
    state.measurements = action.payload.measurements;
    return state;
  },
  [setBottomNavTab]: (state, action) => {   
    state.bottomNavTab = action.payload.bottomNavTab;
    return state;
  }
});
