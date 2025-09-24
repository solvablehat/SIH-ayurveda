import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { patientService } from "@/services/patientService";
import { DashboardWidget, MetricCard, QuickAction } from "@/components/DashboardWidget";
import { 
  ComplianceChart, 
  PatientGrowthChart, 
  DoshaDistributionChart,
  TreatmentEffectivenessChart 
} from "@/components/ui/charts";
import { 
  Calendar, 
  TrendingUp, 
  UserPlus, 
  ClipboardList,
  Activity,
  Clock,
  Users,
  CheckCircle,
  ArrowUpRight,
  Target
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  
  // State for real data
  const [dashboardData, setDashboardData] = useState({
    patients: [],
    totalPatients: 0,
    todayAppointments: 0,
    complianceMetrics: {
      overall: 0,
      trend: "+0%",
      needingAttention: 0
    },
    doshaDistribution: [],
    recentPatients: [],
    loading: true
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch all patients
      const patients = await patientService.getAllPatients();
      
      // Calculate dosha distribution
      const doshaStats = calculateDoshaDistribution(patients);
      
      // Calculate compliance metrics
      const compliance = calculateComplianceMetrics(patients);
      
      // Get today's appointments (mock for now - you can replace with real API)
      const todayAppointments = patients.filter(p => p.nextAppointment && 
        new Date(p.nextAppointment).toDateString() === new Date().toDateString()
      ).length;

      setDashboardData({
        patients,
        totalPatients: patients.length,
        todayAppointments,
        complianceMetrics: compliance,
        doshaDistribution: doshaStats,
        recentPatients: patients.slice(-3).reverse(), // Last 3 patients as upcoming appointments
        loading: false
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setDashboardData(prev => ({ ...prev, loading: false }));
    }
  };

  const calculateDoshaDistribution = (patients) => {
    const doshaCount = { vata: 0, pitta: 0, kapha: 0 };
    let totalWithDosha = 0;

    patients.forEach(patient => {
      if (patient.dosha) {
        totalWithDosha++;
        const { vata, pitta, kapha } = patient.dosha;
        if (vata >= pitta && vata >= kapha) doshaCount.vata++;
        else if (pitta >= kapha) doshaCount.pitta++;
        else doshaCount.kapha++;
      }
    });

    if (totalWithDosha === 0) return [];

    return [
      { name: 'Vata', value: Math.round((doshaCount.vata / totalWithDosha) * 100), color: 'hsl(var(--primary))' },
      { name: 'Pitta', value: Math.round((doshaCount.pitta / totalWithDosha) * 100), color: 'hsl(var(--secondary))' },
      { name: 'Kapha', value: Math.round((doshaCount.kapha / totalWithDosha) * 100), color: 'hsl(var(--accent))' },
    ];
  };

  const calculateComplianceMetrics = (patients) => {
    const patientsWithCompliance = patients.filter(p => p.compliance !== undefined);
    if (patientsWithCompliance.length === 0) {
      return { overall: 0, trend: "+0%", needingAttention: 0 };
    }

    const totalCompliance = patientsWithCompliance.reduce((sum, p) => sum + p.compliance, 0);
    const averageCompliance = Math.round(totalCompliance / patientsWithCompliance.length);
    const needingAttention = patientsWithCompliance.filter(p => p.compliance < 70).length;

    return {
      overall: averageCompliance,
      trend: "+5%", // This would come from historical data
      needingAttention
    };
  };

  // Chart data
  const complianceData = [
    { month: 'Jan', compliance: 78, target: 80 },
    { month: 'Feb', compliance: 82, target: 80 },
    { month: 'Mar', compliance: 85, target: 85 },
    { month: 'Apr', compliance: 88, target: 85 },
    { month: 'May', compliance: 85, target: 85 },
    { month: 'Jun', compliance: 92, target: 90 },
  ];

  const patientGrowthData = [
    { month: 'Jan', newPatients: 12, totalPatients: 148 },
    { month: 'Feb', newPatients: 15, totalPatients: 163 },
    { month: 'Mar', newPatients: 18, totalPatients: 181 },
    { month: 'Apr', newPatients: 22, totalPatients: 203 },
    { month: 'May', newPatients: 19, totalPatients: 222 },
    { month: 'Jun', newPatients: 25, totalPatients: 247 },
  ];

  const doshaData = [
    { name: 'Vata', value: 45, color: 'hsl(var(--primary))' },
    { name: 'Pitta', value: 32, color: 'hsl(var(--secondary))' },
    { name: 'Kapha', value: 23, color: 'hsl(var(--accent))' },
  ];

  const treatmentData = [
    { treatment: 'Panchakarma', effectiveness: 92, satisfaction: 88 },
    { treatment: 'Herbal Medicine', effectiveness: 85, satisfaction: 90 },
    { treatment: 'Yoga Therapy', effectiveness: 78, satisfaction: 95 },
    { treatment: 'Diet Planning', effectiveness: 88, satisfaction: 85 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-primary rounded-xl p-8 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-playfair font-bold mb-2">
              Welcome back, Dr. Sneha
            </h2>
            <p className="font-poppins text-primary-foreground/90 text-lg">
              Your practice overview for today
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-primary-foreground/20 rounded-lg p-4">
              <Calendar className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="Today's Appointments"
          value={dashboardData.loading ? "..." : dashboardData.todayAppointments}
          icon={<Calendar className="h-5 w-5" />}
        />
        <MetricCard
          label="Total Patients"
          value={dashboardData.loading ? "..." : dashboardData.totalPatients}
          trend={{ value: "+25 this month", isPositive: true }}
          icon={<Users className="h-5 w-5" />}
        />
        <MetricCard
          label="Overall Compliance"
          value={dashboardData.loading ? "..." : `${dashboardData.complianceMetrics.overall}%`}
          trend={{ value: dashboardData.complianceMetrics.trend, isPositive: true }}
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <MetricCard
          label="Treatment Success"
          value="92%"
          trend={{ value: "+3%", isPositive: true }}
          icon={<Target className="h-5 w-5" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ComplianceChart data={complianceData} />
        <PatientGrowthChart data={patientGrowthData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DoshaDistributionChart data={dashboardData.loading ? [] : dashboardData.doshaDistribution} />
        <TreatmentEffectivenessChart data={treatmentData} />
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Patients Widget */}
        <DashboardWidget
          title="Recent Patients"
          action={{
            label: "View All",
            onClick: () => navigate('/patients')
          }}
        >
          <div className="space-y-3">
            {dashboardData.loading ? (
              <div className="text-center text-muted-foreground">Loading...</div>
            ) : dashboardData.recentPatients.length === 0 ? (
              <div className="text-center text-muted-foreground">No patients found</div>
            ) : (
              dashboardData.recentPatients.map((patient, index) => (
                <div key={patient._id || index} className="flex items-center justify-between p-3 bg-gradient-wellness rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">{patient.age} years, {patient.gender}</p>
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    <Activity className="h-4 w-4" />
                    <span className="font-medium">
                      {patient.dosha ? 'Has Dosha' : 'Pending Assessment'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </DashboardWidget>

        {/* Patient Compliance Overview */}
        <DashboardWidget
          title="Patient Compliance Overview"
          action={{
            label: "View Details",
            onClick: () => navigate('/compliance')
          }}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-foreground">Overall Compliance</span>
              <span className="text-2xl font-playfair font-bold text-primary">
                {dashboardData.loading ? "..." : `${dashboardData.complianceMetrics.overall}%`}
              </span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="bg-gradient-primary h-3 rounded-full transition-all duration-300"
                style={{ width: `${dashboardData.complianceMetrics.overall}%` }}
              />
            </div>

            <div className="flex items-center gap-2 text-amber-600">
              <Activity className="h-4 w-4" />
              <span className="text-sm font-poppins">
                {dashboardData.loading ? "..." : `${dashboardData.complianceMetrics.needingAttention} patients need attention`}
              </span>
            </div>
          </div>
        </DashboardWidget>

        {/* Quick Actions */}
        <DashboardWidget title="Quick Actions">
          <div className="space-y-3">
            <QuickAction
              icon={<UserPlus className="h-5 w-5" />}
              label="Add New Patient"
              description="Create a new patient profile"
              onClick={() => navigate('/patients/new')}
              variant="primary"
            />
            
            <QuickAction
              icon={<Calendar className="h-5 w-5" />}
              label="Schedule Appointment"
              description="Book new appointment"
              onClick={() => navigate('/appointments/new')}
              variant="secondary"
            />
            
            <QuickAction
              icon={<ClipboardList className="h-5 w-5" />}
              label="Prakriti Assessment"
              description="Constitutional analysis"
              onClick={() => navigate('/assessment/new')}
              variant="secondary"
            />
          </div>
        </DashboardWidget>
      </div>
    </div>
  );
}