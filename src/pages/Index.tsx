import { useState, useMemo } from "react";
import { format } from "date-fns";
import { Sparkles } from "lucide-react";
import ProgressRing from "@/components/ProgressRing";
import RoutineSection, { Routine } from "@/components/RoutineSection";

interface RoutineData {
  morning: Routine[];
  afternoon: Routine[];
  evening: Routine[];
}

const initialRoutines: RoutineData = {
  morning: [
    { id: "m1", title: "Wake up early", description: "Before 7:00 AM", completed: false },
    { id: "m2", title: "Morning meditation", description: "10 minutes mindfulness", completed: false },
    { id: "m3", title: "Healthy breakfast", description: "Fuel your body right", completed: false },
    { id: "m4", title: "Exercise", description: "30 min workout or yoga", completed: false },
  ],
  afternoon: [
    { id: "a1", title: "Deep work session", description: "Focus on priorities", completed: false },
    { id: "a2", title: "Take a walk", description: "Fresh air break", completed: false },
    { id: "a3", title: "Drink water", description: "Stay hydrated", completed: false },
  ],
  evening: [
    { id: "e1", title: "Review the day", description: "Reflect on wins", completed: false },
    { id: "e2", title: "Prepare for tomorrow", description: "Plan ahead", completed: false },
    { id: "e3", title: "Screen-free time", description: "1 hour before bed", completed: false },
    { id: "e4", title: "Quality sleep", description: "8 hours rest", completed: false },
  ],
};

const Index = () => {
  const [routines, setRoutines] = useState<RoutineData>(initialRoutines);
  const today = new Date();

  const toggleRoutine = (id: string) => {
    setRoutines((prev) => {
      const newRoutines = { ...prev };
      for (const section of Object.keys(newRoutines) as (keyof RoutineData)[]) {
        newRoutines[section] = newRoutines[section].map((routine) =>
          routine.id === id ? { ...routine, completed: !routine.completed } : routine
        );
      }
      return newRoutines;
    });
  };

  const progress = useMemo(() => {
    const allRoutines = [...routines.morning, ...routines.afternoon, ...routines.evening];
    const completed = allRoutines.filter((r) => r.completed).length;
    return (completed / allRoutines.length) * 100;
  }, [routines]);

  const completedCount = useMemo(() => {
    const allRoutines = [...routines.morning, ...routines.afternoon, ...routines.evening];
    return allRoutines.filter((r) => r.completed).length;
  }, [routines]);

  const totalCount = useMemo(() => {
    return [...routines.morning, ...routines.afternoon, ...routines.evening].length;
  }, [routines]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 py-8 pb-24">
        {/* Header */}
        <header className="text-center mb-8 animate-fade-in-up">
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1">
            {format(today, "EEEE")}
          </p>
          <h1 className="font-display text-3xl font-semibold text-foreground">
            {format(today, "MMMM d, yyyy")}
          </h1>
        </header>

        {/* Progress Section */}
        <div className="flex flex-col items-center mb-10 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <ProgressRing progress={progress} size={140} strokeWidth={10} />
          <div className="mt-4 flex items-center gap-2 text-muted-foreground">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm">
              {completedCount === totalCount
                ? "Amazing! All routines complete!"
                : `${totalCount - completedCount} routines remaining`}
            </span>
          </div>
        </div>

        {/* Routine Sections */}
        <div className="space-y-8">
          <RoutineSection
            title="Morning Routine"
            icon="morning"
            routines={routines.morning}
            onToggle={toggleRoutine}
            baseDelay={2}
          />
          <RoutineSection
            title="Afternoon Routine"
            icon="afternoon"
            routines={routines.afternoon}
            onToggle={toggleRoutine}
            baseDelay={7}
          />
          <RoutineSection
            title="Evening Routine"
            icon="evening"
            routines={routines.evening}
            onToggle={toggleRoutine}
            baseDelay={11}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
