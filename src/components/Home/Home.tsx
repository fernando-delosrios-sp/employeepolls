import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	Radio,
	RadioGroup,
	Stack,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { getQuestionsByStatus } from "../../redux/questions";
import { useAppSelector as select } from "../../redux/store";
import QuestionCard from "../Question/QuestionCard";
import { HomeProps } from "./types";

const Home: React.FunctionComponent<HomeProps> = (props) => {
	const [isToggle, setIsToggle] = useState(true);

	const newQuestions = select(getQuestionsByStatus("NEW"));
	const doneQuestions = select(getQuestionsByStatus("DONE"));

	const toggleChange = () => {
		setIsToggle(!isToggle);
	};

	const newQuestionsBlock = () => (
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
	);

	const doneQuestionsBlock = () => (
		<Stack id="done-questions" className="flex-1 my-5">
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
	);

	return (
		<Stack direction="row" className="w-full block">
			<FormControl className="float-right mr-2">
				<FormLabel>Questions</FormLabel>
				<RadioGroup name="questions" value={isToggle} onChange={toggleChange}>
					<FormControlLabel value={true} control={<Radio />} label="New" />
					<FormControlLabel value={false} control={<Radio />} label="Done" />
				</RadioGroup>
			</FormControl>
			{isToggle && newQuestionsBlock()}
			{!isToggle && doneQuestionsBlock()}
		</Stack>
	);
};

export { Home };
