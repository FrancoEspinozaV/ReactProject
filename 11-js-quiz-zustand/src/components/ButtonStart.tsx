import { Button } from "@mui/material";
import { useQuestionsStore } from "../services/question";

export function ButtonStart() {
	const fetchQuestion = useQuestionsStore((store) => store.fetchQuestions);
	const handleClick = () => {
		fetchQuestion(10);
	};
	return <Button onClick={handleClick}>Emepezar!</Button>;
}
