import React, { useState, useEffect } from "react";

type GreetingProps = {
  name: string;
};

export function Greeting({ name }: GreetingProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");

   useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 17) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, [currentTime]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return(
     <div className="relative overflow-hidden bg-gradient-glass rounded-3xl p-8 md:p-12 shadow-glow">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-pulse transition-all duration-1000 ease-in-out"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-6 md:mb-0">
            <p className="text-primary-foreground/80 text-lg md:text-xl mb-2 font-medium">
              {greeting},
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
              {name}!
            </h1>
            <p className="text-primary-foreground/90 text-lg max-w-md leading-relaxed">
              Welcome to your multifaceted hub. Ready to make today amazing?
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end space-y-4">
            {/* Live Clock */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-right">
                <div className="text-2xl md:text-3xl font-bold text-primary-foreground font-mono tracking-wide">
                  {formatTime(currentTime)}
                </div>
                <div className="text-primary-foreground/80 text-sm mt-1">
                  {formatDate(currentTime)}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center min-w-[80px]">
                <div className="text-2xl font-bold text-primary-foreground">12</div>
                <div className="text-xs text-primary-foreground/80">Tasks</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center min-w-[80px]">
                <div className="text-2xl font-bold text-primary-foreground">7</div>
                <div className="text-xs text-primary-foreground/80">Days</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center min-w-[80px]">
                <div className="text-2xl font-bold text-primary-foreground">85%</div>
                <div className="text-xs text-primary-foreground/80">Done</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-white/10 rounded-full blur-xl" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
    </div>
  );
}
