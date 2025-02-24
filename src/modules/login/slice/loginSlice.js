import { toast } from "react-toastify";
import { xAuthApi } from "@/services/api";
import Cookies, { cookieKeys } from "@/services/cookies";
import { ACCESS_TOKEN, REQUEST_TOKEN } from "@/services/url";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const token = Cookies.get(cookieKeys?.TOKEN);
const rqToken = Cookies.get(cookieKeys?.REQUEST_TOKEN);
const access_Token = Cookies.get(cookieKeys?.ACCESS_TOKEN);
const loginState = {
  isAuth: !!token,
  token: token ? token : "",
  requestedToken: rqToken ? rqToken : {},
  accessToken: access_Token,
};

export const getRequestToken = createAsyncThunk(
  `authentication/getRequestToken`,
  async (payload, thunkAPI) => {
    try {
      const response = await xAuthApi.post(REQUEST_TOKEN, payload);
      Cookies.set(cookieKeys?.REQUEST_TOKEN, response?.data);
      return response.data;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong!");
      return thunkAPI.rejectWithValue(err?.response?.data?.statusCode);
    }
  }
);

export const getAccessToken = createAsyncThunk(
  `authentication/getAccessToken`,
  async (payload, thunkAPI) => {
    try {
      const response = await xAuthApi.post(ACCESS_TOKEN, payload);
      Cookies.set(cookieKeys?.ACCESS_TOKEN, response?.data);
      Cookies.set(cookieKeys?.TOKEN, response?.data?.oauth_token);
      return response.data;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong!");
      return thunkAPI.rejectWithValue(err?.response?.data?.statusCode);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: loginState,
  reducers: {
    getLogout: (state) => {
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    //get Request Token
    builder.addCase(getRequestToken.pending);
    builder.addCase(getRequestToken.fulfilled, (state, action) => {
      state.requestedToken = action?.payload;
    });
    builder.addCase(getRequestToken.rejected);
    //get Access Token
    builder.addCase(getAccessToken.pending, (state) => {
      state.isAuth = false;
    });
    builder.addCase(getAccessToken.fulfilled, (state, action) => {
      state.isAuth = true;
      state.accessToken = action?.payload;
    });
    builder.addCase(getAccessToken.rejected, (state) => {
      state.isAuth = false;
    });
  },
});
export const { getLogout } = loginSlice.actions;
export default loginSlice.reducer;
