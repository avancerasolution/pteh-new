import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* 🔹 Async Thunk */
export const fetchDataPosts = createAsyncThunk("data/fetchPosts", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/data?_embed&per_page=100`);

  if (!res.ok) {
    throw new Error("Failed to fetch data posts");
  }

  return await res.json();
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchDataPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

/* 🔹 Selectors */
export const selectDataPosts = (state) => state.data.posts;
export const selectDataLoading = (state) => state.data.loading;
export const selectDataError = (state) => state.data.error;

export default dataSlice.reducer;
