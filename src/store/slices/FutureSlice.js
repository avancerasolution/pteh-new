import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* 🔹 Async Thunk */
export const fetchFuturePosts = createAsyncThunk("Future/fetchPosts", async (_, { getState }) => {
  const { Future } = getState();

  // 🛑 Stop duplicate API calls (React 18 Strict Mode safe)
  if (Future.loaded) {
    return Future.posts;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/future-state?_embed&per_page=1`);

  if (!res.ok) {
    throw new Error("Failed to fetch Future posts");
  }

  return await res.json();
});

const FutureSlice = createSlice({
  name: "Future",
  initialState: {
    posts: [],
    loading: false,
    error: null,
    loaded: false, // 👈 IMPORTANT
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFuturePosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFuturePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.loaded = true; // 👈 mark as fetched
      })
      .addCase(fetchFuturePosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

/* 🔹 Selectors */
export const selectFuturePosts = (state) => state.Future.posts;
export const selectFutureLoading = (state) => state.Future.loading;
export const selectFutureError = (state) => state.Future.error;

export default FutureSlice.reducer;
