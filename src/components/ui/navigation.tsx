import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  User, 
  Calendar,
  ChartBar,
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Download
} from "lucide-react";

interface TabBarProps {
  className?: string;
}

export function TabBar({ className }: TabBarProps) {
  const location = useLocation();

  const tabs = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Users, label: "Patients", path: "/patients" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-card border-t border-border px-6 py-2 safe-area-pb z-50",
      className
    )}>
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center py-2 px-3 rounded-lg transition-colors",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-6 w-6 mb-1" />
              <span className="text-xs font-poppins font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

interface TopAppBarProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  className?: string;
}

export function TopAppBar({ title, showBack, onBack, rightAction, className }: TopAppBarProps) {
  return (
    <div className={cn(
      "bg-primary text-primary-foreground px-4 py-4 flex items-center justify-between shadow-wellness",
      className
    )}>
      <div className="flex items-center gap-3">
        {showBack && (
          <button 
            onClick={onBack}
            className="p-2 hover:bg-primary/80 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
        )}
        <h1 className="text-xl font-playfair font-bold">{title}</h1>
      </div>
      {rightAction && (
        <div className="flex items-center gap-2">
          {rightAction}
        </div>
      )}
    </div>
  );
}

interface ActionButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ActionButton({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  onClick, 
  className 
}: ActionButtonProps) {
  const variants = {
    primary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    secondary: "bg-card text-card-foreground border border-border hover:bg-muted",
    ghost: "text-primary-foreground hover:bg-primary/80"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "font-poppins font-semibold rounded-lg transition-all duration-200 flex items-center gap-2",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </button>
  );
}

// Common action buttons for reuse
export const AddPatientButton = ({ onClick }: { onClick?: () => void }) => (
  <ActionButton variant="ghost" size="sm" onClick={onClick}>
    <Plus className="h-5 w-5" />
  </ActionButton>
);

export const SearchButton = ({ onClick }: { onClick?: () => void }) => (
  <ActionButton variant="ghost" size="sm" onClick={onClick}>
    <Search className="h-5 w-5" />
  </ActionButton>
);

export const FilterButton = ({ onClick }: { onClick?: () => void }) => (
  <ActionButton variant="ghost" size="sm" onClick={onClick}>
    <Filter className="h-5 w-5" />
  </ActionButton>
);

export const ExportButton = ({ onClick }: { onClick?: () => void }) => (
  <ActionButton variant="ghost" size="sm" onClick={onClick}>
    <Download className="h-5 w-5" />
  </ActionButton>
);