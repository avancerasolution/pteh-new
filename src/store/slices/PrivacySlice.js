import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/*    Async Thunk */
export const fetchPrivacyPosts = createAsyncThunk("Privacy/fetchPosts", async (_, { getState }) => {
  const { Privacy } = getState();

  // 🛑 Stop duplicate API calls (React 18 Strict Mode safe)
  if (Privacy.loaded) {
    return Privacy.posts;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/privacy-policy?_embed&per_page=1`);

  if (!res.ok) {
    throw new Error("Failed to fetch Privacy posts");
  }

  return await res.json();
});

const PrivacySlice = createSlice({
  name: "Privacy",
  initialState: {
    posts: [],
    loading: false,
    error: null,
    loaded: false,  
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrivacyPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrivacyPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.loaded = true;  
      })
      .addCase(fetchPrivacyPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

/*    Selectors */
export const selectPrivacyPosts = (state) => state.Privacy.posts;
export const selectPrivacyLoading = (state) => state.Privacy.loading;
export const selectPrivacyError = (state) => state.Privacy.error;

export default PrivacySlice.reducer;
