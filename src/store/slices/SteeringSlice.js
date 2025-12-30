import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* 🔹 Async Thunk */
export const fetchSteeringPosts = createAsyncThunk("steering/fetchPosts", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/steering-commitie?_embed&per_page=60`);

  if (!res.ok) {
    throw new Error("Failed to fetch steering posts");
  }

  return await res.json();
});

const steeringSlice = createSlice({
  name: "steering",
  initialState: {
    posts: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSteeringPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSteeringPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchSteeringPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

/* 🔹 Selectors */
export const selectSteeringPosts = state => state.steering.posts;
export const selectSteeringLoading = state => state.steering.loading;
export const selectSteeringError = state => state.steering.error;

export default steeringSlice.reducer;
