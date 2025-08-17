import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/GameLevel.css';

function GameLevel() {
  const { levelId } = useParams();
  const levelNum = parseInt(levelId);
  const { userProfile, completeLevel, logout } = useAuth();
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [questions, setQuestions] = useState([]);

  const playSound = (name) => {
    const audio = new Audio(`/sounds/${name}.wav`);
    audio.play();
  };

  const generateOptions = (correctAnswer, maxValue) => {
    const options = [correctAnswer];
    while (options.length < 4) {
      const option = Math.floor(Math.random() * maxValue) + 1;
      if (!options.includes(option)) options.push(option);
    }
    return options.sort(() => Math.random() - 0.5);
  };

  const generateQuestions = useCallback(() => {
    const newQuestions = [];
    for (let i = 0; i < 5; i++) {
      let question = {};
      switch (levelNum) {
        case 1:
          question = {
            text: `Quanto é ${i + 1} + ${i + 2}?`,
            correctAnswer: (i + 1) + (i + 2),
            options: generateOptions((i + 1) + (i + 2), 10)
          };
          break;
        case 2:
          question = {
            text: `Quanto é ${i + 5} - ${i + 2}?`,
            correctAnswer: (i + 5) - (i + 2),
            options: generateOptions((i + 5) - (i + 2), 10)
          };
          break;
        case 3: {
          const a = i + 1;
          const b = (i % 5) + 1;
          question = {
            text: `Quanto é ${a} × ${b}?`,
            correctAnswer: a * b,
            options: generateOptions(a * b, 20)
          };
          break;
        }
        case 4: {
          const a = Math.floor(Math.random() * 10) + 5;
          const b = Math.floor(Math.random() * 10) + 5;
          question = {
            text: `Quanto é ${a} × ${b}?`,
            correctAnswer: a * b,
            options: generateOptions(a * b, 100)
          };
          break;
        }
        case 5: {
          const b = Math.floor(Math.random() * 9) + 2;
          const correct = (Math.floor(Math.random() * 10) + 1) * b;
          question = {
            text: `Quanto é ${correct} ÷ ${b}?`,
            correctAnswer: correct / b,
            options: generateOptions(correct / b, 20)
          };
          break;
        }
        case 6: {
          const a = Math.floor(Math.random() * 90) + 10;
          const b = Math.floor(Math.random() * 90) + 10;
          question = {
            text: `Quanto é ${a} + ${b}?`,
            correctAnswer: a + b,
            options: generateOptions(a + b, 200)
          };
          break;
        }
        case 7: {
          const a = Math.floor(Math.random() * 100) + 50;
          const b = Math.floor(Math.random() * 50) + 10;
          question = {
            text: `Quanto é ${a} - ${b}?`,
            correctAnswer: a - b,
            options: generateOptions(a - b, 150)
          };
          break;
        }
        case 8: {
          const a = Math.floor(Math.random() * 20) + 10;
          const b = Math.floor(Math.random() * 20) + 10;
          question = {
            text: `Quanto é ${a} × ${b}?`,
            correctAnswer: a * b,
            options: generateOptions(a * b, 400)
          };
          break;
        }
        case 9: {
          const b = Math.floor(Math.random() * 20) + 2;
          const a = Math.floor(Math.random() * 200) + 20;
          question = {
            text: `Quanto é ${a} ÷ ${b}? (arredonde para inteiro)`,
            correctAnswer: Math.round(a / b),
            options: generateOptions(Math.round(a / b), 50)
          };
          break;
        }
        case 10: {
          const op = Math.floor(Math.random() * 4);
          let a, b;
          switch (op) {
            case 0:
              a = Math.floor(Math.random() * 100) + 1;
              b = Math.floor(Math.random() * 100) + 1;
              question = {
                text: `Quanto é ${a} + ${b}?`,
                correctAnswer: a + b,
                options: generateOptions(a + b, 200)
              };
              break;
            case 1:
              a = Math.floor(Math.random() * 150) + 50;
              b = Math.floor(Math.random() * 100) + 10;
              question = {
                text: `Quanto é ${a} - ${b}?`,
                correctAnswer: a - b,
                options: generateOptions(a - b, 200)
              };
              break;
            case 2:
              a = Math.floor(Math.random() * 30) + 5;
              b = Math.floor(Math.random() * 30) + 5;
              question = {
                text: `Quanto é ${a} × ${b}?`,
                correctAnswer: a * b,
                options: generateOptions(a * b, 600)
              };
              break;
            case 3:
              b = Math.floor(Math.random() * 20) + 2;
              a = b * (Math.floor(Math.random() * 20) + 1);
              question = {
                text: `Quanto é ${a} ÷ ${b}?`,
                correctAnswer: a / b,
                options: generateOptions(a / b, 50)
              };
              break;
            default:
              question = {
                text: `Pergunta de nível ${levelNum}`,
                correctAnswer: 1,
                options: [1, 2, 3, 4]
              };
          }
          break;
        }
        default:
          question = {
            text: `Pergunta de nível ${levelNum}`,
            correctAnswer: 1,
            options: [1, 2, 3, 4]
          };
      }
      newQuestions.push(question);
    }
    return newQuestions;
  }, [levelNum]);

  const handleNextQuestion = useCallback(() => {
    setShowResult(false);
    setSelectedAnswer(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(30);
    } else {
      setGameOver(true);
      const passed = score >= Math.ceil(questions.length * 0.6);
      if (passed) {
        completeLevel(levelNum);
        playSound("win");
      }
    }
  }, [currentQuestion, questions.length, score, completeLevel, levelNum]);

  useEffect(() => {
    setQuestions(generateQuestions());
    setTimeLeft(30);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setGameOver(false);
    setSelectedAnswer(null);
  }, [levelNum, generateQuestions]);

  useEffect(() => {
    if (gameOver || showResult) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleNextQuestion();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, gameOver, showResult, handleNextQuestion]);

  const checkAnswer = (selectedOption) => {
    playSound("click");
    setSelectedAnswer(selectedOption);
    const isCorrect = selectedOption === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      playSound("correct");
      setScore(prev => prev + 1);
    } else {
      playSound("wrong");
    }
    setShowResult(true);
    setTimeout(handleNextQuestion, 1500);
  };

  const restartGame = () => {
    playSound("click");
    setQuestions(generateQuestions());
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setGameOver(false);
    setSelectedAnswer(null);
    setTimeLeft(30);
  };

  const handleLogout = async () => {
    playSound("click");
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Falha ao fazer logout', error);
    }
  };

  useEffect(() => {
    if (userProfile && levelNum > userProfile.currentLevel) {
      navigate('/dashboard');
    }
  }, [userProfile, levelNum, navigate]);

  if (!questions.length) return <div>Carregando...</div>;

  const currentQ = questions[currentQuestion];
  const timerPercent = (timeLeft / 30) * 100;

  return (
    <div className="game-level">
      <div className="game-container">
        <div className="game-controls">
          <button className="control-button" onClick={() => { playSound("click"); navigate('/dashboard'); }}>Voltar ao Menu</button>
          <button className="control-button" onClick={handleLogout}>Sair</button>
        </div>

        <h2 className="level-title">Nível {levelNum}</h2>

        <div className="timer">
          <div className="timer-bar" style={{ width: `${timerPercent}%` }}></div>
          <span>{timeLeft}s</span>
        </div>

        {!gameOver ? (
          <div className="question-card">
            <p className="question-text">{currentQ.text}</p>
            <div className="options">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  className={`option-button ${selectedAnswer === opt ? 'selected' : ''}`}
                  onClick={() => checkAnswer(opt)}
                  disabled={showResult}
                >
                  {opt}
                </button>
              ))}
            </div>
            {showResult && (
              <div className="result">
                {selectedAnswer === currentQ.correctAnswer ? "✔️ Correto!" : `❌ Errado! Resposta certa: ${currentQ.correctAnswer}`}
              </div>
            )}
          </div>
        ) : (
          <div className="result-container">
            <h2>Fim do Nível!</h2>
            <p>Pontuação: {score} / {questions.length}</p>
            <button className="control-button" onClick={restartGame}>Jogar Novamente</button>
            <button className="control-button" onClick={() => { playSound("click"); navigate('/dashboard'); }}>Voltar ao Menu</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameLevel;
