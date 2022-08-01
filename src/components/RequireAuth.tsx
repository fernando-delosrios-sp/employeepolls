import { isSessionActive } from "../redux/session";
import { useAppSelector as select } from "../redux/store";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { loginProps } from "../config/sections";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
	const { pathname } = useLocation();
	const sessionActive = select(isSessionActive());
	if (sessionActive || pathname === loginProps.path) {
		return children;
	} else {
		return <Navigate to={loginProps.path + "?redirect=" + pathname} replace />;
	}
};
