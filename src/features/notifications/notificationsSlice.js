// src/features/notifications/notificationsSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Slice
const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    messages: [],
  },
  reducers: {
    addNotification: (state, action) => {
      state.messages.unshift(action.payload); // Add new notifications to the top
    },
    clearNotifications: (state) => {
      state.messages = [];
    },
  },
});

export const { addNotification, clearNotifications } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
