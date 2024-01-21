import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import {
	Card,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Stack,
	Typography,
} from "@mui/material";
import SyntaxHighligther from "react-syntax-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useQuestionsStore } from "../services/question";
import { type QuizQuestion } from "../types.d";

const QuestionsGame = ({ info }: { info: QuizQuestion }) => {
	const selectAnswer = useQuestionsStore((store) => store.selectdAnswer);

	const createHandleClick = (answerIndex: number) => () => {
		selectAnswer(info.id, answerIndex);
	};

	const getBackgroundColor = (info: QuizQuestion, index: number) => {
		const { userSelectedAnswer, correctAnswer } = info;
		if (userSelectedAnswer == null) return "transparent";
		if (index !== correctAnswer && index !== userSelectedAnswer)
			return "transparent";
		if (index === correctAnswer) return "green";
		if (index === userSelectedAnswer) return "red";
		return "transparent";
	};
	return (
		<Card
			variant="outlined"
			sx={{ textAlign: "left", p: 2, bgcolor: "#222", marginTop: "5px" }}
		>
			<Typography variant="h5">{info.question}</Typography>
			<SyntaxHighligther language="javascript" style={atomOneDarkReasonable}>
				{info.code}
			</SyntaxHighligther>

			<List
				sx={{ bgcolor: "#333", textAlign: "center", fontWeight: "bold" }}
				disablePadding
			>
				{info.answers.map((answers, index) => (
					// rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<ListItem key={index} disablePadding divider>
						<ListItemButton
							disabled={info.userSelectedAnswer != null}
							onClick={createHandleClick(index)}
							sx={{
								backgroundColor: getBackgroundColor(info, index),
							}}
						>
							<ListItemText primary={answers} sx={{ textAlign: "center" }} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Card>
	);
};

export function Game() {
	const questions = useQuestionsStore((store) => store.questions);
	const currentQuestion = useQuestionsStore((store) => store.currentQuestion);
	const goNext = useQuestionsStore((store) => store.goNextQuestion);
	const goPrevious = useQuestionsStore((store) => store.goPreviousQuestion);

	const questionsInfo = questions[currentQuestion];
	return (
		<>
			<Stack
				direction="row"
				gap={2}
				alignItems="center"
				justifyContent="center"
			>
				<IconButton onClick={goPrevious} disabled={currentQuestion === 0}>
					<ArrowBackIosNew />
				</IconButton>
				{currentQuestion + 1} / {questions.length}
				<IconButton
					onClick={goNext}
					disabled={currentQuestion >= questions.length - 1}
				>
					<ArrowForwardIos />
				</IconButton>
			</Stack>

			<QuestionsGame info={questionsInfo} />
		</>
	);
}
