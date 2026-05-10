import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import quizzes from "../data/quizzes.json";

function Quiz() {
  const { quizId } = useParams();

  const navigate = useNavigate();

  const quiz = quizzes.find((q) => q.id === quizId);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const [answers, setAnswers] = useState([]);

  if (!quiz) {
    return (
      <div className="text-white p-10">
        Quiz não encontrado
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  function handleAnswer(index) {
    setAnswers((prev) => [
      ...prev,
      {
        question: question.question,
        options: question.options,
        selected: index,
        correct: question.correct,
      },
    ]);

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

  const percentage = Math.round(
    (score / quiz.questions.length) * 100
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white flex justify-center py-10 px-6">

      <div className="w-full max-w-3xl bg-slate-800 rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center mb-8">
          {quiz.name}
        </h1>

        {!finished ? (
          <>
            {/* barra progresso */}
            <div className="mb-6">

              <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full transition-all duration-300"
                  style={{
                    width: `${
                      ((currentQuestion + 1) /
                        quiz.questions.length) *
                      100
                    }%`,
                  }}
                />
              </div>

              <p className="text-gray-400 mt-2">
                Pergunta {currentQuestion + 1} de{" "}
                {quiz.questions.length}
              </p>

            </div>

            {/* pergunta */}
            <h2 className="text-2xl font-semibold mb-8">
              {question.question}
            </h2>

            {/* opções */}
            <div className="flex flex-col gap-4">

              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="
                    bg-slate-700
                    hover:bg-slate-600
                    transition
                    p-4
                    rounded-2xl
                    text-left
                    text-lg
                  "
                >
                  {option}
                </button>
              ))}

            </div>
          </>
        ) : (
          <>
            {/* resultado */}
            <div className="text-center mb-12">

              <h2 className="text-4xl font-bold mb-8">
                Resultado Final 🎉
              </h2>

              {/* círculo porcentagem */}
              <div className="flex justify-center mb-8">

                <div
                  className={`
                    w-44 h-44 rounded-full border-[12px]
                    flex flex-col items-center justify-center
                    shadow-xl

                    ${
                      percentage >= 50
                        ? "border-green-500 text-green-400"
                        : "border-red-500 text-red-400"
                    }
                  `}
                >
                  <span className="text-5xl font-bold">
                    {percentage}%
                  </span>

                  <span className="text-sm mt-2 text-gray-300">
                    de acertos
                  </span>
                </div>

              </div>

              <p className="text-2xl text-blue-400 font-semibold">
                {score} / {quiz.questions.length} acertos
              </p>

            </div>

            {/* feedback respostas */}
            <div className="flex flex-col gap-6">

              {answers.map((answer, questionIndex) => (
                <div
                  key={questionIndex}
                  className="bg-slate-700 rounded-2xl p-5"
                >

                  <h3 className="text-xl font-bold mb-5">
                    {questionIndex + 1}. {answer.question}
                  </h3>

                  <div className="flex flex-col gap-3">

                    {answer.options.map((option, optionIndex) => {

                      const isCorrect =
                        optionIndex === answer.correct;

                      const isSelected =
                        optionIndex === answer.selected;

                      return (
                        <div
                          key={optionIndex}
                          className={`
                            p-4 rounded-xl border-2

                            ${
                              isCorrect
                                ? "border-green-500 bg-green-500/10"
                                : ""
                            }

                            ${
                              isSelected && !isCorrect
                                ? "border-red-500 bg-red-500/10"
                                : ""
                            }

                            ${
                              !isCorrect && !isSelected
                                ? "border-slate-600"
                                : ""
                            }
                          `}
                        >
                          <div className="flex items-center justify-between">

                            <span>{option}</span>

                            {isCorrect && (
                              <span className="text-green-400 font-bold">
                                Correta
                              </span>
                            )}

                            {isSelected && !isCorrect && (
                              <span className="text-red-400 font-bold">
                                Sua resposta
                              </span>
                            )}

                          </div>
                        </div>
                      );
                    })}

                  </div>
                </div>
              ))}

            </div>

            {/* botão voltar */}
            <div className="flex justify-center mt-10">

              <button
                onClick={() => navigate("/")}
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  transition
                  px-8
                  py-3
                  rounded-2xl
                  font-bold
                  text-lg
                "
              >
                Voltar para Quizzes
              </button>

            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Quiz;