import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UIState = {
  selectedDateKey: string | null;
  dialogOpen: boolean;
  snackbar: { open: boolean; message: string };
};

const initialState: UIState = {
  selectedDateKey: null,
  dialogOpen: false,
  snackbar: { open: false, message: "" },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSelectedDateKey(state, action: PayloadAction<string | null>) {
      state.selectedDateKey = action.payload;
    },
    openDialog(state) {
      state.dialogOpen = true;
    },
    closeDialog(state) {
      state.dialogOpen = false;
    },
    showSnackbar(state, action: PayloadAction<string>) {
      state.snackbar = { open: true, message: action.payload };
    },
    hideSnackbar(state) {
      state.snackbar.open = false;
    },
  },
});

export const { setSelectedDateKey, openDialog, closeDialog, showSnackbar, hideSnackbar } =
  uiSlice.actions;
export default uiSlice.reducer;
