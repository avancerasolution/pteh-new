import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* 🔹 Async Thunk */
export const fetchExecutivePosts = createAsyncThunk("Executive/fetchPosts", async (_, { getState }) => {
  const { Executive } = getState();

  // 🛑 Stop duplicate API calls (React 18 Strict Mode safe)
  if (Executive.loaded) {
    return Executive.posts;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/executive-summary?_embed&per_page=1`);

  if (!res.ok) {
    throw new Error("Failed to fetch Executive posts");
  }

  return await res.json();
});

const ExecutiveSlice = createSlice({
  name: "Executive",
  initialState: {
    posts: [],
    loading: false,
    error: null,
    loaded: false, // 👈 IMPORTANT
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExecutivePosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExecutivePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.loaded = true; // 👈 mark as fetched
      })
      .addCase(fetchExecutivePosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

/* 🔹 Selectors */
export const selectExecutivePosts = (state) => state.Executive.posts;
export const selectExecutiveLoading = (state) => state.Executive.loading;
export const selectExecutiveError = (state) => state.Executive.error;

export default ExecutiveSlice.reducer;
