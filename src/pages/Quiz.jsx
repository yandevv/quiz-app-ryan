import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import quizzes from "../data/quizzes.json";

function Quiz() {
  const navigate = useNavigate();

  const { quizId } = useParams();

  const quiz = quizzes.find((q) => q.id === quizId);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!quiz) {
    return <div className="text-white p-10">Quiz não encontrado</div>;
  }

  const question = quiz.questions[currentQuestion];

  function handleAnswer(index) {
    if (index === question.correct) {
      setScore((prev) => prev + 1);
    }

    const next = currentQuestion + 1;

    if (next < quiz.questions.length) {
      setCurrentQuestion(next);
    } else {
      setFinished(true);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6">
      <div className="w-full max-w-xl bg-slate-800 p-6 rounded-xl shadow-lg">

        <h1 className="text-2xl font-bold mb-4 text-center">
          {quiz.name}
        </h1>

        {!finished ? (
          <>
            <p className="mb-2 text-sm text-gray-400">
              Pergunta {currentQuestion + 1} de {quiz.questions.length}
            </p>

            <h2 className="text-xl font-semibold mb-6">
              {question.question}
            </h2>

            <div className="flex flex-col gap-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="bg-slate-700 hover:bg-slate-600 transition p-3 rounded-lg text-left"
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">
              Resultado final 🎉
            </h2>
            <p className="text-lg">
              Você acertou {score} de {quiz.questions.length}
            </p>
            <button
              onClick={() => navigate(-1)}
              className="bg-slate-700 hover:bg-slate-600 transition p-3 rounded-lg"
            >
              Voltar
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Quiz;