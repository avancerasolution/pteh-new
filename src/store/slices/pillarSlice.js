import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* =====================================
   FETCH PILLARS (ONLY TAXONOMIES)
===================================== */
export const fetchPillars = createAsyncThunk("pillars/fetchPillars", async ({ page = 1 }, { rejectWithValue }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/pillar-texanomies?per_page=20&page=${page}`);

    if (!res.ok) throw new Error("Failed to fetch pillars");

    const data = await res.json();
    const totalPages = Number(res.headers.get("X-WP-TotalPages"));

    return { data, totalPages, page };
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

/* =====================================
   FETCH POSTS FOR SINGLE PILLAR (LAZY)
===================================== */
export const fetchPillarPosts = createAsyncThunk("pillars/fetchPillarPosts", async (pillarId, { rejectWithValue }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/pillars?pillar-texanomies=${pillarId}`);

    if (!res.ok) throw new Error("Failed to fetch pillar posts");

    const data = await res.json();
    return { pillarId, posts: data };
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const pillarSlice = createSlice({
  name: "pillars",
  initialState: {
    items: [],
    loading: false, // taxonomy loader
    page: 1,
    totalPages: 1,
    activePillar: null,
    postsLoading: false, // 🔥 table loader
  },
  reducers: {
    setActivePillar(state, action) {
      state.activePillar = action.payload;
    },
    resetPillars(state) {
      state.items = [];
      state.page = 1;
      state.totalPages = 1;
      state.activePillar = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ===== TAXONOMY LOADER ===== */
      .addCase(fetchPillars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPillars.fulfilled, (state, action) => {
        state.loading = false;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;

        const merged = [...state.items, ...action.payload.data];

        // 🔥 unique + ascending ID order
        const unique = Array.from(new Map(merged.map((item) => [item.id, item])).values()).sort((a, b) => a.id - b.id);

        state.items = unique;
      })
      .addCase(fetchPillars.rejected, (state) => {
        state.loading = false;
      })

      /* ===== POSTS (TABLE) LOADER ===== */
      .addCase(fetchPillarPosts.pending, (state) => {
        state.postsLoading = true;
      })
      .addCase(fetchPillarPosts.fulfilled, (state, action) => {
        state.postsLoading = false;

        if (state.activePillar?.id === action.payload.pillarId) {
          state.activePillar.posts = action.payload.posts;
        }
      })
      .addCase(fetchPillarPosts.rejected, (state) => {
        state.postsLoading = false;
      });
  },
});

/* ===== EXPORTS ===== */
export const { setActivePillar, resetPillars } = pillarSlice.actions;

export const selectPillars = (state) => state.pillars.items;
export const selectPillarsLoading = (state) => state.pillars.loading;
export const selectActivePillar = (state) => state.pillars.activePillar;
export const selectPillarPage = (state) => state.pillars.page;
export const selectPillarTotalPages = (state) => state.pillars.totalPages;
export const selectPillarPostsLoading = (state) => state.pillars.postsLoading;

export default pillarSlice.reducer;
