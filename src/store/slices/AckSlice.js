import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/*    Async Thunk */
export const fetchAckPosts = createAsyncThunk("Ack/fetchPosts", async (_, { getState }) => {
  const { Ack } = getState();

  if (Ack.loaded) {
    return Ack.posts;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/acknowledgements?_embed&per_page=1`);

  if (!res.ok) {
    throw new Error("Failed to fetch Ack posts");
  }

  return await res.json();
});

const AckSlice = createSlice({
  name: "Ack",
  initialState: {
    posts: [],
    loading: false,
    error: null,
    loaded: false, 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAckPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAckPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.loaded = true;  
      })
      .addCase(fetchAckPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

/*    Selectors */
export const selectAckPosts = (state) => state.Ack.posts;
export const selectAckLoading = (state) => state.Ack.loading;
export const selectAckError = (state) => state.Ack.error;

export default AckSlice.reducer;
