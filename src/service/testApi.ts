import {
	createApi,
	BaseQueryFn,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const testApi = createApi({
	reducerPath: "numbers",
	tagTypes: ["Number"],
	baseQuery: fetchBaseQuery(),
	endpoints: (builder) => ({
		getNumbers: builder.query<number[], void>({
			queryFn: () => ({ data: [...numbers, Math.round(Math.random() * 100)] }),
			providesTags: ["Number"],
		}),
		addNumber: builder.mutation<number, void>({
			queryFn: () => {
				const max = Math.max.apply(null, numbers);
				// numbers.push(max);
				return { data: max };
			},
			invalidatesTags: ["Number"],
		}),
		removeNumber: builder.mutation<number, void>({
			queryFn: () => {
				return { data: [...numbers].pop() as number };
			},
			invalidatesTags: (result) => [{ type: "Number", id: result }],
		}),
	}),
});
