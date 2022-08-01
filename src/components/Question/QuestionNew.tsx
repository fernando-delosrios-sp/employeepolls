import { Alert, Button, Stack, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { homeProps } from "../../config/sections";
import { QuestionData } from "../../config/types";
import { questionsActions } from "../../redux/questions";
import { getSession } from "../../redux/session";
import { useAppDispatch, useAppSelector as select } from "../../redux/store";
import QuestionFrame from "./QuestionFrame";

export const QuestionNew = () => {
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const session = select(getSession());
	const optionOne = useRef<HTMLInputElement>();
	const optionTwo = useRef<HTMLInputElement>();

	const handleOnClick = () => {
		const o1 =
			optionOne.current && optionOne.current.value.length > 0
				? optionOne.current.value
				: null;
		const o2 =
			optionTwo.current && optionTwo.current.value.length > 0
				? optionTwo.current.value
				: null;
		if (o1 && o2) {
			const questionData: QuestionData = {
				author: session.userDetails?.id as string,
				optionOneText: o1,
				optionTwoText: o2,
			};
			dispatch(questionsActions.saveQuestion(questionData));
			navigate(homeProps.path);
		} else {
			setError("Please fill out both options");
			setTimeout(() => {
				setError(null);
			}, 2000);
		}
	};

	useEffect(() => {
		const handleOnEsc = (event: KeyboardEvent) => {
			if (event.key === "Escape") navigate(homeProps.path);
		};
		document.addEventListener("keyup", handleOnEsc);
		return () => {
			document.removeEventListener("keyup", handleOnEsc);
		};
	}, []);

	if (session.userDetails) {
		const { name, avatarURL } = session.userDetails;
		return (
			<>
				<QuestionFrame name={name} avatarURL={avatarURL}>
					<Stack
						direction="row"
						justifyContent="center"
						spacing={5}
						className="px-5"
					>
						<TextField
							inputRef={optionOne}
							label="Option One"
							className="flex-1"
						></TextField>
						<TextField
							inputRef={optionTwo}
							label="Option Two"
							className="flex-1"
						></TextField>
					</Stack>
					<Button
						onClick={handleOnClick}
						variant="contained"
						className="self-center w-28"
					>
						Submit
					</Button>
				</QuestionFrame>
				{error && (
					<Alert severity="error" className="mt-5">
						{error}
					</Alert>
				)}
			</>
		);
	} else {
		return <></>;
	}
};

export default QuestionNew;
