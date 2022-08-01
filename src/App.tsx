import { ReactElement, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home";
import Leaderboard from "./components/Leaderboard";
import Login from "./components/Login";
import { useAppDispatch } from "./redux/store";
import { QuestionManage, QuestionNew } from "./components/Question";
import { RequireAuth } from "./components/RequireAuth";
import { usersActions } from "./redux/users";
import { questionsActions } from "./redux/questions";
import {
	homeProps,
	leaderboardProps,
	addProps,
	loginProps,
} from "./config/sections";

export function App() {
	const HomeInstance: ReactElement = <Home {...homeProps} />;
	const LeaderboardInstance: ReactElement = (
		<Leaderboard {...leaderboardProps} />
	);
	const LoginInstance: ReactElement = <Login {...loginProps} />;
	const QuestionManageInstance: ReactElement = <QuestionManage />;
	const AddInstance: ReactElement = <QuestionNew />;
	const HeaderInstance: ReactElement = (
		<Header tabs={[homeProps, leaderboardProps, addProps]}></Header>
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(usersActions.loadUsers());
		dispatch(questionsActions.loadQuestions());
	}, []);

	return (
		<div className="min-h-screen">
			<BrowserRouter>
				<RequireAuth>
					<Routes>
						<Route path={homeProps.path} element={HeaderInstance}>
							<Route path={homeProps.path} element={HomeInstance}></Route>
							<Route
								path={leaderboardProps.path}
								element={LeaderboardInstance}
							></Route>
							<Route path={addProps.path} element={AddInstance}></Route>
							<Route
								path="/questions/:id"
								element={QuestionManageInstance}
							></Route>
						</Route>
						<Route path={loginProps.path} element={LoginInstance}></Route>
					</Routes>
				</RequireAuth>
			</BrowserRouter>
		</div>
	);
}

export default App;
