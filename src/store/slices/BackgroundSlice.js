import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/*    Async Thunk */
export const fetchBackgroundPosts = createAsyncThunk("Background/fetchPosts", async (_, { getState }) => {
  const { Background } = getState();

  if (Background.loaded) {
    return Background.posts;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/background?_embed&per_page=1`);

  if (!res.ok) {
    throw new Error("Failed to fetch Background posts");
  }

  return await res.json();
});

const BackgroundSlice = createSlice({
  name: "Background",
  initialState: {
    posts: [],
    loading: false,
    error: null,
    loaded: false, 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBackgroundPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBackgroundPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.loaded = true; 
      })
      .addCase(fetchBackgroundPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

/*    Selectors */
export const selectBackgroundPosts = (state) => state.Background.posts;
export const selectBackgroundLoading = (state) => state.Background.loading;
export const selectBackgroundError = (state) => state.Background.error;

export default BackgroundSlice.reducer;
