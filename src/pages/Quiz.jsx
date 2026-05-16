import React, { useState, useEffect } from "react";
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

  // tempo total do quiz
  const [totalTime, setTotalTime] = useState(0);

  // tempo restante da questão
  const [timeLeft, setTimeLeft] = useState(120);

  // tempo gasto na questão atual
  const [questionTime, setQuestionTime] = useState(0);

  if (!quiz) {
    return (
      <div className="text-white p-10">
        Quiz não encontrado
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  // cronômetro
  useEffect(() => {
    if (finished) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);

      setTotalTime((prev) => prev + 1);

      setQuestionTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestion, finished]);

  // tempo expirado
  useEffect(() => {
    if (timeLeft <= 0 && !finished) {
      handleTimeout();
    }
  }, [timeLeft]);

  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);

    const sec = seconds % 60;

    return `${min}:${sec.toString().padStart(2, "0")}`;
  }

  function nextQuestion() {
    const next = currentQuestion + 1;

    if (next < quiz.questions.length) {
      setCurrentQuestion(next);

      setTimeLeft(120);

      setQuestionTime(0);
    } else {
      setFinished(true);
    }
  }

  // caso o tempo acabe
  function handleTimeout() {
    setAnswers((prev) => [
      ...prev,
      {
        question: question.question,
        options: question.options,
        selected: null,
        correct: question.correct,
        expired: true,
        timeSpent: questionTime,
      },
    ]);

    nextQuestion();
  }

  // resposta normal
  function handleAnswer(index) {
    setAnswers((prev) => [
      ...prev,
      {
        question: question.question,
        options: question.options,
        selected: index,
        correct: question.correct,
        expired: false,
        timeSpent: questionTime,
      },
    ]);

    if (index === question.correct) {
      setScore((prev) => prev + 1);
    }

    nextQuestion();
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
            {/* progresso */}
            <div className="mb-6">

              <div className="flex items-center justify-between mb-3">

                <p className="text-gray-400">
                  Pergunta {currentQuestion + 1} de{" "}
                  {quiz.questions.length}
                </p>

                <div
                  className={`
                    px-4 py-2 rounded-xl font-bold

                    ${
                      timeLeft <= 15
                        ? "bg-red-500 text-white"
                        : "bg-slate-700 text-white"
                    }
                  `}
                >
                  ⏱ {formatTime(timeLeft)}
                </div>

              </div>

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

              {/* círculo */}
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

              <p className="text-2xl text-blue-400 font-semibold mb-3">
                {score} / {quiz.questions.length} acertos
              </p>

              {/* tempo total */}
              <p className="text-lg text-gray-300">
                Tempo total:{" "}
                <span className="font-bold text-yellow-400">
                  {formatTime(totalTime)}
                </span>
              </p>

            </div>

            {/* feedback */}
            <div className="flex flex-col gap-6">

              {answers.map((answer, questionIndex) => (
                <div
                  key={questionIndex}
                  className="bg-slate-700 rounded-2xl p-5"
                >

                  <div className="flex items-center justify-between mb-5">

                    <h3 className="text-xl font-bold">
                      {questionIndex + 1}. {answer.question}
                    </h3>

                    <div className="bg-slate-800 px-3 py-2 rounded-xl text-sm text-yellow-400 font-bold">
                      ⏱ {formatTime(answer.timeSpent)}
                    </div>

                  </div>

                  {/* tempo expirado */}
                  {answer.expired && (
                    <div className="mb-4 text-red-400 font-bold">
                      Tempo expirado
                    </div>
                  )}

                  {/* alternativas */}
                  <div className="flex flex-col gap-3">

                    {answer.options.map((option, optionIndex) => {

                      const isCorrect =
                        optionIndex === answer.correct;

                      const isSelected =
                        optionIndex === answer.selected;

                      // TEMPO EXPIRADO
                      if (answer.expired) {
                        return (
                          <div
                            key={optionIndex}
                            className={`
                              p-4 rounded-xl border-2

                              ${
                                isCorrect
                                  ? "border-green-500 bg-green-500/10"
                                  : "border-slate-600"
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

                            </div>
                          </div>
                        );
                      }

                      // RESPOSTAS NORMAIS
                      return (
                        <div
                          key={optionIndex}
                          className={`
                            p-4 rounded-xl border-2

                            ${
                              isCorrect
                                ? "border-green-500 bg-green-500/10"
                                : "border-slate-600"
                            }

                            ${
                              isSelected && !isCorrect
                                ? "border-red-500 bg-red-500/10"
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

            {/* botão */}
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