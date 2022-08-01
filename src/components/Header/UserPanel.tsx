import { Avatar, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginProps } from "../../config/sections";
import {
	getSession,
	sessionActions,
	isSessionActive,
} from "../../redux/session";
import { useAppDispatch, useAppSelector as select } from "../../redux/store";

export const UserPanel = () => {
	const dispatch = useAppDispatch();
	const session = select(getSession());
	const navigate = useNavigate();
	const sessionActive = select(isSessionActive());

	const logout = () => {
		dispatch(sessionActions.logout());
	};

	const login = () => {
		navigate(loginProps.path);
	};

	const buttonText = session.status === "ACTIVE" ? "Logout" : "Login";

	return (
		<Stack
			direction="row"
			justifyContent="flex-end"
			alignItems="center"
			className="px-5 gap-5"
		>
			{session.status === "ACTIVE" && (
				<Stack direction="row" className="items-center gap-2">
					<Avatar src={session.userDetails?.avatarURL} className="pb-1">
						{session.userDetails?.name}
					</Avatar>
					<Typography variant="h6">{session.userDetails?.name}</Typography>
				</Stack>
			)}
			<Button
				color="secondary"
				variant="contained"
				onClick={sessionActive ? logout : login}
			>
				{buttonText}
			</Button>
		</Stack>
	);
};

export default UserPanel;
