/* eslint-disable no-unused-vars */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axios.config";
import { createStandaloneToast } from "@chakra-ui/react";
import CookieService from "../../services/CookieService";

const initialState = {
  isOpenCartDrawer: false,
  onOpenCartDrawer: false,
  onCloseCartDrawer: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
     
    onOpenCartDrawerAction: (state) => {
      state.isOpenCartDrawer = true;
      state.onOpenCartDrawer = true;
    },
    onCloseCartDrawerAction: (state) => {
      state.isOpenCartDrawer = false;
      state.onOpenCartDrawer = false;
    },
  },
});

export const { 
  onCloseCartDrawerAction,
  onOpenCartDrawerAction,
} = globalSlice.actions;
export const selectGlobal = ({ global }) => global;
export default globalSlice.reducer;
