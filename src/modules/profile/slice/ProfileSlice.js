import { toast } from "react-toastify";
import { xAuthApi } from "@/services/api";
import { PROFILE_DATA } from "@/services/url";
import Cookies, { cookieKeys } from "@/services/cookies";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const profileState = {
  profileDetail: {},
};

export const fetchProfileDetail = createAsyncThunk(
  `profile/fetchProfileDetail`,
  async () => {
    try {
      const accessToken = Cookies.get(cookieKeys?.ACCESS_TOKEN);
      const payload = {
        oauth_token: accessToken?.oauth_token,
        oauth_token_secret: accessToken?.oauth_token_secret,
      };
      const response = await xAuthApi.get(
        `${PROFILE_DATA}?oauth_token=${payload?.oauth_token}&oauth_token_secret=${payload?.oauth_token_secret}`
      );
      return response?.data;
    } catch (err) {
      toast.error(err?.response?.data?.error || "Something went wrong!");
      return err;
    }
  }
);

const ProfileSlice = createSlice({
  name: "profile",
  initialState: profileState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProfileDetail.pending, () => {});
    builder.addCase(fetchProfileDetail.fulfilled, (state, action) => {
      state.profileDetail = action?.payload;
    });
    builder.addCase(fetchProfileDetail.rejected, () => {});
  },
});
export default ProfileSlice.reducer;
