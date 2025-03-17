import { createAsyncThunk } from "@reduxjs/toolkit";
import { IEmployees } from "../model/types";
import axios from "axios";

const BASE_URL = "http://localhost:3000/employees";

export const fetchEmployees = createAsyncThunk<IEmployees[], void, { rejectValue: string }>(
  "employees/api/employeesApi",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<IEmployees[]>(BASE_URL);
      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data || "response error");
      } else {
        return rejectWithValue("unknown error");
      }
    }
  },
);

export const updateStatusEmployees = createAsyncThunk<
  IEmployees,
  { id: string; isArchive: boolean },
  { rejectValue: string }
>("employees/api/updatedStatus", async ({ id, isArchive }, { rejectWithValue }) => {
  try {
    const response = await axios.patch<IEmployees>(`${BASE_URL}/${id}`, { isArchive });
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data || "response error");
    } else {
      return rejectWithValue("unknown error");
    }
  }
});

export const updateEmployeeForm = createAsyncThunk<IEmployees, IEmployees, { rejectValue: string }>(
  "employees/api/updateEmployee",
  async (employee, { rejectWithValue }) => {
    try {
      const response = await axios.put<IEmployees>(`${BASE_URL}/${employee.id}`, employee);
      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data || "response error");
      } else {
        return rejectWithValue("unknown error");
      }
    }
  },
);

export const addEmployeeForm = createAsyncThunk<IEmployees, IEmployees, { rejectValue: string }>(
  "employees/api/addEmployee",
  async (employee, { rejectWithValue }) => {
    try {
      const response = await axios.post<IEmployees>(`${BASE_URL}`, employee);
      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data || "response error");
      } else {
        return rejectWithValue("unknown error");
      }
    }
  },
);

export const deleteEmployee = createAsyncThunk<IEmployees, IEmployees, { rejectValue: string }>(
  "employees/api/deleteEmployee",
  async (employee, { rejectWithValue }) => {
    try {
      const response = await axios.delete<IEmployees>(`${BASE_URL}/${employee.id}`, { data: employee });
      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data || "response error");
      } else {
        return rejectWithValue("unknown error");
      }
    }
  },
);
