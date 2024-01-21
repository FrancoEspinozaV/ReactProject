import { Container, Stack, Typography } from "@mui/material";
import "./App.css";
import { JsIcon } from "./Icons/JsIcon";
import { ButtonStart } from "./components/ButtonStart";
import { Game } from "./components/Game";
import { useQuestionsStore } from "./services/question";
function App() {
	const questions = useQuestionsStore((state) => state.questions);
	return (
		<main>
			<Container maxWidth="sm">
				<Stack
					direction="row"
					gap={2}
					alignItems="center"
					justifyContent="center"
				>
					<JsIcon />
					<Typography variant="h2" component="h1">
						Quizz JavaScript
					</Typography>
				</Stack>
				{questions.length === 0 && <ButtonStart />}
				{questions.length > 0 && <Game />}
			</Container>
		</main>
	);
}

export default App;
