import React from "react";
import { Link } from "react-router";
import quizzes from "../data/quizzes.json";

function QuizzesIndex() {
  return (
    <div className="w-full min-h-screen bg-slate-800 text-white py-6 px-10">
      <h1 className="text-center font-bold text-2xl mb-8">Quizzes</h1>

      <div className="grid grid-cols-3 gap-8">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="rounded-xl overflow-hidden shadow-lg relative"
            style={{ backgroundColor: quiz.color }}
          >
            <img
              src={quiz.coverImage}
              alt={"Cover do Quiz " + quiz.name}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <h2
                className="font-bold text-xl mb-2"
                style={{ color: quiz.textColor || "#fff" }}
              >
                {quiz.name}
              </h2>

              <p style={{ color: quiz.textColor || "#fff" }}>
                {quiz.description}
              </p>
            </div>

            <Link
              to={`/quizzes/${quiz.id}`}
              className="bg-slate-900 text-white px-4 py-2 rounded-lg absolute bottom-4 left-1/2 -translate-x-1/2"
            >
              Começar
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizzesIndex;