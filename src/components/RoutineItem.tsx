import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoutineItemProps {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  onToggle: (id: string) => void;
  delay?: number;
}

const RoutineItem = ({ id, title, description, completed, onToggle, delay = 0 }: RoutineItemProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onToggle(id);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "group flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300",
        "hover:bg-secondary/50 active:scale-[0.98]",
        "animate-fade-in-up opacity-0",
        completed && "opacity-75"
      )}
      style={{ animationDelay: `${delay * 0.05}s` }}
    >
      {/* Custom Checkbox */}
      <div
        className={cn(
          "relative w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300",
          completed
            ? "bg-primary border-primary"
            : "border-muted-foreground/30 group-hover:border-primary/50",
          isAnimating && "animate-check"
        )}
      >
        <Check
          className={cn(
            "w-3.5 h-3.5 text-primary-foreground transition-all duration-200",
            completed ? "opacity-100 scale-100" : "opacity-0 scale-50"
          )}
          strokeWidth={3}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3
          className={cn(
            "font-medium text-foreground transition-all duration-300",
            completed && "line-through text-muted-foreground"
          )}
        >
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-0.5 truncate">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default RoutineItem;
