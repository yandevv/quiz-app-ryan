import React, { useState } from 'react'
import { Link, useLocation } from 'react-router'

function QuizzesIndex() {

  const location = useLocation()

  const quizzes = {
    futebol: {
      cor: "#0d47a1",
      imagem: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6",
      perguntas: [
        {
          pergunta: "Quantos jogadores em campo?",
          opcoes: ["7", "9", "11", "13"],
          correta: 2
        },
        {
          pergunta: "Quem ganhou a Copa 2002?",
          opcoes: ["Alemanha", "Brasil", "França", "Argentina"],
          correta: 1
        },
        {
          pergunta: "Rei do Futebol?",
          opcoes: ["Messi", "CR7", "Pelé", "Neymar"],
          correta: 2
        },
        {
          pergunta: "Duração do jogo?",
          opcoes: ["60", "70", "80", "90"],
          correta: 3
        },
        {
          pergunta: "País com mais Copas?",
          opcoes: ["Alemanha", "Brasil", "Itália", "Argentina"],
          correta: 1
        }
      ]
    },
    basquete: {
      cor: "#f5f5f5",
      texto: "#111",
      imagem: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
      perguntas: [
        {
          pergunta: "Jogadores em quadra?",
          opcoes: ["4", "5", "6", "7"],
          correta: 1
        },
        {
          pergunta: "GOAT?",
          opcoes: ["LeBron", "Curry", "Jordan", "Durant"],
          correta: 2
        },
        {
          pergunta: "Pontos de 3?",
          opcoes: ["1", "2", "3", "4"],
          correta: 2
        },
        {
          pergunta: "Liga principal?",
          opcoes: ["NFL", "NBA", "FIFA", "UFC"],
          correta: 1
        },
        {
          pergunta: "Duração jogo?",
          opcoes: ["40", "48", "60", "30"],
          correta: 1
        }
      ]
    }
  }

  const [atual, setAtual] = useState(0)
  const [pontos, setPontos] = useState(0)

  // 🏠 HOME
  if (location.pathname === "/") {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        fontFamily: "Poppins, sans-serif"
      }}>
        <div style={{
          background: "rgba(255,255,255,0.95)",
          padding: "50px",
          borderRadius: "25px",
          textAlign: "center",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          backdropFilter: "blur(10px)"
        }}>
          <h1 style={{
            marginBottom: "10px",
            fontSize: "28px",
            color: "#111"
          }}>
            Escolha seu Quiz
          </h1>

          <p style={{ color: "#555", marginBottom: "25px" }}>
            Teste seus conhecimentos agora
          </p>

          <div style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center"
          }}>
            <Link to="/futebol">
              <button style={{
                padding: "12px 25px",
                borderRadius: "30px",
                border: "none",
                cursor: "pointer",
                background: "#1e88e5",
                color: "white",
                fontWeight: "bold",
                fontSize: "14px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
              }}>
                ⚽ Futebol
              </button>
            </Link>

            <Link to="/basquete">
              <button style={{
                padding: "12px 25px",
                borderRadius: "30px",
                border: "none",
                cursor: "pointer",
                background: "#ef6c00",
                color: "white",
                fontWeight: "bold",
                fontSize: "14px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
              }}>
                🏀 Basquete
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // 🔎 identifica quiz
  const tipo = location.pathname.replace("/", "")
  const quiz = quizzes[tipo]

  function responder(index) {
    if (index === quiz.perguntas[atual].correta) {
      setPontos(pontos + 1)
    }
    setAtual(atual + 1)
  }

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: quiz.cor,
      fontFamily: "Poppins, sans-serif"
    }}>
      <div style={{
        background: "white",
        padding: "40px",
        borderRadius: "20px",
        textAlign: "center",
        width: "350px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        color: quiz.texto || "#111"
      }}>

        <img
          src={quiz.imagem}
          style={{
            width: "100%",
            borderRadius: "15px",
            marginBottom: "20px"
          }}
        />

        {atual < quiz.perguntas.length ? (
          <>
            <h2>{quiz.perguntas[atual].pergunta}</h2>

            {quiz.perguntas[atual].opcoes.map((op, i) => (
              <button
                key={i}
                onClick={() => responder(i)}
                style={botao}
              >
                {op}
              </button>
            ))}
          </>
        ) : (
          <>
            <h1>Resultado</h1>
            <p>{pontos} / {quiz.perguntas.length}</p>

            <Link to="/">
              <button
                style={botao}
                onClick={() => {
                  setAtual(0)
                  setPontos(0)
                }}
              >
                Voltar
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

const botao = {
  margin: "10px",
  padding: "10px 20px",
  borderRadius: "30px",
  border: "none",
  cursor: "pointer",
  background: "#8B0000",
  color: "white",
  fontWeight: "bold"
}

export default QuizzesIndex