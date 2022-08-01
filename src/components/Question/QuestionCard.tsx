import { Button, Paper, Stack, Typography } from "@mui/material";
import { Question } from "../../config/types";
import { useNavigate } from "react-router-dom";
import { QuestionCardProps } from "./types";

export const QuestionCard = ({ question }: QuestionCardProps) => {
	const navigate = useNavigate();
	const handleOnClick = (question: Question) => {
		navigate(`/questions/${question.id}`);
	};
	return (
		<Paper
			key={question.id}
			elevation={3}
			className="text-center h-48 px-3 py-5"
		>
			<Stack
				direction="column"
				justifyContent="space-between"
				className="min-h-full"
			>
				<Typography textAlign="center" variant="h5">
					{question.author}
				</Typography>
				<Typography textAlign="center" variant="body1">
					{new Date(question.timestamp).toLocaleString()}
				</Typography>
				<Button
					onClick={() => handleOnClick(question)}
					variant="contained"
					fullWidth
				>
					Show
				</Button>
			</Stack>
		</Paper>
	);
};

export default QuestionCard;
