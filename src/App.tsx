import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Level1 } from './components/Level1';
import { SimulationResult } from './components/SimulationResult';
import { ReviewAndLearn } from './components/ReviewAndLearn';
import './styles/slider.css';
import './styles/animations.css';

export type Screen = 'dashboard' | 'level1' | 'simulation' | 'review';

export interface PortfolioAllocation {
  equity: number;
  bonds: number;
  tech: number;
  cash: number;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [hasSimulated, setHasSimulated] = useState(false);
  const [lastSimulationDate, setLastSimulationDate] = useState<Date | null>(null);
  const [portfolio, setPortfolio] = useState<PortfolioAllocation>({
    equity: 0,
    bonds: 0,
    tech: 0,
    cash: 0,
  });

  const resetPortfolio = () => {
    setPortfolio({
      equity: 0,
      bonds: 0,
      tech: 0,
      cash: 0,
    });
  };

  const completeLevel = (level: number) => {
    if (!completedLevels.includes(level)) {
      setCompletedLevels([...completedLevels, level]);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {currentScreen === 'dashboard' && (
        <Dashboard 
          currentLevel={currentLevel}
          completedLevels={completedLevels}
          onStartLevel1={() => setCurrentScreen('level1')}
          hasSimulated={hasSimulated}
          portfolio={portfolio}
          lastSimulationDate={lastSimulationDate}
        />
      )}
      {currentScreen === 'level1' && (
        <Level1 
          portfolio={portfolio}
          setPortfolio={setPortfolio}
          onBack={() => setCurrentScreen('dashboard')}
          onSimulate={() => {
            setHasSimulated(true);
            setLastSimulationDate(new Date());
            setCurrentScreen('simulation');
          }}
        />
      )}
      {currentScreen === 'simulation' && (
        <SimulationResult 
          portfolio={portfolio}
          onContinue={() => setCurrentScreen('review')}
        />
      )}
      {currentScreen === 'review' && (
        <ReviewAndLearn 
          onContinueToLevel2={() => {
            completeLevel(1);
            setCurrentLevel(2);
            // Delay navigation to allow celebration animation to complete
            setTimeout(() => {
              setCurrentScreen('dashboard');
            }, 1500);
          }}
          onTryAgain={() => {
            resetPortfolio();
            setCurrentScreen('level1');
          }}
        />
      )}
    </div>
  );
}