import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  User, 
  Calendar,
  ChartBar,
  Menu,
  X,
  Moon,
  Sun,
  Bell,
  Settings,
  LogOut,
  Activity,
  Utensils,
  Bot,
  UtensilsCrossed
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

interface WebsiteLayoutProps {
  children: ReactNode;
}

export function WebsiteLayout({ children }: WebsiteLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('ayur-token');
    localStorage.removeItem('ayur-user');
    navigate('/login');
  };

  const navigation = [
    { 
      name: "Dashboard", 
      href: "/", 
      icon: LayoutDashboard,
      current: location.pathname === "/"
    },
    { 
      name: "Patients", 
      href: "/patients", 
      icon: Users,
      current: location.pathname === "/patients" || location.pathname.startsWith("/patients/")
    },
    { 
      name: "Dosha Assessment", 
      href: "/assessment", 
      icon: Activity,
      current: location.pathname.startsWith("/assessment")
    },
    { 
      name: "Food Library", 
      href: "/food-library", 
      icon: UtensilsCrossed,
      current: location.pathname.startsWith("/food-library")
    },
    { 
      name: "Compliance", 
      href: "/compliance", 
      icon: ChartBar,
      current: location.pathname === "/compliance"
    },
    { 
      name: "AyurBot", 
      href: "/ayurbot", 
      icon: Bot,
      current: location.pathname === "/compliance"
    },
    { 
      name: "Profile", 
      href: "/profile", 
      icon: User,
      current: location.pathname === "/profile"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
        </div>
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Logo and close button */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-playfair font-bold text-lg text-foreground">
                  Vitarva
                </h2>
                <p className="text-xs text-muted-foreground">Practice Management</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm font-poppins font-medium rounded-lg transition-all duration-200",
                    item.current
                      ? "bg-gradient-primary text-primary-foreground shadow-wellness"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-poppins font-medium text-foreground">Dr. Sneha</p>
                <p className="text-xs text-muted-foreground">Ayurvedic Physician</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-72">
        {/* Top header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-playfair font-bold text-xl text-foreground">
                  {navigation.find(item => item.current)?.name || "Dashboard"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Welcome to your Ayurvedic practice management platform
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}