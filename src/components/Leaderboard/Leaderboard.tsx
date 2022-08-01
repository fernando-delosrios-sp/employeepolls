import { Avatar, Box, Container, Typography } from "@mui/material";
import { LeaderboardProps } from "./types";
import { DataGrid, GridColDef, GridSortItem } from "@mui/x-data-grid";
import { useAppSelector as select } from "../../redux/store";
import { getQuestions } from "../../redux/questions";
import { getUsers, getUserDetails } from "../../redux/users";
import { useState } from "react";

const Leaderboard: React.FunctionComponent<LeaderboardProps> = (props) => {
	const questions = select(getQuestions()).items;
	const users = select(getUsers());
	const rows = users.map((user) => {
		const answered = questions.filter((question) =>
			[...question.optionOne.votes, ...question.optionTwo.votes].includes(
				user.id
			)
		).length;
		const created = questions.filter(
			(question) => question.author === user.id
		).length;
		return {
			id: user.id,
			user: user.name,
			answered,
			created,
		};
	});

	const getUserAvatar = (id: string) => {
		const userDetails = users.find((u) => u.id === id);
		if (userDetails) {
			return (
				<>
					<Avatar src={userDetails.avatarURL} className="pb-2"></Avatar>
					<Typography variant="body1">{userDetails.name}</Typography>
				</>
			);
		}
	};

	const columns: GridColDef[] = [
		{
			field: "user",
			headerName: "Users",
			flex: 2,
			renderCell: (params) => getUserAvatar(params.id as string),
		},
		{
			field: "answered",
			headerName: "Answered",
			flex: 1,
		},
		{
			field: "created",
			headerName: "Created",
			flex: 1,
		},
	];

	const [sortModel, setSortModel] = useState<GridSortItem[]>([
		{
			field: "answered",
			sort: "desc",
		},
		{
			field: "created",
			sort: "desc",
		},
	]);

	return (
		<Container>
			<Typography variant="h3" textAlign="center" className="mt-5 mb-10">
				{props.title}
			</Typography>
			<Box>
				<DataGrid
					rows={rows}
					columns={columns}
					disableSelectionOnClick
					autoHeight
					sortModel={sortModel}
					onSortModelChange={(model) => setSortModel(model)}
				/>
			</Box>
		</Container>
	);
};

export { Leaderboard };
