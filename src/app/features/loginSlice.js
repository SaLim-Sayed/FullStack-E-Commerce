/* eslint-disable no-unused-vars */
 
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axios.config";
import { createStandaloneToast } from "@chakra-ui/react";
import CookieService from "../../services/CookieService";

const { toast } = createStandaloneToast();
const initialState = {
  loading: false, // ** pending
  data: null, // ** success=>fulfilled
  error: null, // **error=> rejected
};

export const userLogin = createAsyncThunk(
  "login/userLogin",
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const { data } = await axiosInstance.post(`/api/auth/local`, user);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        state.data = action.payload;
        state.error = null;

        const date = new Date();
        const DAYS = 3;
        const EXPIRES_IN_DAYS = 3600 * 1000 * 24 * DAYS; //
        date.setTime(date.getTime() + EXPIRES_IN_DAYS); // 3 days

        const options = { path: "/", expires: date, };

        CookieService.set("jwt", action.payload.jwt, options);
        CookieService.set("name", action.payload.user.username, options);
        CookieService.set("email", action.payload.user.email, options);
        toast({
          title: "Logged in successfully",
          status: "success",
          isClosable: true,
        });
        setTimeout(() => {
          document.location.href = "/";
        },1000);
      })
      .addCase(userLogin.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.data = [];
        state.error = action.payload;
        toast({
          title: action.payload.response.data.error.message,
          description: "Make sure you have the correct Email or Password",
          status: "error",
          isClosable: true,
        });
      });
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can

export const selectLogin = ({ login }) => login;
export default loginSlice.reducer;
