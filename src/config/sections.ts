import { LoginProps } from "../components/Login";
import { SectionProps } from "./types";

export const homeProps: SectionProps = {
	name: "home",
	title: "Employee polls home",
	path: "/",
};

export const leaderboardProps: SectionProps = {
	name: "leaderboard",
	title: "Employee polls leaderboard",
	path: "/leaderboard",
};

export const addProps: SectionProps = {
	name: "add",
	title: "Employee polls new question",
	path: "/add",
};

export const loginProps: LoginProps = {
	name: "login",
	title: "Employee polls login",
	path: "/login",
	id: "id",
};
