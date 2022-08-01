import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Answer, Question, QuestionData, User } from "../config/types";
import * as udacityApi from "../service/_DATA";

//Initial Udacity API integration with redux using RTK
export const api = createApi({
	reducerPath: "api",
	tagTypes: ["User", "Question"],
	baseQuery: fetchBaseQuery(),
	endpoints: (builder) => ({
		getUsers: builder.query<User[], void>({
			queryFn: async () => {
				const response = await udacityApi._getUsers();
				return { data: Object.values(response) };
			},
			providesTags: (result) =>
				result
					? result.map((user) => ({ type: "User", id: user.id }))
					: ["User"],
		}),
		getUser: builder.query<User, string>({
			queryFn: async (arg) => {
				const response = await udacityApi._getUsers();
				return { data: response[arg] };
			},
			providesTags: (result) =>
				result ? [{ type: "User", id: result.id }] : [],
		}),
		getQuestions: builder.query<Question[], void>({
			queryFn: async () => {
				const response = await udacityApi._getQuestions();
				return { data: Object.values(response) };
			},
			providesTags: (result) =>
				result
					? result.map((question) => ({ type: "Question", id: question.id }))
					: ["Question"],
		}),
		getQuestion: builder.query<Question, string>({
			queryFn: async (arg) => {
				const response = await udacityApi._getQuestions();
				return { data: response[arg] };
			},
			providesTags: (result, error, arg) => [{ type: "Question", id: arg }],
		}),
		saveQuestion: builder.mutation<Question, QuestionData>({
			queryFn: async (arg) => {
				const response = await udacityApi._saveQuestion(arg);
				return { data: response };
			},
			invalidatesTags: (results) => [{ type: "Question", id: results?.id }],
		}),
		saveQuestionAnswer: builder.mutation<boolean, Answer>({
			queryFn: async (arg) => {
				const response = await udacityApi._saveQuestionAnswer(arg);
				return { data: response };
			},
			invalidatesTags: (results, error, arg) => [
				{ type: "Question", id: arg.qid },
			],
		}),
	}),
});

const {
	useGetUserQuery,
	useGetUsersQuery,
	useGetQuestionQuery,
	useGetQuestionsQuery,
	useSaveQuestionAnswerMutation,
	useSaveQuestionMutation,
} = api;

export const actions = {
	useGetUserQuery,
	useGetUsersQuery,
	useGetQuestionQuery,
	useGetQuestionsQuery,
	useSaveQuestionAnswerMutation,
	useSaveQuestionMutation,
};
