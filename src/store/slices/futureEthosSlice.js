import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/*    Async Thunk */
export const fetchFutureEthosPosts = createAsyncThunk("FutureEthos/fetchPosts", async (_, { getState }) => {
  const { FutureEthos } = getState();

  // 🛑 duplicate call avoid
  if (FutureEthos.loaded) {
    return FutureEthos.posts;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/future-table?_embed&per_page=100`);

  if (!res.ok) {
    throw new Error("Failed to fetch Future ETHOS table");
  }

  return await res.json();
});

const FutureEthosSlice = createSlice({
  name: "FutureEthos",
  initialState: {
    posts: [],
    loading: false,
    error: null,
    loaded: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFutureEthosPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFutureEthosPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.loaded = true;
      })
      .addCase(fetchFutureEthosPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

/*    Selectors */
export const selectFutureEthosPosts = (state) => state.FutureEthos.posts;
export const selectFutureEthosLoading = (state) => state.FutureEthos.loading;

export default FutureEthosSlice.reducer;
