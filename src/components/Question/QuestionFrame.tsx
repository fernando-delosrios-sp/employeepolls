import { Avatar, Stack, Typography } from "@mui/material";
import { QuestionFrameProps } from "./types";

const QuestionFrame = ({ name, avatarURL, children }: QuestionFrameProps) => {
	return (
		<Stack justifyContent="center" className="text-center mt-5" spacing={5}>
			<Typography variant="h3">Poll by {name}</Typography>
			<Avatar alt={name} className="mx-auto h-48 w-48" src={avatarURL}></Avatar>
			<Typography variant="h4">Would you rather</Typography>
			{children}
		</Stack>
	);
};

export default QuestionFrame;
