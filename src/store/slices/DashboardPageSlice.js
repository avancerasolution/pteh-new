import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/*    Async Thunk */
export const fetchDashboardPagePosts = createAsyncThunk("DashboardPage/fetchPosts", async (_, { getState }) => {
  const { DashboardPage } = getState();

  // 🛑 Stop duplicate API calls
  if (DashboardPage.loaded) {
    return DashboardPage.posts;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/dashboard-page?_embed&per_page=1`);

  if (!res.ok) {
    throw new Error("Failed to fetch DashboardPage posts");
  }

  return await res.json();
});

const DashboardPageSlice = createSlice({
  name: "DashboardPage",
  initialState: {
    posts: [],
    loading: false,
    error: null,
    loaded: false,  
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardPagePosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardPagePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.loaded = true;  
      })
      .addCase(fetchDashboardPagePosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

/*    Selectors */
export const selectDashboardPagePosts = (state) => state.DashboardPage.posts;
export const selectDashboardPageLoading = (state) => state.DashboardPage.loading;
export const selectDashboardPageError = (state) => state.DashboardPage.error;

export default DashboardPageSlice.reducer;
