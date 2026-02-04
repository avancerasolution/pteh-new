import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/*    Async Thunk */
export const fetchDataPagePosts = createAsyncThunk("DataPage/fetchPosts", async (_, { getState }) => {
  const { DataPage } = getState();

  // 🛑 Stop duplicate API calls (React 18 Strict Mode safe)
  if (DataPage.loaded) {
    return DataPage.posts;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/our-data?_embed&per_page=1`);

  if (!res.ok) {
    throw new Error("Failed to fetch DataPage posts");
  }

  return await res.json();
});

const DataPageSlice = createSlice({
  name: "DataPage",
  initialState: {
    posts: [],
    loading: false,
    error: null,
    loaded: false,  
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataPagePosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataPagePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.loaded = true;  
      })
      .addCase(fetchDataPagePosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

/*    Selectors */
export const selectDataPagePosts = (state) => state.DataPage.posts;
export const selectDataPageLoading = (state) => state.DataPage.loading;
export const selectDataPageError = (state) => state.DataPage.error;

export default DataPageSlice.reducer;
