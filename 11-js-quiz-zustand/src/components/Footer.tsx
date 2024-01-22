import { Button } from "@mui/material";
import { useQuestionsStore } from "../services/question";

export function Footer() {
	const questions = useQuestionsStore((store) => store.questions);
	const resetGame = useQuestionsStore((store) => store.resetGame);
	let correct = 0;
	let incorrect = 0;
	let unansered = 0;

	questions.forEach((question) => {
		const { userSelectedAnswer, correctAnswer } = question;
		if (userSelectedAnswer == null) unansered++;
		else if (userSelectedAnswer === correctAnswer) correct++;
		else incorrect++;
	});
	return (
		<footer style={{ marginTop: "16px" }}>
			<strong>{`✅${correct} correctas - ❌${incorrect} incorrectas - ❓ ${unansered} sin responder`}</strong>
			<Button onClick={resetGame}>Reiniciar juego</Button>
		</footer>
	);
}
