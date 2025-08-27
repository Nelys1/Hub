import React, { useState, useEffect } from "react";

interface HabitData {
  count: number;
  goal: number;
  streak: number;
  lastUpdated: Date;
}
export function Counter() {
  //   const [count, setCount] = useState<number>(0);
  const [habit, setHabit] = useState<HabitData>({
    count: 0,
    goal: 100,
    streak: 0,
    lastUpdated: new Date(),
  });

  const [showGoalEdit, setShowGoalEdit] = useState(false);
  const [newGoal, setNewGoal] = useState(habit.goal);

  const progress = Math.min((habit.count / habit.goal) * 100, 100);
  
  const increment = () => {
    setHabit(prev => ({
      ...prev,
      count: prev.count + 1,
      streak: prev.count + 1 > prev.count ? prev.streak + 1 : prev.streak,
      lastUpdated: new Date()
    }));
  };

  const decrement = () => {
    setHabit(prev => ({
      ...prev,
      count: Math.max(0, prev.count - 1),
      lastUpdated: new Date()
    }));
  };

  const reset = () => {
    setHabit(prev => ({
      ...prev,
      count: 0,
      streak: 0,
      lastUpdated: new Date()
    }));
  };

  const updateGoal = () => {
    setHabit(prev => ({
      ...prev,
      goal: newGoal
    }));
    setShowGoalEdit(false);
  };

  return (
    // <div>
    //   <p data-testid="count">Count: {count}</p>
    //   <button onClick={() => setCount((c) => c - 1)}>-</button>
    //   <button onClick={() => setCount((c) => c + 1)}>+</button>
    //   <button onClick={() => setCount(0)}>Reset</button>
    // </div>
    <div className="bg-gradient-glass backdrop-blur-xl border border-border rounded-2xl p-8 shadow-card transition-all duration-500 ease-spring">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Habit Tracker
        </h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
          Streak: {habit.streak} days
        </div>
      </div>

      {/* Progress Ring */}
      <div className="relative w-32 h-32 mx-auto mb-8">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            stroke="hsl(var(--border))"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            stroke="url(#progressGradient)"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={`${(progress / 100) * 339.292} 339.292`}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-smooth"
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-foreground" data-testid="count">
            {habit.count}
          </span>
          <span className="text-sm text-muted-foreground">
            / {habit.goal}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Progress</span>
          <span>{progress.toFixed(1)}%</span>
        </div>
        <div className="h-3 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-primary transition-all duration-1000 ease-smooth rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Goal Setting */}
      <div className="mb-6">
        {showGoalEdit ? (
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={newGoal}
              onChange={(e) => setNewGoal(Number(e.target.value))}
              className="flex-1 bg-secondary border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              min="1"
            />
            <button
              onClick={updateGoal}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg transition-all duration-300"
            >
              Save
            </button>
            <button
              onClick={() => setShowGoalEdit(false)}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-muted transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowGoalEdit(true)}
            className="w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Goal: {habit.goal} (click to edit)
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={decrement}
          disabled={habit.count === 0}
          className="flex-1 bg-secondary hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed text-secondary-foreground font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
        >
          −
        </button>
        <button
          onClick={increment}
          className="flex-1 bg-gradient-primary text-primary-foreground font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
        >
          +
        </button>
        <button
          onClick={reset}
          className="flex-1 bg-destructive/10 hover:bg-destructive/20 text-destructive font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Reset
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-success">{habit.streak}</div>
          <div className="text-sm text-muted-foreground">Day Streak</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-info">{progress.toFixed(0)}%</div>
          <div className="text-sm text-muted-foreground">Complete</div>
        </div>
      </div>
    </div>
  );
}
