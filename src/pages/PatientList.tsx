import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopAppBar, AddPatientButton, SearchButton, TabBar } from "@/components/ui/navigation";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Calendar,
  Activity,
  ChevronRight,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Patient {
  id: string;
  name: string;
  age: number;
  lastVisit: string;
  compliance: number;
  dosha: 'Vata' | 'Pitta' | 'Kapha';
  status: 'active' | 'follow-up' | 'inactive';
}

export default function PatientList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const patients: Patient[] = [
    {
      id: "1",
      name: "Priya Sharma",
      age: 34,
      lastVisit: "2024-01-15",
      compliance: 92,
      dosha: "Pitta",
      status: "active"
    },
    {
      id: "2", 
      name: "Ravi Kumar",
      age: 45,
      lastVisit: "2024-01-12",
      compliance: 78,
      dosha: "Vata",
      status: "follow-up"
    },
    {
      id: "3",
      name: "Anjali Patel",
      age: 28,
      lastVisit: "2024-01-10",
      compliance: 85,
      dosha: "Kapha",
      status: "active"
    },
    {
      id: "4",
      name: "Suresh Gupta",
      age: 52,
      lastVisit: "2024-01-08",
      compliance: 65,
      dosha: "Pitta",
      status: "follow-up"
    },
    {
      id: "5",
      name: "Meera Singh",
      age: 38,
      lastVisit: "2024-01-05",
      compliance: 88,
      dosha: "Vata",
      status: "active"
    }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 85) return "text-green-600";
    if (compliance >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return "bg-green-100 text-green-800";
      case 'follow-up': return "bg-yellow-100 text-yellow-800";
      case 'inactive': return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getDoshaColor = (dosha: string) => {
    switch (dosha) {
      case 'Vata': return "bg-purple-100 text-purple-800";
      case 'Pitta': return "bg-red-100 text-red-800";
      case 'Kapha': return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopAppBar 
        title="Patients" 
        rightAction={
          <div className="flex gap-2">
            <SearchButton onClick={() => setShowSearch(!showSearch)} />
            <AddPatientButton onClick={() => navigate('/patients/new')} />
          </div>
        }
      />
      
      {showSearch && (
        <div className="p-4 bg-card border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 font-poppins"
            />
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-playfair font-semibold text-foreground mb-2">
            All Patients
          </h2>
          <p className="text-muted-foreground font-poppins">
            {filteredPatients.length} patients found
          </p>
        </div>

        <div className="space-y-3">
          {filteredPatients.map((patient) => (
            <button
              key={patient.id}
              onClick={() => navigate(`/patients/${patient.id}`)}
              className="w-full bg-card rounded-xl p-5 shadow-wellness border border-border/50 hover:shadow-elevated transition-all duration-200 hover:scale-[1.01]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-primary-foreground" />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-poppins font-semibold text-foreground">
                        {patient.name}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {patient.age}y
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span className="font-poppins">
                          {new Date(patient.lastVisit).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-poppins font-medium",
                        getStatusColor(patient.status)
                      )}>
                        {patient.status}
                      </span>
                      
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-poppins font-medium",
                        getDoshaColor(patient.dosha)
                      )}>
                        {patient.dosha}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      <span className={cn(
                        "font-poppins font-semibold",
                        getComplianceColor(patient.compliance)
                      )}>
                        {patient.compliance}%
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground font-poppins">
                      compliance
                    </span>
                  </div>
                  
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-playfair font-semibold text-foreground mb-2">
              No patients found
            </h3>
            <p className="text-muted-foreground font-poppins mb-6">
              {searchQuery ? 'Try adjusting your search' : 'Get started by adding your first patient'}
            </p>
            <button
              onClick={() => navigate('/patients/new')}
              className="bg-gradient-primary text-primary-foreground px-6 py-3 rounded-lg font-poppins font-semibold hover:shadow-elevated transition-all duration-200"
            >
              Add First Patient
            </button>
          </div>
        )}
      </div>

      <TabBar />
    </div>
  );
}