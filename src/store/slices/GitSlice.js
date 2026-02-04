import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/*    Async Thunk */
export const fetchGitPosts = createAsyncThunk("Git/fetchPosts", async (_, { getState }) => {
  const { Git } = getState();

  // 🛑 Stop duplicate API calls (React 18 Strict Mode safe)
  if (Git.loaded) {
    return Git.posts;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/get-in-touch?_embed&per_page=1`);

  if (!res.ok) {
    throw new Error("Failed to fetch Git posts");
  }

  return await res.json();
});

const GitSlice = createSlice({
  name: "Git",
  initialState: {
    posts: [],
    loading: false,
    error: null,
    loaded: false,  
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGitPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGitPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.loaded = true;  
      })
      .addCase(fetchGitPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

/*    Selectors */
export const selectGitPosts = (state) => state.Git.posts;
export const selectGitLoading = (state) => state.Git.loading;
export const selectGitError = (state) => state.Git.error;

export default GitSlice.reducer;
