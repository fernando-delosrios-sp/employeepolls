import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, StyledEngineProvider } from "@mui/material/styles";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import store from "./redux/store";

const container = document.getElementById("root");
const root = createRoot(container!);

const theme = createTheme({
	components: {
		MuiPopover: {
			defaultProps: {
				container: container,
			},
		},
		MuiPopper: {
			defaultProps: {
				container: container,
			},
		},
	},
});

root.render(
	<React.StrictMode>
		<StyledEngineProvider injectFirst>
			{/* <ThemeProvider theme={theme}> */}
			<CssBaseline />
			<Provider store={store}>
				<App />
			</Provider>
			{/* </ThemeProvider> */}
		</StyledEngineProvider>
	</React.StrictMode>
);
