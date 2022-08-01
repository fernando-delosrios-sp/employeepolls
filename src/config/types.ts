export interface SectionProps extends React.HTMLProps<HTMLDivElement> {
	name: string;
	path: string;
	title: string;
};

export type ReduxAction = {
	type: string;
	payload?: any;
};

export type User = {
	id: string;
	password: string;
	name: string;
	avatarURL: string;
	answers?: { [key: string]: string };
	questions?: string[];
};

export type UserDetails =
	| {
			id: string;
			name: string;
			avatarURL: string;
	  };

export type Answer = {
	authedUser: string;
	qid: string;
	answer: "optionOne" | "optionTwo";
};

export type Option = {
	votes: string[];
	text: string;
};

export type QuestionData = {
	optionOneText: string;
	optionTwoText: string;
	author: string;
};

export type Question = {
	optionOne: Option;
	optionTwo: Option;
	id: string;
	timestamp: number;
	author: string;
};

export type SessionStatus = "ACTIVE" | "INACTIVE"

export type Session = {
	status: SessionStatus
	userDetails: UserDetails | null;
};

export type Credentials = {
	id: string;
	password: string;
};

export type AsyncState<T> = {
	items: T[];
	status: "empty" | "loading" | "loaded";
};

export type QuestionStatus = "ALL" | "NEW" | "DONE";
