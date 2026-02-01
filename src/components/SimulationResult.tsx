import { useState } from 'react';
import { ProgressHeader } from './ProgressHeader';
import { Sparkles, Check, TrendingUp, Activity, BookOpen, DollarSign, Play, Eye, ArrowRight, Lightbulb, Shield } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import type { PortfolioAllocation } from '../App';

interface SimulationResultProps {
  portfolio: PortfolioAllocation;
  onContinue: () => void;
}

const journeySteps = [
  { id: 1, title: 'Understand asset types', icon: BookOpen },
  { id: 2, title: 'Allocate your capital', icon: DollarSign },
  { id: 3, title: 'Simulate your portfolio', icon: Play },
  { id: 4, title: 'Review and learn', icon: Eye },
];

// Generate simulated performance data based on portfolio allocation
function generateSimulationData(portfolio: PortfolioAllocation) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const data = [];
  
  // Calculate portfolio risk based on allocation
  const riskScore = (portfolio.equity * 0.8) + (portfolio.tech * 1.2) + (portfolio.bonds * 0.3) + (portfolio.cash * 0.1);
  const volatility = riskScore / 100;
  
  let portfolioValue = 100000;
  let benchmarkValue = 100000;
  
  for (let i = 0; i < months.length; i++) {
    // Simulate market movements
    const marketReturn = (Math.random() - 0.45) * 0.06 * (1 + volatility);
    const benchmarkReturn = (Math.random() - 0.45) * 0.05;
    
    portfolioValue += portfolioValue * marketReturn;
    benchmarkValue += benchmarkValue * benchmarkReturn;
    
    data.push({
      month: months[i],
      portfolio: Math.round(portfolioValue),
      benchmark: Math.round(benchmarkValue),
    });
  }
  
  return data;
}

function analyzePortfolio(portfolio: PortfolioAllocation, finalValue: number) {
  const growthAssets = portfolio.equity + portfolio.tech;
  const stableAssets = portfolio.bonds + portfolio.cash;
  
  const returnPercent = ((finalValue - 100000) / 100000) * 100;
  
  let volatilityLevel: 'low' | 'moderate' | 'high';
  let growthLevel: 'low' | 'moderate' | 'high';
  
  if (growthAssets > 60) {
    volatilityLevel = 'high';
    growthLevel = 'high';
  } else if (growthAssets > 30) {
    volatilityLevel = 'moderate';
    growthLevel = 'moderate';
  } else {
    volatilityLevel = 'low';
    growthLevel = 'low';
  }
  
  let explanation = '';
  if (volatilityLevel === 'high') {
    explanation = `Your portfolio experienced bigger ups and downs throughout the year. This is mainly due to the higher exposure to growth assets like ${portfolio.tech > 20 ? 'technology stocks and ' : ''}equities.`;
  } else if (volatilityLevel === 'moderate') {
    explanation = `Your portfolio showed moderate ups and downs. You balanced growth assets with more stable investments, which helped smooth out some of the volatility.`;
  } else {
    explanation = `Your portfolio remained relatively stable throughout the year. The higher allocation to bonds and cash helped protect against market swings, though it may limit growth potential.`;
  }
  
  return {
    volatilityLevel,
    growthLevel,
    returnPercent,
    explanation,
  };
}

