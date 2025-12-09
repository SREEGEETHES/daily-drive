import { Sun, Sunset, Moon, LucideIcon } from "lucide-react";
import RoutineItem from "./RoutineItem";
import { cn } from "@/lib/utils";

export interface Routine {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

interface RoutineSectionProps {
  title: string;
  icon: "morning" | "afternoon" | "evening";
  routines: Routine[];
  onToggle: (id: string) => void;
  baseDelay?: number;
}

const iconMap: Record<string, LucideIcon> = {
  morning: Sun,
  afternoon: Sunset,
  evening: Moon,
};

const colorMap: Record<string, string> = {
  morning: "text-accent",
  afternoon: "text-primary",
  evening: "text-muted-foreground",
};

const RoutineSection = ({ title, icon, routines, onToggle, baseDelay = 0 }: RoutineSectionProps) => {
  const Icon = iconMap[icon];
  const completedCount = routines.filter((r) => r.completed).length;

  return (
    <div className="animate-fade-in-up opacity-0" style={{ animationDelay: `${baseDelay * 0.1}s` }}>
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-3 px-2">
        <Icon className={cn("w-5 h-5", colorMap[icon])} />
        <h2 className="font-display font-medium text-foreground">{title}</h2>
        <span className="text-sm text-muted-foreground ml-auto">
          {completedCount}/{routines.length}
        </span>
      </div>

      {/* Routines Card */}
      <div className="bg-card rounded-2xl shadow-soft border border-border/50 overflow-hidden">
        <div className="divide-y divide-border/50">
          {routines.map((routine, index) => (
            <RoutineItem
              key={routine.id}
              {...routine}
              onToggle={onToggle}
              delay={baseDelay + index + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoutineSection;
