import React, { useState } from "react";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: 'work' | 'personal' | 'health' | 'learning';
  createdAt: Date;
}

const priorityColors = {
  low: 'bg-info/20 text-info border-info/30',
  medium: 'bg-warning/20 text-warning border-warning/30',
  high: 'bg-destructive/20 text-destructive border-destructive/30'
};

const categoryColors = {
  work: 'bg-primary/20 text-primary',
  personal: 'bg-accent/20 text-accent',
  health: 'bg-success/20 text-success',
  learning: 'bg-info/20 text-info'
};
export default function TodoList() {
   const [tasks, setTasks] = useState<Task[]>([
    { 
      id: 1, 
      title: "Complete project proposal", 
      completed: false,
      priority: 'high',
      category: 'work',
      createdAt: new Date()
    },
    { 
      id: 2, 
      title: "Morning workout session", 
      completed: true,
      priority: 'medium',
      category: 'health',
      createdAt: new Date()
    },
    { 
      id: 3, 
      title: "Read React documentation", 
      completed: false,
      priority: 'low',
      category: 'learning',
      createdAt: new Date()
    },
  ]);

  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState<Task['priority']>('medium');
  const [newCategory, setNewCategory] = useState<Task['category']>('work');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks(prev => [...prev, {
        id: Date.now(),
        title: newTask.trim(),
        completed: false,
        priority: newPriority,
        category: newCategory,
        createdAt: new Date()
      }]);
      setNewTask("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;


  return (
     <div className="bg-gradient-glass backdrop-blur-xl border border-border rounded-2xl p-8 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Task Manager
        </h2>
        <div className="text-sm text-muted-foreground">
          {completedCount}/{totalCount} completed
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Overall Progress</span>
          <span>{progressPercentage.toFixed(0)}%</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-success transition-all duration-500 ease-smooth"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Add Task Form */}
      <div className="mb-6 p-4 bg-secondary/50 rounded-xl border border-border">
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            placeholder="Add a new task..."
            className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          />
          <button
            onClick={addTask}
            className="px-6 py-2 bg-gradient-primary text-primary-foreground rounded-lg hover:shadow-glow transition-all duration-300 font-semibold"
          >
            Add
          </button>
        </div>
        
        <div className="flex gap-2">
          <select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value as Task['priority'])}
            className="bg-background border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value as Task['category'])}
            className="bg-background border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="health">Health</option>
            <option value="learning">Learning</option>
          </select>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6">
        {(['all', 'active', 'completed'] as const).map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 capitalize ${
              filter === filterType
                ? 'bg-primary text-primary-foreground shadow-glow'
                : 'bg-secondary text-secondary-foreground hover:bg-muted'
            }`}
          >
            {filterType}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No tasks found. Add some tasks to get started!
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`group p-4 rounded-xl border transition-all duration-300 hover:shadow-button ${
                task.completed 
                  ? 'bg-success/5 border-success/20' 
                  : 'bg-background/50 border-border hover:border-primary/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    task.completed
                      ? 'bg-success border-success text-white'
                      : 'border-border hover:border-primary'
                  }`}
                  aria-label={`toggle-${task.id}`}
                >
                  {task.completed && <span className="text-xs">✓</span>}
                </button>
                
                <div className="flex-1">
                  <div className={`font-medium transition-all duration-300 ${
                    task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                  }`}>
                    {task.title}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full border ${priorityColors[task.priority]}`}>
                      {task.priority}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${categoryColors[task.category]}`}>
                      {task.category}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-300"
                >
                  <span className="text-sm">×</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
