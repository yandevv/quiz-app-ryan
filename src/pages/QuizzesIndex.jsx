import React from "react";
import { Link } from "react-router";
import quizzes from "../data/quizzes.json";

function QuizzesIndex() {
  return (
    <div className="min-h-screen bg-slate-900 text-white px-12 py-10">

      <h1 className="text-5xl font-bold text-center mb-14">
        Quizzes
      </h1>

      <div className="grid grid-cols-4 gap-8">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-slate-800 rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition duration-300 flex flex-col"
          >
            <img
              src={quiz.coverImage}
              alt={quiz.name}
              className="w-full h-36 object-cover"
            />

            <div className="p-4 flex flex-col flex-1">

              <h2
                className="text-xl font-bold mb-2"
                style={{ color: quiz.textColor || "#fff" }}
              >
                {quiz.name}
              </h2>

              <p
                className="text-sm text-gray-300 mb-5"
                style={{ color: quiz.textColor || "#d1d5db" }}
              >
                {quiz.description}
              </p>

              <Link
                to={`/quizzes/${quiz.id}`}
                className="mt-auto bg-blue-600 hover:bg-blue-700 transition text-center py-2 rounded-xl font-semibold"
              >
                Começar
              </Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizzesIndex;