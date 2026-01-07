import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ===============================
   FETCH PILLARS (PAGINATED)
================================ */
export const fetchPillars = createAsyncThunk("pillars/fetchPillars", async ({ page = 1 }, { rejectWithValue }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/pillar-texanomies?per_page=20&page=${page}`);

    if (!res.ok) {
      throw new Error("Failed to fetch pillars");
    }

    const data = await res.json();
    const totalPages = Number(res.headers.get("X-WP-TotalPages"));

    return { data, totalPages, page };
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const pillarSlice = createSlice({
  name: "pillars",
  initialState: {
    items: [],
    loading: false,
    page: 1,
    totalPages: 1,
    activePillar: null,
  },
  reducers: {
    setActivePillar(state, action) {
      state.activePillar = action.payload;
    },
    resetPillars(state) {
      state.items = [];
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPillars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPillars.fulfilled, (state, action) => {
        state.loading = false;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;

        // 🔥 APPEND DATA (LOAD MORE)
        state.items = [...state.items, ...action.payload.data];
      })
      .addCase(fetchPillars.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setActivePillar, resetPillars } = pillarSlice.actions;

export const selectPillars = (state) => state.pillars.items;
export const selectPillarsLoading = (state) => state.pillars.loading;
export const selectActivePillar = (state) => state.pillars.activePillar;
export const selectPillarPage = (state) => state.pillars.page;
export const selectPillarTotalPages = (state) => state.pillars.totalPages;

export default pillarSlice.reducer;
