import {
	createAsyncThunk,
	createSelector,
	createSlice,
} from "@reduxjs/toolkit";
import produce from "immer";
import {
	Answer,
	AsyncState,
	Question,
	QuestionData,
	QuestionStatus,
} from "../config/types";
import * as udacityApi from "../service/_DATA";
import { formatQuestion } from "../service/_DATA";
import { RootState } from "./store";

const name = "questions";
export const initialState: AsyncState<Question> = {
	items: [],
	status: "empty",
};

const loadQuestions = createAsyncThunk(`${name}/loadQuestions`, async () => {
	const response = await udacityApi._getQuestions();
	return Object.values(response).sort((a, b) => b.timestamp - a.timestamp);
});

const saveQuestion = createAsyncThunk(
	`${name}/saveQuestion`,
	async (arg: QuestionData) => {
		const response = await udacityApi._saveQuestion(arg);
		return response;
	}
);

const saveQuestionAnswer = createAsyncThunk(
	`${name}/saveQuestionAnswer`,
	async (arg: Answer) => {
		const response = udacityApi._saveQuestionAnswer(arg);
		return response;
	}
);

export const questionsSlice = createSlice({
	name,
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(loadQuestions.fulfilled, (state, { payload }) => {
				state.items = payload;
				state.status = "loaded";
			})
			.addCase(saveQuestion.fulfilled, (state, { payload }) => {
				let draftFound = false;
				const questions: Question[] = [];
				for (let q of state.items) {
					if (areQuestionsEquivalent(q, payload)) {
						questions.push(payload);
						draftFound = true;
					} else {
						questions.push(q);
					}
				}
				if (draftFound) {
					state.items = [...questions];
				} else {
					state.items = [payload, ...state.items];
				}
			})
			.addCase(saveQuestion.pending, (state, { meta }) => {
				const question = formatQuestion(meta.arg);
				state.items = [question, ...state.items];
			})
			.addCase(saveQuestionAnswer.fulfilled, (state, { payload, meta }) => {
				let question = state.items.find((q) => q.id === meta.arg.qid);
				if (question) question[meta.arg.answer].votes.push(meta.arg.authedUser);
			});
	},
	reducers: {},
});

const areQuestionsEquivalent = (q1: Question, q2: Question): boolean => {
	return q1.author === q2.author &&
		q1.optionOne.text === q2.optionOne.text &&
		q1.optionTwo.text === q2.optionTwo.text
		? true
		: false;
};

const getQuestionParticipants = (question: Question) => {
	return Array.from(
		new Set([...question.optionOne.votes, ...question.optionTwo.votes])
	);
};

const isParticipantInQuestion = (question: Question, participant: string) => {
	return getQuestionParticipants(question).includes(participant);
};

export const getQuestions = () =>
	createSelector(
		(state: RootState) => state[name],
		(state) => state
	);

export const getQuestion = (id: string) =>
	createSelector([(state: RootState) => state[name]], (state) =>
		state.items.find((q) => q.id === id)
	);

export const getQuestionAnswer = (
	question: Question,
	user: string
): "optionOne" | "optionTwo" | "unanswered" => {
	if (question.optionOne.votes.includes(user)) return "optionOne";
	if (question.optionTwo.votes.includes(user)) return "optionTwo";
	return "unanswered";
};

export const getQuestionsByStatus = (status: QuestionStatus) =>
	createSelector(
		[
			(state: RootState) => state.questions,
			(state: RootState) => state.session,
		],
		(questions, session) => {
			const { userDetails } = session;
			if (userDetails) {
				switch (status) {
					case "NEW":
						return questions.items.filter(
							(q) => !isParticipantInQuestion(q, userDetails.id)
						);
					case "DONE":
						return questions.items.filter((q) =>
							isParticipantInQuestion(q, userDetails.id)
						);
					default:
						return questions.items;
				}
			} else {
				return [];
			}
		}
	);

export const questionsActions = {
	loadQuestions,
	saveQuestion,
	saveQuestionAnswer,
};

export const questionSelectors = {
	getQuestionsByStatus,
	getQuestionAnswer,
	getQuestion,
	getQuestions,
};
