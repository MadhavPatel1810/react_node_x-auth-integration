import { xAuthApi } from "@/services/api";
import { PROFILE_DATA } from "@/services/url";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const profileState = {
  profileDetail: {},
};

export const fetchProfileDetail = createAsyncThunk(
  `profile/fetchProfileDetail`,
  async () => {
    try {
      const response = await xAuthApi.post(PROFILE_DATA);
      return response;
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
      state.profileDetail = action?.payload?.data;
    });
    builder.addCase(fetchProfileDetail.rejected, () => {});
  },
});
export default ProfileSlice.reducer;
