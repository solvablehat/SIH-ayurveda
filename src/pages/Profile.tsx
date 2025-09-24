import { useNavigate } from "react-router-dom";
import { TopAppBar, TabBar } from "@/components/ui/navigation";
import { DashboardWidget } from "@/components/DashboardWidget";
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Settings,
  Bell,
  Shield,
  FileText,
  LogOut,
  Edit,
  Calendar,
  Activity,
  Users,
  Award
} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();

  const doctorProfile = {
    name: "Dr. Sneha Rao",
    designation: "Ayurvedic Dietitian",
    qualification: "BAMS, MD (Ayurveda)",
    experience: "8 years",
    email: "sneha.rao@clinic.com",
    phone: "+91 98765 43210",
    address: "Ayur Wellness Clinic, MG Road, Bangalore",
    license: "AYU/KAR/2016/12345",
    specialization: ["Panchakosha Nutrition", "Prakriti Analysis", "Dosha Balancing"]
  };

  const statistics = [
    { label: "Total Patients", value: "248", icon: Users },
    { label: "Diet Plans Created", value: "156", icon: FileText },
    { label: "Avg. Compliance", value: "85%", icon: Activity },
    { label: "Years Experience", value: "8", icon: Award }
  ];

  const menuItems = [
    { 
      icon: Settings, 
      label: "Settings", 
      description: "App preferences and configurations",
      action: () => navigate('/settings')
    },
    { 
      icon: Bell, 
      label: "Notifications", 
      description: "Manage notification preferences",
      action: () => navigate('/notifications')
    },
    { 
      icon: Shield, 
      label: "Security", 
      description: "Privacy and security settings",
      action: () => navigate('/security')
    },
    { 
      icon: FileText, 
      label: "Reports", 
      description: "Generate and export reports",
      action: () => navigate('/reports')
    },
    { 
      icon: Calendar, 
      label: "Schedule Management", 
      description: "Manage appointments and availability",
      action: () => navigate('/schedule')
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopAppBar 
        title="Profile"
        rightAction={
          <button 
            onClick={() => navigate('/profile/edit')}
            className="p-2 hover:bg-primary/80 rounded-lg transition-colors"
          >
            <Edit className="h-5 w-5 text-primary-foreground" />
          </button>
        }
      />
      
      <div className="p-6 space-y-6">
        {/* Profile Header */}
        <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-playfair font-bold mb-1">
                {doctorProfile.name}
              </h2>
              <p className="text-primary-foreground/90 font-poppins">
                {doctorProfile.designation}
              </p>
              <p className="text-sm text-primary-foreground/80 font-poppins">
                {doctorProfile.qualification}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary-foreground/10 rounded-lg p-3">
              <p className="text-sm text-primary-foreground/80 font-poppins">Experience</p>
              <p className="font-playfair font-semibold">{doctorProfile.experience}</p>
            </div>
            <div className="bg-primary-foreground/10 rounded-lg p-3">
              <p className="text-sm text-primary-foreground/80 font-poppins">License</p>
              <p className="font-poppins font-medium text-sm">{doctorProfile.license}</p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4">
          {statistics.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-gradient-wellness rounded-lg p-4 border border-border/30">
                <div className="flex items-center justify-between mb-2">
                  <IconComponent className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-playfair font-bold text-foreground">
                    {stat.value}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground font-poppins">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Contact Information */}
        <DashboardWidget title="Contact Information">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <span className="font-poppins text-foreground">{doctorProfile.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <span className="font-poppins text-foreground">{doctorProfile.phone}</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <span className="font-poppins text-foreground">{doctorProfile.address}</span>
            </div>
          </div>
        </DashboardWidget>

        {/* Specializations */}
        <DashboardWidget title="Specializations">
          <div className="flex flex-wrap gap-2">
            {doctorProfile.specialization.map((spec, index) => (
              <span 
                key={index}
                className="px-3 py-2 bg-primary/10 text-primary rounded-full text-sm font-poppins font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        </DashboardWidget>

        {/* Menu Items */}
        <DashboardWidget title="Settings & Tools">
          <div className="space-y-3">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={index}
                  onClick={item.action}
                  className="w-full bg-card border border-border rounded-lg p-4 hover:shadow-wellness transition-all duration-200 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-primary/10 rounded-lg">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-poppins font-semibold text-foreground">
                        {item.label}
                      </p>
                      <p className="text-sm text-muted-foreground font-poppins">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </DashboardWidget>

        {/* Logout */}
        <button className="w-full bg-destructive/10 border border-destructive/30 text-destructive rounded-lg p-4 hover:bg-destructive/20 transition-all duration-200">
          <div className="flex items-center justify-center gap-2">
            <LogOut className="h-5 w-5" />
            <span className="font-poppins font-semibold">Sign Out</span>
          </div>
        </button>
      </div>

      <TabBar />
    </div>
  );
}