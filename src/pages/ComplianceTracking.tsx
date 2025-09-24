import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopAppBar, FilterButton, ExportButton } from "@/components/ui/navigation";
import { DashboardWidget, MetricCard } from "@/components/DashboardWidget";
import { 
  Calendar,
  TrendingUp,
  TrendingDown,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ComplianceTracking() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  // Mock compliance data
  const overallCompliance = 85;
  const complianceTrend = 5; // +5%
  const patientsNeedingAttention = [
    { name: "Suresh Gupta", compliance: 65, issue: "Missed meals", severity: "high" },
    { name: "Ravi Kumar", compliance: 72, issue: "Diet deviations", severity: "medium" },
    { name: "Meera Singh", compliance: 78, issue: "Late reports", severity: "low" }
  ];

  const complianceCalendar = [
    { date: "2024-01-15", compliance: 95, patients: 12 },
    { date: "2024-01-14", compliance: 88, patients: 11 },
    { date: "2024-01-13", compliance: 92, patients: 10 },
    { date: "2024-01-12", compliance: 85, patients: 12 },
    { date: "2024-01-11", compliance: 78, patients: 9 },
    { date: "2024-01-10", compliance: 90, patients: 11 },
    { date: "2024-01-09", compliance: 87, patients: 10 }
  ];

  const allPatientsCompliance = [
    { name: "Priya Sharma", compliance: 92, trend: "up", dosha: "Pitta" },
    { name: "Anjali Patel", compliance: 88, trend: "up", dosha: "Kapha" },
    { name: "Meera Singh", compliance: 78, trend: "down", dosha: "Vata" },
    { name: "Ravi Kumar", compliance: 72, trend: "stable", dosha: "Vata" },
    { name: "Suresh Gupta", compliance: 65, trend: "down", dosha: "Pitta" }
  ];

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 85) return "text-green-600";
    if (compliance >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getComplianceBgColor = (compliance: number) => {
    if (compliance >= 85) return "bg-green-100 border-green-200";
    if (compliance >= 70) return "bg-yellow-100 border-yellow-200";
    return "bg-red-100 border-red-200";
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return "text-red-600 bg-red-100";
      case 'medium': return "text-yellow-600 bg-yellow-100";
      case 'low': return "text-blue-600 bg-blue-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopAppBar 
        title="Compliance"
        showBack
        onBack={() => navigate('/')}
        rightAction={
          <div className="flex gap-2">
            <FilterButton />
            <ExportButton />
          </div>
        }
      />

      {/* Month/Week Toggle */}
      <div className="p-4 bg-card border-b border-border">
        <div className="flex justify-center">
          <div className="bg-muted rounded-lg p-1 flex">
            <button
              onClick={() => setViewMode('month')}
              className={cn(
                "px-6 py-2 rounded-md font-poppins font-medium transition-all duration-200",
                viewMode === 'month'
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={cn(
                "px-6 py-2 rounded-md font-poppins font-medium transition-all duration-200",
                viewMode === 'week'
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Week
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Overall Compliance Summary */}
        <div className="bg-gradient-wellness rounded-xl p-6 border border-border/30">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-playfair font-bold text-foreground mb-2">
              {overallCompliance}%
            </h2>
            <p className="text-muted-foreground font-poppins">Overall Compliance</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-green-600 font-poppins font-medium">
                +{complianceTrend}% this month
              </span>
            </div>
          </div>

          <div className="w-full bg-muted rounded-full h-4 mb-4">
            <div 
              className="bg-gradient-primary h-4 rounded-full transition-all duration-500"
              style={{ width: `${overallCompliance}%` }}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <MetricCard
              label="Excellent"
              value="8"
              icon={<CheckCircle className="h-4 w-4" />}
              className="bg-green-50 border-green-200"
            />
            <MetricCard
              label="Good"
              value="4"
              icon={<Activity className="h-4 w-4" />}
              className="bg-yellow-50 border-yellow-200"
            />
            <MetricCard
              label="Needs Attention"
              value="3"
              icon={<XCircle className="h-4 w-4" />}
              className="bg-red-50 border-red-200"
            />
          </div>
        </div>

        {/* Compliance Calendar */}
        <DashboardWidget title="Compliance Calendar">
          <div className="space-y-3">
            {complianceCalendar.map((day, index) => (
              <div key={index} className={cn(
                "flex items-center justify-between p-4 rounded-lg border",
                getComplianceBgColor(day.compliance)
              )}>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-poppins font-medium text-foreground">
                      {new Date(day.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="text-sm text-muted-foreground font-poppins">
                      {day.patients} patients
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={cn(
                    "text-xl font-playfair font-bold",
                    getComplianceColor(day.compliance)
                  )}>
                    {day.compliance}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DashboardWidget>

        {/* Patients Needing Attention */}
        <DashboardWidget title="Patients Needing Attention">
          <div className="space-y-3">
            {patientsNeedingAttention.map((patient, index) => (
              <button
                key={index}
                onClick={() => navigate(`/patients/${index + 1}/compliance`)}
                className="w-full bg-card border border-border rounded-lg p-4 hover:shadow-wellness transition-all duration-200 text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-poppins font-semibold text-foreground">
                        {patient.name}
                      </p>
                      <p className="text-sm text-muted-foreground font-poppins">
                        {patient.issue}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-poppins font-medium",
                      getSeverityColor(patient.severity)
                    )}>
                      {patient.severity}
                    </span>
                    <span className={cn(
                      "font-poppins font-semibold",
                      getComplianceColor(patient.compliance)
                    )}>
                      {patient.compliance}%
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </DashboardWidget>

        {/* All Patients Compliance */}
        <DashboardWidget title="All Patients Compliance">
          <div className="space-y-3">
            {allPatientsCompliance.map((patient, index) => (
              <button
                key={index}
                onClick={() => navigate(`/patients/${index + 1}/compliance`)}
                className="w-full bg-gradient-wellness border border-border/30 rounded-lg p-4 hover:shadow-wellness transition-all duration-200 text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-poppins font-semibold text-foreground">
                        {patient.name}
                      </p>
                      <p className="text-sm text-muted-foreground font-poppins">
                        {patient.dosha} dominant
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {getTrendIcon(patient.trend)}
                    <span className={cn(
                      "text-lg font-playfair font-bold",
                      getComplianceColor(patient.compliance)
                    )}>
                      {patient.compliance}%
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </DashboardWidget>
      </div>
    </div>
  );
}