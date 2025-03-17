import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addEmployeeForm,
  deleteEmployee,
  fetchEmployees,
  updateEmployeeForm,
  updateStatusEmployees,
} from "../api/employeesApi";
import { IEmployees } from "./types";

interface EmployeesState {
  employees: IEmployees[];
  loading: boolean;
  error: string | null;
}
const initialState: EmployeesState = {
  employees: [],
  loading: false,
  error: null,
};

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchEmployees.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchEmployees.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<IEmployees[]>) => {
      state.loading = false;
      state.employees = action.payload;
    });

    builder.addCase(updateStatusEmployees.pending, state => {
      state.error = null;
    });
    builder.addCase(updateStatusEmployees.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(updateStatusEmployees.fulfilled, (state, action: PayloadAction<IEmployees>) => {
      const updatedEmployee = action.payload;
      const index = state.employees.findIndex(emp => emp.id === updatedEmployee.id);
      state.employees[index] = { ...state.employees[index], ...updatedEmployee };
    });

    builder.addCase(updateEmployeeForm.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateEmployeeForm.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(updateEmployeeForm.fulfilled, (state, action: PayloadAction<IEmployees>) => {
      state.loading = false;
      const updatedEmployee = action.payload;
      const index = state.employees.findIndex(emp => emp.id === updatedEmployee.id);
      state.employees[index] = updatedEmployee;
    });

    builder.addCase(addEmployeeForm.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addEmployeeForm.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(addEmployeeForm.fulfilled, (state, action: PayloadAction<IEmployees>) => {
      state.loading = false;
      state.employees.unshift(action.payload);
    });

    builder.addCase(deleteEmployee.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(deleteEmployee.fulfilled, (state, action: PayloadAction<IEmployees>) => {
      state.loading = false;
      state.employees = state.employees.filter(employee => employee.id !== action.payload.id);
    });
  },
});

export default employeesSlice.reducer;
