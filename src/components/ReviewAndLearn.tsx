import { ProgressHeader } from './ProgressHeader';
import { Sparkles, Check, Target, Shield, TrendingUp, Award, Lightbulb, ArrowRight, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ReviewAndLearnProps {
  onContinueToLevel2: () => void;
  onTryAgain: () => void;
}

const completedLevels = [
  { level: 1, title: 'Build your first portfolio', icon: Target, status: 'complete' },
  { level: 2, title: 'Reduce risk through diversification', icon: Shield, status: 'unlocked' },
  { level: 3, title: 'Protect your capital', icon: TrendingUp, status: 'locked' },
  { level: 4, title: 'Advanced strategies', icon: Sparkles, status: 'locked' },
  { level: 5, title: 'Master investor', icon: Award, status: 'locked' },
];

export function ReviewAndLearn({ onContinueToLevel2, onTryAgain }: ReviewAndLearnProps) {
  const [showCelebration, setShowCelebration] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Trigger celebration animation on mount
    setShowCelebration(true);
  }, []);

  const handleContinue = () => {
    setIsTransitioning(true);
    onContinueToLevel2();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 relative overflow-hidden">
      {/* Celebration Confetti Effect */}
      {showCelebration && (
        <>
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random() * 1}s`,
                backgroundColor: ['#8b5cf6', '#3b82f6', '#14b8a6', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)],
              }}
            />
          ))}
        </>
      )}
      
      {/* Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 animate-fadeIn flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Check className="w-10 h-10 text-white" />
            </div>
            <p className="text-lg text-zinc-700 font-medium">Loading Level 2...</p>
          </div>
        </div>
      )}
      
      <ProgressHeader currentLevel={1} />
      
      <main className="max-w-4xl mx-auto px-12 py-12 relative z-10">
        {/* Success indicator with title */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-6 shadow-2xl shadow-green-200/50 relative ${showCelebration ? 'animate-scaleIn' : ''}`}>
            <Check className="w-10 h-10 text-white" />
            <div className="absolute -inset-2 bg-green-400/30 rounded-full animate-pulse" />
          </div>
          
          <div className={`mb-4 ${showCelebration ? 'animate-slideUp' : ''}`}>
            <h2 className="text-4xl text-zinc-900 mb-3">
              Level 1 <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">complete</span>
            </h2>
            <p className="text-lg text-zinc-600">
              You've taken your first step into investing
            </p>
            <p className="text-sm text-green-600 font-medium mt-2">
              Great job! You're ready for the next challenge.
            </p>
          </div>
        </div>

        {/* Key Takeaways Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/80 p-8 mb-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg text-zinc-900 font-medium">What You Learned</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex gap-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-semibold">1</span>
              </div>
              <p className="text-sm text-zinc-700 leading-relaxed">
                <strong className="text-zinc-900">Different assets play different roles in a portfolio</strong> — Some provide growth, others stability, and understanding these roles helps you build with intention.
              </p>
            </div>
            
            <div className="flex gap-4 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-semibold">2</span>
              </div>
              <p className="text-sm text-zinc-700 leading-relaxed">
                <strong className="text-zinc-900">Asset allocation affects both growth and risk</strong> — The way you balance your investments determines how much your portfolio might grow and how volatile it could be.
              </p>
            </div>
            
            <div className="flex gap-4 p-4 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl border border-teal-100">
              <div className="w-6 h-6 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-semibold">3</span>
              </div>
              <p className="text-sm text-zinc-700 leading-relaxed">
                <strong className="text-zinc-900">There is no single correct portfolio</strong> — Only informed decisions based on your understanding of how different assets work together.
              </p>
            </div>
          </div>
        </div>

        {/* Reflection Prompt */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-8 mb-8 shadow-sm">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base text-zinc-900 font-semibold mb-2">Think about it</h3>
              <p className="text-sm text-zinc-700 leading-relaxed">
                What would you change if you tried again? There's no need to answer—just take a moment to reflect on what you learned.
              </p>
            </div>
          </div>
        </div>

        {/* Progress Confirmation */}
        <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl p-10 mb-8 shadow-xl shadow-purple-200/50">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="w-5 h-5 text-white" />
            <h3 className="text-xl text-white font-semibold">Your Progress</h3>
          </div>
          
          <div className="space-y-3">
            {completedLevels.map((level) => {
              const IconComponent = level.icon;
              const isComplete = level.status === 'complete';
              const isUnlocked = level.status === 'unlocked';
              const isLocked = level.status === 'locked';
              
              return (
                <div
                  key={level.level}
                  className={`
                    rounded-xl border p-5 flex items-center justify-between transition-all
                    ${isComplete 
                      ? 'bg-white/30 border-white/40 backdrop-blur-sm shadow-lg' 
                      : isUnlocked 
                        ? 'bg-white/20 border-white/30 backdrop-blur-sm ring-2 ring-white/40' 
                        : 'bg-white/10 border-white/20 backdrop-blur-sm'
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className={`
                        w-12 h-12 rounded-xl flex items-center justify-center
                        ${isComplete 
                          ? 'bg-white/40 text-white' 
                          : isUnlocked 
                            ? 'bg-white text-purple-600' 
                            : 'bg-white/10 text-white/30'
                        }
                      `}
                    >
                      {isComplete ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <IconComponent className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <h4 className={`text-base font-medium ${isLocked ? 'text-white/40' : 'text-white'}`}>
                        {level.title}
                      </h4>
                      {isComplete && (
                        <span className="text-sm text-white/70">Completed</span>
                      )}
                      {isUnlocked && (
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-sm text-white/90 font-medium">Unlocked – Start next</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Primary Actions */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handleContinue}
            disabled={isTransitioning}
            className={`bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-5 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg shadow-green-200/50 hover:shadow-xl hover:shadow-green-300/50 flex items-center justify-center gap-3 text-base font-medium ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Sparkles className="w-5 h-5" />
            Continue to Level 2
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button
            onClick={onTryAgain}
            className="text-zinc-600 hover:text-purple-600 transition-colors flex items-center justify-center gap-2 text-sm font-medium py-3"
          >
            <RotateCcw className="w-4 h-4" />
            Try Level 1 again
          </button>
        </div>
      </main>
    </div>
  );
}