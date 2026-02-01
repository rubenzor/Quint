import { useState, useEffect } from 'react';
import { ProgressHeader } from './ProgressHeader';
import { ArrowLeft, Info, TrendingUp, Shield, Cpu, Banknote, Sparkles, Check, Lock, BookOpen, DollarSign, Play, Eye } from 'lucide-react';
import type { PortfolioAllocation } from '../App';

interface Level1Props {
  portfolio: PortfolioAllocation;
  setPortfolio: (portfolio: PortfolioAllocation) => void;
  onBack: () => void;
  onSimulate: () => void;
}

interface AssetInfo {
  key: keyof PortfolioAllocation;
  name: string;
  description: string;
  icon: typeof TrendingUp;
  color: string;
}

const assets: AssetInfo[] = [
  {
    key: 'equity',
    name: 'Equity ETF',
    description: 'Represents the stock market as a whole. Often used as a reference point to measure long-term growth.',
    icon: TrendingUp,
    color: 'from-blue-500 to-cyan-600',
  },
  {
    key: 'bonds',
    name: 'Bond ETF',
    description: 'Adds stability and helps reduce volatility during market downturns.',
    icon: Shield,
    color: 'from-purple-500 to-pink-600',
  },
  {
    key: 'tech',
    name: 'Technology Stocks',
    description: 'Higher growth potential, but also higher risk and volatility.',
    icon: Cpu,
    color: 'from-violet-500 to-purple-600',
  },
  {
    key: 'cash',
    name: 'Cash',
    description: 'Provides safety and flexibility, but limits long-term returns.',
    icon: Banknote,
    color: 'from-teal-500 to-emerald-600',
  },
];

const journeySteps = [
  { id: 1, title: 'Understand asset types', icon: BookOpen },
  { id: 2, title: 'Allocate your capital', icon: DollarSign },
  { id: 3, title: 'Simulate your portfolio', icon: Play },
  { id: 4, title: 'Review and learn', icon: Eye },
];