export function SimulationResult({ portfolio, onContinue }: SimulationResultProps) {
  const [simulationData] = useState(() => generateSimulationData(portfolio));
  const finalValue = simulationData[simulationData.length - 1].portfolio;
  const analysis = analyzePortfolio(portfolio, finalValue);
  const currentStep = 4; // Review and learn

  const getVolatilityColor = (level: string) => {
    if (level === 'low') return 'from-green-500 to-emerald-600';
    if (level === 'moderate') return 'from-amber-500 to-orange-500';
    return 'from-orange-500 to-red-500';
  };

  const getGrowthColor = (level: string) => {
    if (level === 'high') return 'from-green-500 to-emerald-600';
    if (level === 'moderate') return 'from-blue-500 to-cyan-600';
    return 'from-zinc-400 to-zinc-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50">
      <ProgressHeader currentLevel={1} />
      
      <main className="max-w-5xl mx-auto px-12 py-12">
        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-7 h-7 text-purple-600" />
            <h2 className="text-3xl text-zinc-900">
              Your portfolio <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">simulation</span>
            </h2>
          </div>
          <p className="text-base text-zinc-600">
            Let's see how your portfolio behaves over time
          </p>
        </div>

        {/* Level 1 Journey Progress */}
        <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl p-10 mb-8 shadow-xl shadow-purple-200/50">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="w-5 h-5 text-white" />
            <h3 className="text-xl text-white font-semibold">Your Learning Path</h3>
          </div>
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-7 left-7 right-7 h-1 bg-white/20 rounded-full" />
            <div 
              className="absolute top-7 left-7 h-1 bg-white/60 rounded-full transition-all duration-700"
              style={{ width: `calc(${((currentStep - 1) / (journeySteps.length - 1)) * 100}% - 28px)` }}
            />
            
            {/* Steps */}
            <div className="relative grid grid-cols-4 gap-6">
              {journeySteps.map((step) => {
                const StepIcon = step.icon;
                const isCompleted = step.id < currentStep;
                const isCurrent = step.id === currentStep;
                
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
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Portfolio Summary Card */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/80 p-8 mb-8 shadow-sm">
          <h3 className="text-lg text-zinc-900 font-medium mb-6">Simulation Results</h3>
          
          <div className="grid grid-cols-3 gap-6">
            {/* Final Value */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
              <p className="text-sm text-zinc-600 mb-2">Simulated Final Value</p>
              <p className="text-3xl font-semibold text-zinc-900">
                ${finalValue.toLocaleString()}
              </p>
              <p className={`text-sm mt-2 ${analysis.returnPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {analysis.returnPercent >= 0 ? '+' : ''}{analysis.returnPercent.toFixed(2)}% over 1 year
              </p>
            </div>

            {/* Growth Potential */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-zinc-600" />
                <p className="text-sm text-zinc-600">Growth Potential</p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${getGrowthColor(analysis.growthLevel)} text-white text-sm font-medium capitalize`}>
                  {analysis.growthLevel}
                </div>
              </div>
            </div>

            {/* Volatility */}
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-6 border border-teal-100">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-zinc-600" />
                <p className="text-sm text-zinc-600">Volatility</p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${getVolatilityColor(analysis.volatilityLevel)} text-white text-sm font-medium capitalize`}>
                  {analysis.volatilityLevel}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Visualization */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/80 p-8 mb-8 shadow-sm">
          <h3 className="text-lg text-zinc-900 font-medium mb-6">Portfolio Performance Over Time</h3>
          
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={simulationData}>
              <defs>
                <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorBenchmark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6b7280" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#6b7280" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
              <XAxis 
                dataKey="month" 
                stroke="#71717a"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#71717a"
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e4e4e7',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              />
              <Legend 
                wrapperStyle={{ fontSize: '14px' }}
                formatter={(value) => value === 'portfolio' ? 'Your Portfolio' : 'Market Reference (for comparison only)'}
              />
              <Area 
                type="monotone" 
                dataKey="benchmark" 
                stroke="#6b7280" 
                strokeWidth={2}
                fill="url(#colorBenchmark)" 
              />
              <Area 
                type="monotone" 
                dataKey="portfolio" 
                stroke="#a855f7" 
                strokeWidth={3}
                fill="url(#colorPortfolio)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Explanation */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 rounded-2xl p-8 mb-8 shadow-sm">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base text-zinc-900 font-semibold mb-3">Understanding Your Results</h3>
              <p className="text-sm text-zinc-700 leading-relaxed">
                {analysis.explanation}
              </p>
            </div>
          </div>
        </div>

        {/* What You Learned */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/80 p-8 mb-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg text-zinc-900 font-medium">What You Learned</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
              <p className="text-sm text-zinc-700">
                Asset balance affects risk—more growth assets create higher volatility
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
              <p className="text-sm text-zinc-700">
                Diversification can help smooth out the ups and downs over time
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
              <p className="text-sm text-zinc-700">
                There is no perfect allocation—it depends on your goals and risk tolerance
              </p>
            </div>
          </div>
        </div>

        {/* How Your Portfolio Compares */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/80 p-8 mb-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg text-zinc-900 font-medium">How Your Portfolio Compares</h3>
          </div>
          <p className="text-sm text-zinc-600 mb-8">
            Here are three common portfolio types for reference. Each represents different trade-offs between growth and stability.
          </p>
          
          <div className="grid grid-cols-4 gap-4">
            {/* Your Portfolio */}
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl p-6 text-white shadow-lg ring-2 ring-purple-300">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-base font-semibold">Your Portfolio</h4>
              </div>
              
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-xs text-white/70 mb-1">Growth potential</p>
                  <div className={`inline-flex px-3 py-1 rounded-lg text-xs font-medium bg-white/20 backdrop-blur-sm`}>
                    {analysis.growthLevel}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-white/70 mb-1">Volatility</p>
                  <div className={`inline-flex px-3 py-1 rounded-lg text-xs font-medium bg-white/20 backdrop-blur-sm`}>
                    {analysis.volatilityLevel}
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-white/80 leading-relaxed">
                Based on your allocation choices in this simulation.
              </p>
            </div>

            {/* Conservative Portfolio */}
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-base font-semibold text-zinc-900">Conservative</h4>
              </div>
              
              <p className="text-xs text-zinc-600 mb-4">
                Higher allocation to cash and bonds
              </p>
              
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Growth potential</p>
                  <div className="inline-flex px-3 py-1 rounded-lg text-xs font-medium bg-zinc-100 text-zinc-700">
                    Low
                  </div>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Volatility</p>
                  <div className="inline-flex px-3 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-700">
                    Low
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-zinc-600 leading-relaxed">
                Designed to preserve capital with limited ups and downs.
              </p>
            </div>

            {/* Balanced Portfolio */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-base font-semibold text-zinc-900">Balanced</h4>
              </div>
              
              <p className="text-xs text-zinc-600 mb-4">
                Mix of growth and stability assets
              </p>
              
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Growth potential</p>
                  <div className="inline-flex px-3 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-700">
                    Moderate
                  </div>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Volatility</p>
                  <div className="inline-flex px-3 py-1 rounded-lg text-xs font-medium bg-amber-100 text-amber-700">
                    Moderate
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-zinc-600 leading-relaxed">
                A middle-ground approach balancing risk and return.
              </p>
            </div>

            {/* Aggressive Portfolio */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-base font-semibold text-zinc-900">Aggressive</h4>
              </div>
              
              <p className="text-xs text-zinc-600 mb-4">
                Higher exposure to equities and growth assets
              </p>
              
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Growth potential</p>
                  <div className="inline-flex px-3 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-700">
                    High
                  </div>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Volatility</p>
                  <div className="inline-flex px-3 py-1 rounded-lg text-xs font-medium bg-red-100 text-red-700">
                    High
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-zinc-600 leading-relaxed">
                Aims for higher returns but experiences stronger swings.
              </p>
            </div>
          </div>
          
          <div className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-4">
            <p className="text-xs text-zinc-700 text-center leading-relaxed">
              These are reference examples to help you understand trade-offs. No single approach is right for everyone.
            </p>
          </div>
        </div>

        {/* Primary Action */}
        <button
          onClick={onContinue}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-5 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg shadow-green-200/50 hover:shadow-xl hover:shadow-green-300/50 flex items-center gap-3 text-base font-medium"
        >
          <Sparkles className="w-5 h-5" />
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </main>
    </div>
  );
}