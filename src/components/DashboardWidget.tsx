import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface DashboardWidgetProps {
  title: string;
  children: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function DashboardWidget({ title, children, action, className }: DashboardWidgetProps) {
  return (
    <div className={cn(
      "bg-card rounded-xl p-6 shadow-wellness border border-border/50",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-playfair font-semibold text-foreground">
          {title}
        </h3>
        {action && (
          <button
            onClick={action.onClick}
            className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors font-poppins text-sm font-medium"
          >
            {action.label}
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="font-poppins">
        {children}
      </div>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon?: ReactNode;
  className?: string;
}

export function MetricCard({ label, value, trend, icon, className }: MetricCardProps) {
  return (
    <div className={cn(
      "bg-gradient-wellness rounded-lg p-4 border border-border/30",
      className
    )}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-muted-foreground text-sm font-poppins">{label}</span>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-playfair font-bold text-foreground">
          {value}
        </span>
        {trend && (
          <span className={cn(
            "text-xs font-poppins font-medium",
            trend.isPositive ? "text-green-600" : "text-red-600"
          )}>
            {trend.value}
          </span>
        )}
      </div>
    </div>
  );
}

interface QuickActionProps {
  icon: ReactNode;
  label: string;
  description?: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function QuickAction({ icon, label, description, onClick, variant = 'primary' }: QuickActionProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-4 rounded-xl border transition-all duration-200 text-left",
        variant === 'primary' 
          ? "bg-gradient-primary text-primary-foreground border-primary/20 hover:shadow-elevated hover:scale-[1.02]"
          : "bg-card text-card-foreground border-border hover:bg-muted hover:shadow-wellness"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "p-2 rounded-lg",
          variant === 'primary' ? "bg-primary-foreground/20" : "bg-primary/10"
        )}>
          <div className={cn(
            variant === 'primary' ? "text-primary-foreground" : "text-primary"
          )}>
            {icon}
          </div>
        </div>
        <div>
          <h4 className="font-poppins font-semibold">{label}</h4>
          {description && (
            <p className={cn(
              "text-sm font-poppins mt-1",
              variant === 'primary' ? "text-primary-foreground/80" : "text-muted-foreground"
            )}>
              {description}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}