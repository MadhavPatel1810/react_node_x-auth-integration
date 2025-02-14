import { toast } from "react-toastify";
import { xAuthApi } from "@/services/api";
import { TWITTER_TOKEN } from "@/services/url";
import Cookies, { cookieKeys } from "@/services/cookies";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const token = Cookies.get(cookieKeys?.TOKEN);
const login_client = Cookies.get(cookieKeys?.LOGGED_CLIENT);
const loginState = {
  isAuth: !!token,
  token: token ? token : "",
  loggedClient: login_client ? login_client : {},
};

export const getTwitterToken = createAsyncThunk(
  `authentication/getTwitterToken`,
  async (payload, thunkAPI) => {
    try {
      const response = await xAuthApi.post(TWITTER_TOKEN, payload);
      Cookies.set(cookieKeys?.TOKEN, response?.data?.access_token);
      Cookies.set(cookieKeys?.LOGGED_CLIENT, response?.data?.client);
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
  reducers: {},
  extraReducers: (builder) => {
    //get Verify Auth
    builder.addCase(getTwitterToken.pending, (state) => {
      state.isAuth = false;
    });
    builder.addCase(getTwitterToken.fulfilled, (state, action) => {
      state.isAuth = true;
      state.token = action?.payload?.access_token;
      state.loggedClient = action?.payload?.client;
    });
    builder.addCase(getTwitterToken.rejected, (state) => {
      state.isAuth = false;
    });
  },
});
export default loginSlice.reducer;
