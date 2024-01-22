import { Container, Stack, Typography } from "@mui/material";
import "./App.css";
import { JsIcon } from "./Icons/JsIcon";
import { ButtonStart } from "./components/ButtonStart";
import { Footer } from "./components/Footer";
import { Game } from "./components/Game";
import { useQuestionsStore } from "./services/question";
function App() {
	const questions = useQuestionsStore((state) => state.questions);
	return (
		<main>
			<Container maxWidth="sm" fixed sx={{ height: "100vh" }}>
				<Stack
					direction="row"
					gap={2}
					alignItems="center"
					justifyContent="center"
				>
					<Typography variant="h2" component="h1">
						<JsIcon />
						Quizz JavaScript
					</Typography>
				</Stack>
				{questions.length === 0 && <ButtonStart />}
				{questions.length > 0 && <Game />}
				{questions.length > 0 && <Footer />}
			</Container>
		</main>
	);
}

export default App;
