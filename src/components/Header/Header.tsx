import { AppBar, Tab, Tabs, Toolbar } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import UserPanel from "./UserPanel";
import { HeaderProps } from "./types";

export const Header = ({ tabs }: HeaderProps) => {
	const DEFAULT_PATH = "/";
	const currentPath = window.location.pathname;
	const navigate = useNavigate();

	const selected = tabs.find((t) => t.path === currentPath)
		? currentPath
		: DEFAULT_PATH;
	const handleOnClick = (path: string | undefined) => {
		if (path) navigate(path);
	};

	return (
		<>
			<AppBar
				position="static"
				color="transparent"
				className="align-center justify-between flex-row"
			>
				<Toolbar>
					<Tabs value={selected}>
						{tabs.map((tab) => (
							<Tab
								id={tab.name}
								key={tab.name}
								label={tab.name}
								value={tab.path}
								onClick={() => handleOnClick(tab.path)}
							/>
						))}
					</Tabs>
				</Toolbar>
				<UserPanel />
			</AppBar>
			<Outlet />
		</>
	);
};

export default Header;
