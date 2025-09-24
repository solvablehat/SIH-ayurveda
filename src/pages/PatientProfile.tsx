import { useNavigate, useParams } from "react-router-dom";
import { TopAppBar, TabBar } from "@/components/ui/navigation";
import { DashboardWidget } from "@/components/DashboardWidget";
import { 
  Edit,
  FileText,
  Shield,
  Activity,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  Clock,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function PatientProfile() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock patient data - in real app this would come from API
  const patient = {
    id: id || "1",
    name: "Priya Sharma",
    age: 34,
    gender: "Female",
    phone: "+91 98765 43210",
    email: "priya.sharma@email.com",
    address: "123 MG Road, Bangalore, Karnataka",
    dosha: "Pitta",
    prakriti: "Pitta-Vata",
    vikriti: "Pitta excess",
    lastVisit: "2024-01-15",
    nextAppointment: "2024-01-29",
    compliance: 92,
    dietPlans: [
      { name: "Summer Cooling Diet", date: "2024-01-10", status: "active" },
      { name: "Digestive Balance Plan", date: "2024-01-05", status: "completed" }
    ],
    assessments: [
      { type: "Prakriti Assessment", date: "2024-01-15", score: "Pitta dominant" },
      { type: "Vikriti Analysis", date: "2024-01-15", score: "Moderate imbalance" }
    ],
    medicalHistory: [
      "Gastritis (2023)",
      "Stress-related symptoms",
      "Seasonal allergies"
    ]
  };

  const getDoshaColor = (dosha: string) => {
    switch (dosha) {
      case 'Vata': return "bg-purple-100 text-purple-800 border-purple-200";
      case 'Pitta': return "bg-red-100 text-red-800 border-red-200";
      case 'Kapha': return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopAppBar 
        title={patient.name}
        showBack
        onBack={() => navigate('/patients')}
        rightAction={
          <button 
            onClick={() => navigate(`/patients/${id}/edit`)}
            className="p-2 hover:bg-primary/80 rounded-lg transition-colors"
          >
            <Edit className="h-5 w-5 text-primary-foreground" />
          </button>
        }
      />
      
      <div className="p-6 space-y-6">
        {/* Patient Overview */}
        <div className="bg-gradient-wellness rounded-xl p-6 border border-border/30">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-playfair font-bold text-foreground">
                  {patient.name}
                </h2>
                <p className="text-muted-foreground font-poppins">
                  {patient.age} years • {patient.gender}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center gap-1 mb-1">
                <Activity className="h-4 w-4 text-green-600" />
                <span className="font-poppins font-semibold text-green-600">
                  {patient.compliance}%
                </span>
              </div>
              <span className="text-xs text-muted-foreground font-poppins">
                compliance
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className={cn(
              "px-3 py-2 rounded-lg border text-center",
              getDoshaColor(patient.dosha)
            )}>
              <p className="text-sm font-poppins font-medium">Prakriti</p>
              <p className="font-playfair font-semibold">{patient.prakriti}</p>
            </div>
            <div className="px-3 py-2 rounded-lg border bg-orange-100 text-orange-800 border-orange-200 text-center">
              <p className="text-sm font-poppins font-medium">Vikriti</p>
              <p className="font-playfair font-semibold">{patient.vikriti}</p>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <DashboardWidget title="Basic Information">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <span className="font-poppins">{patient.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <span className="font-poppins">{patient.email}</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <span className="font-poppins">{patient.address}</span>
            </div>
          </div>
        </DashboardWidget>

        {/* Medical History */}
        <DashboardWidget title="Medical History">
          <div className="space-y-2">
            {patient.medicalHistory.map((condition, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="font-poppins text-foreground">{condition}</span>
              </div>
            ))}
          </div>
        </DashboardWidget>

        {/* Diet Plans */}
        <DashboardWidget title="Diet Plans">
          <div className="space-y-3">
            {patient.dietPlans.map((plan, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gradient-wellness rounded-lg">
                <div>
                  <p className="font-poppins font-semibold text-foreground">
                    {plan.name}
                  </p>
                  <p className="text-sm text-muted-foreground font-poppins">
                    Created: {new Date(plan.date).toLocaleDateString()}
                  </p>
                </div>
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-poppins font-medium",
                  plan.status === 'active' 
                    ? "bg-green-100 text-green-800" 
                    : "bg-gray-100 text-gray-800"
                )}>
                  {plan.status}
                </span>
              </div>
            ))}
          </div>
        </DashboardWidget>

        {/* Assessments */}
        <DashboardWidget title="Assessments">
          <div className="space-y-3">
            {patient.assessments.map((assessment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gradient-wellness rounded-lg">
                <div>
                  <p className="font-poppins font-semibold text-foreground">
                    {assessment.type}
                  </p>
                  <p className="text-sm text-muted-foreground font-poppins">
                    {new Date(assessment.date).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-primary font-poppins font-medium">
                  {assessment.score}
                </span>
              </div>
            ))}
          </div>
        </DashboardWidget>

        {/* Actions */}
        <DashboardWidget title="Actions">
          <div className="space-y-3">
            <button
              onClick={() => navigate(`/patients/${id}/diet-chart/new`)}
              className="w-full bg-gradient-primary text-primary-foreground p-4 rounded-xl hover:shadow-elevated transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5" />
                <div className="text-left">
                  <p className="font-poppins font-semibold">Create New Diet Chart</p>
                  <p className="text-sm text-primary-foreground/80 font-poppins">
                    Generate personalized Ayurvedic diet plan
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate(`/patients/${id}/vault`)}
              className="w-full bg-card border border-border text-card-foreground p-4 rounded-xl hover:bg-muted transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="font-poppins font-semibold">Access Patient Vault</p>
                  <p className="text-sm text-muted-foreground font-poppins">
                    View secure health records
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate(`/assessment/new?patient=${id}`)}
              className="w-full bg-card border border-border text-card-foreground p-4 rounded-xl hover:bg-muted transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="font-poppins font-semibold">Start Assessment</p>
                  <p className="text-sm text-muted-foreground font-poppins">
                    Begin Prakriti-Vikriti analysis
                  </p>
                </div>
              </div>
            </button>
          </div>
        </DashboardWidget>
      </div>

      <TabBar />
    </div>
  );
}