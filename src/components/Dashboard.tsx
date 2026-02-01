import { ProgressHeader } from './ProgressHeader';
import { ArrowRight, Lock, Wallet, TrendingUp, Target, Shield, Award, Sparkles, BarChart3, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import type { PortfolioAllocation } from '../App';

interface DashboardProps {
  currentLevel: number;
  completedLevels: number[];
  onStartLevel1: () => void;
  hasSimulated: boolean;
  portfolio: PortfolioAllocation;
  lastSimulationDate: Date | null;
}

const levels = [
  { level: 1, title: 'Build your first portfolio', icon: Target },
  { level: 2, title: 'Reduce risk through diversification', icon: Shield },
  { level: 3, title: 'Protect your capital', icon: TrendingUp },
  { level: 4, title: 'Advanced strategies', icon: Sparkles },
  { level: 5, title: 'Master investor', icon: Award },
];

// Generate simulated performance data based on portfolio allocation
function generateSimulationData(portfolio: PortfolioAllocation) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const data = [];
  
  // Calculate portfolio risk based on allocation
  const riskScore = (portfolio.equity * 0.8) + (portfolio.tech * 1.2) + (portfolio.bonds * 0.3) + (portfolio.cash * 0.1);
  const volatility = riskScore / 100;
  
  let portfolioValue = 100000;
  
  for (let i = 0; i < months.length; i++) {
    // Simulate market movements
    const marketReturn = (Math.random() - 0.45) * 0.06 * (1 + volatility);
    
    portfolioValue += portfolioValue * marketReturn;
    
    data.push({
      month: months[i],
      value: Math.round(portfolioValue),
    });
  }
  
  return data;
}

export function Dashboard({ currentLevel, completedLevels, onStartLevel1, hasSimulated, portfolio, lastSimulationDate }: DashboardProps) {
  const performanceData = hasSimulated ? generateSimulationData(portfolio) : [];
  
  // Format the timestamp
  const getSimulationTimestamp = () => {
    if (!lastSimulationDate) return '';
    
    const today = new Date();
    const isToday = lastSimulationDate.toDateString() === today.toDateString();
    
    return isToday ? 'Today' : lastSimulationDate.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50">
      <ProgressHeader currentLevel={currentLevel} />
      
      <main className="max-w-7xl mx-auto px-12 py-12">
        {/* Hero section */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <h2 className="text-4xl text-zinc-900">
              Learn to invest by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">playing</span>
            </h2>
          </div>
          <p className="text-lg text-zinc-600 max-w-2xl">
            Build and manage a virtual portfolio step by step. No real money. No risk.
          </p>
        </div>

        {/* Virtual Portfolio Card */}
        <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl p-8 mb-8 max-w-2xl shadow-lg shadow-purple-200">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Wallet className="w-5 h-5 text-purple-100" />
                <h3 className="text-sm text-purple-100">Virtual Portfolio (Simulated)</h3>
              </div>
              <div className="text-5xl text-white font-light">$100,000</div>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <p className="text-sm text-white/90">
              This is simulated money. You can experiment freely without risk.
            </p>
          </div>
        </div>

        {/* Portfolio Performance Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/80 p-8 mb-12 max-w-2xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-teal-600" />
              <h3 className="text-base text-zinc-900">Portfolio Performance</h3>
            </div>
            {hasSimulated && lastSimulationDate && (
              <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                <span>Last simulation</span>
                <span>·</span>
                <span>{getSimulationTimestamp()}</span>
              </div>
            )}
          </div>
          
          {!hasSimulated ? (
            // Locked state - before first simulation
            <div className="relative h-64 bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl flex items-center justify-center border border-teal-100">
              <div className="text-center max-w-md px-6">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-teal-600" />
                </div>
                <p className="text-sm text-zinc-700 leading-relaxed mb-2">
                  Your portfolio performance will appear here after your first simulation.
                </p>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  No performance exists yet because no portfolio has been simulated.
                </p>
              </div>
            </div>
          ) : (
            // Unlocked state - after first simulation
            <>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 rounded-xl p-4 mb-6">
                <div className="flex gap-3 items-start">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-zinc-700 leading-relaxed mb-2">
                      This chart shows how your simulated portfolio has behaved over time, based on your own allocation choices.
                    </p>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      This performance updates every time you simulate a new portfolio.
                    </p>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      Last simulation: {getSimulationTimestamp()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
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
                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#14b8a6" 
                      strokeWidth={3}
                      fill="url(#colorValue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
                
                {/* Personalized indicator */}
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100 rounded-lg">
                    <div className="w-2 h-2 bg-teal-500 rounded-full" />
                    <span className="text-xs text-zinc-700 font-medium">Your Simulated Portfolio</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Learning Path Section */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl text-zinc-900">Learning Path</h3>
          </div>
          <div className="space-y-3 max-w-2xl">
            {levels.map((item) => {
              const IconComponent = item.icon;
              const isCompleted = completedLevels.includes(item.level);
              const isCurrent = item.level === currentLevel && !isCompleted;
              const isUnlocked = item.level === currentLevel || isCompleted;
              const isLocked = item.level > currentLevel;
              
              return (
                <div
                  key={item.level}
                  className={`
                    rounded-xl border p-6 flex items-center justify-between transition-all
                    ${isCurrent
                      ? 'bg-gradient-to-r from-purple-500 to-blue-600 border-purple-400 shadow-lg shadow-purple-200/50' 
                      : isCompleted
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-400 shadow-lg shadow-green-200/50'
                        : 'bg-white/40 backdrop-blur-sm border-white/60'
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className={`
                        w-12 h-12 rounded-xl flex items-center justify-center text-sm
                        ${isCurrent || isCompleted
                          ? 'bg-white/20 text-white backdrop-blur-sm' 
                          : 'bg-zinc-100 text-zinc-400'
                        }
                      `}
                    >
                      {isCompleted ? (
                        <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      ) : (
                        <IconComponent className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <h4 className={`text-base ${isCurrent || isCompleted ? 'text-white' : 'text-zinc-900'}`}>
                        {item.title}
                      </h4>
                      {isCompleted && (
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-sm text-white/90">Completed</span>
                        </div>
                      )}
                      {isCurrent && (
                        <div className="flex items-center gap-1.5 mt-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-sm text-purple-100">Start your journey here</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {isLocked && (
                    <Lock className="w-5 h-5 text-zinc-400" />
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <button
            onClick={onStartLevel1}
            className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-5 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg shadow-green-200/50 hover:shadow-xl hover:shadow-green-300/50 flex items-center gap-3 text-base font-medium"
          >
            <Sparkles className="w-5 h-5" />
            {completedLevels.includes(1) ? `Start Level ${currentLevel}` : 'Start Level 1'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
}