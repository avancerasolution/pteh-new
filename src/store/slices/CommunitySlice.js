import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* 🔹 Async Thunk */
export const fetchCommunityPosts = createAsyncThunk("Community/fetchPosts", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/community-partner?_embed&per_page=100`);

  if (!res.ok) {
    throw new Error("Failed to fetch Community posts");
  }

  return await res.json();
});

const CommunitySlice = createSlice({
  name: "Community",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunityPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommunityPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchCommunityPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

/* 🔹 Selectors */
export const selectCommunityPosts = (state) => state.Community.posts;
export const selectCommunityLoading = (state) => state.Community.loading;
export const selectCommunityError = (state) => state.Community.error;

export default CommunitySlice.reducer;
