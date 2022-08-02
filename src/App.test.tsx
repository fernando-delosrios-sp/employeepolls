import { fireEvent, render } from "@testing-library/react";
import { Answer, Credentials, QuestionData } from "./config/types";
import { actions, initialState, store } from "./redux/store";
import { questions, users } from "./service/_DATA";

import { CssBaseline, StyledEngineProvider } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import { addProps } from "./config/sections";

describe("App", () => {
	describe("Basic Redux users state tests", () => {
		it("Test initial state", async () => {
			expect(store.getState().users).toEqual(initialState.users);
		});

		it("Load users", async () => {
			await store.dispatch(actions.users.loadUsers());
			expect(store.getState().users.items).toEqual(Object.values(users));
		});

		it("Remove tylermcginnis", async () => {
			await store.dispatch(actions.users.removeUser("tylermcginnis"));
			expect(store.getState().users.items.length).toEqual(3);
		});
	});
	describe("Basic Redux questions state tests", () => {
		it("Test initial state", async () => {
			expect(store.getState().questions).toEqual(initialState.questions);
		});

		it("Load questions", async () => {
			await store.dispatch(actions.questions.loadQuestions());
			expect(store.getState().questions.items).toEqual(
				Object.values(questions).sort((a, b) => b.timestamp - a.timestamp)
			);
		});

		it("Save question", async () => {
			const question: QuestionData = {
				author: "sarahedo",
				optionOneText: "Slit my wrists",
				optionTwoText: "Let them grow",
			};
			await store.dispatch(actions.questions.saveQuestion(question));
			const savedQuestion = Object.values(
				store.getState().questions.items
			).find(
				(q) =>
					q.author === question.author &&
					q.optionOne.text === question.optionOneText &&
					q.optionTwo.text === question.optionTwoText
			);
			expect(savedQuestion).not.toBeUndefined();
		});

		it("Answer question successful", async () => {
			const question = questions["8xf0y6ziyjabvozdd253nd"];
			const answer: Answer = {
				authedUser: users.mtsamis.id,
				qid: question.id,
				answer: "optionOne",
			};
			const currentVotes = question.optionOne.votes.length;
			await store.dispatch(actions.questions.saveQuestionAnswer(answer));
			const stateQuestion = store
				.getState()
				.questions.items.find((q) => q.id === question.id);
			if (stateQuestion) {
				expect(stateQuestion.optionOne.votes.length).toBeGreaterThan(
					currentVotes
				);
			}
		});

		it("Answer question with incorrect payload: cannot test due to TypeScript implementation", async () => {
			expect(true).toBeTruthy();
		});
	});
	describe("Basic Redux session state tests", () => {
		it("Test initial state", async () => {
			expect(store.getState().session).toEqual(initialState.session);
		});

		it("Test sarahedo login", async () => {
			const credentials: Credentials = {
				id: users.sarahedo.id,
				password: users.sarahedo.password,
			};
			await store.dispatch(actions.session.login(credentials));
			const { id, name, avatarURL } = users.sarahedo;
			expect(store.getState().session.userDetails).toEqual({
				id,
				name,
				avatarURL,
			});
		});

		it("Test logout", async () => {
			await store.dispatch(actions.session.logout());
			expect(store.getState().session).toEqual(initialState.session);
		});
	});

	describe("Render tests", () => {
		it("Initial page", async () => {
			const snap = render(
				<React.StrictMode>
					<StyledEngineProvider injectFirst>
						<CssBaseline />
						<Provider store={store}>
							<App />
						</Provider>
					</StyledEngineProvider>
				</React.StrictMode>
			);
			expect(snap).toMatchSnapshot();
		});

		it("Switch to Add new question tab", async () => {
			const credentials: Credentials = {
				id: users.sarahedo.id,
				password: users.sarahedo.password,
			};
			await store.dispatch(actions.session.login(credentials));
			const app = render(
				<React.StrictMode>
					<StyledEngineProvider injectFirst>
						<CssBaseline />
						<Provider store={store}>
							<App />
						</Provider>
					</StyledEngineProvider>
				</React.StrictMode>
			);

			const addTab = app.getByText(addProps.name);
			fireEvent.click(addTab);
			expect(app.getByText("Would you rather")).toBeDefined();
		});
	});
});
