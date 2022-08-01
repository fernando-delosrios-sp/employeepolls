import { Question } from "../../config/types";

export interface QuestionFrameProps extends React.HTMLProps<HTMLDivElement> {
	name: string;
	avatarURL: string | undefined;
	children: JSX.Element | JSX.Element[];
}

export interface QuestionCardProps extends React.HTMLProps<HTMLDivElement> {
	question: Question;
}
