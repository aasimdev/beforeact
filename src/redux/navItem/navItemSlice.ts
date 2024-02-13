// Redux Toolkit Imports
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const getInitialNavItem = () => {
  const localStorageItem = localStorage.getItem("navItem");
  if (localStorageItem) {
    return JSON.parse(localStorageItem);
  } else {
    return null;
  }
};

const navItemSlice = createSlice({
  name: "navItem",
  initialState: {
    navItem: getInitialNavItem(),
    showAdminRotes: false,
  },
  reducers: {
    setNavItem(state, action) {
      state.navItem = action.payload;
    },
    setShowAdminRoutes(state, action) {
      state.showAdminRotes = action.payload;
    },
  },
});

export const { setNavItem, setShowAdminRoutes } = navItemSlice.actions;
export default navItemSlice.reducer;

export const adminRoutes = (state: RootState) => state.navItem.showAdminRotes;
