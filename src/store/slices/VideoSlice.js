import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* 🔹 Async Thunk */
export const fetchVideoPosts = createAsyncThunk("Video/fetchPosts", async (_, { getState }) => {
  const { Video } = getState();

  // 🛑 Stop duplicate API calls (React 18 Strict Mode safe)
  if (Video.loaded) {
    return Video.posts;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/video?_embed&per_page=60`);

  if (!res.ok) {
    throw new Error("Failed to fetch Video posts");
  }

  return await res.json();
});

const VideoSlice = createSlice({
  name: "Video",
  initialState: {
    posts: [],
    loading: false,
    error: null,
    loaded: false, // 👈 IMPORTANT
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideoPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideoPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.loaded = true; // 👈 mark as fetched
      })
      .addCase(fetchVideoPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

/* 🔹 Selectors */
export const selectVideoPosts = (state) => state.Video.posts;
export const selectVideoLoading = (state) => state.Video.loading;
export const selectVideoError = (state) => state.Video.error;

export default VideoSlice.reducer;
