import employeesReducer from "@entities/employees/model/employeesSlice";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  employeesReducer,
});
