import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// SUBMIT FORM (CF7 ID = 12)

export const submitGitForm = createAsyncThunk("gitForm/submit", async (values, { rejectWithValue, getState }) => {
  try {
    const { gitForm } = getState();

    // if (gitForm.loading) {
    //   return rejectWithValue("Form is already submitting");
    // }

    const formData = new FormData();

    formData.append("text-485", values.firstName);
    formData.append("text-232", values.lastName);
    formData.append("email-644", values.email);
    formData.append("tel-790", values.phone);
    formData.append("textarea-473", values.message);

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
