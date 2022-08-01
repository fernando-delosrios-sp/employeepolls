import { CheckBox, CheckBoxOutlineBlankOutlined } from "@mui/icons-material";
import { Avatar, Button, LinearProgress, Stack, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { homeProps } from "../../config/sections";
import { Answer, Session } from "../../config/types";
import {
	getQuestion,
	getQuestionAnswer,
	questionsActions,
} from "../../redux/questions";
import { getSession } from "../../redux/session";
import { useAppDispatch, useAppSelector as select } from "../../redux/store";
import { getUserDetails, getUsers } from "../../redux/users";
import { NotFound } from "../NotFound";
import QuestionFrame from "./QuestionFrame";

export const QuestionManage = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const location = useLocation();
	const session = select(getSession()) as Session;

	const { id } = useParams();
	const question = select(getQuestion(id as string));
	const users = select(getUsers());
	const author = question ? question.author : "";
	const userDetails = select(getUserDetails(author));
	const initialAnswer =
		question && session.userDetails
			? getQuestionAnswer(question, session.userDetails.id)
			: "unanswered";
	const [answer, setAnswer] = useState<
		"optionOne" | "optionTwo" | "unanswered"
	>(initialAnswer);

	let [isOptionOne, isOptionTwo] = [false, false];
	if (answer === "optionOne") isOptionOne = true;
	if (answer === "optionTwo") isOptionTwo = true;
	const isAnswered = isOptionOne || isOptionTwo;
	const buttonClassName = getButtonClassName(isAnswered);

	const handleOnClick = (option: "optionOne" | "optionTwo") => {
		setAnswer(option);
		const answer: Answer = {
			authedUser: session.userDetails?.id as string,
			qid: question?.id as string,
			answer: option,
		};
		setTimeout(() => {
			dispatch(questionsActions.saveQuestionAnswer(answer));
		}, 100);
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

	if (question) {
		return (
			<QuestionFrame
				name={userDetails!.name}
				avatarURL={userDetails!.avatarURL}
			>
				<Stack direction="row" gap={5} className="mx-5">
					<Stack direction="column" className="flex-1">
						<Button
							size="large"
							className={buttonClassName}
							startIcon={getIcon(isOptionOne)}
							disableRipple={isAnswered}
							disableFocusRipple={isAnswered}
							onClick={() => handleOnClick("optionOne")}
						>
							{question.optionOne.text}
						</Button>
						{isAnswered && (
							<>
								<Stack direction="row" justifyContent="center">
									{question.optionOne.votes.map((username) => {
										const user = users.find((u) => u.id === username);
										if (user) {
											return (
												<Tooltip title={user.name}>
													<Avatar
														src={user.avatarURL}
														className="bg-gray-200"
													></Avatar>
												</Tooltip>
											);
										}
									})}
								</Stack>
								<Tooltip
									title={
										(100 * question.optionOne.votes.length) / users.length + "%"
									}
								>
									<LinearProgress
										variant="determinate"
										value={
											(100 * question.optionOne.votes.length) / users.length
										}
										className="mt-2"
									/>
								</Tooltip>
							</>
						)}
					</Stack>
					<Stack direction="column" className="flex-1">
						<Button
							size="large"
							className={buttonClassName}
							startIcon={getIcon(isOptionTwo)}
							disableRipple={isAnswered}
							disableFocusRipple={isAnswered}
							onClick={() => handleOnClick("optionTwo")}
						>
							{question.optionTwo.text}
						</Button>
						{isAnswered && (
							<>
								<Stack direction="row" justifyContent="center">
									{question.optionTwo.votes.map((username) => {
										const user = users.find((u) => u.id === username);
										if (user) {
											return (
												<Tooltip title={user.name}>
													<Avatar
														src={user.avatarURL}
														className="bg-gray-200"
													></Avatar>
												</Tooltip>
											);
										}
									})}
								</Stack>
								<Tooltip
									title={
										(100 * question.optionTwo.votes.length) / users.length + "%"
									}
								>
									<LinearProgress
										variant="determinate"
										value={
											(100 * question.optionTwo.votes.length) / users.length
										}
										className="mt-2"
									/>
								</Tooltip>
							</>
						)}
					</Stack>
				</Stack>
			</QuestionFrame>
		);
	} else {
		return <NotFound />;
	}
};

const getIcon = (isSelected: boolean) => {
	if (isSelected) {
		return <CheckBox />;
	} else {
		return <CheckBoxOutlineBlankOutlined />;
	}
};

const getButtonClassName = (isAnswered: boolean) => {
	let className = "text-xl flex-1";
	if (isAnswered)
		className += " bg-transparent cursor-default pointer-events-none";

	return className;
};

export default QuestionManage;
