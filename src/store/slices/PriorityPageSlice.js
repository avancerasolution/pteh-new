import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* 🔹 Async Thunk */
export const fetchPriorityPagePosts = createAsyncThunk("PriorityPage/fetchPosts", async (_, { getState }) => {
  const { PriorityPage } = getState();

  // 🛑 Stop duplicate API calls
  if (PriorityPage.loaded) {
    return PriorityPage.posts;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/priority-page?_embed&per_page=1`);

  if (!res.ok) {
    throw new Error("Failed to fetch PriorityPage posts");
  }

  return await res.json();
});

const PriorityPageSlice = createSlice({
  name: "PriorityPage",
  initialState: {
    posts: [],
    loading: false,
    error: null,
    loaded: false, // 👈 IMPORTANT
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPriorityPagePosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPriorityPagePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.loaded = true; // 👈 mark as fetched
      })
      .addCase(fetchPriorityPagePosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

/* 🔹 Selectors */
export const selectPriorityPagePosts = (state) => state.PriorityPage.posts;
export const selectPriorityPageLoading = (state) => state.PriorityPage.loading;
export const selectPriorityPageError = (state) => state.PriorityPage.error;

export default PriorityPageSlice.reducer;
