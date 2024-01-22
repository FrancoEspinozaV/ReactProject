import confetti from "canvas-confetti";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { QuizQuestion } from "../types";

interface State {
	questions: QuizQuestion[];
	currentQuestion: number;
	fetchQuestions: (limit: number) => Promise<void>;
	selectdAnswer: (questionId: number, answerIndex: number) => void;
	goNextQuestion: () => void;
	goPreviousQuestion: () => void;
	resetGame: () => void;
}
export const useQuestionsStore = create<State>()(
	persist(
		(set, get) => {
			return {
				questions: [],
				currentQuestion: 0,

				fetchQuestions: async (limit: number) => {
					const response = await fetch(`${window.location}/data.json`);
					const json = await response.json();
					const questions = json
						.sort(() => Math.random() - 0.5)
						.slice(0, limit);
					set({ questions });
				},

				selectdAnswer(questionId, answerIndex) {
					const { questions } = get();
					const newQuestions = structuredClone(questions);
					const questionIndex = newQuestions.findIndex(
						(q) => q.id === questionId,
					);
					const questionInfo = newQuestions[questionIndex];
					const isCorrectUserAnswer =
						questionInfo.correctAnswer === answerIndex;

					if (isCorrectUserAnswer) confetti();

					newQuestions[questionIndex] = {
						...questionInfo,
						isCorrectUserAnswer,
						userSelectedAnswer: answerIndex,
					};
					set({ questions: newQuestions });
				},

				goNextQuestion: () => {
					const { currentQuestion, questions } = get();
					const nextQuestion = currentQuestion + 1;

					if (nextQuestion < questions.length) {
						set({ currentQuestion: nextQuestion });
					}
				},

				goPreviousQuestion: () => {
					const { currentQuestion } = get();
					const nextQuestion = currentQuestion - 1;

					if (nextQuestion >= 0) {
						set({ currentQuestion: nextQuestion });
					}
				},

				resetGame: () => {
					set({ questions: [], currentQuestion: 0 });
				},
			};
		},
		{
			name: "questions",
		},
	),
);
