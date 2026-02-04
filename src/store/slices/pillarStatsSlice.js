import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

  //  FETCH ALL PILLAR POSTS
export const fetchPillarStats = createAsyncThunk("pillarStats/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/pillars?per_page=100`);

    if (!res.ok) throw new Error("Failed to fetch pillar stats");

    const data = await res.json();
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const initialCounts = {
  "Not started": 0,
  Completed: 0,
  "In progress": 0,
  Blocked: 0,
  Stalled: 0,
};

const pillarStatsSlice = createSlice({
  name: "pillarStats",
  initialState: {
    loading: false,
    counts: initialCounts,
    total: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPillarStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPillarStats.fulfilled, (state, action) => {
        state.loading = false;

        const counts = { ...initialCounts };

        action.payload.forEach((post) => {
          const status = post?.acf?.status;
          if (counts[status] !== undefined) {
            counts[status] += 1;
          }
        });

        state.counts = counts;
        state.total = Object.values(counts).reduce((a, b) => a + b, 0);
      })
      .addCase(fetchPillarStats.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const selectPillarStats = (state) => state.pillarStats.counts;
export const selectPillarStatsTotal = (state) => state.pillarStats.total;
export const selectPillarStatsLoading = (state) => state.pillarStats.loading;

export default pillarStatsSlice.reducer;