export function Level1({ portfolio, setPortfolio, onBack, onSimulate }: Level1Props) {
  const [showInfo, setShowInfo] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [currentStep, setCurrentStep] = useState(1); // Currently on "Understand asset types"

  useEffect(() => {
    const sum = portfolio.equity + portfolio.bonds + portfolio.tech + portfolio.cash;
    setTotal(sum);
  }, [portfolio]);

  const handleSliderChange = (key: keyof PortfolioAllocation, value: number) => {
    setPortfolio({
      ...portfolio,
      [key]: value,
    });
  };

  const isValid = total === 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50">
      <ProgressHeader currentLevel={1} />
      
      <main className="max-w-4xl mx-auto px-12 py-12">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-600 hover:text-purple-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </button>

        {/* Title and description */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-7 h-7 text-purple-600" />
            <h2 className="text-3xl text-zinc-900">
              Create your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">first portfolio</span>
            </h2>
          </div>
          <p className="text-base text-zinc-600 max-w-3xl leading-relaxed">
            You have $100,000 of virtual capital. Your goal is to decide how to allocate it across different types of assets.
            <br /><br />
            Each asset plays a specific role in a portfolio. This is a simulation.
          </p>
        </div>

        {/* Level 1 Journey Section */}
        <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl p-10 mb-8 shadow-xl shadow-purple-200/50">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="w-5 h-5 text-white" />
            <h3 className="text-xl text-white font-semibold">Your Learning Path</h3>
          </div>
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-7 left-7 right-7 h-1 bg-white/20 rounded-full" />
            <div 
              className="absolute top-7 left-7 h-1 bg-white/40 rounded-full transition-all duration-700"
              style={{ width: `calc(${((currentStep - 1) / (journeySteps.length - 1)) * 100}% - 28px)` }}
            />
            
            {/* Steps */}
            <div className="relative grid grid-cols-4 gap-6">
              {journeySteps.map((step) => {
                const StepIcon = step.icon;
                const isCompleted = step.id < currentStep;
                const isCurrent = step.id === currentStep;
                const isLocked = step.id > currentStep;
                
                return (
                  <div key={step.id} className="flex flex-col items-center text-center">
                    <div 
                      className={`
                        relative w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300
                        ${isCompleted 
                          ? 'bg-white/30 text-white shadow-lg backdrop-blur-sm' 
                          : isCurrent 
                            ? 'bg-white text-purple-600 shadow-2xl scale-110 ring-4 ring-white/30' 
                            : 'bg-white/10 text-white/30 backdrop-blur-sm'
                        }
                      `}
                    >
                      {isCompleted ? (
                        <Check className="w-6 h-6" />
                      ) : isLocked ? (
                        <Lock className="w-6 h-6" />
                      ) : (
                        <StepIcon className="w-6 h-6" />
                      )}
                      {isCurrent && (
                        <div className="absolute -inset-1 bg-white/20 rounded-2xl animate-pulse" />
                      )}
                    </div>
                    <div className={`
                      px-3 py-1.5 rounded-lg transition-all
                      ${isCurrent ? 'bg-white/20 backdrop-blur-sm' : ''}
                    `}>
                      <p 
                        className={`
                          text-sm leading-tight font-medium
                          ${isCurrent 
                            ? 'text-white' 
                            : isCompleted 
                              ? 'text-white/80' 
                              : 'text-white/40'
                          }
                        `}
                      >
                        {step.title}
                      </p>
                      {isCurrent && (
                        <p className="text-xs text-white/70 mt-1">You are here</p>
                      )}
                      {isLocked && step.id === 2 && (
                        <p className="text-xs text-white/40 mt-1">Unlocks after exploring</p>
                      )}
                      {isLocked && step.id > 2 && (
                        <p className="text-xs text-white/40 mt-1">Coming next</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Step guidance */}
          {currentStep === 1 && (
            <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-sm text-white/90 text-center">
                <Info className="w-4 h-4 inline-block mr-1.5 -mt-0.5" />
                Explore at least two different assets to continue
              </p>
            </div>
          )}
        </div>

        {/* Asset Allocation Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/80 p-8 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg text-zinc-900 font-medium">Asset Allocation</h3>
          </div>
          <p className="text-sm text-zinc-500 mb-8 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Click the info icons to learn about each asset's role in your portfolio
          </p>
          
          <div className="space-y-8">
            {assets.map((asset) => {
              const IconComponent = asset.icon;
              return (
                <div key={asset.key} className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${asset.color} rounded-xl flex items-center justify-center shadow-sm`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base text-zinc-900 font-medium">{asset.name}</h4>
                        <button
                          onClick={() => setShowInfo(showInfo === asset.key ? null : asset.key)}
                          className={`text-zinc-400 hover:text-purple-600 transition-colors ${showInfo === asset.key ? 'text-purple-600' : ''}`}
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className={`text-lg font-semibold min-w-[60px] text-right bg-gradient-to-r ${asset.color} text-transparent bg-clip-text`}>
                      {portfolio[asset.key]}%
                    </div>
                  </div>

                  {showInfo === asset.key && (
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 text-sm text-zinc-700 leading-relaxed border border-purple-100">
                      {asset.description}
                    </div>
                  )}

                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={portfolio[asset.key]}
                      onChange={(e) => handleSliderChange(asset.key, parseInt(e.target.value))}
                      className="w-full h-3 bg-gradient-to-r from-zinc-100 to-zinc-200 rounded-full appearance-none cursor-pointer slider-thumb"
                      style={{
                        background: `linear-gradient(to right, 
                          rgb(168, 85, 247) 0%, 
                          rgb(59, 130, 246) ${portfolio[asset.key]}%, 
                          rgb(228, 228, 231) ${portfolio[asset.key]}%, 
                          rgb(228, 228, 231) 100%)`
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total Allocation Display */}
          <div className="mt-8 pt-6 border-t border-zinc-200">
            <div className="flex items-center justify-between">
              <span className="text-base text-zinc-600">Total Allocation</span>
              <div className="flex items-center gap-3">
                <span 
                  className={`text-2xl font-semibold ${
                    isValid 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600' 
                      : 'text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600'
                  }`}
                >
                  {total}%
                </span>
                {isValid && (
                  <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            </div>
            {!isValid && (
              <div className="mt-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-3">
                <p className="text-sm text-amber-700">
                  Please adjust your allocation to equal 100%
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Educational Guidance Box */}
        <div className="bg-gradient-to-br from-teal-50 to-blue-50 border border-teal-100 rounded-2xl p-6 mb-8 shadow-sm">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <p className="text-sm text-zinc-700 leading-relaxed">
              <strong className="text-teal-700">Learning tip:</strong> There's no single "correct" answer. Think about balance—each asset type serves a different purpose. Some offer growth potential, while others provide stability.
            </p>
          </div>
        </div>

        {/* Primary Action */}
        <button
          disabled={!isValid}
          onClick={isValid ? onSimulate : undefined}
          className={`
            px-10 py-5 rounded-xl text-base font-medium transition-all flex items-center gap-2
            ${isValid 
              ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:from-purple-600 hover:to-blue-700 shadow-lg shadow-purple-200/50 hover:shadow-xl hover:shadow-purple-300/50' 
              : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
            }
          `}
        >
          <Sparkles className="w-5 h-5" />
          Simulate portfolio
        </button>
      </main>
    </div>
  );
}