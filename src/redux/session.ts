import {
	createAsyncThunk, createSelector, createSlice
} from "@reduxjs/toolkit";
import { Credentials, Session } from "../config/types";
import * as udacityApi from "../service/_DATA";
import { RootState } from "./store";

const name = "session";
export const initialState = {status: "INACTIVE", userDetails: null} as Session;

const login = createAsyncThunk(
	`${name}/login`,
	async (credentials: Credentials, thunkAPI) => {
		const response = await udacityApi._getUsers();
		const { id, name, avatarURL, password } =
			response[credentials.id];
		if (credentials.password === password) {
			return { id, name, avatarURL };
		} else {
			return thunkAPI.rejectWithValue("Wrong password");
		}
	}
);

export const sessionSlice = createSlice({
	name: name,
	initialState,
	reducers: {
		logout: (state) => (state = initialState),
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, { payload }) => {
			if (payload) {
				state.status = "ACTIVE";
				state.userDetails = payload;
			}
		});
	},
});

export const sessionActions = { ...sessionSlice.actions, login };

export const getSession = () =>
	createSelector(
		(state: RootState) => state[name],
		(state) => state
	);

export const isSessionActive = () =>
	createSelector(
		(state: RootState) => state[name],
		(state) => (state.status === "ACTIVE" ? true : false)
	);

export const sessionSelectors = { getSession, isSessionActive };
