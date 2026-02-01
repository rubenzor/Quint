import { Check } from 'lucide-react';

interface ProgressHeaderProps {
  currentLevel: number;
  totalLevels?: number;
}

export function ProgressHeader({ currentLevel, totalLevels = 5 }: ProgressHeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-white/60">
      <div className="max-w-7xl mx-auto px-12 py-6 flex items-center justify-between">
        <h1 className="text-2xl tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text font-semibold">Quint</h1>
        <div className="flex items-center gap-4">
          <span className="text-xs text-zinc-400 uppercase tracking-wide">Journey</span>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalLevels }, (_, i) => i + 1).map((level, index) => (
              <div key={level} className="flex items-center">
                <div 
                  className={`
                    relative w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all
                    ${level < currentLevel 
                      ? 'bg-green-100 text-green-600' 
                      : level === currentLevel 
                        ? 'bg-purple-100 text-purple-600 ring-2 ring-purple-200' 
                        : 'bg-zinc-100 text-zinc-300'
                    }
                  `}
                >
                  {level < currentLevel ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    level
                  )}
                </div>
                {index < totalLevels - 1 && (
                  <div 
                    className={`
                      w-4 h-0.5 mx-0.5 rounded-full transition-all
                      ${level < currentLevel 
                        ? 'bg-green-200' 
                        : 'bg-zinc-100'
                      }
                    `}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}