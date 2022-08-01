import {
	createAsyncThunk,
	createSelector,
	createSlice,
} from "@reduxjs/toolkit";
import { AsyncState, User, UserDetails } from "../config/types";
import * as udacityApi from "../service/_DATA";
import store, { RootState } from "./store";

const name = "users";
export const initialState: AsyncState<User> = {
	status: "empty",
	items: [],
};

const loadUsers = createAsyncThunk(
	`${name}/loadUsers`,
	async () => await udacityApi._getUsers()
);

const removeUser = createAsyncThunk(
	`${name}/removeUser`,
	async (arg: string, thunkAPI) => arg
);

export const usersSlice = createSlice({
	name,
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(loadUsers.fulfilled, (state, { payload }) => {
				state.status = "loaded";
				state.items = Object.values(payload);
			})
			.addCase(removeUser.fulfilled, (state, { payload }) => {
				state.status = "loaded";
				state.items = state.items.filter((u) => u.id !== payload);
			});
	},
	reducers: {},
});

export const usersActions = { loadUsers, removeUser };

export const getUsers = () =>
	createSelector(
		(state: RootState) => state[name],
		(state) => {
			if (state.status === "empty") store.dispatch(loadUsers());
			return state.items;
		}
	);

export const getUserDetails = (id: string) =>
	createSelector(
		(state: RootState) => state[name],
		(state) => {
			const user = state.items.find((u) => u.id === id);
			if (user) return { name: user.name, avatarURL: user.avatarURL };
		}
	);

export const usersSelectors = { getUsers, getUserDetails };
