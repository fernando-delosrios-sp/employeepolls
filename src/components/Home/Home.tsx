import { Grid, Stack, Typography } from "@mui/material";
import { getQuestionsByStatus } from "../../redux/questions";
import { useAppSelector as select } from "../../redux/store";
import QuestionCard from "../Question/QuestionCard";
import { HomeProps } from "./types";

const Home: React.FunctionComponent<HomeProps> = (props) => {
	const newQuestions = select(getQuestionsByStatus("NEW"));
	const doneQuestions = select(getQuestionsByStatus("DONE"));

	return (
		<Stack direction="column">
			<Stack id="new-questions" className="flex-1 my-5">
				<Typography textAlign="center" variant="h3">
					New Questions
				</Typography>
				<Grid
					container
					direction="row"
					gap={5}
					justifyContent="center"
					alignItems="center"
					className="mt-5"
				>
					{newQuestions.map((q) => (
						<Grid key={q.id} item xs={12} md={5} lg={3}>
							<QuestionCard question={q} />
						</Grid>
					))}
				</Grid>
			</Stack>
			<hr className="min-w-full" />
			<Stack id="done-questions" className="flex-1">
				<Typography textAlign="center" variant="h3">
					Done
				</Typography>
				<Grid
					container
					direction="row"
					gap={5}
					justifyContent="center"
					alignItems="center"
					className="mt-5"
				>
					{doneQuestions.map((q) => (
						<Grid key={q.id} item xs={12} md={5} lg={3}>
							<QuestionCard question={q} />
						</Grid>
					))}
				</Grid>
			</Stack>
		</Stack>
	);
};

export { Home };
