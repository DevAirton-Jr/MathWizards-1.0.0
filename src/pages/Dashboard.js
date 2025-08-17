import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Dashboard.css';

function Dashboard() {
  const { userProfile, fetchUserProfile } = useAuth();

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const levels = [
    { id: 1, title: 'Soma Simples', description: 'Aprenda a somar números pequenos.' },
    { id: 2, title: 'Subtração Simples', description: 'Aprenda a subtrair valores básicos.' },
    { id: 3, title: 'Multiplicação Simples', description: 'Multiplique números de 1 a 5.' },
    { id: 4, title: 'Multiplicação Intermediária', description: 'Pratique multiplicação com números maiores.' },
    { id: 5, title: 'Divisão Simples', description: 'Divida valores inteiros sem sobras.' },
    { id: 6, title: 'Soma Avançada', description: 'Adicione números maiores com rapidez.' },
    { id: 7, title: 'Subtração Avançada', description: 'Treine subtração com valores mais altos.' },
    { id: 8, title: 'Multiplicação Avançada', description: 'Multiplique grandes números com precisão.' },
    { id: 9, title: 'Divisão Avançada', description: 'Resolva divisões difíceis (arredondadas).' },
    { id: 10, title: 'Desafio Final', description: 'Revisão geral com todos os tipos de operação.' },
  ];

  const isLevelUnlocked = (levelId) => {
    if (!userProfile) return levelId === 1;
    return levelId <= (userProfile.currentLevel || 1);
  };

  const isLevelCompleted = (levelId) => {
    if (!userProfile) return false;
    return userProfile.completedLevels.includes(levelId);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Níveis do Jogo</h1>
          <p>Complete os níveis em ordem para desbloquear os próximos desafios!</p>
        </div>
        <div className="levels-grid">
          {levels.map((level) => (
            <div 
              key={level.id} 
              className={`level-card ${isLevelCompleted(level.id) ? 'completed' : isLevelUnlocked(level.id) ? 'unlocked' : 'locked'}`}
            >
              <div className="level-number">{level.id}</div>
              <h3>{level.title}</h3>
              <p>{level.description}</p>
              {isLevelUnlocked(level.id) ? (
                <Link to={`/level/${level.id}`} className="level-button">
                  {isLevelCompleted(level.id) ? 'Jogar Novamente' : 'Jogar'}
                </Link>
              ) : (
                <div className="level-locked">
                  <span className="lock-icon">🔒</span>
                  <span>Bloqueado</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
