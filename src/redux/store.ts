import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
	initialState as questionsInitialState,
	questionsActions,
	questionsSlice,
} from "./questions";
// import { authReducer } from "react-redux-firebase";
import {
	getSession,
	initialState as sessionInitialState,
	isSessionActive,
	sessionActions,
	sessionSlice,
} from "./session";
import {
	getUsers,
	initialState as usersInitialState,
	usersActions,
	usersSlice,
} from "./users";

const devTools = process.env.NODE_ENV !== "production";

export const store = configureStore({
	reducer: {
		[usersSlice.name]: usersSlice.reducer,
		[sessionSlice.name]: sessionSlice.reducer,
		[questionsSlice.name]: questionsSlice.reducer,
	},
	// enhancers: [persistState('token', 'connectionList')],
	devTools,
	// middleware: (getDefaultMiddleware) =>
	// 	getDefaultMiddleware().concat(api.middleware),
});

type AppDispatch = typeof store.dispatch;

export const reducers = {
	session: sessionSlice.reducer,
	users: usersSlice.reducer,
	questions: questionsSlice.reducer,
};

export const actions = {
	session: sessionActions,
	users: usersActions,
	questions: questionsActions,
};

export const initialState = {
	session: sessionInitialState,
	users: usersInitialState,
	questions: questionsInitialState,
};

export const selectors = {
	session: { getSession, isSessionActive },
	users: { getUsers },
	questions: {},
};

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
