import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//  FETCH ALL PILLAR POSTS (with Pagination)
export const fetchPillarStats = createAsyncThunk("pillarStats/fetch", async (_, { rejectWithValue }) => {
  try {
    let allPosts = [];
    let page = 1;
    let totalPages = 1;

    // Loop until all pages fetched
    while (page <= totalPages) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/pillars?per_page=100&page=${page}`);

      if (!res.ok) throw new Error("Failed to fetch pillar stats");

      const data = await res.json();

      //  Get total pages from WP headers
      totalPages = parseInt(res.headers.get("X-WP-TotalPages"));

      //  Add posts into array
      allPosts = [...allPosts, ...data];

      page++;
    }

    return allPosts;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

//  Default Status Counts
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
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 🔄 Pending
      .addCase(fetchPillarStats.pending, (state) => {
        state.loading = true;
        state.error = null;
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

      .addCase(fetchPillarStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const selectPillarStats = (state) => state.pillarStats.counts;
export const selectPillarStatsTotal = (state) => state.pillarStats.total;
export const selectPillarStatsLoading = (state) => state.pillarStats.loading;
export const selectPillarStatsError = (state) => state.pillarStats.error;

export default pillarStatsSlice.reducer;
