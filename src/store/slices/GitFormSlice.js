import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ===============================
   SUBMIT FORM (CF7 ID = 12)
================================ */
export const submitGitForm = createAsyncThunk("gitForm/submit", async (values, { rejectWithValue, getState }) => {
  try {
    const { gitForm } = getState();

    // 🛑 Prevent duplicate submit
    if (gitForm.loading) {
      return rejectWithValue("Form is already submitting");
    }

    const formData = new FormData();

    // ⚠️ CF7 FIELD NAMES (MATCH WP)
    formData.append("first-name", values.firstName);
    formData.append("last-name", values.lastName);
    formData.append("your-email", values.email);
    formData.append("your-phone", values.phone);
    formData.append("your-message", values.message);

    // CF7 required hidden field
    formData.append("_wpcf7_unit_tag", "wpcf7-f12-p0-o1");

    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_BASE}/contact-form-7/v1/contact-forms/12/feedback`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.status !== "mail_sent") {
      return rejectWithValue(data.message || "Form submission failed");
    }

    return data;
  } catch (err) {
    return rejectWithValue("Something went wrong");
  }
});

const gitFormSlice = createSlice({
  name: "gitForm",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetGitForm(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitGitForm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitGitForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitGitForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetGitForm } = gitFormSlice.actions;
export default gitFormSlice.reducer;
