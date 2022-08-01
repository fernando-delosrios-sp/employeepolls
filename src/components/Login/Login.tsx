import {
	Accordion,
	AccordionActions,
	AccordionSummary,
	Alert,
	Avatar,
	IconButton,
	Snackbar,
	Stack,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import "firebaseui/dist/firebaseui.css";
import { FormEvent, useState } from "react";
import { LoginProps } from "./types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LoginIcon from "@mui/icons-material/Login";
import { Navigate, useParams } from "react-router-dom";
import { isSessionActive, sessionActions } from "../../redux/session";
import { useAppDispatch, useAppSelector as select } from "../../redux/store";
import { getUsers } from "../../redux/users";
import { homeProps } from "../../config/sections";

export const Login: React.FunctionComponent<LoginProps> = (props) => {
	const [expanded, setExpanded] = useState<string | false>(false);
	const [submittedBlankPassword, setSubmittedBlankPassword] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const dispatch = useAppDispatch();
	const queryParams = new URLSearchParams(window.location.search);
	const redirect = queryParams.get("redirect");
	const users = select(getUsers());
	const sessionActive = select(isSessionActive());

	const handleAccordionChange =
		(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
			setExpanded(isExpanded ? panel : false);
		};

	const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!event.currentTarget.password.value) setSubmittedBlankPassword(true);
		const login = dispatch(
			sessionActions.login({
				id: event.currentTarget.username.value,
				password: event.currentTarget.password.value,
			})
		);
		login.unwrap().catch((error) => setErrorMessage(error));
	};

	if (sessionActive) {
		return <Navigate to={redirect || homeProps.path}></Navigate>;
	}

	return (
		<Stack
			direction="column"
			className="text-center w-full"
			alignItems="center"
		>
			<Typography variant="h3" className="mt-2 mb-16">
				Login with existing user
			</Typography>
			<Stack direction="column" className="w-1/3 flex-1">
				{users &&
					users.map((user) => (
						<Accordion
							expanded={expanded === user.id}
							key={user.id}
							onChange={handleAccordionChange(user.id)}
						>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography variant="h6" className="ml-2">
									{user.name}
								</Typography>
							</AccordionSummary>
							<form id={user.id} onSubmit={handleOnSubmit}>
								<AccordionActions>
									<Avatar
										src={user.avatarURL}
										className="w-16 h-16 pb-3"
									></Avatar>
									<input
										readOnly
										type="text"
										name="username"
										autoComplete="username"
										value={user.id}
										className="hidden"
									/>
									<TextField
										autoComplete="current-password"
										label="Password"
										type="password"
										name="password"
										className="flex-1"
									></TextField>
									<Tooltip title="Login">
										<IconButton type="submit">
											<LoginIcon />
										</IconButton>
									</Tooltip>
								</AccordionActions>
							</form>
						</Accordion>
					))}
			</Stack>
			<>
				<Snackbar
					open={errorMessage !== null}
					autoHideDuration={3000}
					onClose={() => setErrorMessage(null)}
				>
					<Alert severity="error">{errorMessage}</Alert>
				</Snackbar>
				<Snackbar
					open={submittedBlankPassword}
					autoHideDuration={3000}
					onClose={() => setSubmittedBlankPassword(false)}
				>
					<Alert severity="warning">Password cannot be blank</Alert>
				</Snackbar>
			</>
		</Stack>
	);
};

export default Login;
