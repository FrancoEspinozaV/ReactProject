import { ThemeProvider } from "@emotion/react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, createTheme } from "@mui/material";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<ThemeProvider theme={darkTheme}>
		<CssBaseline />
		<App />
	</ThemeProvider>,
);
